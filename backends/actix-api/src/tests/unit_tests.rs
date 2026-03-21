use actix_web::{
    test,
    http::{self, header::ContentType},
};

async fn index(req: actix_web::HttpRequest) -> actix_web::HttpResponse {
    if req.headers().contains_key("Content-Type") {
        actix_web::HttpResponse::Ok().finish()
    } else {
        actix_web::HttpResponse::BadRequest().finish()
    }
}

#[actix_web::test]
async fn test_index_ok() {
    let req = test::TestRequest::default()
        .insert_header(ContentType::plaintext())
        .to_http_request();

    let resp = index(req).await;
    assert_eq!(resp.status(), http::StatusCode::OK);
}

#[actix_web::test]
async fn test_index_not_ok() {
    let req = test::TestRequest::default().to_http_request();
    let resp = index(req).await;
    assert_eq!(resp.status(), http::StatusCode::BAD_REQUEST);
}