import { collection, doc, getDocs, getDoc, query, setDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 *
 * @param {string} id
 * @returns {Promise<{id: string, email: string, rol: number}>}
 */
export async function getUserProfileById(id) {
  const docRef = await getDoc(doc(db, `users/${id}`));
  // console.log(docRef.data().rol)
  return {
    id: docRef.id,
    email: docRef.data().email,
    rol: docRef.data().rol,
  };
}

/**
 *
 * @param {string} id
 * @param {{email: string}} data
 * @param {{rol: number}} data
 */
export function createUserProfile(id, { email }) {
  return setDoc(doc(db, `users/${id}`), {
    email,
    rol: 0
  });
}

export async function getUsers() {
  const userRef = collection(db, "users");
  const querySnapshot = await getDocs(userRef);

  const users = querySnapshot.docs.map((doc) => {
    const user = doc.data();
    return {
      id: doc.id,
      user,
    };
  });

  return users;
}