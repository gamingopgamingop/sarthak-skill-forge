import time
from datetime import datetime
 
# Python processing step configuration
config = {
    "type": "event",
    "name": "ProcessDataPython",
    "description": "Process data using Python capabilities",
    "subscribes": ["data.processed"],
    "emits": ["python.done"],
    "flows": ["data-processing"]
}
 
async def handler(input_data, ctx):
    """
    Python step that processes data and demonstrates Python capabilities
    """
    logger = ctx.logger
    emit = ctx.emit
    
    # Extract data from input
    original_id = input_data.get("original_id")
    result = input_data.get("result", "")
    
    logger.info(f"🐍 Python processing data for ID: {original_id}")
    
    start_time = time.time()
    
    # Simulate Python data processing
    processed_message = f"Python processed: {result}"
    
    # Add some Python-specific processing
    data_analysis = {
        "word_count": len(result.split()) if isinstance(result, str) else 0,
        "character_count": len(result) if isinstance(result, str) else 0,
        "processed_timestamp": datetime.now().isoformat(),
        "processing_language": "Python 3.x"
    }
    
    processing_time = (time.time() - start_time) * 1000  # Convert to milliseconds
    
    # Create result object
    python_result = {
        "id": original_id,
        "python_message": processed_message,
        "processed_by": ["appStarter", "appBridge", "ProcessDataPython"],
        "processing_time": processing_time,
        "analysis": data_analysis
    }
    
    # Emit to next step
    await emit({
        "topic": "python.done",
        "data": python_result
    })
    
    logger.info(f"✅ Python processing completed in {processing_time:.2f}ms")