import { gemini , createAgent } from "@inngest/agent-kit" ;

 const analyzeEmail = async (email : unknown) => {
    const helloAgent = createAgent({
        model : gemini({
            model : "gemini-2.5-flash" ,
            apiKey : process.env.GOOGLE_API_KEY,
        }
        ),
        name : "Hello administrator" ,
        description : "Returns you back hello" ,
        system : 
            "You have to wish everyone back everytime you receive the request.",
    });
    const response = await helloAgent.run(`You have to wish every user.
        User email : ${email}`)

        const raw = response.output[0]
        return raw;
 }

 export default analyzeEmail