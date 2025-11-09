# Motia discovers this file because:
# 1. Filename contains '.step.'  
# 2. Exports 'config' dict
# 3. Has .py extension -> uses Python runtime
 
config = {
    "type": "event",
    "name": "data-processor",
    "description": "Process incoming data with Python",
    "subscribes": ["users.fetched"],
    "emits": ["data.processed"],
    "flows": ["user-management"]
}
 
async def handler(input_data, ctx):
    """Process the data"""
    processed_data = {
        "original": input_data,
        "processed_at": ctx.utils.dates.now().isoformat(),
        "count": len(input_data.get("users", []))
    }
    
    await ctx.emit({
        "topic": "data.processed",
        "data": processed_data
    })