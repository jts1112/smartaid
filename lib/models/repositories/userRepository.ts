'use server'
import { UserModel } from '../userModel';
import { SchedulesModel } from '../schedulesModel';
import { getDbConnection} from '../../mongodb';
import { currentUser} from '@clerk/nextjs/server';
import { assert } from 'node:console';

const collectionName:string = 'users'; // easy reference to collection name

function getCollection(db:any) {
    return db.collection(collectionName);
}

/**
 * 
 * @returns The current users information based of of logged in user from clerk.
 */
export async function getUserById():Promise<UserModel | null> {
    
    const current = await currentUser();
    const db = await getDbConnection();
    const collection = getCollection(db);
    let user : UserModel = new UserModel(await collection.findOne({userId:current.id}));
    return user ? new UserModel(user):null;
}

/**
 * 
 * @returns The primary schedule for the current user if one is set.
 */
export async function getMainScheduleByUserId():Promise<SchedulesModel | null> {
    const user = await getUserById();
    return user ? user.getPrimarySchedule():null;
}

/**
 * 
 */
export async function updateMainScheduleForUser(schedule:SchedulesModel):Promise<UserModel | null> {
    assert(schedule != null);
    const current = await currentUser();
    const db = await getDbConnection();
    const collection = getCollection(db);
    let result = await collection.findOneAndUpdate({userId:current.id},{$set:{primarySchedule:schedule.toJSON()}});
    return result;
}

/**
 * 
 * @param user create a user based off of the user model.
 * @returns 
 */
export async function createUser(user:UserModel):Promise<UserModel> {
    const db = await getDbConnection();
    const collection = getCollection(db);
   
    await collection.insertOne(user.toJSON());
    return user;
}

/**
 * 
 * @returns A newly created user with default values.
 */
export async function createNewUser():Promise<UserModel>{
    const db = await getDbConnection();
    const collection = getCollection(db);
    const current = await currentUser();
    
    let newUser = new UserModel(current.id,current.emailAddresses[0].emailAddress,current.firstName,
        new SchedulesModel(current.id,new Date(),[]));
    
        await collection.insertOne(newUser.toJSON());
    return newUser;
}

