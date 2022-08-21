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
export default {
  name: 'Home',

  components: {
    heroHomeVue,
    specialsHomeVue
  },
  // data(){
  //   return {
  //     eventsData: []
  //   }
  // },
  // async mounted() {
  //   const docRef = doc(db, "Event", 'GFxK5JWW9nXP2g7MGSBy');
  //   const docSnap = await getDoc(docRef);
  //   console.log(docSnap.data())
  //   const collRef = collection(db, "Event")
  //   const docs = await getDocs(collRef)
  //   docs.forEach((doc) => {
  //     console.log(doc.data());
  //   });
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

  //getEventsBy('Cluj-Napoca','cb8x41sHADYBWWCxztK0','2022-08-16' )

  // const event ={
  //   category: {
  //     id: 'cb8x41sHADYBWWCxztK0',
  //     name: 'Arta'
  //   },
  //   date: '2022-08-16',
  //   description: 'asdasdass',
  //   location: 'Cluj-Napoca',
  //   name: 'nebunie'
  // }
  //
  // createEvent(event)

  //deleteEvent('assd')

  //getAllCategories()

  //addFavoriteEvent('dnaAsMggpnICXMQaFLft')

  // const category ={
  //   name: 'nebunii'
  // }
  // createCategory(category)

  //deleteCategory('XQAAPmkKkuYTvz1W9CFz')
  // }
}
</script>
<style>
.bg {
  margin-top: -50px;
}
</style>
