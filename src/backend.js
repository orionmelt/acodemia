import firebase from 'firebase';
import { firebaseConfig } from 'keys';

firebase.initializeApp(firebaseConfig);

export const google = new firebase.auth.GoogleAuthProvider();
export const facebook = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database();
export const quizzes = database.ref('quizzes');
export const users = database.ref('users');
export const leaderboards = database.ref('leaderboards');
export default firebase;