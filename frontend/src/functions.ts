import firebase from 'firebase/app';
import { GetEventInput } from './models/get-event-input';
import { Event } from './models/event';

const functions = firebase.functions();

export interface FirebaseFunctionOutput<T> {
  data: T;
}

// comment out this next line to use the deployed version
functions.useEmulator('localhost', 5001);
export const getEventByIdFunction: (input: GetEventInput) => Promise<FirebaseFunctionOutput<Event>> =
  functions.httpsCallable('getEventByIdFunction');
export const getAllEventsFunction = functions.httpsCallable('getAllEventsFunction');
