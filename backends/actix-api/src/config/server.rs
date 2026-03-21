use dotenvy::dotenv;
use std::env;

pub struct ServerConfig {
    pub database_url: String,
    pub jwt_secret: String,
}

pub fn load_config() -> ServerConfig {
    dotenv().ok();

    ServerConfig {
        database_url: env::var("DATABASE_URL").unwrap(),
        jwt_secret: env::var("JWT_SECRET").unwrap(),
    }
}