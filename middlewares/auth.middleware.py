async def auth_middleware(req, context, next_fn):
    if not req.get("headers", {}).get("authorization"):
        return {"status": 401, "body": {"error": "Unauthorized"}}
    return await next_fn()
 
config = {
    "name": "ProtectedEndpoint",
    "type": "api",
    "path": "/protected",
    "method": "GET",
    "middleware": [auth_middleware]
}
 
async def handler(req, context):
    return {"status": 200, "body": {"message": "Success"}}