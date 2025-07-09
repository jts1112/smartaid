'use client'
import { Lisu_Bosa } from 'next/font/google';
import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import Header from '../components/Header';
import MedicationCard from '../components/MedicationCard';

import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();

  return (<>

  <button onClick={() => router.push('/Home')}>
  Go to About Page
  </button>
  
  </>)
  

}



