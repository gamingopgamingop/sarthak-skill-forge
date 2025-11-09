async def handler(input, context):
    # Simple message
    context.logger.info('Processing order')
 
    # With context data
    context.logger.info('Order created', {
        'order_id': input.get("id"),
        'total': input.get("total")
    })
 
    # Errors
    try:
        await charge_card(input.get("payment_method"))
    except Exception as error:
        context.logger.error('Payment failed', {
            'error': str(error),
            'order_id': input.get("id")
        })
 
    # Warnings for unusual situations
    if input.get("total", 0) > 1000:
        context.logger.warn('Large order', {
            'total': input.get("total"),
            'threshold': 1000
        })
 
    # Debug info (only shows with --debug flag)
    context.logger.debug('Raw input', {'input': input})