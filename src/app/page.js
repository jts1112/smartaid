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

    {/* <div className={layout.betweenFlex}>
      <div className='pr-4'>
        
        <p className="md:text-4xl font-bold text-(--primary) text-2xl">Stay on Track with Your Health</p>
        <div className='lg:w-md py-3'>
          <p className={typography.paragraph}>SmartAid helps you manage your medications, log symptoms, and keep your care organized. Allowing you to live a healthier life.</p>
          <div className='flex gap-3 py-3'>
            <SignedIn>
              <button className='bg-(--primary) text-(--primaryBG) px-2 py-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110' onClick={() => router.push('/Home')} >To Dashboard</button>
            </SignedIn>

            <SignedOut>
               <button className='bg-(--primary) text-(--primaryBG) px-2 py-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110' onClick={() => router.push('/Home')}>Get Started</button>
            </SignedOut>
           
            <button className='border-2 border-(--primary) border-solid rounded px-2 py-2'>Learn More</button>
          </div>
        </div>
        
      </div>
      

      <Image  className="m-auto md:ml-auto" src={doctors} alt="App" height={200} />
    </div> */}
  <div className='align-center text-center mt-20 mb-10 px-4'>
      <h1 className="text-4xl font-bold text-(--primary)">
      Stay on Track with Your Health
      </h1>
      <p className="mt-4 text-gray-600 max-w-xl mx-auto">
      SmartAid helps you manage your medications, log symptoms, and keep your care organized. Allowing you to live a healthier life.
      </p>
  </div>
  
  <div className="mt-6 flex justify-center gap-4">
    <SignedOut>
      <button className="bg-(--primary) text-white px-6 py-3 rounded-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" onClick={() => router.push('/sign-in')}>
      Get Started
      </button>
    </SignedOut>
      
    <SignedIn>
      <button className="bg-(--primary) text-white px-6 py-3 rounded-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" onClick={() => router.push('/Home')}>
      To Dashboard
      </button>
    </SignedIn>
    
    <button className="border border-(--primary) text-(--primary) px-6 py-3 rounded-xl hover:bg-blue-50">
      Learn More
    </button>
  </div>


    <div className={layout.section}>
      <h3 className='text-3xl text-center font-semibold text-(--primary) p-5'>Why SmartAid?</h3>
    
      <div className='flex flex-col sm:flex-wrap gap-5 justify-center sm:flex-row'>

          <div className={cards.container}>
            <div className={cards.titleContainer}>
                <Image src={bellIcon} alt="App" height={30} />
                <p className={cards.title}>Medication Reminders</p>
            </div>
            <p className={cards.description}>Never miss a dose again with smart daily alerts.</p>
          </div>

          <div className={cards.container}>
            <div className={cards.titleContainer}>
              <Image src={notebook} alt="App" height={30} />
              <p className={cards.title}>Mood & Symptom Logs</p>
            </div>
            <p className={cards.description}>Track how you feel to uncover patterns over time</p>
          </div>


          <div className={cards.container}>
            <div className={cards.titleContainer}>
                <Image src={pill} alt="App" height={30} />
                <p className={cards.title}>Track Patient Behavior</p>
            </div>
            <p className={cards.description}>Verify that patients are taking medications.</p>
          </div>

          <div className={cards.container}>
            <div className={cards.titleContainer}>
              <Image src={cameraIcon} alt="App" height={30} />
              <p className={cards.title}>Picture Tracking</p>
            </div>
            <p className={cards.description}>Take a picture of your medication to track.</p>
          </div>
        

      </div>
    </div>


    <div className=' flex-row md:flex gap-5 p-8 items-center'>
      <div className='sm:w-md m-auto'>
          <Image src={AdventurerSVG} width={300} alt="App"/>
      </div>
      <div className={layout.section}>
          <h4 className='text-3xl mb-4'>Feel Happy and Healthier Longer</h4>
          <p className='text-xl mb-4'>
            Using medications correctly at the right time and in the right way as prescribed by your doctor can help keep you healthy and control medical issues, but not everyone sticks to those rules.
          </p>
          <a href="https://www.bannerhealth.com/healthcareblog/teach-me/the-importance-of-taking-your-medication-as-prescribed"><em>- BannerHealth</em></a>
      </div>
      
    </div>
  
  </>)
}

export default Home;


