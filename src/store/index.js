import Vue from 'vue';
import Vuex from 'vuex';

import { locationsModule } from './modules/locationsModule';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    locations: locationsModule,
  },
});

export default store;
