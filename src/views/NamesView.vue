<template>
     
     <div>
        <h4>Users</h4>
        <v-btn color="red" v-for="user in users" :key="user._id"  :to="{name:'availabilities', params: {user: user.id }}">{{user.name}}</v-btn> 
    </div>

</template>


<script>
    import API from '../api';
    export default {
        name: "NamesView",
        data() {
            return {
                users: [],
            };
        },
        async created() {
            this.users = await API.getAllUser();
            
        },
        
    };
</script>