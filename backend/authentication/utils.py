import uuid

class short_uuid():
    def create():
        id = uuid.uuid4().time_low
        return hex(int(id))[2:]