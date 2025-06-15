
'use server';

import { revalidatePath } from 'next/cache';
import type { Booking } from './types';

// --- Data Storage Configuration ---
// This application uses IN-MEMORY storage for local development
// and requires a KV (Key-Value) store (like Cloudflare KV) for production deployment.

const BOOKINGS_KEY_KV = 'bookings_master_list'; // Used for public booking submissions
const BLOCKED_DATES_KEY_KV = 'blocked_dates_master_list'; // Used by public contact form

// In-memory fallback storage for local development
let localBookings: Booking[] = [];
let localBlockedDates: string[] = [];


interface KVNamespace {
  get: (key: string, options?: { type?: 'text' | 'json' | 'arrayBuffer' | 'stream', cacheTtl?: number }) => Promise<string | null | Record<string, unknown> | ArrayBuffer | ReadableStream>;
  put: (key: string, value: string | ReadableStream | ArrayBuffer | FormData, options?: { expiration?: number, expirationTtl?: number, metadata?: unknown }) => Promise<void>;
  delete: (key: string) => Promise<void>;
}

function getKvNamespace(): KVNamespace | undefined {
  const kv = process.env.BOOKINGS_KV as unknown as KVNamespace | undefined;

  if (!kv) {
    if (process.env.NODE_ENV === 'production') {
      console.error(
        'FATAL: BOOKINGS_KV namespace is not bound or accessible in PRODUCTION. ' +
        'The application requires this for persistent data storage for bookings and blocked dates. ' +
        'Please ensure BOOKINGS_KV is properly configured in your Cloudflare Pages project settings (Functions > KV namespace bindings).'
      );
      // In a production environment, if KV is not available, we should fail critically for KV-dependent functions.
      throw new Error('Persistent KV store (BOOKINGS_KV) is not configured or available for production environment.');
    } else {
      // In local development, warn that we're using in-memory fallback.
      console.warn(
        "WARN: BOOKINGS_KV namespace is not bound or available in the current (non-production) environment. " +
        "Booking submission and date blocking features will use a non-persistent IN-MEMORY fallback. " +
        "Data will be lost on server restart. For persistent data in a deployed environment, ensure BOOKINGS_KV is properly bound."
      );
      return undefined;
    }
  }
  return kv;
}


type BookingInKv = Omit<Booking, 'bookingDate' | 'submittedAt'> & {
  bookingDate: string;
  submittedAt: string;
};

export async function submitBooking(data: Omit<Booking, 'id' | 'submittedAt'>): Promise<{ success: boolean; message: string }> {
  const kv = getKvNamespace();

  const newBookingRequest: Omit<Booking, 'id' | 'submittedAt'> = data;
  const newBooking: Booking = {
    ...newBookingRequest,
    id: Math.random().toString(36).substr(2, 9),
    submittedAt: new Date(),
  };

  if (kv) {
    try {
      const rawBookings = await kv.get(BOOKINGS_KEY_KV, { type: 'text' });
      let bookingsFromKv: BookingInKv[] = rawBookings ? JSON.parse(rawBookings as string) : [];
      bookingsFromKv.push({
          ...newBooking,
          bookingDate: newBooking.bookingDate.toISOString(),
          submittedAt: newBooking.submittedAt.toISOString(),
      });
      await kv.put(BOOKINGS_KEY_KV, JSON.stringify(bookingsFromKv));
      console.log('New booking submitted and stored in KV:', newBooking.id);
    } catch (error) {
      console.error('Error submitting booking to KV:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      return { success: false, message: `Failed to submit booking to KV. ${errorMessage}` };
    }
  } else {
    localBookings.push(newBooking);
    console.log('New booking submitted and stored in-memory (KV not available locally):', newBooking.id);
  }

  revalidatePath('/#contact'); // Revalidate public page
  return { success: true, message: 'Booking submitted successfully!' };
}

export async function getBlockedDates(): Promise<string[]> {
  const kv = getKvNamespace();

  if (kv) {
    try {
      const rawBlockedDates = await kv.get(BLOCKED_DATES_KEY_KV, { type: 'text' });
      if (!rawBlockedDates) return [];
      return JSON.parse(rawBlockedDates as string);
    } catch (error) {
      console.error('Error fetching blocked dates from KV:', error);
       if (process.env.NODE_ENV === 'production') {
          throw error; // Rethrow in production
      }
      // Fall through to local
    }
  }

  console.warn("getBlockedDates: KV not available or failed, returning in-memory blocked dates (local development).");
  return [...localBlockedDates];
}

// Admin related functions are removed as per request to optimize for Cloudflare Pages initial deployment.
// - getBookings
// - blockDate
// - unblockDate
// - attemptLogin
// - logoutAdmin
// - isAuthenticated
// Corresponding constants and in-memory storages for these are also removed.
