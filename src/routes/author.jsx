import { Link, useLoaderData } from "react-router-dom";
import { getAuthorDetails, getBlogsByAuthor } from "../helper-functions";
import '../css/author.css';
import { FaThumbsUp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { max } from "lodash";

export async function loader({params}) {
    let blogger = {};
    let error = null;
    try {
        const res = await getAuthorDetails(params.authorId);
        if(res.status === 200) {
           blogger = res.data;
        }  else {
            throw new Error(res.data);
        }  
    } catch (err) {
        console.log(err);
        error = err.message;
    }
    
    return { blogger, error };
}

export default function Author() {
    const { blogger, error } = useLoaderData();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(error);
    const [skip, setSkip] = useState(0);
    const totalBlogs = blogger.blogs.length;
    const maxBlogsReached = useRef(false);

    const changeSkip = (value) => {
        if((skip + value) < totalBlogs) {
            if((skip + (value*2)) >= totalBlogs) {
                maxBlogsReached.current = true;
            }
            setSkip(skip + value);            
        } 
    }

    useEffect(() => {
        async function fetchBlogs() {
            try {
                setLoading(true);
                const response = await getBlogsByAuthor(blogger._id, 5, skip);
                if(response.status === 200) {
                    if(response.data.blogs.length === blogger.blogs.length) {
                        maxBlogsReached.current = true;
                    }
                    setBlogs([...blogs,...response.data.blogs]);
                } else {
                    throw new Error(response.data);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
                error = error.message;
                setHasError(true);
            }
            finally {
                setLoading(false);
            }
        } fetchBlogs();
    }, [skip]);

    if(hasError) {
        return <div>{error}</div>
    }
    return (
        <div className="blogger-main-div">
            <div className="bloger-details-div">
                <div className="blogger-name-div">
                    <h1>{blogger?.first_name} {blogger?.last_name}</h1>
                </div>
                <div className="blogger-description-div">
                    <p>{blogger?.about}</p>
                    <h3>Blogs: {blogger.blogs.length}</h3>
                </div>
            </div>
            <div className="blogger-blogs-div">
                {loading && <div className="loading-blogs-author"><div className="loader-blogs-author"></div></div>}
                {blogs.map((blog) => (
                    <div key={blog._id} className="blog-preview">
                        <div className="blog-preview-header">
                            <h3><Link to={`../client/blog/${blog._id}`}>{blog.title}</Link></h3>
                            <div className="votes-container"><FaThumbsUp /><span>{blog.votes}</span></div>
                        </div> 
                    </div>
                ))}
                {!(maxBlogsReached.current) ?<button onClick={() => changeSkip(5)}>Load More</button> : null}
            </div>
        </div>
    )   
}