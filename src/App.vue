<template>
  <main>
    <h3>Coquillage</h3>
    <p>Just print the data from the API</p>
    <div>
      <h4>Users</h4>
      <li v-for="user in users" :key="user._id">{{user.name}}</li>
    </div>
    <div>
      <h4>Available</h4>
      <li v-for="available in availables" :key="available._id">{{available.day.slice(8,10)}} / {{available.day.slice(5,7)}}</li>
    </div>
  </main>
  
</template>

<script>
import API from './api';
  export default {
    name: 'App',
    data(){
      return{
        users: [],
        availables: []
      };
    },
    async created(){
      this.users = await API.getAllUser();
      this.availables = await API.getAllAvailable();
    },
  };
  
</script>