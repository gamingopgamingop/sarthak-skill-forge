use actix_web::{test, App};
use crate::routes;

#[actix_web::test]
async fn test_get_users() {
    let app = test::init_service(
        App::new().configure(routes::configure)
    )
    .await;

    let req = test::TestRequest::get()
        .uri("/users")
        .to_request();

    let resp = test::call_service(&app, req).await;

    assert!(resp.status().is_success());
}