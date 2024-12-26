import axios from "axios";
import { ca } from "date-fns/locale";
const baseURL = "http://localhost:3000/";

axios.defaults.withCredentials = true;

export async function getAllBlogs(){
   return await axios.get(`${baseURL}client/allBlogPosts`, {withCredentials: true})
    .then((response) => {
        return response.data.posts;
    })
    .catch(function(error){
        console.log(error);
    });
}
axios.defaults.withCredentials = true;
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

export async function postSignUpData(data) {
    return axios.post(`${baseURL}authenticate/signUp`,{data : data})
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return error.response
    });
}

export async function logIn(username, password){
    return await axios.post(`${baseURL}authenticate/logIn`, 
        {username: username, password: password}, 
        {withCredentials: true, credential: "include"})
    .then((response)=>{
        return response;
    })
    .catch((error)=>{
        return error.response;
    })
}

export async function LogOut(){
    return await axios.post(`${baseURL}authenticate/logOut`)
    .then((res)=> {
        return res.data.message;
    })
    .catch((error)=>{
        console.log(error);
    })
    
}

export async function getUser(){
    return await axios.get(`${baseURL}authenticate/user`)
    .then((response) =>{
        return response.data;
    })
    .catch((error) =>{
        console.log(error.data);
    });
}

export async function isVotedByUser(blogId) {
    return await axios.get(`${baseURL}client/isVoted/${blogId}`)
    .then((res)=> {
        return res.status;
    })
    .catch((error)=>{
        return error.response.status;
    });
}

export async function postVote(blogId) {
    return await axios.post(`${baseURL}client/vote/${blogId}`)
    .then((res)=> {
        return res.status;
    })
    .catch((error)=>{
        console.log(error);
        return error.response.status;
    })
}

export async function getComments(blogId) {
    return await axios.get(`${baseURL}client/blog/comments/${blogId}`)
    .then((res)=> {
        return res;
    })
    .catch((error)=>{
        console.log(error)
        return error.response;
    });
}

export async function postComment(blogId, comment) {
    return await axios.post(`${baseURL}client/blog/postComment/${blogId}`,{data:comment})
    .then((res)=> {
        return res;
    })
    .catch((error)=>{
        console.log(error)
        return error.response;
    });
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export  async function searchBlogs(query){
    try {
        const res = await axios.get(`${baseURL}client/blogs?search=${query}`);
        return res;
    } catch (err) {
        console.log(err);
        return err.res;
    } 
}

export async function getPopularAuthors() {
    try {
        const res = await axios.get(`${baseURL}client/authors/popularAuthors`);
        return res;
    } catch (err) {
        console.log(err);
        return err.res;
    } 
}

export async function getNewBlogs() {
    try {
        const res = await axios.get(`${baseURL}client/blogs/newBlogs`);
        return res;
    } catch (err) {
        console.log(err);
        return err.res;
    } 
}

export async function getPopularBlogs() {
    try {
        const res = await axios.get(`${baseURL}client/blogs/popularBlogs`);
        return res;
    } catch (err) {
        console.log(err);
        return err.res;
    } 
}