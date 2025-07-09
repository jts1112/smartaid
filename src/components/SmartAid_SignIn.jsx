'use client'

import React from 'react';
import {SignIn} from '@clerk/nextjs';

export default function SmartAid_SignIn() {
  return (
    <div className="grid w-full flex-grow items-center px-4 sm:justify-center">
      <SignIn />
    </div>
  )
}