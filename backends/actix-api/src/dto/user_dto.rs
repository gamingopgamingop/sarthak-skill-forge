use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct CreateUserDto {
    pub username: String,
    pub email: String,
}

#[derive(Debug, Serialize)]
pub struct UserResponseDto {
    pub id: String,
    pub username: String,
    pub email: String,
}