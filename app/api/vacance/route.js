import { connectDB } from "@/lib/config/connectDB"
import Vacances from "@/lib/models/VacanceModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";




// const connect = async() => {
//     await connectDB() ; 
// }
// connect() ; 

export async function GET() {
    await connectDB() ; 
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({message : "Unauthorized : No session valid"} , {status : 401}) ; 
        }
         const vacances = await Vacances.find({userId : session.user.id}) ; 
         return NextResponse.json({vacances : vacances} , {status : 200}) ; 
    } catch (error) {
        console.error("Error fetching vacances :" , error.message) ; 
        return NextResponse.json({message : "Internal error server"} , {status : 500}) ; 
    }
}

export async function POST(request){
    await connectDB() ; 
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({message : "Unauthorized : No session valid"} , {status : 401}) ; 
        }
          const {cityName , experience , images } = await request.json() ;
          const newVacance = await Vacances.create({cityName , experience , images , userId : session.user.id}) ; 
          return NextResponse.json({newVacance : newVacance} , {status : 201})
    } catch (error) {
        console.error("Error fetching vacances :" , error.message) ; 
        return NextResponse.json({message : "Internal error server"} , {status : 500});
    }
}