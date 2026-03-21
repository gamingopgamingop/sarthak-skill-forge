use std::env;

pub struct Config {
    pub database_url: String,
    pub jwt_secret: String,
}

impl Config {
    pub fn from_env() -> Self {
        dotenvy::dotenv().ok();

        Self {
            database_url: env::var("DATABASE_URL").unwrap(),
            jwt_secret: env::var("JWT_SECRET").unwrap(),
        }
    }
}