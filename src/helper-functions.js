import axios from "axios";
const baseURL = "http://localhost:3000/";

export async function getAllBlogs(){
   return await axios.get(`${baseURL}client/allBlogPosts`)
    .then((response) => {
        return response.data.posts;
    })
    .catch(function(error){
        console.log(error);
    });
}

export async function getBlog(blogId){
    
    return await axios.get(`${baseURL}client/blog/${blogId}`)
    .then((response) => {
        return response.data.post;
    })
    .catch(function(error){
        console.log(error);
    });
}

export async function getAllBlogRequests(){
    return await axios.get(`${baseURL}client/allBlogRequests`)
    .then((response)=> {
        return response.data.requests;
    })
    .catch(function(error) {
        console.log(error);
    });
}

export async function getBlogRequest(reqId){
    return await axios.get(`${baseURL}client/requestBlog/${reqId}`)
    .then((response) => {
        return response.data.request;
    })
    .catch((error) => {
        console.log(error);
   });
}

export async function postBlogRequest(data) {
    return axios.post(`${baseURL}client/newBlogRequest`, data)
    .then((response) => {
        return response.data
    })
    .catch((error)=> {
        console.log(error);
    })
}