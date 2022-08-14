import {auth, db} from '../firebase'
import {doc, query, where, collection, getDocs, getDoc, Timestamp, setDoc, deleteDoc, addDoc} from "firebase/firestore";
import store from "@/store";

export async function createEvent(event) {
    console.log('in create')
    console.log((await getDoc(doc(db, "Category", event.category.id))).data())
    const user = store.getters.user
    console.log(user)
    console.log(user.id)
    console.log((await getDoc(doc(db, "User", user.id))).data())

    const docData = {
        category: doc(db, "Category", event.category.id),
        date: Timestamp.fromDate(new Date(event.date)),
        description: event.description,
        location: event.location,
        name: event.name,
        organizer: doc(db, "User", store.getters.user.id)};
    console.log('CREATEEVENT', docData)

    const docRef = await addDoc(collection(db, "Event"), docData)
    console.log(docRef)
    return docRef
}

export function updateEvent(event) {

}

export async function deleteEvent(eventId) {
    await deleteDoc(doc(db, "Event", eventId));
}

export async function getEventsBy(location, category, date) {
    const filterDate1 = new Date(date)
    console.log(filterDate1)
    const filterDate2 = new Date(date)
    filterDate2.setDate(filterDate2.getDate() + 1)
    console.log(filterDate2)
    const timestamp1 = Timestamp.fromDate(filterDate1);
    console.log(timestamp1)
    const timestamp2 = Timestamp.fromDate(filterDate2);
    console.log(timestamp2)
    const categoryRef = doc(db, "Category", category);
    const q = query(collection(db, "Event"),
        where("location", "==", location),
        where("category", "==", categoryRef),
        where("date", ">=", timestamp1),
        where("date", "<=", timestamp2));

    const querySnapshot = await getDocs(q);
    console.log('GETEVENTSBY', querySnapshot)
    let events = []
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        events.push(doc.data())


    });
    console.log('EVENTS', events)
    return events
}

export async function getAllCategories(){
    const q = query(collection(db, "Category"))
    const querySnapshot = await getDocs(q);
    let categories=[]
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        categories.push(doc.data())
    });
    console.log(categories)
    return categories
}
