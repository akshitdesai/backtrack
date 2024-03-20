def load_data(user_db_obj):
    """ Load user's data

    Parameters:
    - User db object
    """
    from app.models.schemas import StreamSchema

    stream_schema = StreamSchema()

    data = stream_schema.dump(user_db_obj)

    return data
