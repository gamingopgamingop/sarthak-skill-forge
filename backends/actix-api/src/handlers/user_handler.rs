use actix_web::{web, HttpResponse};
use uuid::Uuid;
use crate::errors::AppError;
use crate::models::user::{CreateUserDto, UserResponseDto};
use crate::{utils::response::api_response};
use bcrypt::{hash, verify, DEFAULT_COST};
use crate::{
    app_state::AppState,
    errors::AppError,
    models::user::{User, CreateUserDto, UserResponseDto},
};
use crate::dto::auth_dto::LoginDto;
use crate::utils::response::api_response;


/// Get Users
pub async fn get_users(
    state: web::Data<AppState>,
) -> Result<HttpResponse, AppError> {
    let user_id = path.into_inner();

    let users: Vec<UserResponseDto> = sqlx::query_as(
        r#"
        SELECT id, email, password_hash, created_at FROM users
        "#
    )
    Ok(HttpResponse::Ok().json(format!("User ID: {}", user_id)))
    api_response("Users fetched", vec!["User1", "User2"])

    .fetch_all(&state.db)
    .await
    .map_err(|_| AppError::DatabaseError)?;

    api_response("Users fetched", users)
}

/// Create User
pub async fn create_user(
    state: web::Data<AppState>,
    payload: web::Json<CreateUserDto>,
) -> Result<HttpResponse, AppError> {
    let data = payload.into_inner();

    let user = UserResponseDto {
        id: Uuid::new_v4().to_string(),
        username: data.username,
        email: data.email,
    };
    api_response("User created", user)



    // ✅ Validation
    if payload.password.len() < 8 {
        return Err(AppError::BadRequest("Password too short".into()));
    }

    // ✅ Hash password
    let password_hash = hash(&payload.password, DEFAULT_COST)
        .map_err(|_| AppError::InternalServerError)?;

    // ✅ Insert into PostgreSQL
    let user = sqlx::query_as::<_, UserResponseDto>(
        r#"
        INSERT INTO users (id, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, email, password_hash, created_at
        "#
    )
    .bind(&user.id)
    .bind(&payload.email)
    .bind(password_hash)
    .fetch_one(&state.db)
    .await
    .map_err(|_| AppError::DatabaseError)?;

    api_response("User created", user)

}

pub async fn login(body: web::Json<LoginDto>) -> HttpResponse {
    api_response("Login successful", body.email.clone())
}