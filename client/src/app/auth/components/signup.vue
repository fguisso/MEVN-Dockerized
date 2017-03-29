<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Registrar</p>
      <router-link class="button is-info" :to="{ name: 'auth.signin' }">Login</router-link>
    </header>
    <section class="modal-card-body">
      <p>Hello Registro!</p>
    </section>
    <footer class="modal-card-foot">
      <a class="button is-success">Entrar</a>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Registrar',
  };
</script>
