import { z } from "zod";
import { EventConfig, Handlers } from "motia";
import OpenAI from "openai";
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
export const config: EventConfig = {
  type: "event",
  name: "ContentAnalyzer",
  description: "Analyzes content using OpenAI for toxicity and safety",
  subscribes: ["content.submitted"],
  emits: ["content.analyzed"],
  input: z.object({
    submissionId: z.string(),
    text: z.string().optional(),
    imageUrl: z.string().optional(),
    userId: z.string(),
    platform: z.string(),
    timestamp: z.string(),
  }),
  flows: ["content-moderation"],
};
 
export const handler: Handlers["ContentAnalyzer"] = async (
  input,
  { logger, emit }
) => {
  const { submissionId, text, imageUrl, userId } = input;
  
  logger.info("Starting content analysis", { submissionId, hasText: !!text, hasImage: !!imageUrl });
 
  let textScore = 0;
  let imageScore = 0;
  let textAnalysis = "";
  let imageAnalysis = "";
 
  // Analyze text content if present
  if (text) {
    try {
      const textResponse = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a content moderation AI. Analyze the following text for toxicity, hate speech, violence, harassment, or inappropriate content. 
            Respond with a JSON object containing:
            - "score": a number between 0-1 where 0 is completely safe and 1 is extremely harmful
            - "analysis": a brief explanation of your assessment
            - "categories": array of detected issues (e.g., ["hate_speech", "violence"])`
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.1,
      });
 
      const textResult = JSON.parse(textResponse.choices[0]?.message?.content || "{}");
      textScore = textResult.score || 0;
      textAnalysis = textResult.analysis || "";
    } catch (error) {
      logger.error("Text analysis failed", { error, submissionId });
    }
  }
 
  // Analyze image content if present
  if (imageUrl) {
    try {
      const imageResponse = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "system",
            content: `You are a content moderation AI. Analyze the following image for inappropriate content, violence, nudity, or harmful material.
            Respond with a JSON object containing:
            - "score": a number between 0-1 where 0 is completely safe and 1 is extremely harmful
            - "analysis": a brief explanation of your assessment
            - "categories": array of detected issues (e.g., ["violence", "inappropriate"])`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this image for content moderation:"
              },
              {
                type: "image_url",
                image_url: { url: imageUrl }
              }
            ]
          }
        ],
        temperature: 0.1,
      });
 
      const imageResult = JSON.parse(imageResponse.choices[0]?.message?.content || "{}");
      imageScore = imageResult.score || 0;
      imageAnalysis = imageResult.analysis || "";
    } catch (error) {
      logger.error("Image analysis failed", { error, submissionId });
    }
  }
 
  // Calculate overall risk score
  const overallScore = Math.max(textScore, imageScore);
  
  const analysisResult = {
    submissionId,
    userId,
    textScore,
    imageScore,
    overallScore,
    textAnalysis,
    imageAnalysis,
    analyzedAt: new Date().toISOString(),
  };
 
  logger.info("Content analysis completed", {
    submissionId,
    overallScore,
    textScore,
    imageScore,
  });
 
  await emit({
    topic: "content.analyzed",
    data: analysisResult,
  });
};