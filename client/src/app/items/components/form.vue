<template>
  <div class="column is-8">
    <div class="content">
      <h1>Novo item</h1>
      <hr>
      <h3>Nome do item:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="text" name="itemName" placeholder="Caramelo" v-model="name">
        </p>
      </div>
      <h3>Solicitante:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="text" name="solicitante" placeholder="Usuário" v-model="solicitante">
        </p>
      </div>
      <h3>Status:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="text" name="status" placeholder="Pending" v-model="status">
        </p>
      </div>
      <hr>
      <button v-bind:class="{ 'is-disabled' : !(this.name !== '' && this.solicitante !== '' && this.status !== '') }" type="button"  class="button is-primary" @click="submit">Registrar</button>
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
      solicitante: '',
      status: '',
    }),
    methods: {
      submit() {
        const { name, solicitante, status } = this;
        this.http.post('/items/register', { name, solicitante, status })
          .then(() => this.$router.push({ name: 'items.list' }))
          .catch(err => console.log(err));
      },
      exit() {
        this.$router.push({ name: 'items.list' });
      },
    },
  };
</script>
