import axios from "axios";
const baseURL = "http://localhost:3000/";

export async function getAllBlogs(){
    let posts = {};
    await axios.get(`${baseURL}client/allBlogPosts`)
    .then((response) => {
        posts = response.data.posts;
    })
    .catch(function(error){
        console.log(error);
    });
    return posts;
}

export async function getBlog(blogId){
    let post = {}
    await axios.get(`${baseURL}client/blog/${blogId}`)
    .then((response) => {
        post = response.data.post;
    })
    .catch(function(error){
        console.log(error);
    });
    return post;
}