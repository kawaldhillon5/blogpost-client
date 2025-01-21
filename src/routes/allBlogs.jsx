import "../css/all-blogs.css";
import { useEffect, useState } from "react";
import PopularBloggers from "../components/blog-components/popular_bloggers";
import PopularBlogs from "../components/blog-components/popular-blogs";
import NewBlogs from "../components/blog-components/new-blogs";


export default function AllBlogs(){
    const [activeTab, setActiveTab] = useState('new');

    useEffect(() => {
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
            setActiveTab(savedTab);
        }
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        localStorage.setItem('activeTab', tab);
    };

    return (
            <div id="blogs-container">
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
                        Popular Bloggers
                    </button>
                </div>
                <div className="content">
                    {activeTab === 'new' && (
                        < NewBlogs />
                    )}
                    {activeTab === 'popularBlogs' && (
                        <PopularBlogs />
                    )}
                    {activeTab === 'popularAuthors' && (
                        < PopularBloggers />
                    )}
                </div>
            </div>
    )

}