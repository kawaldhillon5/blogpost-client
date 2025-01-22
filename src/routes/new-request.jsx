import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import { postBlogRequest } from "../helper-functions";
import '../css/newBlogRequest.css';

export async function action({request, params}) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    try {
        await postBlogRequest(updates); 
        return redirect('../client/allBlogRequests');
      } catch (error) {
        return {
          status: 400, 
          errors: { 
            message: 'Failed to create blog request. Please try again.' 
          }
        };
      }
}

export default function CreateBlogRequest() {
    const errors = useActionData()
    const navigate = useNavigate();
    return (
        <div id="blog_req_form_div">
            <h2>Create a Blog Request</h2>
          <Form method="post" id="blog_req_form">
            <div id="title_input_div">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title_input" />
              {errors?.title && <p className="error">{errors.title}</p>} 
            </div>
            <div id="desc_input-div">
              <label htmlFor="desc">Description</label>
              <textarea name="desc" id="desc_input" />
              {errors?.desc && <p className="error">{errors.desc}</p>} 
            </div>
            <div id="form_button_div">
              <button type="submit">Submit</button>
              <button type="button" onClick={()=>{navigate('/client/allBlogRequests')}}>Cancel</button>
            </div>
          </Form>
          {errors?.message && (
            <p className="error-message-request">{errors.message}</p>
          )}
        </div>
      );
}