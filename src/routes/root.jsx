import { Link, Outlet} from "react-router-dom";


export default function Root(){
    return (
        <>
            <div id="header">
                <h3 id="header_heading">blog</h3>
                <form>
                    <input type="search" placeholder="Search Blogs here" name="header_search"></input>
                </form>
                <div id="header_links">
                    <Link to={`/client/allBlogPosts`}>All Blogs</Link>
                    <Link to={`/client/allBlogRequests`}>Request Blog</Link>
                    <Link to={`/client/about`}>About</Link>
                </div>
            </div>
            <div id="content">
                <Outlet />
            </div>
            <div id="footer">
                <span>By</span>
                <a href="https://github.com/kawaldhillon5" target="_blank" >Kawal dhillon</a>
            </div>
        </>
    )
}