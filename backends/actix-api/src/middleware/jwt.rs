use actix_web::{dev::ServiceRequest, Error};
use actix_web::dev::{Service, Transform};
use futures::future::{ok, Ready};

pub struct JwtMiddleware;

impl<S, B> Transform<S, ServiceRequest> for JwtMiddleware
where
    S: Service<ServiceRequest, Error = Error>,
{
    type Response = S::Response;
    type Error = Error;
    type InitError = ();
    type Transform = S;
    type Future = Ready<Result<S, ()>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ok(service)
    }
}

use actix_web::{dev::ServiceRequest, Error};
use actix_service::{Service, Transform};
use futures_util::future::{ok, Ready};

pub struct JwtMiddleware;

impl<S, B> Transform<S, ServiceRequest> for JwtMiddleware
where
    S: Service<ServiceRequest, Response = actix_web::dev::ServiceResponse<B>, Error = Error>,
{
    type Response = actix_web::dev::ServiceResponse<B>;
    type Error = Error;
    type Transform = S;
    type InitError = ();
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ok(service)
    }
}