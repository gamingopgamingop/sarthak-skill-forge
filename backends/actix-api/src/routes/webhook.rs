        web::scope("/webhooks")
            .route("", web::post().to(webhook_handler::handle_webhook))
    );
