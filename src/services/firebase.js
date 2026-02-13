import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, setDoc, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../config/firebase";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

// Service functions
export const getTemplateByCode = async (code) => {
    const q = query(collection(db, "templates"), where("publicCode", "==", code));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
    }
    return null;
};

export const createTemplate = async (templateData) => {
    // Generate a unique public code
    const publicCode = generatePublicCode();
    const data = {
        ...templateData,
        publicCode,
        createdAt: new Date().toISOString()
    };
    const docRef = await addDoc(collection(db, "templates"), data);
    return { id: docRef.id, publicCode };
};

export const updateTemplate = async (id, templateData) => {
    const docRef = doc(db, "templates", id);
    await setDoc(docRef, templateData, { merge: true });
};

export const uploadImage = async (file) => {
    const storageRef = ref(storage, `memories/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
};

const generatePublicCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid ambiguous chars 1, O, 0, I
    let code = '';
    for (let i = 0; i < 3; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    code += '-';
    for (let i = 0; i < 3; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return code;
};
