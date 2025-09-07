"use server"

import { currentUser} from '@clerk/nextjs/server';
import { getDbConnection, closeConnection } from './mongodb';
export async function createPost(formData) {
  const title = formData.get('title')
  const content = formData.get('content')
 
  // Update data
  // Revalidate cache
}
 
export async function deletePost(formData) {
  const id = formData.get('id')
 
  // Update data
  // Revalidate cache
}

/**
 * @brief Update a medication's schedule for a user.
 * @param {FormData} Data -  should contain medication, timeOfUse, dayOfWeek
 **/
export async function updateSchedule(Data) {
  const user =  await currentUser();
  const db = await getDbConnection();

 
  // Update a schedule element
  await db.collection('schedules').updateOne(
    {userId:`${user.id}`, medication:Data.get('medication')} // filter to the current medications schedule for a user
    , {$set: {timeOfUse:Data.get('timeOfUse'), dayOfWeek:Data.get('dayOfWeek')}} // set new values. 
  )
}

export async function createDateSchedule(){
  
  const currentDate = new Date()
  const user =  await currentUser();
  const document = {
    userId : user.id,
    date : currentDate, // current date
    medicine : [
      {
        dayOfWeek:[currentDate.getDay()],
        medication:"Tylenol",
        timeOfUse:480,
        taken:false,
        userId:"user_2zY3gMp8100QNFKloQnbfbkyVPK"
      },

      {
        dayOfWeek:[currentDate.getDay()],
        medication:"Xyzal",
        timeOfUse:540,
        taken:false,
        userId:"user_2zY3gMp8100QNFKloQnbfbkyVPK"
      }
    ]  // array of schedule objects
  }

  
  const db = await getDbConnection();
  db.collection("schedules").insertOne(document)
}