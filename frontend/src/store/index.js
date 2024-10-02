import { createStore } from 'vuex';
import auth from './modules/auth';
import notas from './modules/notas';

const store = createStore({
  modules: {
    auth,
    notas
  },
});

export default store;