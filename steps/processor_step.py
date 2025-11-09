async def handler(req, context):
    # Set a value
    await context.state.set(context.trace_id, "userCount", 42)
 
    # Get a value
    count = await context.state.get(context.trace_id, "userCount")
 
    # Get all keys for a trace
    keys = await context.state.keys(context.trace_id)
 
    # Delete a value
    await context.state.delete(context.trace_id, "userCount")
 
    # Clear all state for a trace
    await context.state.clear(context.trace_id)
 
    return {"status": 200, "body": {"count": count}}