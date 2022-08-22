import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user:  JSON.parse(localStorage.getItem('user')) || {},
    },
    getters: {
        user(state) {
            return state.user
        }
    },
    mutations: {
        INIT(state) {
            // Check if the ID exists
            console.log("STATEEEE USER")

            if (localStorage.getItem('user')) {
                console.log("BEFORE", localStorage.getItem('user'))
                console.log("BEFORE", state.user)
// Replace the state object with the stored item
                this.replaceState(
                    Object.assign(state.user, JSON.parse(localStorage.getItem('user')))
                );
            }
            console.log(localStorage.getItem('user'))
            console.log("AFTER", state.user)

        },
        SET_USER(state, user) {
            state.user = user;

        },
        ADD_FAV_EVENT(state, event) {
            state.user.favoriteEvents = [...state.user.favoriteEvents, event]
            // localStorage.setItem('user', JSON.stringify(state.user));
        },
        REMOVE_FAV_EVENT(state, eventId) {
            state.user.favoriteEvents = state.user.favoriteEvents.filter(e => e.id !== eventId);
            // localStorage.setItem('user', JSON.stringify(state.user));
        },
        ADD_EVENT(state, event) {
            console.log("EEEEEEEEE", event)
            let eventIdx = state.user.events.findIndex(e => e.id === event.id);
            console.log("22228888EEEEEEEEE", state.user.events)

            if (eventIdx !== -1) {
                console.log("11111EEEEEEEEE", event)

                state.user.events[eventIdx] = event;
            } else {
                console.log("2222EEEEEEEEE", event)

                state.user.events.push(event)
            }
            console.log("22229999EEEEEEEEE", state.user.events)
            // localStorage.setItem('user', JSON.stringify(state.user));
        },
        REMOVE_EVENT(state, eventId) {
            state.user.events = state.user.events.filter(e => e.id !== eventId);
            // localStorage.setItem('user', JSON.stringify(state.user));
        }
    },
    actions: {
        fetchUser({commit}, user) {
            commit("SET_LOGGED_IN", user !== null);
            if (user) {
                commit("SET_USER", user);
            }
        }
    }
})
