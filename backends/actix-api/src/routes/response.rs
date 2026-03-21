use actix_web::web;
use crate::handlers::response_handler::builder_response;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.route("/builder", web::get().to(builder_response));
}