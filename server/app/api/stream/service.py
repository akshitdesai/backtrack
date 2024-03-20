from flask import current_app
from sqlalchemy import func,extract


from app.utils import err_resp, message, internal_err_resp
from app.models.stream import Stream
from app.models.schemas import StreamSchema
from app import db
from datetime import datetime, timedelta
# from app.utils import message, err_resp, internal_err_resp
from .utils import load_data

class StreamService:
    @staticmethod
    def start_stream(sid):
        try:
            new_stream = Stream(
                id=sid,
                start_time=datetime.utcnow(),
            )

            db.session.add(new_stream)
            db.session.flush()

            # Commit changes to DB
            db.session.commit()

            #
            # resp = message(True, "stream has been registered.")
            #
            # return resp, 201

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()

    def stop_stream(sid, good_posture):
        try:
            new_stream = Stream(
                id=sid,
                start_time=datetime.utcnow(),
            )
            # Check if the email is taken
            end_time = datetime.utcnow()

            s = Stream.query.filter_by(id=sid).first()
            if s is not None:
                s.end_time = end_time
                diff = end_time - s.start_time
                s.duration = int(diff.total_seconds())
                s.good_posture = good_posture
                db.session.flush()
                db.session.commit()

            resp = message(True, "stream has been stopped.")

            return resp, 201

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()

    @staticmethod
    def get_last_n_streams():
        try:
            # Calculate the date seven days ago from today
            seven_days_ago = datetime.utcnow() - timedelta(days=7)

            # Query streams that occurred after seven days ago
            streams = Stream.query.filter(Stream.start_time >= seven_days_ago).all()

            # Initialize dictionaries to store aggregated data
            summary = {}
            count = {}

            # Iterate over streams and aggregate data
            for stream in streams:
                date_key = stream.start_time.date()
                if date_key not in summary:
                    summary[date_key] = {'duration_total': 0, 'good_posture_total': 0}
                    count[date_key] = 0
                    # Check if duration and good_posture are not None before adding
                if stream.duration is not None:
                    summary[date_key]['duration_total'] += stream.duration
                if stream.good_posture is not None:
                    summary[date_key]['good_posture_total'] += stream.good_posture
                count[date_key] += 1

            # Calculate average duration and good posture percentage for each day
            for date_key in summary:
                summary[date_key]['average_duration'] = summary[date_key]['duration_total'] / count[date_key]
                summary[date_key]['average_good_posture'] = summary[date_key]['good_posture_total'] / count[date_key]

            # Serialize the aggregated summary
            summary_serialized = {str(date_key): values for date_key, values in summary.items()}

            return summary_serialized, 200
        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()

    @staticmethod
    def get_streams_by_date(date):
        try:
            # date = datetime.strptime(date, '%Y-%m-%d')
            # streams = Stream.query.filter(Stream.start_time.strftime('%Y-%m-%d') == date).all()
            streams = Stream.query.filter(
                extract('year', Stream.start_time) == date.year,
                extract('month', Stream.start_time) == date.month,
                extract('day', Stream.start_time) == date.day
            ).all()
            # print(streams)
            return [load_data(stream) for stream in streams], 200
        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()