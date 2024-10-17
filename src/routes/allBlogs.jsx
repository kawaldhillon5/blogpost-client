import {redirect, useLoaderData, Form, useActionData, NavLink } from "react-router-dom";
import { getAllBlogs } from "../helper-functions";
import "../css/all-blogs.css";

export async function loader(){
    const blogs = await getAllBlogs();
    return {blogs};
}
export default function AllBlogs(){
    const {blogs} = useLoaderData();
    return (
        <div id="blogs_div_main">
            {blogs.length ? (
                    <div id="blogs_div">
                        <div id="blogs_header">
                            <div id="blogs_div_title">All Blogs</div>
                        </div>
                        <ul id="blogs_list">
                            {blogs.map(blog =>
                                (<li className="blogs_list_item" key={blog._id}>
                                    <NavLink className={({ isActive, isPending }) =>
                                            isActive
                                            ? "blog_list_item_a active"
                                            : isPending
                                            ? "blog_list_item_a pending"
                                            : "blog_list_item_a"
                                        }to={`../client/blog/${blog._id}`}>{blog.title} <div className="blog_list_item_author">-{blog.author.last_name}</div>
                                        <div
                                        id="search-spinner"
                                        aria-hidden
                                        hidden={false}
                                        />
                                     </NavLink>
                                </li>)
                            )}
                        </ul>
                    </div>
                ):(
                    <div id="no_blogs_div">
                        <i>No Posts</i>
                    </div>
                )
            }
        </div>
    )

}