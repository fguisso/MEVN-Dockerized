<template>
  <div class="column is-8">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="control">
            <label class="checkbox" for="checkbox">
              <input type="checkbox" name="checkbox" v-model="allSelected" @click="changeAll">
              Selecionar todos
            </label>
          </p>
        </div>
      </div>
      <div v-if="getUser.isAdmin" class="level-right">
        <div class="level-item">
          <button type="button" v-bind:class="{
            'is-disabled' : this.checkedIds.length <= 0
            }" class="button is-danger" @click="remove">Remover</button>
        </div>
        <div class="level-item">
          <button type="button" v-bind:class="{
            'is-disabled' : this.checkedIds.length !== 1
            }" class="button is-info" @click="edit">Editar</button>
        </div>
        <div class="level-item">
          <button class="button is-primary" @click="navigate('newuser.form')">Novo</button>
        </div>
      </div>
    </nav>
    <hr>
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Usuário</th>
          <th>Nivel de acesso</th>
          <th>Criado em</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userList" :key="user.id">
          <th><input aria-label="test" type="checkbox" v-model="user.checked"></th>
          <th>{{ user.name }}</th>
          <th>{{ user.access }}</th>
          <th>{{ user.created_at }}</th>
        </tr>
      </tbody>
    </table>
    <nav v-if="getUser.isAdmin" class="level">
      <div class="level-left">
          <div class="level-item">
          </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button type="button" v-bind:class="{
            'is-disabled' : this.checkedIds.length <= 0
            }" class="button is-danger" @click="remove">Remover</button>
        </div>
        <div class="level-item">
          <button type="button" v-bind:class="{
            'is-disabled' : this.checkedIds.length !== 1
            }" class="button is-info" @click="edit">Editar</button>
        </div>
        <div class="level-item">
          <button class="button is-primary" @click="navigate('newuser.form')">Novo</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
/* eslint-disable */
  import { mapGetters } from 'vuex';
  export default {
    name: 'users-view',
    data: () => ({
      userList: [],
      allSelected: false,
    }),
    computed: {
      ...mapGetters(['getUser']),
      checkedIds() {
        return this.userList.filter(_user => _user.checked).map(_user => _user._id);
      },
    },
    beforeMount() {
      this.http.get('/users/list')
        .then((res) => {
          this.userList = res.data.map((user) => {
            user.checked = false;
              if (user.admin === true) user.access = 'Admin';
              else user.access = 'User';
            return user;
          });
        });
    },
    watch: {
      checkedIds: {
        handler() {
          this.allSelected = (this.userList
            .filter(_user => _user.checked).length === this.userList.length);
        },
        deep: true,
      },
    },
    methods: {
      changeAll() {
        this.userList.forEach((_user, index) => {
          _user.checked = this.allSelected;
          this.userList[index] = _user;
        });
      },
      remove() {
        this.checkedIds.forEach((_id) => {
          this.http.delete(`/users/${_id}`)
            .then(() => {
              this.http.get('/users/list')
                .then((res) => {
                  this.userList = res.data.map((user) => {
                    user.checked = false;
                    if (user.admin === true) user.access = 'Admin';
                    else user.access = 'User';
                    return user;
                  });
                });
            })
            .catch(err => console.log(err));
        });

      },
      edit() {
        this.$router.push({ name: 'users.edit', params: { _id: this.checkedIds[0] } });
      },
      navigate(index) {
        this.$router.push({ name: index });
      },
    },
  };
</script>
