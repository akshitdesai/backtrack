from flask_restx import Resource
from flask_restx import Resource
from flask_jwt_extended import jwt_required
from flask import Response, request

from .service import StreamService
from .dto import StreamDto
from datetime import datetime

api = StreamDto.api
data_resp = StreamDto.data_resp

# Stream related info
import cv2
import threading

import time
import math as m
import mediapipe as mp

# Initialize mediapipe selfie segmentation class.
mp_pose = mp.solutions.pose
mp_holistic = mp.solutions.holistic


def findDistance(x1, y1, x2, y2):
    dist = m.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    return dist


# Calculate angle.
def findAngle(x1, y1, x2, y2):
    theta = m.acos((y2 - y1) * (-y1) / (m.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * y1))
    degree = int(180 / m.pi) * theta
    return degree


# Font type.
font = cv2.FONT_HERSHEY_SIMPLEX

# Colors.
blue = (255, 127, 0)
red = (50, 50, 255)
green = (127, 255, 0)
dark_blue = (127, 20, 0)
light_green = (127, 233, 100)
yellow = (0, 255, 255)
pink = (255, 0, 255)

# Initialize mediapipe pose class.
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# initialize a lock used to ensure thread-safe
# exchanges of the frames (useful for multiple browsers/tabs
# are viewing the stream)
lock = threading.Lock()
good_frames = 0
bad_frames = 0
cap = None

def generate():
    # Initialize frame counters.
    global good_frames
    global bad_frames
    global cap

    good_frames = 0
    bad_frames = 0

    # grab global references to the lock variable
    global lock
    # initialize the video stream
    cap = cv2.VideoCapture(0)

    # check camera is open
    if cap.isOpened():
        rval, frame = cap.read()
    else:
        rval = False

    # while streaming
    while rval:
        # wait until the lock is acquired
        with lock:
            # read next frame
            rval, image = cap.read()
            # if blank frame
            if image is None:
                continue

            # Get fps.
            fps = cap.get(cv2.CAP_PROP_FPS)
            # Get height and width.
            h, w = image.shape[:2]

            # Convert the BGR image to RGB.
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

            # Process the image.
            keypoints = pose.process(image)

            # Convert the image back to BGR.
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            # Use lm and lmPose as representative of the following methods.
            lm = keypoints.pose_landmarks
            lmPose = mp_pose.PoseLandmark

            if lm is None:
                continue

            # Acquire the landmark coordinates.
            # Once aligned properly, left or right should not be a concern.
            # Left shoulder.
            l_shldr_x = int(lm.landmark[lmPose.LEFT_SHOULDER].x * w)
            l_shldr_y = int(lm.landmark[lmPose.LEFT_SHOULDER].y * h)
            # Right shoulder
            r_shldr_x = int(lm.landmark[lmPose.RIGHT_SHOULDER].x * w)
            r_shldr_y = int(lm.landmark[lmPose.RIGHT_SHOULDER].y * h)
            # Left ear.
            l_ear_x = int(lm.landmark[lmPose.LEFT_EAR].x * w)
            l_ear_y = int(lm.landmark[lmPose.LEFT_EAR].y * h)
            # Left hip.
            l_hip_x = int(lm.landmark[lmPose.LEFT_HIP].x * w)
            l_hip_y = int(lm.landmark[lmPose.LEFT_HIP].y * h)

            # Calculate distance between left shoulder and right shoulder points.
            offset = findDistance(l_shldr_x, l_shldr_y, r_shldr_x, r_shldr_y)

            # Assist to align the camera to point at the side view of the person.
            # Offset threshold 30 is based on results obtained from analysis over 100 samples.
            if offset < 100:
                cv2.putText(image, str(int(offset)) + ' Aligned', (w - 150, 30), font, 0.9, green, 2)
            else:
                cv2.putText(image, str(int(offset)) + ' Not Aligned', (w - 150, 30), font, 0.9, red, 2)

            # Calculate angles.
            neck_inclination = findAngle(l_shldr_x, l_shldr_y, l_ear_x, l_ear_y)
            torso_inclination = findAngle(l_hip_x, l_hip_y, l_shldr_x, l_shldr_y)

            # Draw landmarks.
            cv2.circle(image, (l_shldr_x, l_shldr_y), 7, yellow, -1)
            cv2.circle(image, (l_ear_x, l_ear_y), 7, yellow, -1)

            # Let's take y - coordinate of P3 100px above x1,  for display elegance.
            # Although we are taking y = 0 while calculating angle between P1,P2,P3.
            cv2.circle(image, (l_shldr_x, l_shldr_y - 100), 7, yellow, -1)
            cv2.circle(image, (r_shldr_x, r_shldr_y), 7, pink, -1)
            cv2.circle(image, (l_hip_x, l_hip_y), 7, yellow, -1)

            # Similarly, here we are taking y - coordinate 100px above x1. Note that
            # you can take any value for y, not necessarily 100 or 200 pixels.
            cv2.circle(image, (l_hip_x, l_hip_y - 100), 7, yellow, -1)

            # Put text, Posture and angle inclination.
            # Text string for display.
            angle_text_string = 'Neck : ' + str(int(neck_inclination)) + '  Torso : ' + str(int(torso_inclination))

            # Determine whether good posture or bad posture.
            # The threshold angles have been set based on intuition.
            if neck_inclination < 40 and torso_inclination < 10:
                bad_frames = 0
                good_frames += 1

                cv2.putText(image, angle_text_string, (10, 30), font, 0.9, light_green, 2)
                cv2.putText(image, str(int(neck_inclination)), (l_shldr_x + 10, l_shldr_y), font, 0.9, light_green, 2)
                cv2.putText(image, str(int(torso_inclination)), (l_hip_x + 10, l_hip_y), font, 0.9, light_green, 2)

                # Join landmarks.
                cv2.line(image, (l_shldr_x, l_shldr_y), (l_ear_x, l_ear_y), green, 4)
                cv2.line(image, (l_shldr_x, l_shldr_y), (l_shldr_x, l_shldr_y - 100), green, 4)
                cv2.line(image, (l_hip_x, l_hip_y), (l_shldr_x, l_shldr_y), green, 4)
                cv2.line(image, (l_hip_x, l_hip_y), (l_hip_x, l_hip_y - 100), green, 4)

            else:
                good_frames = 0
                bad_frames += 1

                cv2.putText(image, angle_text_string, (10, 30), font, 0.9, red, 2)
                cv2.putText(image, str(int(neck_inclination)), (l_shldr_x + 10, l_shldr_y), font, 0.9, red, 2)
                cv2.putText(image, str(int(torso_inclination)), (l_hip_x + 10, l_hip_y), font, 0.9, red, 2)

                # Join landmarks.
                cv2.line(image, (l_shldr_x, l_shldr_y), (l_ear_x, l_ear_y), red, 4)
                cv2.line(image, (l_shldr_x, l_shldr_y), (l_shldr_x, l_shldr_y - 100), red, 4)
                cv2.line(image, (l_hip_x, l_hip_y), (l_shldr_x, l_shldr_y), red, 4)
                cv2.line(image, (l_hip_x, l_hip_y), (l_hip_x, l_hip_y - 100), red, 4)

            # Calculate the time of remaining in a particular posture.
            good_time = (1 / fps) * good_frames
            bad_time = (1 / fps) * bad_frames

            # Pose time.
            if good_time > 0:
                time_string_good = 'Good Posture Time : ' + str(round(good_time, 1)) + 's'
                cv2.putText(image, time_string_good, (10, h - 20), font, 0.9, green, 2)
            else:
                time_string_bad = 'Bad Posture Time : ' + str(round(bad_time, 1)) + 's'
                cv2.putText(image, time_string_bad, (10, h - 20), font, 0.9, red, 2)

            # If you stay in bad posture for more than 3 minutes (180s) send an alert.
            if bad_time > 180:
                # show nad posture warning
                pass

            # encode the frame in JPEG format
            (flag, encodedImage) = cv2.imencode(".jpg", image)

            # ensure the frame was successfully encoded
            if not flag:
                continue

        # yield the output frame in the byte format
        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + bytearray(encodedImage) + b'\r\n')
    # release the camera
    # cv2.release()



