import { useFetcher, useLoaderData, useOutletContext, useSubmit } from "react-router-dom";
import { getBlog, getComments, getUser, isVotedByUser, postComment, postVote } from "../helper-functions"
import HtmlParser from "react-html-parser";
import { format } from "date-fns";
import "../css/blog-detail.css";
import { useEffect } from "react";

export async function action({request,params}) {
    const formData = await request.formData();
    if(formData.get("vote")){
        await postVote(params.blogId);
    } else {
       await postComment(params.blogId, formData.get("comment"));
    }
    return null; 
}

export async function loader({params}){
    const blog = await getBlog(params.blogId);
    const isVoted = await isVotedByUser(params.blogId);
    const comments = await getComments(params.blogId);
    return {blog, isVoted, comments};
}

export default function Blog(){
    const {blog, isVoted, comments} = useLoaderData();
    const fetcher = useFetcher(); 
    const voted = fetcher.formData ? fetcher.formData.get("vote") === "false" : isVoted === 200 ? true: false;
    console.log(comments);

    useEffect(()=>{
        document.querySelector("#comment_form_in").value = "";
    })

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
                    <div id="comments_header_text">Comments: {blog.comments.length}</div>
                    <fetcher.Form method="post" id="comment_post_form">
                        <input required id="comment_form_in" type="text" name="comment" placeholder="Type Your Comment here" />
                        <button  className="comments_new_btn">Post </button>
                    </fetcher.Form>
                </div>
                    { !(comments.status === 200) 
                        ? <div id="comments_div_error">
                            <i>Could Not Load Comments</i> 
                          </div> 
                          :
                            comments.data.comments.length ? 
                            <div id="comments_div_list">
                                {comments.data.comments.map((comment)=>(
                                    <Comment text={comment.text} date_created={comment.date_created} madeBy={comment.madeBy} />
                                ))
                                }
                            </div> :
                            null
                    }
            </div>
        </div>
    )
}
const Comment = ({ text, date_created, madeBy }) => {
    const formattedDate = new Date(date_created).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    return (
      <div className="comment">
        <div className="comment-header"> {/* New header section */}
          <span className="comment-author">
            {/* Display "Anonymous" if madeBy is not available or not a valid ObjectId */}
            {madeBy.userName || "Anonymous"}
          </span>
          <span className="comment-date">{formattedDate}</span>
        </div>
        <p className="comment-text">{text}</p>
      </div>
    );
  };
  
