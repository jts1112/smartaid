"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import { FormEvent } from 'react'
import { updateCurrentSchedule } from '../../lib/actions';

import trashcan from '../../public/trash.svg';
import Image from 'next/image';

// var medicines =  [
//       {
//         dayOfWeek:[1,2,4],
//         medication:"Tylenol",
//         timeOfUse:480,
//         taken:false,
//         userId: "111"
//       },

//       {
//         dayOfWeek:[1,4],
//         medication:"Xyzal",
//         timeOfUse:540,
//         taken:false,
//         userId:"111"
//       }
//     ]  // array of schedule objects

var unfilledMedicine = {dayOfWeek:[],
        medication:"newMedication",
        timeOfUse:0,
        taken:false,
        userId: ""}

export function ScheduleForm({medicinest, onSave,onCancel}) {
    const [medicine, setMedicine] = useState(medicinest);
    
    // re-sync if parent sends new medicines
    useEffect(() => {
        if(Array.isArray(medicinest)) {
            setMedicine(medicinest);
        }
    }, [medicinest]);

    return (
        <>
        {Array.isArray(medicine) ?
        <form action={updateCurrentSchedule}>
            {medicine.map((medicationt,index)=> (
            // <MedicationSchedule key={medicationt.medication} medication={medicationt.medication} timeOfUse={medicationt.timeOfUse} dayOfWeek={medicationt.dayOfWeek} index={index} />
            <MedicationSchedule key={index} currentMedication={medicationt} index={index} onUpdate={(index,updatedMedicine) => {
                setMedicine(
                    prev => {
                        const newMedicine = [...prev];
                        newMedicine[index] = updatedMedicine;
                        return newMedicine;
                    }
                )
            }}
            onDelete={(index) => { // delete the medication at that index
                setMedicine(prev => prev.filter((_,i)=> i !== index))
            }} />
            ))}

            
        </form>
        : <p>No Medications</p>}
        <button className="text-(--secondary) text-right" onClick={() => setMedicine([...medicine,unfilledMedicine])}>add a medication</button>
        <div className="flex justify-end gap-4 mt-4 cursor-pointer ">
            <div className="text-(--secondary) text-right hover:underline" onClick={() => {setMedicine(medicinest); onCancel(); }}>Cancel</div>
            <div className="text-(--secondary) text-right hover:underline" onClick={() => onSave(medicine)}>Save</div>
        </div>
        </>
        
    )
}


// function MedicationSchedule({medication, timeOfUse, dayOfWeek,index}) {
function MedicationSchedule({currentMedication,index, onUpdate,onDelete}) {
    
    const timeNow = new Date()
    timeNow.setHours(0,0,0) // set to start of the day and see if we have a schedule for today.
    timeNow.setMinutes(currentMedication.timeOfUse)

    // handler for name change on a medication
    const onNameChange = (e) => {
        return onUpdate(index, {...currentMedication,medication: e.target.value})
    }

    // handler for time cahnge on a medication
    const onTimeChange = (e) => {
        
        // convert time to minutes from 00:00
        const [h, m] = e.target.value.split(':');
        const minutes = parseInt(h) * 60 + parseInt(m);
        onUpdate(index, {...currentMedication, timeOfUse: minutes})
    }

    
    const allDays = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];
    const hours = String(timeNow.getHours()).padStart(2, '0');
    const minutes = String(timeNow.getMinutes()).padStart(2, '0');
    return (
        <>
            <div className='flex m-2 pl-2 border-l-2 border-(--secondary)'>
                <div>
               
                <input
                    type="text"
                    placeholder={currentMedication.medication}
                    onChange={onNameChange}
                />

                 <input type="time" defaultValue={`${hours}:${minutes}`} onChange={onTimeChange}/>

                <fieldset>
                {allDays.map((day,dindex)=>(
                    <div key={day} className='inline-block mr-4'>
                    <label htmlFor={day} name={day}> {day} </label>
                    <input type="checkbox" id={day} key={day} onChange={() => {
                        const newDays = currentMedication.dayOfWeek.includes(dindex) // check if we have this day.
                        ? currentMedication.dayOfWeek.filter(d=> d!== dindex) // if we did have it re remove it.
                        : [...currentMedication.dayOfWeek,dindex]; // if we didnt have it add it.
                        onUpdate(index,{...currentMedication, dayOfWeek: newDays})
                    }} defaultChecked={currentMedication.dayOfWeek.includes(dindex)}></input>
                    </div >
                    
                    ))}
                </fieldset>
               
                </div>
            
                <Image src={trashcan} height={30} onClick={() => onDelete(index)} alt="trashcan svg"></Image>
            </div>
        </>
        
    );

}
