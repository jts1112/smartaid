"use server"
import { getDbConnection } from "../../mongodb";
import { SchedulesModel} from "../schedulesModel";
import { currentUser} from '@clerk/nextjs/server';
import { getMainScheduleByUserId } from "./userRepository";
import { assert } from "console";
import { NextResponse } from "next/server";

/**
 * Respository class for interacting with the shedules collection in MongoDB.
 * Schedules are user specific and contain medication schedules for users.
 */
    const collectionName: string = 'schedules';

    function getCollection(db:any) {
        return db.collection(collectionName);
    }

    export async function getLastScheduleByUserId():Promise<SchedulesModel|null> {
         const {id} = await currentUser();
        const currentDate = new Date();
        const startDate = new Date();
        startDate.setHours(0,0,0);

        const db = await getDbConnection();
        const collection = getCollection(db);
        let schedule = await collection.findOne({userId:id});
        return schedule ? new SchedulesModel(schedule):null;
    }

    /**
     * This function will create a new schedule for the current day if one does not exist.
     * If one does exist it will return the existing schedule.
     * If a primary schedule is set for the user it will be used to create the new schedule.
     * Other wise an empty schedule will be created.
     */
    export async function createOrUpdateSchedule(updatedSchedule:SchedulesModel):Promise<SchedulesModel>{
        const current = await currentUser();
        const currentDate = new Date();
        const startDate = new Date();
        startDate.setHours(0,0,0);

        const db = await getDbConnection();
        const collection = getCollection(db);

        let defaultSchedule :SchedulesModel = (await getMainScheduleByUserId());
        // let defaultSchedule = {
        //     userId : current.id,
        //     date : currentDate, // current date
        //     medicine : []  // array of schedule objects
        //   };

        // if we are updating an existing document us that instead of the default schedule.
        if(updatedSchedule != null) {
            defaultSchedule = updatedSchedule;
        }
        defaultSchedule.setDate(currentDate);

        const todaysEntry = await collection.findOneAndUpdate(
            {userId:`${current.id}`,
            date:{$gt: startDate}},
            {$set:defaultSchedule},
            {upsert:true, returnDocument: 'after'});
        
        return {...todaysEntry,_id:todaysEntry._id.toString(),date: todaysEntry.date.toISOString()}; // I guess _id and data are not serializable by default.
        
    }

    export async function createSchedule(schedule:SchedulesModel):Promise<SchedulesModel> {
        assert(schedule != null, "Schedule cannot be null");
        assert(schedule.getUserId()!= null && schedule.getUserId() != "", "Schedule must have a valid userId");
        const db = await getDbConnection();
        const collection = getCollection(db);
        await collection.insertOne(schedule.toJSON());
        return schedule;
    }