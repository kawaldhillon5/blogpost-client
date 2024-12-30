import {redirect, useLoaderData, Form, useActionData, NavLink, Link } from "react-router-dom";
import { getAllBlogs, getNewBlogs, getPopularAuthors, getPopularBlogs } from "../helper-functions";
import "../css/all-blogs.css";
import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

export async function loader(){

    const [newBlogsRes, popularAuthorsRes, popularBlogsRes] = await Promise.all([getNewBlogs(),
                                                                                getPopularAuthors(),
                                                                                getPopularBlogs(),
    ]);                
    return {newBlogsRes, popularAuthorsRes, popularBlogsRes}; 
}
export default function AllBlogs(){
    const {newBlogsRes, popularAuthorsRes, popularBlogsRes} = useLoaderData();
    const [activeTab, setActiveTab] = useState('new');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
            <div id="blogs-container">
                <div className="tabs">
                    <button
                        className={activeTab === 'new' ? 'active' : ''}
                        onClick={() => handleTabChange('new')}
                    >
                        New Blogs
                    </button>
                    <button
                        className={activeTab === 'popularBlogs' ? 'active' : ''}
                        onClick={() => handleTabChange('popularBlogs')}
                    >
                        Popular Blogs
                    </button>
                    <button
                        className={activeTab === 'popularAuthors' ? 'active' : ''}
                        onClick={() => handleTabChange('popularAuthors')}
                    >
                        Popular Bloggers
                    </button>
                </div>
                <div className="content">
                    {activeTab === 'new' && (
                        <div className="blog-list">
                            <h2>New Blogs</h2>
                            {newBlogsRes.data.map(blog => (
                                <div key={blog._id} className="blog-preview">
                                    <div className="blog-preview-header">
                                        <h3><Link to={`../client/blog/${blog._id}`}>{blog.title}</Link></h3>
                                        <div className="votes-container"><FaThumbsUp /><span>{blog.votes}</span></div>
                                    </div> 
                                    <p>By: {blog.author?.first_name} {blog.author?.last_name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'popularBlogs' && (
                        <div className="blog-list">
                            <h2>Popular Blogs</h2>
                            {popularBlogsRes.data.map(blog => (
                                <div key={blog._id} className="blog-preview">
                                    <div className="blog-preview-header">
                                        <h3><Link to={`../client/blog/${blog._id}`}>{blog.title}</Link></h3>
                                        <div className="votes-container"><FaThumbsUp /><span>{blog.votes}</span></div>
                                    </div> 
                                    <p>By: {blog.author?.first_name} {blog.author?.last_name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'popularAuthors' && (
                        <div className="author-list">
                            <h2>Popular Bloggers</h2>
                            <ul>
                                {popularAuthorsRes.data.map(author => (
                                    <li key={author._id}>
                                        <Link to={`/blogger/${author._id}`}>{author.first_name} {author.last_name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
    )

}