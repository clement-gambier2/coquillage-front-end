import axios from 'axios';
const url_user = "/people";
const url_available = "/available";

export default class API{
    //Users part
    // to get all the posts from the server
    static async getAllUser(){
        const res = await axios.get(url_user);
        return res.data;
    }
    
    // to get single post by id 
    static async getUserByID(id){
        const res = await axios.get(`${url_user}/${id}`);
        return res.data;
    }
    // to insert post into database
    static async addUser(user){
        const res = await axios.post(url_user, user);
        return res.data;
    }

    // to update post by id
    static async updateUser(id, user){
        const res = await axios.patch(`${url_user}/${id}`, user);
        return res.data;
    }


    // to get single post by id 
    static async deleteUser(id){
        const res = await axios.delete(`${url_user}/${id}`);
        return res.data;
    }


    //Availabilities part

    // to get all the posts from the server
    static async getAllAvailable(){
        const res = await axios.get(url_available);
        return res.data;
    }
    
    // to get single post by id 
    static async getAvailableByID(id){
        const res = await axios.get(`${url_available}/${id}`);
        return res.data;
    }
    //to get the availibillity of a user using his people id
    static async getAvailableByPeopleId(id){
        const res = await axios.get(`${url_available}/bypeople/${id}`);
        return res.data;
    }

    // to insert post into database
    static async addAvailable(available){
        console.log(available);
        const res = await axios.post(url_available,{
            peopleId: available.peopleId,
            day: available.day,
        });
        return res.data;
    }

    // to update post by id
    static async updateAvailable(id, available){
        const res = await axios.patch(`${url_available}/${id}`, available);
        return res.data;
    }


    // to get single post by id 
    static async deleteAvailable(id){
        const res = await axios.delete(`${url_available}/${id}`);
        return res.data;
    }
}