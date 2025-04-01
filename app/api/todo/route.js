import { connectDB } from "@/lib/config/connectDB";

export async function POST(request) {
    try {
        await connectDB()  ; 
        

    } catch (error) {
        
    }
}
