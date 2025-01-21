import { useFetcher, useLoaderData, useOutletContext } from "react-router-dom";
import { formatDate, getBlog, getComments, postComment, postVote } from "../helper-functions"
import HtmlParser from "react-html-parser";
import "../css/blog-detail.css";
import { useEffect } from "react";
import ReqVoteComponent from "../components/request-vote";
import warningSvg from "../assets/images/warning-filled-svgrepo-com.svg";

export async function action({request,params}) {
    const formData = await request.formData();
    if(formData.get("vote")){
        await postVote(params.blogId, 'blog');
    } else {
       await postComment(params.blogId, formData.get("comment"));
    }
    return null; 
}

export async function loader({params}){
    let error = null;
    let blog = null;
    let comments = null;
    try{
        const respBlog = await getBlog(params.blogId);
        const commentsResp = await getComments(params.blogId);
        comments = commentsResp;
        if(respBlog.status === 200){
            blog = respBlog.data;
        } else {
            throw new Error(respBlog.data);
        }
    }catch(err){
        error = err.message;
    }
    return {blog, comments, error};
}

export default function Blog(){
    const {blog, comments, error} = useLoaderData();
    const fetcher = useFetcher(); 
    const user = useOutletContext();
    console.log(blog.tags)
    useEffect(()=>{

        if(user && blog) {
            document.querySelector("#comment_form_in").value = "";
        }
    });

    useEffect(()=>{
        if(blog){
            const tags = document.querySelectorAll('.tag_div');
            styleTags(tags);
        }
    },[]);

    if(error){
        return (
            <div id="blog_error_div_client">
                <img 
                    src= {warningSvg}
                    alt="Caution Icon" 
                    className="caution-icon" 
                /> 
                <div>{error}</div>
            </div>
        )
    }

    return (

        <div id="blog_div">  
            <div id="blog_title_div_detail">
                <div className="blog_title">{blog.title}</div>   
                <div id="blog_title_date_and_count">
                        { user ? 
                        <ReqVoteComponent id={blog._id} type= 'blog' />
                        : null
                    }
                    { blog.tags.length ?
                        <div id="blog_tags_div">
                            {
                              blog.tags.map(tag =>(
                                tag.length ?<div className="tag_div">{tag}</div>: null
                              ))  
                            }
                        </div>
                        : null
                    }
                </div>
                <div className="blog_date">{formatDate(blog.date_created)}</div>
            </div>
            <div id="blog_body_div">{HtmlParser(blog.body)}</div>
            <div id="blog_author">-{`${blog.author.first_name} ${blog.author.last_name}`}</div>
            <div id="comments_div_main">
                <div id="comments_div_header">
                    <div id="comments_header_text">Comments: {blog.comments.length}</div>
                    { user ? 
                        <fetcher.Form method="post" id="comment_post_form">
                            <input required id="comment_form_in" type="text" name="comment" placeholder="Type Your Comment here" />
                            <button  className="comments_new_btn">Post </button>
                        </fetcher.Form> 
                        :null
                    }
                </div>
                    { !(comments.status === 200) 
                        ? <div id="comments_div_error">
                            <i>Could Not Load Comments</i> 
                          </div> 
                          :
                            comments.data.length ? 
                            <div id="comments_div_list">
                                {comments.data.map((comment)=>(
                                    <Comment text={comment.text} date_created={comment.date_created} madeBy={comment.madeBy} key={comment._id} />
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
    const formattedDate = formatDate(date_created);
  
    return (
      <div className="comment">
        <div className="comment-header">
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


function styleTags(tagElements) {
    tagElements.forEach(tag => {
      const randomRed = Math.floor(Math.random() * 256);
      const randomGreen = Math.floor(Math.random() * 256);
      const randomBlue = Math.floor(Math.random() * 256);
      const randomAlpha = Math.random() * 0.5 + 0.3; // Alpha between 0.3 and 0.8 (more visible)

      const randomColor = `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, ${randomAlpha})`;
      const borderColor = `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, ${1})`;

      tag.style.backgroundColor = randomColor;
      tag.style.border = `1px solid, ${borderColor}`
    });
}
  

  
