use actix_web::{web, Responder};
use serde::Serialize;

#[derive(Serialize)]
pub struct ProfileResponse {
    pub username: String,
}

pub async fn json_responder(path: web::Path<String>) -> impl Responder {
    let response = ProfileResponse {
        username: path.into_inner(),
    };

    api_response("Profile response", response)
}