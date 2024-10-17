import { NavLink, Link, Outlet, useLoaderData, Navigate, useNavigate, redirect, Form} from "react-router-dom";
import { getUser, LogOut } from "../helper-functions";
import { useEffect, useState } from "react";

export async function action() {
    await LogOut();
    return redirect('/');
}   

export async function loader() {
    const user = await getUser()
    return {user}
}

export default function Root(){

    const [isLogged, setIsLogged] = useState(false);
    const {user} = useLoaderData();
    const navigate = useNavigate();

    useEffect(()=>{
        function func() {
           const u = user
           if(u.user){
               setIsLogged(true);
           } else {
               setIsLogged(false);
           }
       } func();
   })

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
                    {isLogged ? <Form method="post"><button type="submit">Log Out</button></Form> : <button onClick={handleLogIn}>Log In</button>}
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