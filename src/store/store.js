import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    auth: "",
    user: "",
  },
  mutations: {
    auth(state, payload) {
      state.auth = payload;
    },
    user(state, payload) {
      state.user = payload;
    },
    logout(state, payload) {
      state.auth = payload;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const responseLogin = await axios.post(
        "https://agile-river-00378.herokuapp.com/api/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(responseLogin.data);
      const responseUser = await axios.get(
        "https://agile-river-00378.herokuapp.com/api/users/" + responseLogin.data.items.id
      );
      commit("auth", responseLogin.data.auth);
      commit("user", responseUser.data.data);
      router.replace("/");
    },
    logout({ commit }) {
      axios
        .post("https://agile-river-00378.herokuapp.com/api/logout", {
          auth: this.state.auth,
        })
        .then((response) => {
          console.log(response);
          commit("logout", response.data.auth);
          router.replace("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
