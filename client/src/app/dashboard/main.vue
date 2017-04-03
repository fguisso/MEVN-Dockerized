<template>
  <div class="column">
    <section class="section">
      <div class="container">
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Usuários</p>
              <p class="title">{{ users }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Itens</p>
              <p class="title">{{ items }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Usuários Logados</p>
              <p class="title">{{ loged }}</p>
            </div>
          </div>
        </nav>
        <hr>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title is-8">Ultimos itens criados</h1>
        <table class="table column is-8">
          <tbody>
            <tr v-for="item in recentItems">
              <td>{{ item.name }}</td>
              <td>Criado a {{ item.seconds }} Segundos</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
  export default {
    name: 'dashboard',
    data: () => ({
      users: 0,
      items: 0,
      loged: 1,
      recentItems: [],
      dateNow: new Date(),
    }),
    beforeMount() {
      this.http.get('/info')
        .then((res) => {
          this.users = res.data.userCount;
          this.items = res.data.itemsCount;
          res.data.recentes.forEach((item) => {
            const itemDate = new Date(item.created_at);
            const seconds = this.dateNow.getTime()/1000 - itemDate.getTime()/1000;
            item.seconds = Math.floor(seconds);
          });
          this.recentItems = res.data.recentes;
        })
        .catch(err => console.log(err));
    },
  };
</script>
