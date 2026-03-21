use actix_web::{test, web, App, body, http::header::ContentEncoding};
use futures_util::future;

use crate::handlers::stream_handler::sse;

#[actix_web::test]
async fn test_stream_chunks() {
    let app = test::init_service(
        App::new().route("/", web::get().to(sse))
    )
    .await;

    let req = test::TestRequest::get().to_request();
    let resp = test::call_service(&app, req).await;

    assert!(resp.status().is_success());

    let body = resp.into_body();
    let bytes = body::to_bytes(body).await.unwrap();

    assert_eq!(
        bytes,
        web::Bytes::from_static(
            b"data: 5\n\ndata: 4\n\ndata: 3\n\ndata: 2\n\ndata: 1\n\n"
        )
    );
}