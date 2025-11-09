import json
import os
from pathlib import Path
from typing import Any, Dict, List
from docling.document_converter import DocumentConverter
from docling.chunking import HybridChunker
from docling.datamodel.base_models import InputFormat
from docling.datamodel.pipeline_options import PdfPipelineOptions
from docling.document_converter import PdfFormatOption
 
def handler(input_data: Dict[str, Any], context: Dict[str, Any]) -> None:
    """Process PDFs using Docling with intelligent chunking"""
    logger = context['logger']
    emit = context['emit']
    
    files = input_data.get('files', [])
    stream_id = input_data.get('streamId')
    
    logger.info(f"Processing {len(files)} PDF files with Docling")
    
    # Configure Docling with optimized settings
    pipeline_options = PdfPipelineOptions(
        do_ocr=True,
        do_table_structure=True,
        table_structure_options={
            "do_cell_matching": True,
        }
    )
    
    doc_converter = DocumentConverter(
        format_options={
            InputFormat.PDF: PdfFormatOption(pipeline_options=pipeline_options)
        }
    )
    
    # Initialize the hybrid chunker for intelligent document segmentation
    chunker = HybridChunker(
        tokenizer="cl100k_base",
        max_tokens=512,
        overlap_tokens=50,
        heading_hierarchies=True,
        split_by_page=False
    )
    
    all_chunks = []
    
    for file_info in files:
        file_path = file_info['filePath']
        file_name = file_info['fileName']
        
        logger.info(f"Processing file: {file_name}")
        
        try:
            # Convert PDF to structured document
            result = doc_converter.convert(file_path)
            doc = result.document
            
            logger.info(f"Converted {file_name}: {len(doc.pages)} pages")
            
            # Apply intelligent chunking
            chunks = list(chunker.chunk(doc))
            logger.info(f"Generated {len(chunks)} chunks for {file_name}")
            
            # Prepare chunks for Weaviate
            for i, chunk in enumerate(chunks):
                chunk_data = {
                    'text': chunk.text,
                    'title': file_name,
                    'source': file_path,
                    'page': getattr(chunk, 'page_no', i + 1),
                    'chunk_id': f"{file_name}_chunk_{i}"
                }
                all_chunks.append(chunk_data)
                
        except Exception as e:
            logger.error(f"Error processing {file_name}: {str(e)}")
            continue
    
    logger.info(f"Total chunks generated: {len(all_chunks)}")
    
    if all_chunks:
        # Emit chunks for Weaviate ingestion
        emit({
            'topic': 'rag.load.weaviate',
            'data': {
                'chunks': all_chunks,
                'streamId': stream_id,
                'totalFiles': len(files),
                'totalChunks': len(all_chunks)
            }
        })
    else:
        logger.warning("No chunks generated from PDF processing")