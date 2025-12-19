
import { GoogleGenAI, Type } from "@google/genai";
import { ProcessingOrder } from "../types";

export const analyzeProcessingData = async (orders: ProcessingOrder[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    你是一名资深的印刷厂运营顾问。请分析以下给客户的加工费数据：
    ${JSON.stringify(orders)}
    
    请输出 JSON 格式：
    1. summary: 总结本月的整体加工费收入和账款回收情况。
    2. customerInsight: 分析哪个客户是高价值客户，哪个客户回款较慢。
    3. pricingAdvice: 针对目前的印刷、覆膜、装订等加工项，给出更有竞争力的调价策略。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            customerInsight: { type: Type.STRING },
            pricingAdvice: { type: Type.STRING }
          },
          required: ["summary", "customerInsight", "pricingAdvice"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
};
