<template>
  <div>
    <cc-nav-bar v-show="!(['auth.signin', 'auth.signup'].indexOf($route.name) > -1)"></cc-nav-bar>
    <div class="columns">
      <cc-menu v-show="!(['auth.signin', 'auth.signup'].indexOf($route.name) > -1)"></cc-menu>
      <router-view></router-view>
    </div>
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
