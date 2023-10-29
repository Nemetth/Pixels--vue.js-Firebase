import { auth, db } from "./firebase";
// import { doc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword
} from "firebase/auth";
import { createUserProfile } from "./user";

const ERROR_MAP = {
  "auth/wrong-password": "La contraseña es incorrecta.",
};

let userData = {
  id: null,
  email: null,
  rol: null
};


let observers = [];

if (localStorage.getItem("userData")) {
  userData = JSON.parse(localStorage.getItem("userData"));
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    userData = {
      id: user.uid,
      email: user.email,
      rol: user.rol
    };
    console.log(user.email)
    // console.log(user.rol)
   
    localStorage.setItem("userData", JSON.stringify(userData));
  } else {
    userData = {
      id: null,
      email: null,
      rol: null
    };
    localStorage.removeItem("userData");
  }
  notifyAll();
});

/**
 *
 * @param {{email: string, password: string,}} userData
 * @returns {Promise}
 */
export async function register({ email, password }) {
  try {
    const userDoc = await createUserWithEmailAndPassword(auth, email, password);
    return createUserProfile(userDoc.user.uid, { email });
  } catch (error) {
    throw new Error(ERROR_MAP[error.code] || error.message);
  }
}

/**
 *
 * @param {{email: string, password: string}} user
 * @returns {Promise}
 */


export async function login({ email, password }) {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return { ...userData };
  } catch (error) {
    throw new Error(ERROR_MAP[error.code] || error.message);
  }
}

/**
 *
 * @returns {Promise}
 */
export async function logout() {
  return signOut(auth);
}

/**
 *
 * @param {({id: null|string, email: null|string}) => void} callback
 * @return {() => void} Función para cancelar la suscripción.
 */
export function subscribeToAuth(callback) {
  observers.push(callback);

  console.log("[auth.js] Observer agregado. El stack es: ", observers);

  notify(callback);

  return () => {
    observers = observers.filter((obs) => obs !== callback);
  };
}

/**
 * Notifica a un observer.
 *
 * @param {({id: null|string, email: null|string}) => void} callback
 */
function notify(callback) {
  callback({
    ...userData,
  });
}

/**
 * Notifica a todos los observers.
 */
function notifyAll() {
  observers.forEach((callback) => notify(callback));
}

export async function changePassword(newPassword) {
  try {
    const user = auth.currentUser;
    await updatePassword(user, newPassword); 
    console.log("Contraseña actualizada exitosamente.");
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    throw error; 
  }
}