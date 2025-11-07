import { z } from "zod";
import { EventConfig, Handlers } from "motia";
import { WebClient } from "@slack/web-api";
 
const slack = new WebClient(process.env.SLACK_BOT_TOKEN);
 
export const config: EventConfig = {
  type: "event",
  name: "SlackNotifier",
  description: "Sends interactive Slack messages for human review",
  subscribes: ["content.needs.review"],
  emits: ["slack.notification.sent"],
  input: z.object({
    submissionId: z.string(),
    userId: z.string(),
    overallScore: z.number(),
    textAnalysis: z.string(),
    imageAnalysis: z.string(),
    decision: z.string(),
    reason: z.string(),
    priority: z.enum(["low", "medium", "high"]),
    routedAt: z.string(),
  }),
  flows: ["content-moderation"],
};
 
export const handler: Handlers["SlackNotifier"] = async (
  input,
  { logger, emit }
) => {
  const { submissionId, userId, overallScore, textAnalysis, imageAnalysis, priority } = input;
  
  logger.info("Sending Slack notification for review", { 
    submissionId, 
    priority,
    userId 
  });
 
  // Determine channel based on priority
  let channel: string;
  switch (priority) {
    case "high":
      channel = process.env.SLACK_CHANNEL_URGENT!;
      break;
    case "medium":
      channel = process.env.SLACK_CHANNEL_ESCALATED!;
      break;
    default:
      channel = process.env.SLACK_CHANNEL_MODERATION!;
  }
 
  // Create interactive message with buttons
  const message = {
    channel,
    text: `Content Moderation Review Required`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `🚨 Content Review - ${priority.toUpperCase()} Priority`,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Submission ID:*\n${submissionId}`,
          },
          {
            type: "mrkdwn",
            text: `*User ID:*\n${userId}`,
          },
          {
            type: "mrkdwn",
            text: `*Risk Score:*\n${(overallScore * 100).toFixed(1)}%`,
          },
          {
            type: "mrkdwn",
            text: `*Priority:*\n${priority.toUpperCase()}`,
          },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*AI Analysis:*\n${textAnalysis || imageAnalysis || "No analysis available"}`,
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "✅ Approve",
            },
            style: "primary",
            action_id: "approve_content",
            value: submissionId,
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "❌ Reject",
            },
            style: "danger",
            action_id: "reject_content",
            value: submissionId,
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "⚠️ Escalate",
            },
            action_id: "escalate_content",
            value: submissionId,
          },
        ],
      },
    ],
  };
 
  try {
    const result = await slack.chat.postMessage(message);
    
    logger.info("Slack notification sent successfully", {
      submissionId,
      channel,
      messageTs: result.ts,
    });
 
    await emit({
      topic: "slack.notification.sent",
      data: {
        submissionId,
        userId,
        channel,
        messageTs: result.ts,
        priority,
        sentAt: new Date().toISOString(),
      },
    });
 
  } catch (error) {
    logger.error("Failed to send Slack notification", {
      error,
      submissionId,
      channel,
    });
    throw error;
  }
};