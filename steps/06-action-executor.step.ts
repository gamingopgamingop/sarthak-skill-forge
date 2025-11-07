import { z } from "zod";
import { EventConfig, Handlers } from "motia";
 
export const config: EventConfig = {
  type: "event",
  name: "ActionExecutor",
  description: "Executes final moderation decisions",
  subscribes: ["content.auto.approved", "content.auto.rejected", "slack.decision.received"],
  emits: ["content.moderation.completed"],
  input: z.object({
    submissionId: z.string(),
    decision: z.enum(["approved", "rejected", "escalated"]),
    reason: z.string(),
    moderatorId: z.string().optional(),
    moderatorName: z.string().optional(),
    decidedAt: z.string(),
  }),
  flows: ["content-moderation"],
};
 
export const handler: Handlers["ActionExecutor"] = async (
  input,
  { logger, emit, state }
) => {
  const { submissionId, decision, reason, moderatorId, moderatorName, decidedAt } = input;
  
  logger.info("Executing moderation decision", {
    submissionId,
    decision,
    moderatorId,
    moderatorName,
  });
 
  // Store the final decision in state
  const moderationRecord = {
    submissionId,
    decision,
    reason,
    moderatorId,
    moderatorName,
    decidedAt,
    executedAt: new Date().toISOString(),
  };
 
  await state.set("moderation", submissionId, moderationRecord);
 
  // Execute the appropriate action based on decision
  switch (decision) {
    case "approved":
      logger.info("Content approved", { submissionId });
      // Here you would typically:
      // - Make content visible to users
      // - Send approval notification to user
      // - Update content status in database
      break;
 
    case "rejected":
      logger.info("Content rejected", { submissionId });
      // Here you would typically:
      // - Hide or remove content
      // - Send rejection notification to user
      // - Log for potential user action
      break;
 
    case "escalated":
      logger.info("Content escalated", { submissionId });
      // Here you would typically:
      // - Send to higher-level moderators
      // - Create support ticket
      // - Flag for additional review
      break;
  }
 
  await emit({
    topic: "content.moderation.completed",
    data: moderationRecord,
  });
 
  logger.info("Moderation decision executed successfully", {
    submissionId,
    decision,
    moderatorId,
  });
};