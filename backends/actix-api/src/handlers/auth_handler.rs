use actix_web::{web, HttpResponse};
use jsonwebtoken::{encode, Header, EncodingKey};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use argon2::{self, Config};
use crate::app_state::AppState;

#[derive(Deserialize)]
pub struct RegisterInput {
    pub email: String,
    pub password: String,
}

#[derive(Serialize)]
struct Claims {
    sub: String,
    exp: usize,
}
use crate::errors::AppError;

pub async fn register(
    state: web::Data<AppState>,
    payload: web::Json<RegisterInput>,
) -> Result<HttpResponse, AppError> {

    if payload.password.len() < 8 {
        return Err(AppError::BadRequest("Password too short".into()));
    }

    let salt = b"somesalt";
    let hash = argon2::hash_encoded(payload.password.as_bytes(), salt, &Config::default())
        .map_err(|_| AppError::InternalError)?;

    let id = Uuid::new_v4();

    sqlx::query("INSERT INTO users (id, email, password_hash) VALUES ($1, $2, $3)")
        .bind(id)
        .bind(&payload.email)
        .bind(hash)
        .execute(&state.db)
        .await
        .map_err(|_| AppError::DbError)?;

    Ok(api_response("User registered", "User registered"))
}

use crate::errors::AppError;

#[derive(Deserialize)]
pub struct LoginInput {
    pub email: String,
    pub password: String,
}

use crate::utils::response::api_response;

pub async fn login(
    state: web::Data<AppState>,
    payload: web::Json<LoginInput>,
) -> Result<HttpResponse, AppError> {

    let claims = Claims {
        sub: payload.email.clone(),
        exp: 2000000000,
    };

    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(state.jwt_secret.as_ref()),
    )
    .map_err(|_| AppError::InternalError)?;

    Ok(api_response("Login successful", token))
}