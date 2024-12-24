import { NavLink, Link, Outlet, useLoaderData, Navigate, useNavigate, redirect, Form} from "react-router-dom";
import { getUser, LogOut } from "../helper-functions";
import { useEffect, useState } from "react";

export async function action() {
    await LogOut();
    return redirect('/');
}   

export async function loader() {
    
    let user = null;

    try{
        const res = await getUser();
        if(res){
            if(res.status === 200){
                user = res
                return user; 
            } else if(res.status === 401) {
                return user;
            } else {
                throw new Error("Cannot get user");
            }
        } throw new Error("Server Error");
    } catch(error){
        console.log(error.message);
        throw error
        
    }

}

export default function Root(){

    const user = useLoaderData();
    const navigate = useNavigate();


   const handleLogIn = () => {
       navigate('authenticate/logIn');
   }



    return (
        <>
            <div id="header">
                <Link to={"/"} id="header_heading">blog</Link>
                <form>
                    <input type="search" placeholder="Search Blogs and Requests here" name="header_search"></input>
                </form>
                <div id="header_links">
                    <NavLink className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    } to={`/client/allBlogPosts`}>Blogs</NavLink>
                    <NavLink className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }to={`/client/allBlogRequests`}>Blog Requests</NavLink>
                    <NavLink className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    } to={`/editor/about`}>About</NavLink>
                    {user ? <Form method="post"><button type="submit">Log Out</button></Form> : <button onClick={handleLogIn}>Log In</button>}
                </div>
            </div>
            <div id="content">
                <Outlet context={user}/>
            </div>
            <div id="footer">
                <span>By</span>
                <a href="https://github.com/kawaldhillon5" target="_blank" >Kawal dhillon</a>
            </div>
        </>
    )
}