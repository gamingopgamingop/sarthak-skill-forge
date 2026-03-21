use actix_web::HttpResponse;
use serde::Serialize;

#[derive(Serialize)]
pub struct ApiResponse<T> {
    message: String,
    data: T,
}

pub fn api_response<T: Serialize>(message: &str, data: T) -> HttpResponse {
    HttpResponse::Ok().json(ApiResponse {
        message: message.to_string(),
        data,
    })
}