<template>
     
     <v-main>
        <NavComponent />
        <v-container>
            <v-btn :to="{ name: 'home'}"><v-icon>mdi-arrow-left</v-icon></v-btn>
            <h4>Choisis ton profil :</h4>
            <v-btn color="red" v-for="user in users" :key="user._id"  :to="{name:'availabilities', params: {user: user.id }}">{{user.name}}</v-btn> 
        </v-container>
    </v-main>

</template>


<script>
    import API from '../api';
    import NavComponent from '@/components/NavComponent.vue';
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
    components: { NavComponent }
};
</script>