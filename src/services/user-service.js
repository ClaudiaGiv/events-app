import store from "@/store";
import {transformDate, getData} from "@/utils/utils";
import {db} from "../firebase";
import {
    query,
    where,
    collection,
    getDocs,
    addDoc
} from "firebase/firestore";


export async function getUser(uid) {
    let user;
    const q = query(collection(db, "User"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        user = {...doc.data(), id: doc.id}
    })
    console.log("user events-----")
    if (user.events?.length > 0) {
        user.events = await Promise.all(user.events.map(async (e) => {
            let ev = await getData(e)
            // console.log(ev)
            if (ev) {
                let category = await getData(ev.category)
                console.log("category------", category)
                console.log("category------", ev.category)
                let organizer = await getData(ev.organizer)
                // let date = (new Date(ev.date.seconds * 1000)).toLocaleDateString("en-GB", options)
                let date = transformDate(ev.date)
                return {...ev, category: {name: category.name, id: ev.category.id},
                    date, id: e.id, organizer: {name: organizer.name, id: ev.organizer.id}}
            }
        }))
    }
    if (user.favoriteEvents?.length > 0) {
        user.favoriteEvents = await Promise.all(user.favoriteEvents.map(async (e) => {
            let ev = await getData(e)
            // console.log(ev)
            if (ev) {
                let organizer = await getData(ev.organizer)
                let category = await getData(ev.category)
                let date = transformDate(ev.date)
                return {...ev, category: {name: category.name, id: ev.category.id}, date, id: e.id, organizer: {name: organizer.name, id: ev.organizer.id}}
            }
        }))
    }
    return user;
}


export function setLoggedInUser(user) {
    console.log('authUser', user)
    store.commit("SET_USER", user);
}


export async function createUser(user) {
    const docData = {
        uid: user.uid,
        email: user.email,
        role: user.role,
        name: user.name,
        events: [],
        favoriteEvents: [],
    };
    const docRef = await addDoc(collection(db, "User"), docData)
    const data = await getData(docRef)
    return {...data, id: docRef.id}
}
