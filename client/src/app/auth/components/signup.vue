<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Registrar</p>
      <router-link class="button is-info" :to="{ name: 'auth.signin' }">Login</router-link>
    </header>
    <section class="modal-card-body">
      <div class="content">
        <h3>Nome:</h3>
        <div class="field">
          <p class="control has-icon">
            <input class="input is-medium" type="email" placeholder="Your name" v-model="name">
            <span class="icon is-medium">
              <i class="fa fa-envelope"></i>
            </span>
          </p>
        </div>
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
            <input v-bind:class="{ 'is-success': this.password.length >= 6 }" class="input is-medium" type="password" placeholder="Password" v-model="password">
            <span class="icon is-medium">
              <i class="fa fa-lock"></i>
            </span>
          </p>
        </div>
      <h3>Confirmar senha:</h3>
      <div class="field">
        <p class="control has-icon">
          <input v-bind:class="{ 'is-danger' : !(isPassConfirmed()) && this.password.length <= 6, 'is-success': this.password.length >= 6 }" class="input is-medium" type="password" placeholder="Password" v-model="pwConfirm">
          <span class="icon is-medium">
            <i class="fa fa-lock"></i>
          </span>
        </p>
      </div>
    </div>
    </section>
    <footer class="modal-card-foot">
      <button v-bind:class="{ 'is-disabled' : !(isPassConfirmed()) || this.password === '' }" class="button is-success" @click="submit">Registrar</a>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Registrar',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        pwConfirm: '',
      };
    },
    methods: {
      isPassConfirmed() {
        const { password, pwConfirm } = this;
        return password === pwConfirm;
      },
      submit() {
        const { name, email, password } = this;
        this.http.post('/users/register', { name, email, password })
          .then(() => this.$router.push({ name: 'auth.signin' }))
          .catch(() => this.$router.push({ name: 'auth.signup' }));
      },
    },
  };
</script>
