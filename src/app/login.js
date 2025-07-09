require('dotenv').config()
import { Clerk } from '@clerk/clerk-js'

const publishableKey = process.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const clerk = new Clerk(publishableKey)
await clerk.load({
  // Set load options here
})