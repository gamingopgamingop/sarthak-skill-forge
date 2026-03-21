use actix_web::{HttpResponse, http::header::ContentType};

use crate::utils::response::api_response;

pub async fn builder_response() -> HttpResponse {
    api_response("Builder response", "Builder response example")
}