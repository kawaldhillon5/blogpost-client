import { Link, redirect, useLoaderData, useSubmit, Form, useActionData } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState} from "react";
import "../css/blog-editor.css";
import { getBlogEditor, postBlogData } from "../helper-functions";


export async function action({request, params}){
    const formData = await request.formData();
    const tagsArray = formData.get("blog_tags").split(',');
    const tagsArrayTrimmed = tagsArray.map(tag => {
        return tag.trim();
    });
   
    const resp = await postBlogData({title:formData.get("blog_title_edit"), body: formData.get("blog_body_edit"), tags: tagsArrayTrimmed}, params.blogId, formData.get("button"));
    if(resp){
        return redirect(`/editor/blog/edit/${resp}`);
    }
    return "Something went wrong";
}

export async function loader({params}) {
    const mode = params.mode;
    const blog = mode === "new" ? {title: "", body: "", tags: []} : await getBlogEditor(params.blogId);
    return {blog, mode};
}

export default function EditBlog() {
    const [titleMinimised, setMinimised] = useState(false);
    const {blog, mode}= useLoaderData();
    const [title, setTitle] = useState(blog.title);
    const [tags, setTags] = useState(blog.tags.toString());
    const actionData = useActionData();
    console.log(actionData);
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
                        formData.append("blog_title_edit", title);
                        formData.append("blog_tags", tags);
                        formData.append("button", 'save');
                        submit(formData, { method: "post" });
                    }}>Save</button>
                    <button type="button" onClick={(e) => {
                        e.preventDefault();
                        let formData = new FormData();
                        formData.append("blog_body_edit", getMCEData());
                        formData.append("blog_title_edit", title);
                        formData.append("blog_tags", tags);
                        formData.append("button", "finish");
                        submit(formData, { method: "post" });
                    }}>Finish</button>
                </div>
            </Form>
        </div>
    )
}
