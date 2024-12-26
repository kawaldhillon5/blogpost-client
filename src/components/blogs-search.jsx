import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

import {debounce} from 'lodash';
import './blog-search.css'; 
import { searchBlogs } from '../helper-functions';

const BlogSearch = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const searchResultsRef = useRef(null);
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = async (query) => {
        console.log("handleSearch called with:", query);
        if (!query) {
            setSearchResults([]);
            setIsLoading(false); // Stop loading if query is empty
            return;
        }

        setIsLoading(true); // Start loading

        try {
            const response = await searchBlogs(query);
            const data = await response.data
            if(data.length){
                setSearchResults(data);
            } else {
                setSearchResults([null]);
            }
            
        } catch (error) {
            console.error('Error searching blogs:', error);
            setSearchResults([]);
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
            { isFocused &&  searchResults.length > 0 && (
                <ul className="search-results" ref={searchResultsRef}>
                    { searchResults[0] === null ? <li key={1} className="search-result-item">No Results found</li>  
                        :
                            searchResults.map(blog => (
                            <li key={blog._id} className="search-result-item">
                                <a  href={`/client/blog/${blog._id}`}>{blog.title}  <div className="search-result-item-author">-{blog.author.first_name} {blog.author.last_name}</div></a>
                            </li>
                        ))
                    }
                </ul>
            )}
        </div>
    );
};

export default BlogSearch;
