<template>
  <div class="column is-8">
    <div class="content">
      <h1>Novo usuário</h1>
      <hr>
      <h3>Nome do usuário::</h3>
      <div class="field">
        <p class="control">
          <input aria-label="test" class="input is-medium" type="text"
          name="username" placeholder="Usuário" v-model="name">
        </p>
      </div>
      <h3>Email:</h3>
      <div class="field">
        <p class="control">
          <input aria-label="test" class="input is-medium" type="text"
          name="email" placeholder="email@email.com" v-model="email">
        </p>
      </div>
      <h3>Password:</h3>
      <div class="field">
        <p class="control">
          <input aria-label="test" class="input is-medium" type="password"
          name="password" placeholder="*******" v-model="password">
        </p>
      </div>
      <hr>
      <button v-bind:class="{
        'is-disabled' : !(this.name !== '' && this.email !== '' && this.password !== '')
        }" type="button"  class="button is-primary" @click="submit">Registrar</button>
      <button type="button" class="button is-danger" @click="exit">Sair</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'newItemForm',
  data: () => ({
    name: '',
    email: '',
    password: '',
  }),
  methods: {
    submit() {
      const { name, email, password } = this;
      this.http.post('/users/register', { name, email, password })
        .then(() => this.$router.push({ name: 'users.list' }))
        .catch((err) => console.log(err));
    },
    exit() {
      this.$router.push({ name: 'users.list' });
    },
  },
};
</script>
