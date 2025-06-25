import {initializeApp} from 'firebase/app';
import { 
  getAuth , 
  signInWithRedirect , 
  signInWithPopup , 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { getFirestore , doc , getDoc , setDoc} from 'firebase/firestore';

  
// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDT_uRRVroQDWbgB0nXIhqedLrra7In0Ho",
  authDomain: "indelible-clothing-db.firebaseapp.com",
  projectId: "indelible-clothing-db",
  storageBucket: "indelible-clothing-db.firebasestorage.app",
  messagingSenderId: "558061757850",
  appId: "1:558061757850:web:42cb27ea704791cdfa4623",
  measurementId: "G-1RTBF52PC2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleprovider = new GoogleAuthProvider();

googleprovider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleprovider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleprovider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {displayName: 'Ananya'}
  ) => {
  if (!userAuth) return; // ensure userAuth is not null or undefined
   console.log(userAuth);
   
    const userDocRef = doc(db,'users',userAuth.uid);
    //console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    //console.log(userSnapshot.exists());

    // if user data does not exist create a document with the data from userAuth in the database
    if(!userSnapshot.exists()){
      const {displayName , email} = userAuth;
      const createdAt = new Date();
      try{
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt,
          ...additionalInformation,
      });
      } catch (error){
        console.log('error creating the user', error.message);
      }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  try {
    // Create the user in Firebase Authentication
    const userCredential = await signInAuthUserWithEmailAndPassword(email, password);
        const { user } = userCredential;
    // Call createUserDocumentFromAuth to save the user in Firestore
    //await createUserDocumentFromAuth(user);

    console.log('User created and saved to Firestore:', user);
    return user;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback);