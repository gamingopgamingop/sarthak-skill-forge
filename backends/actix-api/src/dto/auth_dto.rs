use serde::Deserialize;

#[derive(Deserialize)]
pub struct LoginDto {
    pub email: String,
    pub password: String,
}