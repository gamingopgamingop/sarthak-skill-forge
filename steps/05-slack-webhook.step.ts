import { z } from "zod";
import { ApiRouteConfig, Handlers } from "motia";
import { createHmac } from "crypto";
 
export const config: ApiRouteConfig = {
  type: "api",
  name: "SlackWebhook",
  description: "Handles Slack interactive button responses",
  path: "/slack/webhook",
  method: "POST",
  emits: ["slack.decision.received"],
  flows: ["content-moderation"],
};
 
export const handler: Handlers["SlackWebhook"] = async (
  req,
  { logger, emit }
) => {
  // Verify Slack signature
  const signature = req.headers["x-slack-signature"] as string;
  const timestamp = req.headers["x-slack-request-timestamp"] as string;
  const body = req.body;
 
  if (!verifySlackSignature(signature, timestamp, body)) {
    logger.error("Invalid Slack signature");
    return { status: 401, body: { error: "Unauthorized" } };
  }
 
  const payload = JSON.parse(body.payload);
  const { actions, user, message } = payload;
 
  if (!actions || actions.length === 0) {
    return { status: 200, body: { text: "No action received" } };
  }
 
  const action = actions[0];
  const submissionId = action.value;
  const decision = action.action_id.replace("_content", "");
  const moderatorId = user.id;
  const moderatorName = user.name;
 
  logger.info("Slack decision received", {
    submissionId,
    decision,
    moderatorId,
    moderatorName,
  });
 
  await emit({
    topic: "slack.decision.received",
    data: {
      submissionId,
      decision,
      moderatorId,
      moderatorName,
      messageTs: message.ts,
      decidedAt: new Date().toISOString(),
    },
  });
 
  // Update the original message to show decision
  const responseMessage = `✅ Decision recorded: ${decision.toUpperCase()} by ${moderatorName}`;
  
  return {
    status: 200,
    body: {
      text: responseMessage,
      replace_original: false,
    },
  };
};
 
function verifySlackSignature(signature: string, timestamp: string, body: string): boolean {
  const signingSecret = process.env.SLACK_SIGNING_SECRET!;
  const baseString = `v0:${timestamp}:${body}`;
  const expectedSignature = `v0=${createHmac("sha256", signingSecret)
    .update(baseString)
    .digest("hex")}`;
  
  return signature === expectedSignature;
}