<template>
  <div class="bg">
    <heroHomeVue/>
    <div class="bg-1">
      <specialsHomeVue/>

    </div>
  </div>
</template>

<script>
import heroHomeVue from '../components/Home/hero.home.vue'
import specialsHomeVue from '../components/Home/specials.home.vue'
import { db} from '../firebase'
import { doc, getDoc, collection, getDocs } from "firebase/firestore";


export default {
  name: 'Home',

  components: {
    heroHomeVue,
    specialsHomeVue
  },
  data(){
    return {
      eventsData: []
    }
  },
  async mounted() {

    const docRef = doc(db, "Event", 'GFxK5JWW9nXP2g7MGSBy');
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data())
    const collRef = collection(db, "Event")
    const docs = await getDocs(collRef)
    docs.forEach((doc) => {
      console.log(doc.data());
    });
    // db.collection("Event")
    //     .get()
    //     .then((querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         console.log("data", doc)
    //         console.log("data", doc.data())
    //         this.eventsData.push(doc.data);
    //         console.log(doc.id, " => ", doc.data());
    //       });
    //     })
    //     .catch((error) => {
    //       console.log("Error getting documents: ", error);
    //     });

  }
}
</script>
<style>
.bg {
  margin-top: -50px;
}
</style>
