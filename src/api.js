import axios from 'axios';
const url_user = "/people";
const url_available = "/available";

export default class API{
    //Users part
    // to get all the posts from the server
    static async getAllUser(){
        const res = await axios.get(url_user);
        console.log(res.data);
        return res.data;
    }
    
    // to get single post by id 
    static async getUserByID(id){
        const res = await axios.get(`${url_user}/${id}`);
        return res.data;
    }
    // to insert post into database
    static async addPost(post){
        const res = await axios.post(url_user, post);
        return res.data;
    }

    // to update post by id
    static async updatePost(id, post){
        const res = await axios.patch(`${url_user}/${id}`, post);
        return res.data;
    }


    // to get single post by id 
    static async deletePost(id){
        const res = await axios.delete(`${url_user}/${id}`);
        return res.data;
    }


    //Availabilities part

    // to get all the posts from the server
    static async getAllPost(){
        const res = await axios.get(url_available);
        console.log(res.data);
        return res.data;
    }
    
    // to get single post by id 
    static async getPostByID(id){
        const res = await axios.get(`${url_available}/${id}`);
        return res.data;
    }
    // to insert post into database
    static async addPost(post){
        const res = await axios.post(url_available, post);
        return res.data;
    }

    // to update post by id
    static async updatePost(id, post){
        const res = await axios.patch(`${url_available}/${id}`, post);
        return res.data;
    }


    // to get single post by id 
    static async deletePost(id){
        const res = await axios.delete(`${url_available}/${id}`);
        return res.data;
    }
}