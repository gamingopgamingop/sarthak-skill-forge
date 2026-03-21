pub mod config;
pub mod app_state;
pub mod errors;
pub mod routes;
pub mod handlers;
pub mod models;
pub mod dto;
pub mod services;
pub mod db;
pub mod middleware;
pub mod utils;

use actix_web::{App, middleware::Logger};
use config::server::load_config;
use app_state::AppState;
use db::init_db;
use actix_web::middleware::Compress;

pub fn build_app() -> App<
    impl actix_service::ServiceFactory<
        actix_web::dev::ServiceRequest,
        Config = (),
        Response = actix_web::dev::ServiceResponse,
        Error = actix_web::Error,
        InitError = (),
    >,
> {
    let cfg = load_config();
    let pool = futures::executor::block_on(init_db(&cfg.database_url));

    let state = actix_web::web::Data::new(AppState {
        db: pool,
        jwt_secret: cfg.jwt_secret,
    });

    App::new()
        .wrap(Logger::default())
        .app_data(state)
        .configure(routes::configure)
        .wrap(Logger::default())
        .wrap(Compress::default())  // ← Add this
}