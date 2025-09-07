import { getDbConnection, closeConnection } from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';
const { MongoClient, ServerApiVersion } = require('mongodb');
import { currentUser} from '@clerk/nextjs/server';


export async function GET(req) {
  try {
    const user =  await currentUser();
    const db = await getDbConnection();
    const timeNow = new Date()
    timeNow.setHours(0,0,0) // set to start of the day and see if we have a schedule for today.
    const medication = await db.collection('schedules').find({userId:`${user.id}`,date:{$gt: timeNow}}).sort({timeOfUse: 1}).toArray();
    if(!medication) {
    return NextResponse("No Medications for today Found")
    }
    return NextResponse.json(medication);
  } catch (error) {
    return new NextResponse(`Failed to fetch users ${error}`, { status: 500 });
  }
}

// export async function POST(request) {
//   // Process the received data (e.g., save to a database)
//   const user =  await currentUser();
//   console.log('Received POST request');
//   const timeNow = new Date().getUTCHours()
//   const db = await getDbConnection();
//   db.collection('medication').insertOne({"medication_name":"pills","time_of_use":new Date(),"taken":false,"user_id":`${user.id}`})
//   return new NextResponse('Received POST request')
// }