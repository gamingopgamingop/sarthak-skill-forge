use actix_web::web;
use crate::handlers::compression_handler::*;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.route("/no-compress", web::get().to(no_compression));
    cfg.route("/precompressed", web::get().to(precompressed));
}