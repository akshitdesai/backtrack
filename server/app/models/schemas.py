# Model Schemas
from app import ma

from .user import User


class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose, add more if needed.
        fields = ("email", "name", "username", "joined_date", "role_id")

class StreamSchema(ma.Schema):
    class Meta:
        # Fields to expose, add more if needed.
        fields = ("id", "start_time", "end_time", "duration", "good_posture")