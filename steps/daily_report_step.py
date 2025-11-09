config = {
    "name": "DailyReport",
    "type": "cron",
    "cron": "0 9 * * *",  # Run daily at 9 AM
    "flows": ["reports"],
}
 
async def handler(context):
    context.logger.info("Running daily report")
    await context.emit({
        "topic": "report.generated",
        "data": {"date": datetime.now().isoformat()},
    })