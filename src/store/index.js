import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: JSON.parse(localStorage.getItem('user')) || {},
    },
    getters: {
        user(state) {
            return state.user
        }
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));

        },
        ADD_FAV_EVENT(state, event) {
            state.user.favoriteEvents.push(event)
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        REMOVE_FAV_EVENT(state, eventId) {
            state.user.favoriteEvents = state.user.favoriteEvents.filter(e => e.id !== eventId);
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        ADD_EVENT(state, event) {
            state.user.events.push(event)
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        REMOVE_EVENT(state, eventId) {
            state.user.events = state.user.events.filter(e => e.id !== eventId);
            localStorage.setItem('user', JSON.stringify(state.user));
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
