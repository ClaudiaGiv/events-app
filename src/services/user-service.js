import store from "@/store";
import {auth, db} from "../firebase";
import {query, where, collection, getDocs, getDoc} from "firebase/firestore";


export async function setLoggedInUser(user) {
    // const docRef = doc(db, "User", 'PiorIKUd1c1j0eTvQ8og');
    // const docSnap = await getDoc(docRef);
    // console.log(docSnap.data())
    // eslint-disable-next-line no-unused-vars
    let user1 =''
    const q = query(collection(db, "User"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    console.log (querySnapshot)
    querySnapshot.forEach( (doc) => {
        console.log(doc.id, " => ", doc.data());
        user1 = doc.data()
        console.log(user1)

        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
    console.log('await getDoc(user1.events[0])')
    console.log((await getDoc(user1.events[0])).data())
    store.dispatch("fetchUser", user);
    console.log(auth.currentUser);
    console.log("----", user)
}
