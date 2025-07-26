'use client'
import { Lisu_Bosa } from 'next/font/google';
import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import Header from '../components/Header';
import MedicationCard from '../components/MedicationCard';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import AdventurerSVG from '../../public/adventurer_light.svg';
import pill from '../../public/pill.svg';
import doctors from '../../public/medicine_light.svg';
import notebook from '../../public/notebook.svg';
import bellIcon from '../../public/bell-ringing.svg';
import cameraIcon from '../../public/camera.svg';

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { cards,layout,typography } from './styles';



function Home() {
  const router = useRouter();

  return (<>

    <div className={layout.betweenFlex}>
      <div className='pr-4'>
        
        <p className="md:text-4xl font-bold text-(--primary) text-2xl">Stay on Track with Your Health</p>
        <div className='lg:w-md py-3'>
          <p className={typography.paragraph}>SmartAid helps you manage your medications, log symptoms, and keep your care organized. Allowing you to live a healthier life.</p>
          <div className='flex gap-2 py-3'>
            <SignedIn>
              <button className='bg-(--primary) text-(--primaryBG) px-2 rounded' onClick={() => router.push('/Home')} >To Dashboard</button>
            </SignedIn>

            <SignedOut>
               <button className='bg-(--primary) text-(--primaryBG) px-2 rounded' onClick={() => router.push('/Home')}>Get Started</button>
            </SignedOut>
           
            <button className='border-2 border-(--primary) border-solid rounded px-2'>Learn More</button>
          </div>
        </div>
        
      </div>
      

      <Image  className="m-auto" src={doctors} alt="App" height={200} />
    </div>

    <div className={layout.section}>
      <h3 className='text-2xl text-center font-semibold text-(--primary) p-5'>Why SmartAid?</h3>
    
      <div className='flex flex-col sm:flex-wrap gap-5 justify-center sm:flex-row'>

          <div className={cards.feature}>
            <div className='flex justify-start items-center'>
                <Image src={bellIcon} alt="App" height={30} />
                <h4 className='text-(--primary) font-bold'>Medication Reminders</h4>
            </div>
            <p>Never miss a dose again with smart daily alerts.</p>
          </div>

          <div className={cards.feature}>
            <div className='flex justify-start items-center'>
              <Image src={notebook} alt="App" height={30} />
              <h4 className='text-(--primary) font-bold'>Mood & Symtom Logs</h4>
            </div>
            <p>Track how you feel to uncover patterns over time</p>
          </div>


          <div className={cards.feature}>
            <div className='flex justify-start items-center'>
                <Image src={pill} alt="App" height={30} />
                <h4 className='text-(--primary) font-bold'>Track Patient Behavior</h4>
            </div>
            <p>Verify that patients are taking medications.</p>
          </div>

          <div className={cards.feature}>
            <div className='flex justify-start items-center'>
              <Image src={cameraIcon} alt="App" height={30} />
              <h4 className='text-(--primary) font-bold'>Picture Tracking</h4>
            </div>
            <p>Take a picture of your medication to track.</p>
          </div>
        
          <div className={cards.feature}>
            <div className='flex justify-start items-center'>
                <Image src={pill} alt="App" height={30} />
                <h4 className='text-(--primary) font-bold'>Medication Reminders</h4>
            </div>
            <p>Never miss a dose again with smart daily alerts.</p>
          </div>

          <div className={cards.feature}>
            <div className='flex justify-start items-center'>
              <Image src={notebook} alt="App" height={30} />
              <h4 className='text-(--primary) font-bold'>Mood & Symtom Logs</h4>
            </div>
            <p>Track how you feel to uncover patterns over time</p>
          </div>

      </div>
    </div>


    <div className=' flex-row md:flex gap-5 p-8 items-center'>
      <div className='sm:w-md m-auto'>
          <Image src={AdventurerSVG} alt="App"/>
      </div>
      <div className={layout.section}>
          <h4 className='text-3xl'>Feel Happy and Healthier Longer</h4>
          <p>
            Using medications correctly at the right time and in the right way as prescribed by your doctor can help keep you healthy and control medical issues, but not everyone sticks to those rules.
          </p>
          <a href="https://www.bannerhealth.com/healthcareblog/teach-me/the-importance-of-taking-your-medication-as-prescribed"><em>- BannerHealth</em></a>
      </div>
      
    </div>
  
  </>)
}

export default Home;


