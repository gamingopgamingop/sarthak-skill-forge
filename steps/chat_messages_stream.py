from pydantic import BaseModel
 
class ChatMessage(BaseModel):
    id: str
    user_id: str
    message: str
    timestamp: str
 
config = {
    "name": "chatMessage",
    "schema": ChatMessage.model_json_schema(),
    "baseConfig": {"storageType": "default"}
}