<template>

  <v-data-table
      :headers="headers"
      :items="events"
      sort-by="calories"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Evenimentele mele</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              + Eveniment nou
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.name"
                        label="Nume"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.description"
                        label="Descriere"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.date"
                        label="Data"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.location"
                        label="Locatie"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.category"
                        label="Categoria"
                    ></v-text-field>
                  </v-col>

                </v-row>
                <v-row>
                  <v-col>
                    <vuetify-upload
                        label="Incarca imaginile"
                        :max="3"
                        can-delete
                        class="width_full"
                        previewClass="xs8"

                        accept="image/*"
                        :rules="imageRules"
                        color="accent"
                        v-model="images"
                    ></vuetify-upload>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Esti sigur ac vrei sa stergi acest eveniment?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Anuleaza</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Da</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          color="success"
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          color="red"

          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
          color="primary"
          @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { db} from '../firebase'
import {doc, query, where, collection, getDocs, getDoc} from "firebase/firestore";
export default {
  name: "Admin",
  data: () => ({
    dialog: false,
    images: [],
    imageRules: [(v) => v.length > 0 || "jpg/img"],
    dialogDelete: false,
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: true,
        value: 'name',
      },
      {text: 'Description', value: 'description'},
      {text: 'Date', value: 'date'},
      {text: 'Location', value: 'location'},
      {text: 'Category', value: 'category'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    events: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      description: '',
      date: '',
      location: '',
      category: '',
    },
    defaultItem: {
      name: '',
      description: '',
      date: '',
      location: '',
      category: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Eveniment nou' : 'Editeaza detaliile evenimentului'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  async created() {
    await this.initialize()
  },

  methods: {
    async initialize() {
      // this.events;
      const docRef = doc(db, "User", 'PiorIKUd1c1j0eTvQ8og');
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data())
      const q = query(collection(db, "Event"), where("organizer", "==", docRef));
      // const q = query(collection(db, "Event"), where("location", "==", 'Viena'));

      const querySnapshot = await getDocs(q);
      console.log (querySnapshot)
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        this.events.push(doc.data())
        console.log(this.events)
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
      console.log(this.events)
      // const collRef = collection(db, "Event")
      // const docs = await getDocs(collRef)
      // docs.forEach((doc) => {
      //   console.log(doc.data());
      // });
      this.events1 = [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
    processUpload(event) {
      console.log(event)
    }
  },

  // data() {
  //   return {
  //     uploadDialog: true
  //   }
  // },
  // methods: {
  //   processUpload(event) {
  //     console.log(event)
  //   }
  // },
}
</script>

<style scoped>

</style>
