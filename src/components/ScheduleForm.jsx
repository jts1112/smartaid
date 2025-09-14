"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import { FormEvent } from 'react'
import { updateCurrentSchedule } from '../../lib/actions';

var medicines =  [
      {
        dayOfWeek:[1,2,4],
        medication:"Tylenol",
        timeOfUse:480,
        taken:false,
        userId: "111"
      },

      {
        dayOfWeek:[1,4],
        medication:"Xyzal",
        timeOfUse:540,
        taken:false,
        userId:"111"
      }
    ]  // array of schedule objects

export function ScheduleForm() {
    const [medicine, setMedicine] = useState(medicines);
    // console.log(medicine)
    return (
        <>
        <h2>Current Medications</h2>
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
            }} />
            ))}
            <button type="submit" onClick={() => console.log(medicine)}>Submit</button>
        </form>
        <button className="text-(--secondary) text-right" onClick={() => {alert("To be Implementted")}}>add a medication</button>
        </>
        
    )
}


// function MedicationSchedule({medication, timeOfUse, dayOfWeek,index}) {
function MedicationSchedule({currentMedication,index, onUpdate}) {
    
    const timeNow = new Date()
    timeNow.setHours(0,0,0) // set to start of the day and see if we have a schedule for today.
    timeNow.setMinutes(currentMedication.timeOfUse)

    const onNameChange = (e) => {
        return onUpdate(index, {...currentMedication,medication: e.target.value})
    }

    const onTimeChange = (e) => {
        
        // convert time to minutes from 00:00
        const [h, m] = e.target.value.split(':');
        console.log("time",h,m)
        const minutes = parseInt(h) * 60 + parseInt(m);
        console.log("minutes",minutes)
        onUpdate(index, {...currentMedication, timeOfUse: minutes})
    }
    
    const allDays = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];
    const hours = String(timeNow.getHours()).padStart(2, '0');
    const minutes = String(timeNow.getMinutes()).padStart(2, '0');
    return (
        <>
            <label>
            Name:
            <input
                type="text"
                placeholder={currentMedication.medication}
                onChange={onNameChange}
            />
            </label>

            <label>
            Time:
            <input type="time" defaultValue={`${hours}:${minutes}`} onChange={onTimeChange}/>
            </label>

            <fieldset>
            {allDays.map((day,dindex)=>(
                <div key={day} className='inline-block mr-4'>
                <label htmlFor={day} name={day}> {day} </label>
                <input type="checkbox" id={day} key={day} onChange={() => {
                    const newDays = currentMedication.dayOfWeek.includes(dindex) // check if we have this day.
                    ? currentMedication.dayOfWeek.filter(d=> d!== dindex) // if we did have it re remove it.
                    : [...currentMedication.dayOfWeek,dindex]; // if we didnt have it add it.
                    onUpdate(index,{...currentMedication, dayOfWeek: newDays})
                    console.log("newDays ",newDays)
                }} defaultChecked={currentMedication.dayOfWeek.includes(dindex)}></input>
                </div >
                
                ))}
            </fieldset>
        </>
        
    );

}