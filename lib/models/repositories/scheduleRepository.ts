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

    export async function getLastScheduleByUserId():Promise<Object|null> {
         const {id} = await currentUser();
        const currentDate = new Date();
        const startDate = new Date();
        startDate.setHours(0,0,0);

        const db = await getDbConnection();
        const collection = getCollection(db);
        let schedule = await collection.findOne({userId:id});
        return schedule ? schedule:null;
    }

    /**
     * Fetches the most recent schedule for the current user.
     * If no schedule is found for today, it attempts to load the user's primary schedule from the user collection.
     * 
     * If a updatedSchedule is provided, it uses that 
     * 
     * ISSUE: When refreshing the page. it loads the current primary schedule into current medications even if a schedule exists.
     */
    export async function createOrUpdateSchedule(updatedSchedule:Object):Promise<Object>{
        const current = await currentUser();
        const currentDate = new Date();
        const startDate = new Date();
        startDate.setHours(0,0,0);

        const db = await getDbConnection();
        const collection = getCollection(db);

        let todaysSchedule = await getTodaysScheduleByUserId();

        // if we have a schedule for today and we are not updating anyting we can just return todays schedule.
        if (todaysSchedule != null && updatedSchedule == null) {
            
            return {
                ...todaysSchedule,
                date : todaysSchedule["date"].toISOString()
            };
        }


        // Build the default schedule fomr users primary schedelu.
        let scheduleToInsert :Object = updatedSchedule ?? (await getMainScheduleByUserId()) ?? {};
        scheduleToInsert["date"] = currentDate;

        if(scheduleToInsert["_id"]){
            delete scheduleToInsert["_id"];
        }

        // Insert the updated schedule into the databse.
        const todaysEntry = await collection.findOneAndUpdate(
            {userId:`${current.id}`,
            date:{$gt: startDate}},
            {$set:scheduleToInsert},
            {upsert:true, returnDocument: 'after'});

        let { _id, ...rest } = todaysEntry;
        return {...rest,
            // _id:todaysEntry?._id.toString(),
            date: todaysEntry.date.toISOString()}; // I guess _id and data are not serializable by default.





        


        // // if we are updating an existing document us that instead of the default schedule.
        // if(updatedSchedule != null) {
        //     defaultSchedule = updatedSchedule;
        // }
        // defaultSchedule["date"] = currentDate;

        //  // Exclude _id from the update data, since it cannot be updated.
        // const todaysEntry = await collection.findOneAndUpdate(
        //     {userId:`${current.id}`,
        //     date:{$gt: startDate}},
        //     {$set:defaultSchedule},
        //     {upsert:true, returnDocument: 'after'});
        // const { _id, ...rest } = todaysEntry;
        // return {...rest,
        //     // _id:todaysEntry?._id.toString(),
        //     date: todaysEntry.date.toISOString()}; // I guess _id and data are not serializable by default.
        
    }

    export async function createSchedule(schedule:Object):Promise<Object> {
        assert(schedule != null, "Schedule cannot be null");
        assert(schedule["userId"]!= null && schedule["userId"] != "", "Schedule must have a valid userId");
        const db = await getDbConnection();
        const collection = getCollection(db);
        await collection.insertOne(schedule);
        return schedule;
    }

    /**
     * Returns the current schedule for the user if it exists.
     * If no schedule exists for today, returns null.
     */
    export async function getTodaysScheduleByUserId():Promise<Object|null> {
        
        const current = await currentUser();
        const currentDate = new Date();
        currentDate.setHours(0,0,0);

        const db = await getDbConnection();
        const collection = getCollection(db);
        let schedule = await collection.findOne({userId:current.id,
            date:{$gt: currentDate}
        });

        if(schedule) { // If we did get a response we can destucture Id and conert date.
            delete schedule["_id"];
            // schedule["date"]
        }

        return schedule ? schedule:null;
    }