import { inngest } from "./client";
import analyzeEmail from "@/app/lib/gemini";

export const helloFunction = inngest.createFunction(
  { id: "hello-function" },
  { event: "test/hello.world" },
  async ({ event , step }) => {
    try {
      const { email } = event.data

      const aiResponse = await analyzeEmail(email)
      console.log(aiResponse.content)
    } catch (error) {
      
    }
  }
);
