import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GetEventInput } from './models/get-event-input';
import { Event } from './models/event';

import serviceAccount = require('./key.json');
import { UpdatedEventInput } from './models/updated-event-input';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
const firestore = admin.firestore();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const getEventByIdFunction = functions.https.onCall(
  async (data: GetEventInput, context: functions.https.CallableContext): Promise<Event> => {
    console.log(`data: ${JSON.stringify(data)}`);

    try {
      const docSnapshot = await firestore.collection('events').doc(`/${data.eventId}`).get();

      const event = docSnapshot.data();
      if (!event) {
        throw new Error(`EventId: ${data.eventId} doesn't exist`);
      }

      return event as Event;
    } catch (error) {
      console.error(`didn't work`, error);
      throw error;
    }
  }
);

export const getAllEventsFunction = functions.https.onCall(
  async (data: null, context: functions.https.CallableContext): Promise<Event[]> => {
    try {
      const querySnapshot = await firestore.collection('events').get();
      if (querySnapshot.empty) {
        return [];
      }

      const events = querySnapshot.docs.map((doc) => doc.data());

      return events as Event[];
    } catch (error) {
      console.error(`didn't work`, error);
      throw error;
    }
  }
);

export const postEventFunction = functions.https.onCall(async (data: Event, context) => {
  try {
    const res = await firestore.collection('events').add(data);
    functions.logger.info(`res is: ${JSON.stringify(res)}`);
    console.log(`res is: ${JSON.stringify(res)}`);
    return res.id;
  } catch (error) {
    console.error(`didn't work`, error);
    throw error;
  }
});

export const updateEventByIdFunction = functions.https.onCall(async (data: UpdatedEventInput, context) => {
  try {
    const res = await firestore.collection('events').doc(`/${data.eventId}`).update({ content: data.content });

    functions.logger.info(`res is: ${JSON.stringify(res)}`);
    console.log(`res is: ${JSON.stringify(res)}`);
    return res;
  } catch (error) {
    console.error(`didn't work`, error);
    throw error;
  }
});

export const deleteEventByIdFunction = functions.https.onCall(
  async (data: GetEventInput, context: functions.https.CallableContext): Promise<FirebaseFirestore.WriteResult> => {
    console.log(`data: ${JSON.stringify(data)}`);

    try {
      const writeResult = await firestore.collection('events').doc(`/${data.eventId}`).delete();

      return writeResult;
    } catch (error) {
      console.error(`didn't work`, error);
      throw error;
    }
  }
);
