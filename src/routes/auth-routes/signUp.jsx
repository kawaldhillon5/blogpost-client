import { Form, redirect, useActionData } from "react-router-dom";
import { postSignUpData } from "../helper-functions/functions";

export async function action({request,params}) {
    const formData = await request.formData();
    if(formData.get("password1") === formData.get("password2")){
        const formObject = Object.fromEntries(formData.entries());
        formObject.dateCreated = new Date();
        if(formObject.editorReq === undefined){
            formObject.editorReq = "off";
        }
        try{
            const res = await postSignUpData(formObject);
            if(!(res.status === 200)){
                throw new Error(res.data);
            }
        } catch(error){
            return error;
        }
    } else {
        const error = new Error("Password does not match");
        return error;
    }
    return redirect("../authenticate/logIn");
}

export default function SignUp(){
    const error = useActionData(); 
    return (
        <div id="sign_up_div">
            <Form method="post">
            <div id="form-input_div">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" />
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" />
                    <label htmlFor="password1">Password:</label>
                    <input type="password" name="password1"/>
                    <label htmlFor="password2">Confirm Password:</label>
                    <input type="password" name="password2"/>
                    <label htmlFor="editorReq">Editor Request ?</label>
                    <input type="checkbox" name="editor"></input>
                </div>
                <button type="submit">Sign Up</button>
            </Form>
            <span>{(error) ? error.message: null}</span>
        </div>
    )
}