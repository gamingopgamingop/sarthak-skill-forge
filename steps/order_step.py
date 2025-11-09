async def handler(req, context):
    await context.emit({
        "topic": "order.created",
        "data": {"orderId": "123", "amount": 99.99},
    })
 
    return {"status": 200, "body": {"success": True}}