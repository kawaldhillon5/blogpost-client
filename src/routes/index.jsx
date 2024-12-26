import { Link, useLoaderData, useOutletContext } from "react-router-dom"
import documImg from "../assets/images/document-Img.jpg"
import "../css/index-route.css"
import { getAllBlogs, getNewBlogs, getPopularAuthors, getPopularBlogs } from "../helper-functions"
import { useState } from "react";

export async function loader() {
    const newBlogsRes = await getNewBlogs();
    const popularAuthorsRes = await getPopularAuthors();
    const popularBlogsRes = await getPopularBlogs();
    return {newBlogsRes, popularAuthorsRes, popularBlogsRes}; 
}
export default function Index(){

    const {newBlogsRes, popularAuthorsRes, popularBlogsRes} = useLoaderData();
    const [blogs, setBlogs] = useState(newBlogsRes.data);
    const [popularAuthors, setPopularAuthors] = useState(popularAuthorsRes.data);
    const [activeTab, setActiveTab] = useState('new');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    // const user = useOutletContext();
    // console.log(user);
    return (
        // <div id="index_div">
        //     <div id="index_left_side">
        //         <img id="docu_img" src={documImg}></img>
        //     </div>
        //     <div id="index_right_side">
        //         <div id="index_div_wlcm_msg">
        //             Welcome to the Blog Site
        //         </div>
        //         {
        //             (user === null) ?
        //             <div id="auth_form_div">
        //                 <Link to={'/authenticate/logIn'} className="auth_link">Log In</Link>
        //                 <p>Or</p>
        //                 <Link to={'/authenticate/signUp'} className="auth_link">Sign Up</Link>
        //             </div> :
        //             <div id="index_user_name">{user.username}</div>
        //         }
        //     </div>
        // </div>
        <div className="home-page-container">
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
                    Popular Authors
                </button>
            </div>

            <div className="content">
                {activeTab === 'new' && (
                    <div className="blog-list">
                        <h2>New Blogs</h2>
                        {blogs.map(blog => (
                            <div key={blog._id} className="blog-preview">
                                <h3><a href={`client/blog/${blog._id}`}>{blog.title}</a></h3> {/* Link to blog details page */}
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
                                <h3><a href={`client/blog/${blog._id}`}>{blog.title}</a></h3> {/* Link to blog details page */}
                                <p>By: {blog.author?.first_name} {blog.author?.last_name}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'popularAuthors' && (
                    <div className="author-list">
                        <h2>Popular Authors</h2>
                        <ul>
                            {popularAuthors.map(author => (
                                <li key={author._id}>
                                    <a href={`/author/${author._id}`}>{author.first_name} {author.last_name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}