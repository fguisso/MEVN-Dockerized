<template>
  <div class="column is-8">
    <div class="content">
      <h1>Editar item</h1>
      <hr>
      <h3>Nome do item:</h3>
      <div class="field">
        <p class="control">
          <input class="input is-medium" type="text" name="itemName" placeholder="Arroz" v-model="name">
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
          <input class="input is-medium" type="text" name="status" placeholder="Entregue" v-model="status">
        </p>
      </div>
      <hr>
      <button v-bind:class="{ 'is-disabled' : this.name === '' && this.solicitante === '' && this.status == '' }" type="button"  class="button is-primary" @click="edit">Editar</button>
      <button type="button" class="button is-danger" @click="exit">Sair</button>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'editForm',
    data: () => ({
      name: '',
      solicitante: '',
      status: '',
    }),
    methods: {
      edit() {
        const data = {};
        if (this.name) data.name = this.name;
        if (this.solicitante) data.solicitante = this.solicitante;
        if (this.status) data.status = this.status;
        if (data !== {}) {
          this.http.put(`/items/${this.$route.params._id}`, data)
            .then(() => this.$router.push({ name: 'items.list' }))
            .catch(err => console.log(err));
        }
      },
      exit() {
        this.$router.push({ name: 'items.list' });
      },
    },
  };
</script>
