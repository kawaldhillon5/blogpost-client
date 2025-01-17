import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

import {debounce} from 'lodash';
import './blog-search.css'; 
import { searchBlogs } from '../helper-functions';

const BlogSearch = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResultsBlogs, setsearchResultsBlogs] = useState([]);
    const [searchResultsBloggers, setsearchResultsBloggers] = useState([]);
    const [searchResultsReqs, setsearchResultsReqs] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const searchResultsRef = useRef(null);
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = async (query) => {
        if (!query) {
            setsearchResultsBlogs([]);
            setsearchResultsBloggers([]);
            setsearchResultsReqs([]);
            setIsLoading(false); // Stop loading if query is empty
            return;
        }

        setIsLoading(true); // Start loading

        try {
            const response = await searchBlogs(query);
            console.log(response.data);
            const data = await response.data;
            if(data.blogs.length){
                setsearchResultsBlogs(data.blogs);
            } else {
                setsearchResultsBlogs([null]);
            }

            if(data.bloggers.length){
                setsearchResultsBloggers(data.bloggers);
            } else {
                setsearchResultsBloggers([null]);
            }

            if(data.reqs.length){
                setsearchResultsReqs(data.reqs);
            } else {
                setsearchResultsReqs([null]);
            }
            
        } catch (error) {
            console.error('Error searching blogs:', error);
            setsearchResultsBlogs([]);
        } finally {
            setIsLoading(false); // Stop loading regardless of success/failure
        }
    };

    const debouncedSearch = useRef(debounce(handleSearch, 300)).current; 


    const handleChange = (event) => {
        const query = event.target.value;
        console.log("handleChange called with:", query);
        setSearchQuery(query);
        debouncedSearch(query);
    };

    const handleSearchButtonClick = () => {
        if (inputRef.current) {
            handleSearch(searchQuery);
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchResultsRef.current && !searchResultsRef.current.contains(event.target) && !inputRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchResultsRef]);

    return (
        <div className="search-container">
            <div className={`search-input-wrapper`}>
                <input
                    type="search"
                    placeholder="Search blogs..."
                    value={searchQuery}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    ref={inputRef}
                />
                <button className="search-button" onClick={handleSearchButtonClick} disabled={isLoading}>
                    {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faSearch} />}
                </button>
            </div>
                {  isFocused && (searchResultsBlogs.length > 0 || searchResultsBloggers.length > 0 || searchResultsReqs.length>0) &&   
                <div className='search-results' ref={searchResultsRef}>
                    { isFocused &&  searchResultsBlogs.length > 0 && (
                        <div className='search-result-div'>
                            <div className='search-result-div-header'>Blogs</div>
                            <ul className="search-results-list" >
                                { searchResultsBlogs[0] === null ? <li key={1} className="search-result-item">No Blogs found</li>  
                                    :
                                        searchResultsBlogs.map(blog => (
                                        <li key={blog._id} className="search-result-item">
                                            <a  href={`/client/blog/${blog._id}`}>{blog.title}  <div className="search-result-item-author">-{blog.author.first_name} {blog.author.last_name}</div></a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        )
                    }
                    { isFocused &&  searchResultsBloggers.length > 0 && (
                        <div className='search-result-div'>
                            <div className='search-result-div-header'>Bloggers</div>
                            <ul className="search-results-list" >
                                { searchResultsBloggers[0] === null ? <li key={1} className="search-result-item">No Bloggers found</li>  
                                    :
                                        searchResultsBloggers.map(blogger => (
                                        <li key={blogger._id} className="search-result-item">
                                            <a  href={`/blogger/${blogger._id}`}>{blogger.first_name} {blogger.last_name}</a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        )
                    }
                    {
                        isFocused && searchResultsReqs.length > 0 && (
                            <div className='search-result-div'>
                                <div className='search-result-div-header'>Requests</div>
                                <ul className="search-results-list" >
                                    { searchResultsReqs[0] === null ? <li key={1} className="search-result-item">No Requests found</li>  
                                        :
                                            searchResultsReqs.map(req => (
                                            <li key={req._id} className="search-result-item">
                                                <a  href={`/client/request/${req._id}`}>{req.title}</a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        )
                    }
                </div>
                }  
        </div>
    );
};

export default BlogSearch;
