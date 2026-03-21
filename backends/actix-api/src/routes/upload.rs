pub fn init(cfg: &mut web::ServiceConfig) {
    users::init(cfg);
    auth::init(cfg);
    upload::init(cfg);
    webhook::init(cfg);
}