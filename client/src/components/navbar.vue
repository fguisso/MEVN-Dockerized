<template>
  <nav class="nav has-shadow tabs is-large">
    <div class="container">
      <div class="nav-left">
        <p class="nav-item title is-3">
          Portal Gestor
        </p>
      </div>
      <div class="nav-right">
        <a class="nav-item is-tab">
          <figure class="image is-16x16" style="margin-right: 8px;">
            <img src="http://rs125.pbsrc.com/albums/p68/alongway99/Halloween%20Animations/Scary%20Eye%20Animations/EyeballRedRotates.gif~c200">
          </figure>
          {{ username }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data: () => ({
    username: 'Guteemberg',
  }),
};
</script>
