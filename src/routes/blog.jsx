import { useLoaderData } from "react-router-dom";
import { getBlog } from "../helper-functions"
import HtmlParser from "react-html-parser";
import { format } from "date-fns";
import "../css/blog-detail.css";

export async function loader({params}){
    const blog = await getBlog(params.blogId);
    return {blog}
}

export default function Blog(){
    const {blog} = useLoaderData();
    return (

        <div id="blog_div">  
            <div id="blog_title_div_detail">
                <div className="blog_title">{blog.title}</div>   
                <div id="blog_title_date_and_count">
                    <div className="blog_date">{format(blog.date_created,"yyyy/mm/dd")}</div>
                    <div className="votes_comments_main_details_page">
                        <div className="votes_count">{blog.votes}</div>
                        <div className="comments_count">{blog.comments.length}</div>
                    </div>
                </div>
            </div>
            <div id="blog_body_div">{HtmlParser(blog.body)}</div>
            <div id="blog_author">-{`${blog.author.first_name} ${blog.author.last_name}`}</div>
        </div>

    )
}