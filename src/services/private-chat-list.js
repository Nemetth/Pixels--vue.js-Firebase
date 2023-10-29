import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { dateToFormattedString } from "../helpers/datetime";
import { db } from "./firebase";

/** @type {{}} Las referencias de los documentos del chat privado. */
const privateChatsCache = {};

/**
 *
 * @param {string} senderId
 * @param {string} receiverId
 * @param {{user: string, message: string}} data
 */
export async function sendPrivateChatMessage(senderId, receiverId, data) {
  const privateChatDoc = await getPrivateChatDoc(senderId, receiverId);

  const messagesRef = collection(
    db,
    `private-chats/${privateChatDoc.id}/messages`
  );

  return addDoc(messagesRef, {
    ...data,
    senderId,
    created_at: serverTimestamp(),
  });
}

/**
 *
 * @param {string} senderId
 * @param {string} receiverId
 * @param {({}[]) => void} callback
 * @returns {Promise<function>} Función para cancelar la suscripción.
 */
export async function subscribeToPrivateChat(senderId, receiverId, callback) {
  const privateChatDoc = await getPrivateChatDoc(senderId, receiverId);

  const q = query(
      collection(db, `/private-chats/${privateChatDoc.id}/messages`),
      orderBy('created_at'),
  );

  return onSnapshot(q, snapshot => {
      //Cuando se producen cambios, la función devuelve un callback donde se ejecutan los nuevos mensajes.
      const messages = snapshot.docs.map(doc => {
          return {
              id: doc.id,
              senderId: doc.data().senderId,
              user: doc.data().user,
              message: doc.data().message,
              created_at: dateToFormattedString(doc.data().created_at?.toDate()),
          }
      });

      callback(messages);
  });
}
/**
 * Retorna el documento del chat privado para los usuarios.
 * Si no existe, lo crea.
 *
 * @param {string} senderId
 * @param {string} receiverId
 * @return {Promise<DocumentReference>}
 */
async function getPrivateChatDoc(senderId, receiverId) {
  const cached = getFromCache(senderId, receiverId);
  if (cached) return cached;

  const privateChatRef = collection(db, "private-chats");
  const users = { [senderId]: true, [receiverId]: true };

  const q = query(privateChatRef, where("users", "==", users), limit(1));

  const docsSnap = await getDocs(q);

  let privateChatDoc;

  if (docsSnap.empty) {
    privateChatDoc = await addDoc(privateChatRef, {
      users,
    });
  } else {
    privateChatDoc = docsSnap.docs[0];
  }

  setToCache(senderId, receiverId, privateChatDoc);

  return privateChatDoc;
}

function setToCache(senderId, receiverId, value) {
  const key = senderId + receiverId;
  privateChatsCache[key] = value;
}

function getFromCache(senderId, receiverId) {
  const key = senderId + receiverId;

  return privateChatsCache[key] || null;
}

export async function getPrivateChat() {
  const chatRef = collection(db, "private-chats");
  const querySnapshot = await getDocs(chatRef);

  const chats = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    const users = Object.keys(data.users);
    return {
      id: doc.id,
      users,
    };
  });

  return chats;
}

