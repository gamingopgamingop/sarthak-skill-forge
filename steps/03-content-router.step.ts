import { z } from "zod";
import { EventConfig, Handlers } from "motia";
 
export const config: EventConfig = {
  type: "event",
  name: "ContentRouter",
  description: "Routes content based on AI analysis confidence scores",
  subscribes: ["content.analyzed"],
  emits: ["content.auto.approved", "content.auto.rejected", "content.needs.review"],
  input: z.object({
    submissionId: z.string(),
    userId: z.string(),
    textScore: z.number(),
    imageScore: z.number(),
    overallScore: z.number(),
    textAnalysis: z.string(),
    imageAnalysis: z.string(),
    analyzedAt: z.string(),
  }),
  flows: ["content-moderation"],
};
 
export const handler: Handlers["ContentRouter"] = async (
  input,
  { logger, emit }
) => {
  const { submissionId, userId, overallScore, textAnalysis, imageAnalysis } = input;
  
  logger.info("Routing content based on analysis", { 
    submissionId, 
    overallScore,
    userId 
  });
 
  let decision: string;
  let routingData = {
    submissionId,
    userId,
    overallScore,
    textAnalysis,
    imageAnalysis,
    routedAt: new Date().toISOString(),
  };
 
  // Decision logic based on confidence scores
  if (overallScore <= 0.05) {
    // Very low risk - auto approve
    decision = "approved";
    logger.info("Content auto-approved", { submissionId, overallScore });
    
    await emit({
      topic: "content.auto.approved",
      data: {
        ...routingData,
        decision,
        reason: "Low risk score - automatically approved",
      },
    });
    
  } else if (overallScore >= 0.95) {
    // Very high risk - auto reject
    decision = "rejected";
    logger.info("Content auto-rejected", { submissionId, overallScore });
    
    await emit({
      topic: "content.auto.rejected",
      data: {
        ...routingData,
        decision,
        reason: "High risk score - automatically rejected",
      },
    });
    
  } else {
    // Medium risk - needs human review
    decision = "review";
    logger.info("Content needs human review", { submissionId, overallScore });
    
    await emit({
      topic: "content.needs.review",
      data: {
        ...routingData,
        decision,
        reason: "Medium risk score - requires human review",
        priority: overallScore >= 0.7 ? "high" : overallScore >= 0.5 ? "medium" : "low",
      },
    });
  }
};