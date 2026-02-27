import { configNamespace } from "@intentjs/core/config";
import { MailerOptions } from "@intentjs/core/mail";

export default configNamespace(
  "mailers",
  (): MailerOptions => ({
    /**
     * The default channel for your mailer.
     */
    default: process.env.DEFAULT_MAILER || "logger",

    /**
     * -----------------------------------------------------
     * Mailer Channels
     * -----------------------------------------------------
     *
     * Here you can configure all your different mailer channels.
     * A default configuration has been added for your application.
     *
     * Channel Providers: "logger", "smtp", "mailgun", "resend"
     */
    channels: {
      smtp: {
        provider: "smtp",
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        username: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD,
        ignoreTLS: false,
        requireTLS: false,
        from: process.env.FROM_ADDRESS,
      },
    },

    template: {
      appName: process.env.APP_NAME,
      footer: {
        title: process.env.APP_NAME,
      },
    },
  }),
);
