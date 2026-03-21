use actix_web::{
    HttpResponse,
    http::header::ContentEncoding,
};

pub async fn no_compression() -> HttpResponse {
    HttpResponse::Ok()
        .insert_header(ContentEncoding::Identity)
        .body("Compression disabled")
}

use actix_web::{
    HttpResponse,
    http::header::ContentEncoding,
};

static HELLO_GZIP: &[u8] = &[
    0x1f, 0x8b, 0x08, 0x00, 0xa2, 0x30, 0x10, 0x5c,
];


pub async fn precompressed() -> HttpResponse {
    HttpResponse::Ok()
        .insert_header(ContentEncoding::Gzip)
        .body("Compression enabled")
        .insert_header(ContentEncoding::Gzip)
        .body(HELLO_GZIP)

}