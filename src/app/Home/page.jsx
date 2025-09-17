"use client"

import React from 'react';
import Navbar from '../../components/NavBar';
import Header from '../../components/Header';
import MedicationCard from '../../components/MedicationCard';
import { ClerkLoading, RedirectToSignIn, SignedIn, UserButton} from '@clerk/nextjs';
import { useUser,useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { createDateSchedule } from '../../../lib/actions';
// import {MedicationChart} from '../../components/MedicationChart';
import {ScheduleForm} from '../../components/ScheduleForm';

var medicines =  
    [
  {
    "_id": "68c829c64dc0b0901876d56f",
    "userId": "XXXXX",
    "date": "2025-09-15T14:59:17.460Z",
    "medicine": [
      {
        "dayOfWeek": [
          1
        ],
        "medication": "Tylenol",
        "timeOfUse": 480,
        "taken": false,
        "userId": "XXXX"
      },
      {
        "dayOfWeek": [
          1
        ],
        "medication": "Xyzal",
        "timeOfUse": 540,
        "taken": false,
        "userId": "XXX"
      }
    ]
  }
]


export default function App() {
  const {isSignedIn,user,isLoaded} =  useUser();

  if (!isLoaded) {
    return <ClerkLoading/>;
  }

  if (!isSignedIn) {
    return RedirectToSignIn()
  }
  
    return (<>
    <div className=" flex-column mx-auto max-w-lg">
      <h2 className="self-end pt-4 text-2xl font-bold max-w-sm">Hi, {user.firstName}</h2>
      <Current_Medications_Activity/>
      <Quick_Log_Activity/>
      <Recent_Activities_Activity/>
      <ScheduleForm/>
    </div>
     </>)
};

function Current_Medications_Activity() {
  
  const [medication, setmedication] = useState([]);
  const [editMode, setEditMode] = useState(true); // state to determine if this windo should be in edit mode or not.
  useEffect(() => {
    const fetchMedications = async () => {
      // const res = await fetch(`/api/medication`);
      // const data = await res.json();
      const data = medicines;
      setmedication(data[0].medicine);
      console.log("data",data)
      // if (data.length != 0) {
      //   setmedication(data[0].medicine);
      // }
      
    };

    fetchMedications();
  }, []);

 
  const medicationList = medication.map((medication,index) =>(
    <MedicationCard key={index} medication={medication.medication} time={medication.timeOfUse}/>
  ))
  
  if (editMode == true) {
    return (<>
      {nextMedication(medication)}
      <div className='p-4  mt-4 border border-gray-300 rounded-lg shadow-sm'>
        <h3 className="text-xl font-semibold mb-2">Today&apos;s Medications</h3>
        <ScheduleForm medicines = {medication}/> {/* if in edit mode, show the schedule form */}
        <div className="mt-4 cursor-pointer hover:underline">
          <p className="text-(--secondary) text-right" onClick={() => setEditMode(!editMode)}>Save</p>
        </div>
      </div> 
    
    </>)
  }

  return (
    <>
      {nextMedication(medication)}
      <div className='p-4  mt-4 border border-gray-300 rounded-lg shadow-sm'>
        <h3 className="text-xl font-semibold mb-2">Today&apos;s Medications</h3>
        {medication && medicationList} {/* render medication list if we have/had medications for tody. need seperate response for all medications taken.*/}
        { medication.length == 0 && <p className='text-center text-(--textLightGrey)'>No Medications Found</p>} {/* if no medications for today are found.*/}
        <div className="mt-4 cursor-pointer hover:underline">
          <p className="text-(--secondary) text-right" onClick={() => setEditMode(!editMode)}>Edit Medications</p>  {/* If not in edit mode show edit option*/}
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
        <form action="">
          <button className="" value={1}>&#128542;</button>
          <button className="" value={2}>&#128532;</button>
          <button className="" value={3}>&#128522;</button>
          <button className="" value={4}>&#128513;</button> 
        </form>
       <textarea className="w-full mt-4 mb-4 p-2 border border-gray-300 rounded-md" rows="1" placeholder='Enter Symptoms'></textarea>
      
        <div className="flex justify-end">
          <button className="self-end text-center p-1 w-18 border-2 border-(--secondary) rounded-sm bg-(--secondary) text-white" onClick={createDateSchedule}>Load Today</button>
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

function Medication() {
  const [medication, setmedication] = useState([]);

  useEffect(() => {
    const fetchMedications = async () => {
      const res = await fetch('/api/medication');
      const data = await res.json();
      setmedication(data);
    };

    fetchMedications();
  }, []);
}

function nextMedication(medication) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  if (medication.length > 0) {
    const timeTill = medication[0]["timeOfUse"] - currentMinutes
    switch (true) {
      case timeTill <= -60:
        return <p>You missed your medication <span className="text-(--primary)">{Math.floor(Math.abs(timeTill)/60)} Hours {Math.abs(timeTill%60)} Minutes ago</span></p>
      case timeTill >= 60:
        return <p>Your next medication is in <span className="text-(--primary)">{Math.floor(timeTill/60)} Hours {timeTill%60} Minutes</span></p>
      case timeTill > -60: // timeTill > -60:
        return <p>You missed your medication <span className="text-(--primary)">{Math.abs(timeTill)} Minutes ago</span></p>
      case timeTill < 60:
        return <p>Your next medication is in <span className="text-(--primary)">{timeTill} Minutes</span></p>
    }
     
  } else {
    return <p></p>
  }
}