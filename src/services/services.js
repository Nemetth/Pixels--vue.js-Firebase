import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  query,
} from "firebase/firestore";
const refChat = collection(db, "services");
/**
 *
 * @param {(messages: {} []) => null} callback
 * @returns {import("firebase/auth").Unsubscribe}
 */

export function subscribeToServices(callback) {
  const q = query(refChat);
  return onSnapshot(q, (querySnapshot) => {
    const services = querySnapshot.docs.map((doc) => {
      return {
        serviceId: doc.data().serviceId,
        name: doc.data().name,
        price: doc.data().price,
        description: doc.data().description,
      };
    });
    callback(services);
  });
}

/**
 *
 * @param {{userId: string, user: string, message: string}} data
 * @returns Promise
 */

export function saveService(data) {
  return addDoc(refChat, data);
}
