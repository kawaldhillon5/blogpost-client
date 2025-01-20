import { Link, redirect, useLoaderData, useSubmit, Form } from "react-router-dom";
// import { getBlog, postBlogData, postFinishedblog } from "../helper-functions/functions";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState} from "react";
import "../css/blog-editor.css";
import { set } from "lodash";

export async function loader({params}) {
    const mode = params.mode;
    const blog = mode === "new" ? {title: "", body: "", tags: []} : {title: "", body: "", tags: []};
    return {blog, mode};
}

export default function EditBlog() {
    const [titleMinimised, setMinimised] = useState(false);
    const {blog, mode}= useLoaderData();
    const [title, setTitle] = useState(blog.title);
    const [tags, setTags] = useState(blog.tags.toString());
    const editorRef = useRef(null);
    const submit = useSubmit();
    const getMCEData = () => {
        if (editorRef.current) {
          return editorRef.current.getContent();
        }
    };

    const toggleMinimize = () => {
        setMinimised(!titleMinimised);
    };


    return (
        
        <div id="blog_edit_div">
           <div className="edit-blog-header">
                <div>{mode === "new" ? "Create New Blog" : "Edit Blog"}</div>
                <button type="button" onClick={toggleMinimize}>
                    {titleMinimised ? "Expand" : "Minimize"}
                </button>
            </div>
            <Form method="post" id="blog_edit_form">
                {!titleMinimised && (
                    <>
                        <div className="input-group">
                            <label htmlFor="edit_title_input">Blog Title:</label>
                            <input
                                id="edit_title_input"
                                name="blog_title_edit"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="edit_tags_input">Tags:</label>
                            <input
                                id="edit_tags_input"
                                name="blog_tags"
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </div>
                    </>
                )}
                <div id="body_edit_div" className="input-group">
                <div className="tinymce-container">
                    <label htmlFor="blog_body">Body:</label>
                    <Editor
                        apiKey='t2hjlizfwre228cruv3b99ekjahquf6qqc7o788ludexidvk'
                        onInit={(_evt, editor) => editorRef.current = editor}
                        initialValue={blog.body}
                        onFocus={() => {setMinimised(true);console.log("focus")}}
                        init={{
                            
                            width: '100%', 
                            menubar: true, 
                            plugins: [
                                'advlist autolink lists link image charmap preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table code help wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help | image media link', 
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }', // Set a reasonable font size
                            
                        }}
                    />
                    </div>
                </div>
                <div id="blog_edit_btns">
                    <button type="button" onClick={(e) => {
                        e.preventDefault();
                        let formData = new FormData();
                        formData.append("blog_body_edit", getMCEData());
                        formData.append("blog_title_edit", document.querySelector("#edit_title_input").value);
                        formData.append("blog_tags", document.querySelector("#edit_tags_input").value);
                        formData.append("save_button", true);
                        submit(formData, { method: "post" });
                    }}>Save</button>
                    <button type="button" onClick={(e) => {
                        e.preventDefault();
                        let formData = new FormData();
                        formData.append("blog_body_edit", getMCEData());
                        formData.append("blog_title_edit", document.querySelector("#edit_title_input").value);
                        formData.append("blog_tags", document.querySelector("#edit_tags_input").value);
                        formData.append("finish_button", true);
                        submit(formData, { method: "post" });
                    }}>Finish</button>
                </div>
            </Form>
        </div>
    )
}
