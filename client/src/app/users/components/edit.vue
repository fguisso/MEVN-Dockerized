<template>
  <div class="column is-8">
    <div class="content">
      <h1>Editar usuário</h1>
      <hr>
      <h3>Nome do usuário:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="text" name="itemName" placeholder="Arroz" v-model="name">
        </p>
      </div>
      <h3>Nivel de acesso:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="text" name="accessLevel" placeholder="Admin" v-model="accessLevel">
        </p>
      </div>
      <h3>Email:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="text" name="email" placeholder="email@email.com" v-model="email">
        </p>
      </div>
      <h3>Password:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="password" name="password" placeholder="Entregue" v-model="password">
        </p>
      </div>
      <hr>
      <button v-bind:class="{ 'is-disabled' : this.name === '' && this.accessLevel === '' && this.email === '' && this.password === '' }" type="button"  class="button is-primary" @click="edit">Editar</button>
      <button type="button" class="button is-danger" @click="exit">Sair</button>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'userEditForm',
    data: () => ({
      name: '',
      accessLevel: '',
      email: '',
      password: '',
    }),
    methods: {
      edit() {
        const data = {};
        if (this.name) data.name = this.name;
        if (this.email) data.email = this.email;
        if (this.password) data.password = this.password;
        if (this.accessLevel === 'Admin') data.admin = true;
        if (this.accessLevel === 'User') data.admin = false;
        if (data !== {}) {
          this.http.put(`/users/${this.$route.params._id}`, data)
            .then(() => this.$router.push({ name: 'users.list' }))
            .catch(err => console.log(err));
        }
      },
      exit() {
        this.$router.push({ name: 'users.list' });
      },
    },
  };
</script>
