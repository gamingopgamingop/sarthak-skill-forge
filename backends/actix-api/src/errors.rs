use actix_web::{HttpResponse, ResponseError};
use derive_more::Display;
use actix_web::http::StatusCode;
use actix_web::{
    dev,
    middleware::ErrorHandlerResponse,
    http::header,
    Result,
};

#[derive(Debug, Display)]
pub enum AppError {
    #[display("Database error")]
    DbError,

    #[display("Unauthorized")]
    Unauthorized,

    #[display("Bad request: {_0}")]
    BadRequest(String),

    #[display("Internal server error")]
    InternalError,
}

impl ResponseError for AppError {
    fn status_code(&self) -> StatusCode {
        match self {
            AppError::DbError => StatusCode::INTERNAL_SERVER_ERROR,
            AppError::Unauthorized => StatusCode::UNAUTHORIZED,
            AppError::BadRequest(_) => StatusCode::BAD_REQUEST,
            AppError::InternalError => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    fn error_response(&self) -> HttpResponse {
        HttpResponse::build(self.status_code()).json(self.to_string())
    }
}

// use actix_web::{HttpResponse, ResponseError, http::StatusCode};
// use serde::Serialize;
// use thiserror::Error;

// #[derive(Debug, Error)]
// pub enum AppError {
//     #[error("Database error")]
//     DatabaseError,

//     #[error("Unauthorized")]
//     Unauthorized,

//     #[error("Bad request: {0}")]
//     BadRequest(String),

//     #[error("Internal server error")]
//     InternalServerError,
// }

// #[derive(Serialize)]
// struct ErrorResponse {
//     message: String,
// }

// impl ResponseError for AppError {
//     fn status_code(&self) -> StatusCode {
//         match self {
//             AppError::DatabaseError => StatusCode::INTERNAL_SERVER_ERROR,
//             AppError::Unauthorized => StatusCode::UNAUTHORIZED,
//             AppError::BadRequest(_) => StatusCode::BAD_REQUEST,
//             AppError::InternalServerError => StatusCode::INTERNAL_SERVER_ERROR,
//         }
//     }

//     fn error_response(&self) -> HttpResponse {
//         HttpResponse::build(self.status_code()).json(ErrorResponse {
//             message: self.to_string(),
//         })
//     }
// }

pub fn internal_error_handler<B>(
    mut res: dev::ServiceResponse<B>,
) -> Result<ErrorHandlerResponse<B>> {

    res.response_mut()
        .headers_mut()
        .insert(
            header::CONTENT_TYPE,
            header::HeaderValue::from_static("application/json"),
        );

    Ok(ErrorHandlerResponse::Response(
        res.map_into_left_body()
    ))
}