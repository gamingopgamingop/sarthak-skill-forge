use actix_web::{web, HttpResponse};
use serde_json::Value;

use crate::utils::response::api_response;

pub async fn handle_webhook(body: web::Json<Value>) -> HttpResponse {
    println!("Webhook: {:?}", body);
    api_response("Webhook processed", "Webhook processed")
}