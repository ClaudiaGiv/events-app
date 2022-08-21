import {getDoc} from "firebase/firestore";

export function transformDate(date){
    return  (new Date(date.seconds * 1000)).toISOString().substr(0, 10)
}

export async function getData(doc) {
    return (await getDoc(doc)).data()
}

