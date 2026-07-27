<template>
  <div class="column is-8">
    <h1 class="title is-4 mt-4">Itens</h1>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="control">
            <label class="checkbox" for="checkbox">
              <input type="checkbox" id="checkbox" name="checkbox" />
              Selecionar todos
            </label>
          </p>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button class="button is-primary" @click="navigate('newitem.form')">Novo</button>
        </div>
      </div>
    </nav>
    <hr>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th></th>
          <th>Item</th>
          <th>Solicitante</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in itemsList" :key="item.id">
          <td><input aria-label="test" type="checkbox"></td>
          <td>{{ item.name }}</td>
          <td>{{ item.solicitante }}</td>
          <td>{{ item.status }}</td>
          <td>
            <div class="buttons are-small">
              <a class="button is-info" @click="edit(item._id)"
                @keypress="edit(item._id)">Editar</a>
              <a class="button is-danger" @click="remove(item._id)"
                @keypress="remove(item._id)">Apagar</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <nav class="level">
      <div class="level-left">
          <div class="level-item">
          </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button class="button is-primary" @click="navigate('newitem.form')">Novo</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
 
export default {
  name: 'items-view',
  data: () => ({
    itemsList: [],
  }),
  beforeMount() {
    this.http.get('/items/list')
      .then((res) => {
        this.itemsList = res.data;
      });
  },
  methods: {
    remove(_id) {
      this.http.delete(`/items/${_id}`)
        .then(() => {
          this.http.get('/items/list')
            .then((res) => {
              this.itemsList = res.data;
            });
        })
        .catch((err) => console.log(err));
    },
    edit(_id) {
      this.$router.push({ name: 'items.edit', params: { _id } });
    },
    navigate(index) {
      this.$router.push({ name: index });
    },
  },
};
</script>
