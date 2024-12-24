import { useFetcher, useLoaderData, useOutletContext, useSubmit } from "react-router-dom";
import { getBlog, getUser, isVotedByUser, postVote } from "../helper-functions"
import HtmlParser from "react-html-parser";
import { format } from "date-fns";
import "../css/blog-detail.css";

export async function action({request,params}) {
    const formData = await request.formData();
    return await postVote(params.blogId);
}

export async function loader({params}){
    const blog = await getBlog(params.blogId);
    const isVoted = await isVotedByUser(params.blogId);
    return {blog, isVoted};
}

export default function Blog(){
    const {blog, isVoted} = useLoaderData();
    const fetcher = useFetcher(); 
    const voted = fetcher.formData ? fetcher.formData.get("vote") === "false" : isVoted === 200 ? true: false;
    return (

        <div id="blog_div">  
            <div id="blog_title_div_detail">
                <div className="blog_title">{blog.title}</div>   
                <div id="blog_title_date_and_count">
                    <div className="blog_date">{format(blog.date_created,"yyyy/mm/dd")}</div>
                    <fetcher.Form method="post" className="votes_comments_main_details_page">
                        <button name="vote"
                                value={voted ? "true": "false"}
                                className={`${voted ? "vote_btn_blue votes_count": "vote_btn_grey votes_count"}`}
                        ></button>
                    </fetcher.Form>
                </div>
            </div>
            <div id="blog_body_div">{HtmlParser(blog.body)}</div>
            <div id="blog_author">-{`${blog.author.first_name} ${blog.author.last_name}`}</div>
            <div id="comments_div_main">
                <div id="comments_div_header">
                    <div id="comments_header_text">Comments {blog.comments.length}</div>
                    <button id="comments_new_btn">New </button>
                </div>
                    { blog.comments.length ? 
                        <div id="comments_div_list">
                        </div> :
                        null
                    }
            </div>
        </div>
    )
}
