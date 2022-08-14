<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
        <v-layout align-center justify-center>
          <v-flex xs16 sm12 md8>
            <v-card class="elevation-12 mt-16 pa-16">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Inregistrare</v-toolbar-title>

              </v-toolbar>
              <v-card-text>
                <h3 class="my-4 text-center mb-12"> Inregistreaza-te in aplicatie pentru a avea acces la evenimente</h3>
                <div id="firebaseui-auth-container"></div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {
  GoogleAuthProvider,
  EmailAuthProvider
} from "firebase/auth"
import {auth} from '@/firebase'
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "Register",
  props: {
    source: String,
  },
  mounted() {
    let ui = new firebaseui.auth.AuthUI(auth);
    ui.start('#firebaseui-auth-container', {
      signInSuccessUrl: "/events",
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: (a, e) => {
          console.log(a, e)
          // updateProfile(auth.currentUser, {profile: {role: "admin"}}).then((d) => console.log(d));
        }
      }
    });
/*    let currentUid
    console.log(auth.currentUser)
    auth.onAuthStateChanged(function (user) {
      // onAuthStateChanged listener triggers every time the user ID token changes.
      // This could happen when a new user signs in or signs out.
      // It could also happen when the current user ID token expires and is refreshed.
      if (user && user.uid != currentUid) {
        // Update the UI when a new user signs in.
        // Otherwise ignore if this is a token refresh.
        // Update the current user UID.
        currentUid = user.uid;
        console.log(currentUid)
        console.log(user)
        //this.updateProfile(auth.currentUser, {profile: {role: "admin"}}).then((d) => console.log(d));
        // document.body.innerHTML = '<h1> Congrats ' + user.displayName + ', you are done! </h1> <h2> Now get back to what you love building. </h2> <h2> Need to verify your email address or reset your password? Firebase can handle all of that for you using the email you provided: ' + user.email + '. <h/2>';
      } else {
        // Sign out operation. Reset the current user UID.
        currentUid = null;
        console.log("no user signed in");
      }
    });*/
  }
}
</script>

<style scoped>

</style>
