
import  { NextResponse } from "next/server";
import { inngest } from "@/inngest/client"

export const dynamic = "force-dynamic";

export async function GET() {
    await inngest.send({
        name : "test/hello.world" , 
        data : {
            email : "myemail21@gmail.com"
        } ,
    })
    return NextResponse.json({
        msg : "Event sent"
    })
}