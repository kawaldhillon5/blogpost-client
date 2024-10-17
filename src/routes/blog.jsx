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
            <div id="blog_title_div_edit">
                <div className="blog_title">{blog.title}</div>   
                <div className="blog_date">{format(blog.date_created,"yyyy/mm/dd")}</div> 
            </div>
            <div id="blog_body_div">{HtmlParser(blog.body)}</div>
            <div id="blog_author">-{`${blog.author.first_name} ${blog.author.last_name}`}</div>
        </div>

    )
}