import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import './featuredBlog.css'; // Import CSS
import { getFeaturedBlog } from '../helper-functions';
import { Link } from 'react-router-dom';

const FeaturedBlog = () => {
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBlog = async () => {
      try {
        const response = await getFeaturedBlog();
        console.log(response); 
        if (response.status === 404) {
          throw new Error(`HTTP error! ${response.data}`);
        }
        const data = await response.data.post;
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBlog();
  }, []);

  if (loading) {
    return <div className="loading">Loading featured blog...<div className="loader"></div></div>; 
  }

  if (error) {
    return <div className="error"><span>&#9888;</span> {error}</div>; 
  }

  if (!blog) {
    return <div className="no-blog">No featured blog available.</div>;
  }
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  const removeHtmlTags = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  }

  const truncatedBody = truncateText(removeHtmlTags(blog.body), 350); // Truncate to 200 characters

  return (
    <div id="featured-blog-div">
        <p>Featured Blog</p>
        <Link to={`/blogs/${blog._id}`} className="featured-blog-link"> {/* Wrap with Link */}
          <div className="featured-blog">
            <div className="blog-header">
              <h2>{blog.title}</h2>
              {blog.author && <p className="author">By: {blog.author.first_name} {blog.author.last_name}</p>}
            </div>
            <div className="blog-body">
              {truncatedBody} {/* Display truncated text */}
            </div>
          </div>
        </Link>
    </div>
  );
};

export default FeaturedBlog;