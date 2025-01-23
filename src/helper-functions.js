import axios from "axios";

const baseURL = process.env.BACKEND_URL;

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
        return response;
    })
    .catch(function(error){
        console.log(error);
        return error.response;
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

export async function isVotedByUser(id, type) {
    return await axios.get(`${baseURL}client/isVoted/${type}/${id}`)
    .then((res)=> {
        return res;
    })
    .catch((error)=>{
        return error.response;
    });
}

export async function getVotes(id, type) {
    return await axios.get(`${baseURL}client/votes/${type}/${id}`)
    .then((res)=> {
        return res;
    })
    .catch((error)=>{
        return error.response;
    });
}

export async function postVote(id,type) {
    return axios.post(`${baseURL}client/vote/${type}/${id}`)
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

export async function getPopularAuthors(skip, limit) {
    try {
        const res = await axios.get(`${baseURL}client/authors/popularAuthors`,{params: {limit: limit, skip: skip}});
        return res;
    } catch (err) {
        console.log(err);
        return err.response;
    } 
}

export async function getNewBlogs(skip, limit) {
    try {
        const res = await axios.get(`${baseURL}client/blogs/newBlogs`, {params: {limit: limit, skip: skip}});
        return res;
    } catch (err) {
        console.log(err);
        return err.response;
    } 
}

export async function getPopularBlogs(skip, limit) {
    try {
        const res = await axios.get(`${baseURL}client/blogs/popularBlogs`, {params: {limit: limit, skip: skip}});
        return res;
    } catch (err) {
        console.log(err);
        return err.response;
    } 
}

export function getRequestFunc(url) {
    return axios.get(`${baseURL}${url}`)
    .then((res)=> {
        return res;
    })
    .catch((error)=>{
        console.log(error)
        return error.response;
    });
}

export function deleteNotification(id){
    return axios.delete(`${baseURL}client/delete/notification/${id}`)
    .then((res)=> {
        return res;
    })
    .catch((error)=>{
        console.log(error)
        return error.response;
    });
}

export function postEditorReq(){
    return axios.post(`${baseURL}client/postEditorReq`)
    .then((res)=> {
        return res;
    })
    .catch((error)=>{
        console.log(error)
        return error.response;
    });
}

export function getBlogsByAuthor(authorId, limit, skip){
    return axios.get(`${baseURL}client/bloggers/${authorId}`, {params: {limit: limit, skip: skip}})
    .then((res)=> {
        return res;
    })
    .catch((error)=>{
        console.log(error)
        return error.response;
    });
}

export function getAuthorDetails(authorId){
    return axios.get(`${baseURL}client/blogger/${authorId}`)
    .then((res)=> {
        return res;
    })
    .catch((error)=>{
        console.log(error)
        return error.response;
    });
}

export async function postBlogData(data, blogId, mode){
    return await axios.post(`${baseURL}editor/updateBlog/${blogId}/${mode}`, data)
    .then((response) => {
        return response.data.id;
    })
    .catch((error)=> {
        console.log(error);
    })
}

export async function getBlogEditor(blogId){
    return await axios.get(`${baseURL}editor/blog/${blogId}`)
    .then((response) => {
        return response.data.post;
    })
    .catch(function(error){
        console.log(error);
    });
}

export async function getMyBlogs(){
    return await axios.get(`${baseURL}editor/myBlogPosts`)
     .then((response) => {
         return response.data.blogs;
     })
     .catch(function(error){
         console.log(error);
     });
 }
 
 export async function postDeleteBlogReq(blogId) {
    return await axios.post(`${baseURL}editor/deleteBlog/${blogId}`)
    .then((response)=>{
        return response;
    })
    .catch((error)=>{
        console.log(error);
        return error.response;
    });
}
