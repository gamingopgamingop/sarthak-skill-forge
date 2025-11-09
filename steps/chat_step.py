async def handler(req, context):
    # Set a stream item
    await context.streams.messages.set("chat-123", "msg-1", {
        "content": "Hello!",
        "userId": "user-1",
        "timestamp": int(time.time() * 1000),
    })
 
    # Get a stream item
    message = await context.streams.messages.get("chat-123", "msg-1")
 
    # Get all items in a group
    all_messages = await context.streams.messages.get_group("chat-123")
 
    # Delete a stream item
    await context.streams.messages.delete("chat-123", "msg-1")
 
    return {"status": 200, "body": {"messages": all_messages}}