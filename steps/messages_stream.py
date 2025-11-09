from pydantic import BaseModel
 
class Message(BaseModel):
    content: str
    user_id: str
    timestamp: int
 
config = {
    "name": "messages",
    "schema": Message.model_json_schema(),
    "baseConfig": {"storageType": "default"}
}