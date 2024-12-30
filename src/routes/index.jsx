import { Link, useLoaderData, useOutletContext } from "react-router-dom"
import "../css/index-route.css"
import {getNewBlogs, getPopularAuthors, getPopularBlogs } from "../helper-functions"
import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import Welcome from "../components/welcome";
import FeaturedBlog from "../components/featured-blog";

export async function loader() {

    return null; 
}
export default function Index(){

    const user = useOutletContext();

    return (

        <div className="home-page-container">
            <div id="blogs-container-home">
            <Welcome />
            <FeaturedBlog />   
            </div>
            <div className="call-to-action">
                {user ? (
                <div>
                    <h2>Ready to Share Your Thoughts?</h2>
                    <Link to="/create-blog" className="write-blog-button">Write Your Blog</Link>
                </div>
                ) : (
                <div>
                    <h2>Join Our Community!</h2>
                    <p>Sign up to share your stories and connect with other readers.</p>
                    <div className='auth-buttons'>
                    <Link to="/authenticate/signUp" className="auth-button">Sign Up</Link>
                    <Link to="/authenticate/logIn" className="auth-button">Log In</Link>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}