<template>
  <v-data-table
      :headers="headers"
      :items="events"
      sort-by="calories"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>Evenimentele mele</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            > + Eveniment nou
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        v-model="editedItem.name"
                        label="Nume"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                        v-model="editedItem.description"
                        rows="3"
                        label="Descriere"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                        ref="dateMenu"
                        v-model="dateMenu"
                        :close-on-content-click="false"
                        :return-value.sync="editedItem.date"
                        lazy
                        transition="scale-transition"
                        offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="editedItem.date"
                            label="Data"
                            readonly
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.date" no-title scrollable @input="$refs.dateMenu.save(editedItem.date)">
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="editedItem.location"
                        label="Locatie"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                        :items="categories"
                        item-text="name"
                        return-object
                        v-model="editedItem.category"
                        label="Categoria"
                    ></v-select>
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
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-md-h6">Esti sigur ca vrei sa stergi acest eveniment?</v-card-title>
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
      <v-icon small color="red" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import {storage} from '../firebase'
import {ref, uploadBytes, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import store from "@/store";
import * as eventService from '../services/event-service'
import {v4 as uuidv4} from 'uuid';

export default {
  name: "Admin",
  data: () => ({
    dialog: false,
    user: {},
    deletedEventId: '',
    dateMenu: false,
    images: [],
    categories: [],
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
      {text: 'Category', value: 'category.name'},
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
      id: '',
      imgPath: '',
    },
    defaultItem: {
      name: '',
      description: '',
      date: '',
      location: '',
      category: '',
      id: '',
      imgPath: '',
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
      this.user = store.getters.user
      this.events = [...this.user.events ]
      this.categories = await eventService.getAllCategories()
      console.log('----EVENTS-----')
      console.log(this.events)
    },

    async editItem(item) {
      console.log("click on edit icon item", item)
      this.editedIndex = this.events.indexOf(item)
      console.log("click on edit icon item index", this.editedIndex)

      this.editedItem = Object.assign({}, item)

      console.log("click on edit icon editedItem", this.editedItem)
      this.dialog = true
    },

    async deleteItem(item) {
      this.editedIndex = this.events.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.deletedEventId = item.id
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      this.events.splice(this.editedIndex, 1)
      await eventService.deleteEvent(this.editedItem.id)
      this.deletedEventId = ''
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

    async save() {
      let newEvent = Object.assign({}, this.editedItem)
      let newEventIndex= this.editedIndex
      this.close()
      const imgName = "img-" + uuidv4();
      const imageRef = ref(storage, `images/${imgName}.jpg`);
      const uploadTask = await uploadBytes(imageRef, this.images[0].file)
      const downloadURL = await getDownloadURL(uploadTask.ref)
      newEvent.imgPath = downloadURL
      console.log("this.newEvent in save", newEvent)
      //const eventData = await eventService.createEvent(this.editedItem)
      //console.log("SAVE", eventData)
      //this.editedItem.id = eventData.id
      if (newEventIndex > -1) {
        await eventService.updateEvent(newEvent)
        Object.assign(this.events[newEventIndex], newEvent)
      } else {
        newEvent = await eventService.createEvent(newEvent)
        this.events.push(newEvent)
      }
      store.commit("ADD_EVENT", newEvent)
    },

    processUpload(event) {
      console.log(event)
    }
  },
}
</script>

<style scoped>

</style>
