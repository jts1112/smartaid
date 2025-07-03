'use client'
import { Lisu_Bosa } from 'next/font/google';
import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import Header from '../components/Header';
import MedicationCard from '../components/MedicationCard';

const name = "John";
const currentMedications = [{id:0,name:"Ibuprofen",time:"8:00 am"},{id:1,name:"Aspirin",time:"9:00 am"}];

export default function Home() {
  return (<>
    <div className=" flex-column mx-auto max-w-lg">
      {/* <Header/> */}
      <Navbar/>
      <h2 className="self-end pt-4 text-2xl font-bold max-w-sm">Hi, {name}</h2>
      <p>Your next medication is in <span className="text-(--primary)">42 minutes</span></p>
      <Current_Medications_Activity/>
      <Quick_Log_Activity/>
      <Recent_Activities_Activity/>
    </div>
     </>);
}


function Current_Medications_Activity() {
  
  const medicationList = currentMedications.map((medication) =>(
    <MedicationCard key={medication.id} medication={medication.name} time={medication.time}/>
  ))

  return (
    <>
      <div className='p-4 mt-4 border border-gray-300 rounded-lg shadow-sm'>
        <h3 className="text-xl font-semibold mb-2">Today&apos;s Medications</h3>
        {medicationList}

        <div className="mt-4 cursor-pointer hover:underline">
          <p className="text-(--secondary) text-right">Add Medication</p>
        </div>
      </div> 
    </>
  );

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
          <buton className="self-end text-center p-1 w-18 border-2 border-(--secondary) rounded-sm bg-(--secondary) text-white">Save</buton>
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


