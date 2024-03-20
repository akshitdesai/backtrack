from datetime import datetime
from app import db, bcrypt

# Alias common DB names
Column = db.Column
Model = db.Model
relationship = db.relationship


class Stream(Model):
    """ Stream model for storing stream related data """

    id = Column(db.String(64), primary_key=True)
    start_time = Column(db.DateTime)
    end_time = Column(db.DateTime)
    duration = Column(db.Integer)
    good_posture = Column(db.Integer)

    def __init__(self, **kwargs):
        super(Stream, self).__init__(**kwargs)

    def __repr__(self):
        return f"<Stream {self.id}>"
