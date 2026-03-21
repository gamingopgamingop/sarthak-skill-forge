use actix_multipart::Multipart;
use actix_web::{HttpResponse, Error};
use futures_util::StreamExt;

use crate::utils::response::api_response;

pub async fn upload_file(mut payload: Multipart) -> Result<HttpResponse, Error> {
    while let Some(item) = payload.next().await {
        let mut field = item?;
        while let Some(chunk) = field.next().await {
            let _data = chunk?;
        }
    }

    Ok(api_response("File uploaded", "File uploaded"))
}