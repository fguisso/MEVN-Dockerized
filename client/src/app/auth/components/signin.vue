<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Entrar</p>
      <router-link class="button is-info" :to="{ name: 'auth.signup' }">Registrar</router-link>
    </header>
    <section class="modal-card-body">
      <p>Hello World!</p>
    </section>
    <footer class="modal-card-foot">
      <a class="button is-success">Entrar</a>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Entrar',
  };
</script>
