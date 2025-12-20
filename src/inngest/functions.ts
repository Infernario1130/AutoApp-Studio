import "dotenv/config"
import { inngest } from "./client";
import analyzeEmail from "@/app/lib/gemini";
import prisma from "@/app/lib/prisma";
import { Sandbox } from "@e2b/code-interpreter";

export const helloFunction = inngest.createFunction(
  { id: "hello-function" },
  { event: "test/hello.world" },
  async ({ event , step }) => {
    try {
      const { email } = event.data

      const aiResponse = await analyzeEmail(email);

      const execution = await step.run("code-execution" , async () => {

        const sbx = await Sandbox.create();
         return await sbx.runCode(`console.log("Hi from Sandbox")` , {language : "javascript"})
 
       } )
       console.log(execution.logs)

      await step.run("insert-response" , async () => {
            await prisma.user.create({
              data : {
                response : aiResponse.content
              }
            })
      })

      console.log(aiResponse.content , "Done with the database logging.")
      
    } catch (error) {
      console.log(`Error occurred : ${error}`)
    }
  }
);
