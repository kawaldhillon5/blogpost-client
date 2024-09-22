import { Form, redirect, useActionData } from "react-router-dom";
import { postSignUpData } from "../../helper-functions";

export async function action({request,params}) {
    const formData = await request.formData();
    try {
        const res = await postSignUpData({
            username: formData.get("username"),
            password: formData.get("password"),
            email: formData.get("email"),
            editorReq: formData.get("editorReq"),
            dateCreated: new Date()
        });
        if(!(res.status === 200)){
            throw new Error(res.data);
            
        }
    } catch(error){
        return error
    }
    return redirect('/authenticate/logIn');
}

export default function SignUp() {
    let error = useActionData()
    if(error === undefined){
        error = "";
    }
    return (
        <div id="sign_up_div">
            <p>Sign Up</p>
            <Form method= "post" >
                <div id="form_input_div">
                    <div className="input_group">
                        <label htmlFor="username">Username</label>
                        <input type="text"  name="username" />
                    </div>
                    <div className="input_group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" />
                    </div>
                    <div className="input_group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" />
                    </div>
                    <div className="input_group_checkbox">
                        <label htmlFor="editorReq">Request to become Editor ?</label>
                        <input type="checkbox" name="editorReq"  />
                    </div>
                </div>
                <button type="submit" >Sign Up</button>
                <span> {error.message}</span>
            </Form>
        </div>
    )
}