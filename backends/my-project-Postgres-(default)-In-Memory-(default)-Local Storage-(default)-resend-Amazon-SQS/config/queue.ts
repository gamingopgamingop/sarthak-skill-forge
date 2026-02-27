import { configNamespace } from "@intentjs/core/config";
import { QueueOptions } from "@intentjs/core/queue";

export default configNamespace("queue", (): QueueOptions => {
  return {
    /**
     * -----------------------------------------------------
     * Default Queue Driver
     * -----------------------------------------------------
     * Documentation - https://tryintent.com/docs/queues
     *
     * This value is the name of the default queue driver.
     * This will be used to determine the messag queue where
     * the message should be processed.
     */
    default: process.env.DEFAULT_QUEUE || "sync",

    /**
     * -----------------------------------------------------
     * Queue Drivers
     * -----------------------------------------------------
     * Documentation - https://tryintent.com/docs/queues
     *
     * You can define different queue connections inside the
     * "connections" attribute.
     *
     * Available Queue Drivers - "sync", "sqs", "redis", "db"
     */
    connections: {
      sqs: {
        driver: "sqs",
        listenerType: "poll",
        apiVersion: "2012-11-05",
        credentials: null,
        prefix: process.env.SQS_PREFIX,
        queue: process.env.SQS_QUEUE,
        suffix: "",
        region: process.env.AWS_REGION,
      },
    },
  };
});
