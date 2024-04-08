from flask_restx import Namespace, fields


class StreamDto:

    api = Namespace("stream", description="Stream related operations.")
    stream = api.model(
        "Stream object",
        {
            "id": fields.String,
            "start_time": fields.DateTime,
            "end_time": fields.DateTime,
            "duration": fields.Integer,
            "good_posture": fields.Integer,
        },
    )

    data_resp = api.model(
        "User Data Response",
        {
            "status": fields.Boolean,
            "message": fields.String,
            "user": fields.Nested(stream),
        },
    )

    threshold_resp = api.model(
        "Threshold response",
        {
            "threshold": fields.Integer,
        }
    )
