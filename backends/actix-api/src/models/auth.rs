use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct LoginDto {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize)]
pub struct AuthResponseDto {
    pub access_token: String,
}