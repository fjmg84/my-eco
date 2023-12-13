import { getFirestore } from 'firebase/firestore'
import firebase from './config'

export const db = getFirestore(firebase)
