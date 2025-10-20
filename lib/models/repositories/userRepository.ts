'use server'
import { UserModel } from '../userModel';
import { Medicine, SchedulesModel } from '../schedulesModel';
import { getDbConnection} from '../../mongodb';
import { currentUser, User} from '@clerk/nextjs/server';
import { assert } from 'node:console';
import { object } from 'prop-types';

const collectionName:string = 'users'; // easy reference to collection name

interface UserDocument {
    userId: String;
    name: String;
    email: String;
    primarySchedule: Object;
}

function getCollection(db:any) {
    return db.collection(collectionName);
}

/**
 * 
 * @returns The current users information based of of logged in user from clerk.
 */
export async function getUserById():Promise<Object | null> {
    
    const current = await currentUser();
    const db = await getDbConnection();
    const collection = getCollection(db);
    const result  = await collection.findOne({userId:current.id});
    if (!result) return null;
    return {
       userId : result['userId'],
       name : result['name'],
       email : result['email'], 
       primarySchedule : result['primarySchedule']
    };
}

/**
 * 
 * @returns The primary schedule for the current user if one is set.
 */
export async function getMainScheduleByUserId():Promise<Object | null> {
    const user = await getUserById();
    return user ? user["primarySchedule"]:null;
}

/**
 * 
 */
export async function updateMainScheduleForUser(schedule:Object):Promise<Object | null> {
    assert(schedule != null);
    const current = await currentUser();
    const db = await getDbConnection();
    const collection = getCollection(db);
    let {_id,...result} = await collection.findOneAndUpdate({userId:current.id},{$set:{primarySchedule:schedule}});
    return result;
}

/**
 * 
 * @param user create a user if one hasnt been created.
 * @returns 
 */
export async function createUserIfNeeded():Promise<Object> {
    const db = await getDbConnection();
    const collection = getCollection(db);
    const current = await currentUser();

   let user : Object | null = await getUserById();
    
    if(!user){
        let newUser = {
            userId:current.id,
            name:current.fullName,
            email:current.emailAddresses[0],
            primarySchedule: new SchedulesModel(current.id,new Date(),[]).toJSON()
        };

        collection.insertOne(newUser);
        return newUser;
    }
    
    return user;
}

/**
 * 
 * @returns A newly created user with default values.
 */
export async function createNewUser():Promise<Object>{
    const db = await getDbConnection();
    const collection = getCollection(db);
    const current = await currentUser();
    
    let newUser = {
        userId:current.id,
        email:current.emailAddresses[0].emailAddress,
        name: current.firstName,
        primarySchedule:
        {
            userId:current.id,
            date: new Date().toISOString(),
            medicine:[]
        }};
    
        await collection.insertOne(newUser);
    return newUser;
}

