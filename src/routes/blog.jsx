import { useLoaderData } from "react-router-dom";
import { getBlog } from "../helper-functions"
import HtmlParser from "react-html-parser";

export async function loader({params}){
    const blog = await getBlog(params.blogId);
    return {blog}
}

export default function Blog(){
    const {blog} = useLoaderData();
    return (

        <>  <p>{blog.date_created}</p>
            <p>{blog.title}</p>
            <p>{HtmlParser(blog.body)}</p>
            <p>{`${blog.author.first_name} ${blog.author.last_name}`}</p>
        </>

    )
}