@api.route("/<string:stream_id>")
class StreamStart(Resource):
    @api.doc(
        "Get a specific user",
        responses={
            200: ("User data successfully sent", data_resp),
            404: "User not found!",
        },
    )
    def get(self, stream_id):
        """ Get a specific user's data by their username """

        StreamService.start_stream(stream_id)

        return Response(generate(), mimetype="multipart/x-mixed-replace; boundary=frame")

@api.route("/<string:stream_id>/stop")
class StreamStop(Resource):

    def get(self, stream_id):
        """ Get a specific user's data by their username """
        global cap
        cap.release()
        cv2.destroyAllWindows()
        global good_frames, bad_frames

        good_posture = good_frames * 100 / (good_frames+bad_frames)
        return StreamService.stop_stream(stream_id, good_posture)
@api.route("/history")
class StreamGet(Resource):
    def get(self):
        """ Get last N entries in the database for a stream """
        try:
            # n = int(request.args.get('n', default=10))  # Get the value of 'n' query parameter, default to 10 if not provided
            return StreamService.get_last_n_streams()
        except ValueError:
            return "Invalid value for parameter 'n'", 400


@api.route("/date/<string:date>")
class StreamByDate(Resource):
    def get(self, date):
        """ Get all streams for a given date """
        try:

            # Parse the date string into a datetime object
            date = datetime.strptime(date, '%Y-%m-%d').date()  # Assuming date format is YYYY-MM-DD

            return StreamService.get_streams_by_date(date), 200
        except ValueError:
            return "Invalid date format. Please provide the date in YYYY-MM-DD format.", 400