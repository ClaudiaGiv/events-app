# Treloo

<p style="text-align:center">Trello is a travel agency unreal platform (hahaha), just a Single Page UI designed using Vuejs and VuetifyJS.</p>

Designed by [Chanvanda](https://www.figma.com/@vandawork) using Figma

You can check his work on instagram @ [Chanvanda](https://www.instagram.com/viruzsaci/)

Figma UI link @ [link](https://www.figma.com/community/file/1067291706100571818)

![alt text](https://s3-alpha.figma.com/hub/file/1484011056/72a7ae2f-7bcf-4afb-bb48-fd4079ff349b-cover.png)

> <h3>PSA for those who want to clone or fork this repo and use it.</h3>
> Please be a decent person and give me proper credit by linking back to my website! Refer to this handy post if you are not sure [Quora](https://www.quora.com/Is-it-bad-to-copy-other-peoples-code)

## Task to do

- [X]  Add navigation( both desktop and mobile)
- [X]  Add animation effect

### v2 Update task

- [ ]  Handle screen for sm md xl and lg(1600,1800,1900)px's
- [ ]  Add custom animation effect
- [ ]  Modify component height and width sizes(move from vh to em)
- [ ]  Full function app planning:** On Hold

## Fulfil my dream

I always want to develop new UI's with various frontend framework and tools day in day out. only your support can give me the time and space to keep developing nice content.

i have a plan of creating an opensource marketplace on my site for people to download quality frontend UI from web to mobile to desktop.
support my dream by buying me a coffee

BNB(coin): bnb1eams6jneauszx9g2zw586ye98zpadwssmg0hjk

SOLANA(coin): HhzKZ2LLkFwgzWw5e5VvfJkC7XVJZFkPqkw6GUgZmv74

send me a mail to papabackend@gmail.com so i can add to the sponsors list. Thanks for making my dream come through.

### Project setup

<code>npm install</code>

### Compiles and hot-reloads for development

<code>npm run serve</code>

### Compiles and minifies for production

<code>npm run build</code>

### Lints and fixes files

<code>npm lint</code>

![img.png](img.png)

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

  * [ ]  order: date ?
  * [ ]  filter: date, location, category
* Add event to favorite:

  * [ ]  addEventToFavorite
* Read organizer's events:

  * [ ]  getEventsByOrganizer
* User profile

  * [ ]  change name, password
  * [ ]  Favorite Events

**Organizer**

* CRUD organizer details:
  * [ ]  CRUD events (name, date, location, category)
  * [ ]  CRUD categories ?
  * [ ]  CRU profile details (name) ?

**Pages:**

* [X]  **Home page** with description and testimonials
* [X]  **About page** with `description and testimonials
* [ ]  **Events page** with the list of events
* [ ]  **Event page** with description and details
* [ ]  **Organizer page** with events and categories
* [ ]  **Blog page** with blog posts (cards)
* [ ]  **Blog article page** with image and text
* [ ]  **User profile page** with account details and favorite events
* [X]  **Register page** for login and sign up

**Functional considerations:**

* [ ]  user auth token on session (web storage with vuex or leverage only from firebase)
* [ ]  store event images on firebase storage
* [ ]  user profile photo

Left todo:

* [ ]  Adauga evenimentele/favEv la user state vuex
* [ ]  Adauga heart favorite to ev
