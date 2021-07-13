import { firebaseConfig } from './firebase.config';
import firebase from 'firebase/app';

// Required for side-effects
import 'firebase/functions';

firebase.initializeApp(firebaseConfig);
