mod config;
mod db;
mod app_state;
mod routes;
mod handlers;
mod models;
mod middleware;
mod errors;
use actix_web::middleware::NormalizePath;
use actix_web::middleware::{NormalizePath, TrailingSlash};
use actix_web::{App, HttpServer, middleware::Logger};
use actix_cors::Cors;
use config::Config;
use db::connect_db;
use app_state::AppState;
use actix_web::{App, HttpServer, web, HttpResponse, guard};
use actix_web::{
    middleware::{Logger, DefaultHeaders, ErrorHandlers},
    web, App, HttpServer,
    http::StatusCode,
};
use env_logger::Env;
use middleware::logger::SayHi;
use errors::internal_error_handler;
use actix_session::{SessionMiddleware, storage::CookieSessionStore};
use actix_web::cookie::Key;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init_from_env(
        Env::default().default_filter_or("info")
    );

    env_logger::init();
    let config = Config::from_env();

    let db_pool = connect_db(&config.database_url).await;

    let state = AppState {
        db: db_pool,
        jwt_secret: config.jwt_secret,
    };

    HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            .wrap(Cors::permissive())
            .wrap(middleware::logger::SayHi)
            .app_data(actix_web::web::Data::new(state.clone()))
            .configure(routes::auth::config)
    })

        HttpServer::new(|| {

        let json_config = web::JsonConfig::default()
            .limit(1024 * 1024) // 1MB
            .error_handler(|err, _req| {
                crate::errors::AppError::BadRequest(err.to_string()).into()
            });

        App::new()
            .wrap(NormalizePath::new(TrailingSlash::Trim))
            .wrap(middleware::logger::SayHi)
            .app_data(json_config)
            .configure(routes::init)
    })


    HttpServer::new(|| {
        App::new()
            // 👇 ADD IT HERE
            .wrap(NormalizePath::default())
            .wrap(middleware::logger::SayHi)
            
            // Register routes
            .configure(routes::init)
    })

        HttpServer::new(|| {
        App::new()
            .wrap(NormalizePath::new(TrailingSlash::Trim))
            .wrap(middleware::logger::SayHi)
            .configure(routes::init)
    })

            .wrap(middleware::logger::SayHi)


    HttpServer::new(|| {
    App::new()
        .wrap(middleware::logger::SayHi)    
        .configure(routes::init)
        .default_service(
            web::route()
                .guard(guard::Not(guard::Get()))
                .to(|| async { HttpResponse::MethodNotAllowed() })
        )
            HttpServer::new(|| {
            App::new()

            // 🔹 Logging (should be first)
            .wrap(Logger::default())

            // 🔹 Custom Transform middleware
            .wrap(SayHi)

            // 🔹 Default Headers
            .wrap(
                DefaultHeaders::new()
                    .add(("X-API-Version", "1.0"))
            )

            // 🔹 Error Handlers
            .wrap(
                ErrorHandlers::new()
                    .handler(
                        StatusCode::INTERNAL_SERVER_ERROR,
                        internal_error_handler,
                    )
            )
            .wrap(
                SessionMiddleware::builder(
                    CookieSessionStore::default(),
                    Key::from(&[0; 64])
                )
                .cookie_secure(false)
                .build()
            )

            // 🔹 Normalize paths
            .wrap(actix_web::middleware::NormalizePath::default())

            // 🔹 Register routes
            .configure(routes::config)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await

}