"use client"

import React from 'react';
import Navbar from '../../components/NavBar';
import Header from '../../components/Header';
import MedicationCard from '../../components/MedicationCard';
import { ClerkLoading, RedirectToSignIn, SignedIn, UserButton} from '@clerk/nextjs';
import Progress_bar from '../../components/ProgressBar';
// import { clerkClient } from '@clerk/nextjs/dist/types/server';
import { useUser } from '@clerk/nextjs';

const name = "John";
const currentMedications = [{id:0,name:"Ibuprofen",time:"8:00 am"},{id:1,name:"Aspirin",time:"9:00 am"}];


export default function App() {
  const {isSignedIn,user,isLoaded} =  useUser();
  console.log("User: ",user);
  console.log("Is Signed In: ",isSignedIn);
  console.log("Is Loaded: ", isLoaded);

  if (!isLoaded) {
    return <ClerkLoading/>;
  }

  if (!SignedIn) {
    return RedirectToSignIn()
  }
  
    return (<>
    <div className=" flex-column mx-auto max-w-lg">
      {/* <Navbar/> */}
      <h2 className="self-end pt-4 text-2xl font-bold max-w-sm">Hi, {user.firstName}</h2>
      <p>Your next medication is in <span className="text-(--primary)">42 minutes</span></p>
      <Current_Medications_Activity/>
      <Quick_Log_Activity/>
      <Recent_Activities_Activity/>
    </div>
     </>)
};

function Current_Medications_Activity() {
  
  const medicationList = currentMedications.map((medication) =>(
    <MedicationCard key={medication.id} medication={medication.name} time={medication.time}/>
  ))

  return (
    <>
      <div className='p-4  mt-4 border border-gray-300 rounded-lg shadow-sm'>
        <Progress_bar bgcolor='--secondary' progress={50} height='20px'/>
        <h3 className="text-xl font-semibold mb-2">Today&apos;s Medications</h3>
        {medicationList}

        <div className="mt-4 cursor-pointer hover:underline">
          <p className="text-(--secondary) text-right">Add Medication</p>
        </div>
      </div> 
    </>
  )

}


function Quick_Log_Activity(){
  return (
    <>
      <div className='flex-column mt-8 p-4 border border-gray-300 rounded-lg shadow-sm'>
        <h3 className="text-xl font-semibold mb-2">Quick Log</h3>
        <select className='w-full p-2 border border-gray-300 rounded-md'>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Anxious">Anxious</option>
          <option value="Angry">Angry</option>
        </select>
       <textarea className="w-full mt-4 mb-4 p-2 border border-gray-300 rounded-md" rows="1" placeholder='Enter Symptoms'></textarea>
      
        <div className="flex justify-end">
          <button className="self-end text-center p-1 w-18 border-2 border-(--secondary) rounded-sm bg-(--secondary) text-white">Save</button>
        </div>
      </div> 
    </>
  )
}


function Recent_Activities_Activity() {
  return(<>
    <div className='mt-8 p-4 boder border-gray-300 rounded-lg shadow-sm'>
      <h3 className="text-xl font-semibold mb-2">Recent Activiy</h3>
      <ul>
        <li className="mb-2">Logged medication at 8:00 AM</li>
        <li className="mb-2">Added new medication at 9:00 AM</li>
        <li className="mb-2">Updated symptoms at 10:00 AM</li>
      </ul>
    </div>

    </>)
}