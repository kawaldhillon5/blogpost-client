import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPopularBlogs } from "../../helper-functions";
import { FaThumbsUp } from "react-icons/fa";

export default function PopularBlogs({ErrorComponent}){

    const [popularBlogs, setPopularBlogs] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingList, setLoadingList] = useState(true);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        async function getpopularBlogs() {
            setLoadingList(true);
            try {
                const response = await getPopularBlogs(skip, 5);
                if (response.status === 404) {
                    throw new Error(response.data);
                } else {
                    setPopularBlogs([...popularBlogs, ...response.data]);
                }
            } catch (error) {
                console.error('Error fetching popular Blogs:', error);
                setHasError(true);
            }
            finally {
                setLoadingList(false);
                setLoading(false);
            }
        } getpopularBlogs();
    }, [skip]);

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
            {loadingList && <div className="loading-blogs-author"><div className="loader-blogs-author"></div></div>}
            <h2>Popular Blogs</h2>
            {popularBlogs.map((blog) => (
                <div key={blog._id} className="blog-preview">
                    <div className="blog-preview-header">
                        <h3><Link to={`../client/blog/${blog._id}`}>{blog.title}</Link></h3>
                        <div className="votes-container"><FaThumbsUp /><span>{blog.votes}</span></div>
                    </div> 
                    <p>By: {blog.author?.first_name} {blog.author?.last_name}</p>
                </div>
            ))}
            {<button onClick={() => setSkip(skip + 5)}>Load More</button>}
        </div>
    );
}