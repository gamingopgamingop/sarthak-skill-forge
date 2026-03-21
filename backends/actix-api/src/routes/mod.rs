
pub mod stream;
pub mod users;
pub mod auth;
pub mod upload;
pub mod webhook;
pub mod response;
pub mod compression;
use actix_web::web;

pub fn init(cfg: &mut web::ServiceConfig) {
    users::init_routes(cfg);
    auth::init_routes(cfg);
    upload::init_routes(cfg);
    webhook::init_routes(cfg);
    compression::init(cfg);
    response::init(cfg);

    cfg.service(
        web::scope("/streams")
            .route("", web::get().to(stream_handler::sse))
    );
    cfg.service(
        web::scope("/webhooks")
            .route("", web::post().to(webhook_handler::handle_webhook))
    );
    cfg.service(
        web::scope("/streams")
            .route("", web::post().to(stream_handler::stream_payload))
    );
}

pub fn init(cfg: &mut web::ServiceConfig) {
    users::init(cfg);
    auth::init(cfg);
    upload::init(cfg);
    webhook::init(cfg);
    compression::init(cfg);
    response::init(cfg);
}

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/webhooks")
            .route("", web::post().to(webhook_handler::handle_webhook))
    );
}