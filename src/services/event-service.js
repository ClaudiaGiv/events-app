import {db} from '../firebase'
import {
    doc,
    query,
    where,
    collection,
    getDocs,
    Timestamp,
    deleteDoc,
    addDoc,
    updateDoc, arrayUnion, arrayRemove, getDoc
} from "firebase/firestore";
import store from "@/store";
import {transformDate, getData} from "@/utils/utils";

export async function extractEventObject(doc) {
    let evData = await getData(doc)

    console.log('ev ref', evData)
    let category = await getData(evData.category)
    let organizer = await getData(evData.organizer)
    console.log('ev category', category)
    console.log('ev organizer', organizer)
    console.log('ev ', evData)
    evData.date = transformDate(evData.date)
    evData.category = {name: category.name, id: evData.category.id}
    evData.organizer = {name: organizer.name, id: evData.organizer.id}
    return evData
}

export async function updateEvent(event) {
    console.log("update", event)
    const docData = {
        category: doc(db, "Category", event.category.id),
        date: Timestamp.fromDate(new Date(event.date)),
        description: event.description,
        location: event.location,
        name: event.name,
        organizer: doc(db, "User", store.getters.user.id),
        imgPath: event.imgPath,
    };
    const eventRef = doc(db, "Event", event.id);

// Set the "capital" field of the city 'DC'
    await updateDoc(eventRef, docData);
}

export async function createEvent(event) {
    console.log("update", event)
    const docData = {
        category: doc(db, "Category", event.category.id),
        date: Timestamp.fromDate(new Date(event.date)),
        description: event.description,
        location: event.location,
        name: event.name,
        organizer: doc(db, "User", store.getters.user.id),
        imgPath: event.imgPath,
    };
    console.log("docData", docData)
    const eventRef = await addDoc(collection(db, "Event"), docData)
    // let eventData = await getData(eventRef)
    const userRef = doc(db, "User", store.getters.user.id);
    await updateDoc(userRef, {
        events: arrayUnion(eventRef)
    });
    console.log('ref dupa adaugare', eventRef)
   let eventData = await extractEventObject(eventRef)
    eventData.id = eventRef.id
    console.log("CREATEEEEE",eventRef)
    console.log("CREATEEEEE", eventData)
    return eventData
}

export async function addFavoriteEvent(event) {
    const eventRef = doc(db, "Event", event.id);
    const userRef = doc(db, "User", store.getters.user.id);
    await updateDoc(userRef, {
        favoriteEvents: arrayUnion(eventRef)
    });
    store.commit("ADD_FAV_EVENT", event)
}

export async function removeFavoriteEvent(eventId) {
    const eventRef = doc(db, "Event", eventId);
    const userRef = doc(db, "User", store.getters.user.id);
    await updateDoc(userRef, {
        favoriteEvents: arrayRemove(eventRef)
    });
    store.commit("REMOVE_FAV_EVENT", eventId)
}

export async function deleteEvent(eventId) {
    const eventRef = doc(db, "Event", eventId);
    const userRef = doc(db, "User", store.getters.user.id);
    await deleteDoc(eventRef);
    await updateDoc(userRef, {
        events: arrayRemove(eventRef)
    });
    store.commit("REMOVE_EVENT", eventId)
}

export async function getEventsBy(location, category, date) {
    const filterDate1 = new Date(date)
    const filterDate2 = new Date(date)
    filterDate2.setDate(filterDate2.getDate() + 1)
    const timestamp1 = Timestamp.fromDate(filterDate1);
    const timestamp2 = Timestamp.fromDate(filterDate2);

    const categoryRef = doc(db, "Category", category.id);
    const q = query(collection(db, "Event"),
        where("location", "==", location),
        where("category", "==", categoryRef),
        where("date", ">=", timestamp1),
        where("date", "<=", timestamp2));

    const querySnapshot = await getDocs(q);
    let events = []
    if (store.getters.user.role === "Utilizator") {
        events = getEventsForUser(querySnapshot)
    } else {
        events = getEvents(querySnapshot)
    }
    console.log('EVENTS', events)
    return events
}

export async function getAllEvents() {
    const q = query(collection(db, "Event"))
    const querySnapshot = await getDocs(q);
    let events = []
    if (store.getters.user.role === "Utilizator") {
        events = getEventsForUser(querySnapshot)
    } else {
        events = getEvents(querySnapshot)
    }
    return events
}

function getEvents(querySnapshot) {
    let events = [];
    querySnapshot.forEach(async (doc) => {
        const data = doc.data()
        let category = await getData(data.category)
        let organizer = await getData(data.organizer)
        data.date = transformDate(data.date)
        data.category = {name: category.name, id: category.id}
        data.organizer = {name: organizer.name, id: organizer.id}
        events.push({...data, id: doc.id})
    });
    return events
}


function getEventsForUser(querySnapshot) {
    let events = [];
    querySnapshot.forEach(async (doc) => {
        const data = doc.data()
        let category = await getData(data.category)
        let organizer = await getData(data.organizer)
        data.date = transformDate(data.date)
        data.category = {name: category.name, id: category.id}
        data.organizer = {name: organizer.name, id: organizer.id}
        data.id = doc.id
        data.isFavorite = false;
        if (store.getters.user.favoriteEvents.some(fe => fe.id === data.id)) {
            data.isFavorite = true;
        }
        events.push(data)
    });
    return events
}


export async function getAllCategories() {
    const q = query(collection(db, "Category"))
    const querySnapshot = await getDocs(q);
    let categories = []
    querySnapshot.forEach((doc) => {
        categories.push({...doc.data(), id: doc.id})
    });
    return categories
}

export async function createCategory(category) {
    const docData = {
        name: category.name
    }
    const docRef = await addDoc(collection(db, "Category"), docData)
    return docRef
}

export async function deleteCategory(categoryId) {
    await deleteDoc(doc(db, "Category", categoryId));
}
