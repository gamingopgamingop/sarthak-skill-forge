use actix_web::{web, HttpResponse};
use actix_web::http::header::ContentEncoding;
use futures_util::StreamExt;
use std::task::Poll;
use futures_util::stream;

use crate::utils::response::api_response;

pub async fn stream_payload(mut payload: web::Payload) -> HttpResponse {
    while let Some(chunk) = payload.next().await {
        println!("Chunk: {:?}", chunk);
    }
    api_response("Stream processed", "Stream processed")
}

pub async fn sse() -> HttpResponse {
    let mut counter: usize = 5;

    let stream = stream::poll_fn(move |_cx| {
        if counter == 0 {
            return Poll::Ready(None);
        }

        let payload = format!("data: {}\n\n", counter);
        counter -= 1;

        Poll::Ready(Some(Ok(web::Bytes::from(payload))))
    });
    HttpResponse::Ok()
        .insert_header((http::header::CONTENT_TYPE, "text/event-stream"))
        .insert_header(ContentEncoding::Identity)
        .streaming(stream)
}