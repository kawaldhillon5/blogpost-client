import axios from "axios";
const baseURL = "http://localhost:3000/";


export async function getAllBlogs(){
   return axios.get(`${baseURL}client/allBlogPosts`)
    .then((response) => {
        return response.data.posts;
    })
    .catch(function(error){
        console.log(error);
    });
}

export async function getBlog(id){
    axios.get(`${baseURL}client/blog/${id}`)
    .then((response) => {
        return response.data.post;
    })
    .catch(function(error){
        console.log(error);
    });
}