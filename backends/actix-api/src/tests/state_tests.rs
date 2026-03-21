use actix_web::{test, web, App};
use crate::app_state::AppState;

async fn index(data: web::Data<AppState>) -> web::Json<AppState> {
    web::Json(AppState {
        db: data.db.clone(),
        jwt_secret: data.jwt_secret.clone(),
    })
}

#[actix_web::test]
async fn test_with_state() {
    let state = web::Data::new(AppState {
        db: sqlx::PgPool::connect_lazy("postgres://localhost/test").unwrap(),
        jwt_secret: "secret".to_string(),
    });

    let app = test::init_service(
        App::new()
            .app_data(state.clone())
            .route("/", web::get().to(index)),
    )
    .await;

    let req = test::TestRequest::get().uri("/").to_request();

    let resp = test::call_service(&app, req).await;
    assert!(resp.status().is_success());
}