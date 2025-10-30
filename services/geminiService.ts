
import { GoogleGenAI } from "@google/genai";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

export const generateDescription = async (
  imageFile: File,
  features: string,
  audience: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-2.5-flash';

  const imageBase64 = await fileToBase64(imageFile);

  const prompt = `
You are an expert e-commerce copywriter. Your goal is to write a highly persuasive and detailed product description.

Use the product's image and the provided text features to create a single, SEO-friendly, and engaging description.

- Target Audience/Tone: ${audience}
- Key Features:
  ${features}

The description should be 200-300 words long and end with a strong Call-to-Action. Format the output in Markdown for readability.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: imageFile.type,
              data: imageBase64,
            },
          },
        ],
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating description:", error);
    throw new Error("Failed to generate description from AI. Please check the console for details.");
  }
};
