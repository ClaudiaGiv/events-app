# EventApp


### Project setup

<code>npm install</code>

### Compiles and hot-reloads for development

<code>npm run serve</code>

### Compiles and minifies for production

<code>npm run build</code>

### Lints and fixes files

<code>npm lint</code>

### Project requirements

#### Setup Firebase

1. Cont pe Github - optional
2. Instalat IDE: VSCode sau Atom
3. Cont pe Firebase cu Google
4. Crearea aplicatie Firebase
5. Adaugare proiecte Firebase:
   1. Firestore
   2. Authentication
   3. Storage
   4. Hosting
6. Npm install
7. Firebase deploy local version:
   <code>npm run build</code>
   <code>firebase deploy --only hosting</code>
8. Run



### DB model

**Catogory:**

* name

**Event:**

* name
* description
* organizer: OrganizerRef
* date
* location
* category: CartegoryRef

**User:**

* name
* email
* uid
* role: [User, Organizer]
* favoriteEvents: [EventRef]
* events: [EventRef]

### Requirements

**User:**

* Read events:
  
  * [ ] order: date ?
  * [ ] filter: date, location, category
* Add event to favorite:
  
  * [ ] addEventToFavorite
* Read organizer's events:
  
  * [ ] getEventsByOrganizer
* User profile
  
  * [ ] change name, password
  * [ ] Favorite Events

**Organizer**

* CRUD organizer details:
  * [ ] CRUD events (name, date, location, category)
  * [ ] CRUD categories ?
  * [ ] CRU profile details (name) ?

**Pages:**

* [x] **Home page** with description and testimonials
* [x] **About page** with `description and testimonials
* [ ] **Events page** with the list of events
* [ ] **Event page** with description and details
* [ ] **Organizer page** with events and categories
* [ ] **Blog page** with blog posts (cards)
* [ ] **Blog article page** with image and text
* [ ] **User profile page** with account details and favorite events
* [x] **Register page** for login and sign up

**Functional considerations:**

* [ ] user auth token on session (web storage with vuex or leverage only from firebase)
* [ ] store event images on firebase storage
* [ ] user profile photp
* [ ] Adauga evenimentele/favEv la user state vuex
* [ ] Adauga heart favorite to ev

