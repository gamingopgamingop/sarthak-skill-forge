import os
 
config = {
    'type': 'event', 
    'name': 'process-data',
    'subscribes': ['data.received']
}
 
async def handler(input_data, ctx):
    # Use environment variables with os.environ
    api_key = os.environ.get('OPENAI_API_KEY')
    database_url = os.environ.get('DATABASE_URL')
    
    if not api_key:
        raise ValueError('Missing OPENAI_API_KEY')
    
    ctx.logger.info('Processing with API key', {'has_key': bool(api_key)})
    
    # Your logic here...
    return {'status': 'processed'}