import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./popular_bloggers.css";
import {  getPopularAuthors } from "../../helper-functions";


function PopularBloggers({ ErrorComponent }) {
  const [popularAuthors, setPopularAuthors] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function popularAuthors() {
        try {
            const response = await getPopularAuthors();
            console.log(response);  
            if (response.status === 404) {
                throw new Error(response.data);
            } else {
                setPopularAuthors(response.data);
            }
        } catch (error) {
            console.error('Error fetching popular Bloggers:', error);
            setHasError(true);
        }
        finally {
            setLoading(false);
        }
    } popularAuthors();
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
    <div className="author-list">
      <h2>Popular Bloggers</h2>
      <ul>
        {popularAuthors.map((author) => (
          <li key={author._id}>
            <Link to={`/blogger/${author._id}`}>
              {author.author_details[0].first_name} {author.author_details[0].last_name}
            </Link>
            <div className="author-stats">
              <span>
                <b>Blogs:</b> {author.author_details[0].blogs.length}
              </span>
              <span>
                <b>Votes:</b> {author.totalVotes}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopularBloggers;