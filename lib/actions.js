"use server"

import { currentUser} from '@clerk/nextjs/server';
import { getDbConnection, closeConnection } from './mongodb';
import { NextResponse } from 'next/server';

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

// Create a schedule entry for today if one does not exist.
export async function createorUpdateDateSchedule(updatedDocument){
  
  const currentDate = new Date()
  const startDate = new Date()
  startDate.setHours(0,0,0)
  const user =  await currentUser();
  
  var document = {
            userId : user.id,
            date : currentDate, // current date
            medicine : []  // array of schedule objects
          }

  if(updatedDocument) {
    document = {...document, medicine: updatedDocument};
  }

  // we want to create a schedule entry for today if on does not exist.
  const db = await getDbConnection();
  const todaysEntry = await db.collection("schedules").findOneAndUpdate({userId:`${user.id}`,date:{$gt: startDate}},{$set:document},{upsert:true, returnDocument: 'after'})
  // db.collection("schedules").insert(document)
  console.log("todaysEntry",todaysEntry)
  return {...todaysEntry,_id:todaysEntry._id.toString(),date: todaysEntry.date.toISOString()}; // I guess _id and data are not serializable by default.
}

export async function takeMedication(formData) {
  // TODO
}

/**
 * We want to update the current schedule for the user. including modifiying todays schedule entry in db.
 * @param {*} formData 
 */
export async function updateCurrentSchedule(formData) {
  console.log({formData})
}