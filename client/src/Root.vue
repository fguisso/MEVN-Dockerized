<template>
  <div>
    <cc-nav-bar v-show="['auth.signin', 'auth.signup'].indexOf($route.name) < -1"></cc-nav-bar>
    <cc-menu v-show="['auth.signin', 'auth.signup'].indexOf($route.name) < -1"></cc-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import CcNavBar from './components/navbar';
import CcMenu from './components/menu';

export default {
  name: 'app',
  components: {
    CcNavBar,
    CcMenu,
  },
};
</script>
