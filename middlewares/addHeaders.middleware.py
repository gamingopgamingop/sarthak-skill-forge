async def add_headers_middleware(req, context, next_fn):
    response = await next_fn()
    
    headers = response.get("headers", {})
    headers["X-Request-Id"] = context.trace_id
    
    return {**response, "headers": headers}