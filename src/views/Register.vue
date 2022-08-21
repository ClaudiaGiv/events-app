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
                <h3 class="my-4 text-center mb-4"> Selecteaza rolul tau in aplicatie:</h3>
                <div class="py-4 mx-auto mb-10 text-center px-16">
                  <v-select
                      :items="roles"
                      class="pt-5 px-16 weight-600 font-10 centered-input"
                      v-model="role"
                      label="Rolul"
                  ></v-select>
                </div>
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
import * as userService from "../services/user-service.js";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "Register",
  props: {
    source: String,
  },
  data() {
    return {
      roles: ['Utilizator', 'Organizator'],
      role: 'Utilizator',
    }
  },
  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(auth);
    }
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: (userInfo) => {
          console.log(userInfo)
          if (userInfo.additionalUserInfo.isNewUser) {
            let user = {};
            user.role = this.role
            user.email = userInfo.user.email
            user.name = userInfo.user.displayName
            user.uid = userInfo.user.uid
            userService.createUser(user).then(userRef => {
              userService.setLoggedInUser(userRef)
              this.$router.push({name: 'About'})

            })
          } else {
            userService.getUser(userInfo.user.uid).then(userRef => {
              userService.setLoggedInUser(userRef)
              this.$router.push({name: 'About'})
            })
          }
        }
      }
    });
  }
}
</script>

<style scoped>
</style>
