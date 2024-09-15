import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 

export const fetchClasses = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "classes"));
        const classesData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
            }));
        return classesData;
    } catch (error) {
        console.error("Error fetching classes: ", error);
        throw error;
    }
};