import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import excel from 'vue-excel-export';

Vue.use(excel);

import 'bootstrap/dist/css/bootstrap.css'
import {BFormCheckboxGroup} from 'bootstrap-vue'

Vue.component('b-form-checkbox-group', BFormCheckboxGroup);
import {BFormCheckbox} from 'bootstrap-vue'

Vue.component('b-form-checkbox', BFormCheckbox);

Vue.config.productionTip = false;


import AccountManager from "./models/AccountManager";

AccountManager.setUserData();


new Vue({
    router,
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
