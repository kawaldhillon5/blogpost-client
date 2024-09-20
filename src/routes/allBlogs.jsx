import { Link, useLoaderData } from "react-router-dom";
import { getAllBlogs } from "../helper-functions";


export async function loader(){
    const posts = await getAllBlogs();
    return {posts};
}
export default function AllBlogs(){
    const {posts} = useLoaderData();

    return (
        <div id="all-blogs-div">
            {posts.length ? (
                    <ul>
                        {posts.map(post =>
                            (<li key={post._id}>
                                <Link to={`../client/blog/${post._id}`}>{post.title}</Link>
                                <div className="post-link-author">{post.author.last_name}</div>
                            </li>)
                        )}
                    </ul>
                ):(
                    <i>No Posts</i>
                )
            }
        </div>
    )

}