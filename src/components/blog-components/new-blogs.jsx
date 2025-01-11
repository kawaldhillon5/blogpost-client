import { useEffect, useState } from "react";
import { getNewBlogs } from "../../helper-functions";
import { Link } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";

export default function NewBlogs({ErrorComponent}){

    const [newBlogs, setNewBlogs] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function newBlogs() {
            try {
                const response = await getNewBlogs();
                console.log(response);  
                if (response.status === 404) {
                    throw new Error(response.data);
                } else {
                    setNewBlogs(response.data);
                }
            } catch (error) {
                console.error('Error fetching new Blogs:', error);
                setHasError(true);
            }
            finally {
                setLoading(false);
            }
        } newBlogs();
    }, []);

    if (loading) {
        return <div className="loading-blogs"><div className="loader-blogs"></div></div>; 
    }
    
    if(hasError) {
        return(
            <ErrorComponent />
        )
    }    

    return (
        <div className="blog-list">
            <h2>New Blogs</h2>
            {newBlogs.map((blog) => (
                <div key={blog._id} className="blog-preview">
                    <div className="blog-preview-header">
                        <h3><Link to={`../client/blog/${blog._id}`}>{blog.title}</Link></h3>
                        <div className="votes-container"><FaThumbsUp /><span>{blog.votes}</span></div>
                    </div> 
                    <p>By: {blog.author?.first_name} {blog.author?.last_name}</p>
                </div>
            ))}
        </div>
    );
}