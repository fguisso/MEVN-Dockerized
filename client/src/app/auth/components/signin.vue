<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Entrar</p>
      <router-link class="button is-info" :to="{ name: 'auth.signup' }">Registrar</router-link>
    </header>
    <section class="modal-card-body">
      <div class="content">
        <h3>Email:</h3>
        <div class="field">
          <p class="control has-icon">
            <input class="input is-medium" type="email" placeholder="your@email.com" v-model="email">
            <span class="icon is-medium">
              <i class="fa fa-envelope"></i>
            </span>
          </p>
        </div>
        <h3>Senha:</h3>
        <div class="field">
          <p class="control has-icon">
            <input class="input is-medium" type="password" placeholder="Password" v-model="password">
            <span class="icon is-medium">
              <i class="fa fa-lock"></i>
            </span>
          </p>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" @click="submit">Entrar</a>
    </footer>
  </div>
</template>

<script>
/* eslint-disable */
  export default {
    name: 'Entrar',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      submit() {
        const { email, password } = this;
        this.http.post('/users/auth', { email, password })
          .then(res => console.log(res.data))
          .catch(err => console.log(err));
      },
    },
  };
</script>
