use actix_web::web;
use crate::handlers::user_handler;
use crate::handlers::json_responder_handler::json_responder;
use crate::handlers::response_handler::builder_response;

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/users")
            .route("", web::post().to(user_handler::create_user))
            .route("", web::get().to(user_handler::get_users))
            .route("/{id}", web::get().to(user_handler::get_user))
            .route("/{id}", web::put().to(user_handler::update_user))
            .route("/{id}", web::delete().to(user_handler::delete_user))
             .route("/{id}/password", web::put().to(user_handler::update_password))
             .route("/profile/{name}", web::get().to(json_responder))
    );
        web::scope("/users")
            .service(
                web::resource("")
                    .route(web::get().to(user_handler::list_users))
                    .route(web::post().to(user_handler::create_user))
            )
            .service(
                web::resource("/{id}")
                    .name("user_detail") // named route
                    .route(web::get().to(user_handler::get_user))
                    .route(web::put().to(user_handler::update_user))
                    .route(web::delete().to(user_handler::delete_user))
            )
            .service(
                web::resource("/me")
                    .guard(guard::Get())
                    .to(user_handler::get_current_user)
            )
}