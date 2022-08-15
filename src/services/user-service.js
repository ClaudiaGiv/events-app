import store from "@/store";
import {auth, db} from "../firebase";
import {query, where, collection, getDocs, getDoc, doc, arrayUnion, updateDoc} from "firebase/firestore";

async function getData(doc) {
    return (await getDoc(doc)).data()
}

export async function setLoggedInUser(authUser) {
    console.log('authUser', authUser)
    let user;
    const q = query(collection(db, "User"), where("uid", "==", authUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        user = {...doc.data(), id: doc.id}
    })
    if (user.events.length > 0) {
        user.events = await Promise.all(user.events.map(async (e) => {
            let ev = await getData(e)
            console.log(ev)
            if (ev) {
                let category = await getData(ev.category)
                const options = {year: 'numeric', month: 'long', day: 'numeric'};
                // let date = (new Date(ev.date.seconds * 1000)).toLocaleDateString("en-GB", options)
                let date = (new Date(ev.date.seconds * 1000)).toISOString().substr(0, 10)
                return {...ev, category: {name: category.name, id: ev.category.id}, date, id: e.id}
            }
        }))
    }
    console.log(user.events)
    store.commit("SET_USER", user);
    console.log(store.getters.user)
}

export async function addFavoriteEvent(eventId) {
    const user = store.getters.user
    const userRef = doc(db, "User", user.id);
    await updateDoc(userRef, {
        favoriteEvents: arrayUnion(eventId)
    });
}
