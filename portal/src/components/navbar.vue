<template>
  <nav class="navbar has-shadow">
    <div class="container">
      <div class="navbar-brand">
        <p class="navbar-item title is-4 mb-0">
          Portal Gestor
        </p>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item">
            <figure class="image is-32x32 mr-2">
              <img alt="profile-pic" class="is-rounded" :src="getUser.avatarUrl">
            </figure>
            {{ getUser.name }}
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'nav-bar',
  computed: {
    ...mapGetters(['getUser']),
  },
};
</script>

<style>
  .navbar-item img {
    max-height: 2rem;
  }
</style>
