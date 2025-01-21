import { Form, Link, redirect, useActionData, useSubmit } from "react-router-dom";
import { postSignUpData } from "../../helper-functions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faSignature } from '@fortawesome/free-solid-svg-icons'; // Import more icons
import { useState } from "react";

export async function action({request,params}) {
    const formData = await request.formData();
    const formObject = Object.fromEntries(formData.entries());
    formObject.dateCreated = new Date();
    if(formData.get("editorReq") === null){
        formObject.editorReq = "off";
    }
    try{
        const res = await postSignUpData(formObject);
        if(!(res.status === 200)){
            throw new Error(res.data);
        } else if(res.status === 200){
            return redirect("../authenticate/logIn");
        }
    } catch(error){
        console.log(error);
        return error.message;
    }
    return null;
}

export default function SignUp(){

    const [isFocused, setIsFocused] = useState({
        username: false,
        firstname: false,
        lastname: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const [passwordError, setPasswordError] = useState(null);
    // const [formErrors, setFormErrors] = useState({}); 
    const error = useActionData();
    console.log(error);   
    
    const validatePassword = (password) => {
        if (password.length < 8) {
        return "Password must be at least 8 characters long.";
        }
        if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
        }
        if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
        }
        if (!/[0-9]/.test(password)) {
        return "Password must contain at least one number.";
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return "Password must contain at least one special character.";
        }
        return null; // Password is valid
    };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const validationError = validatePassword(password);
    setPasswordError(validationError);
  };

  const checkPasswordFields = (e) =>{
    const password = e.target.value;
    const pass1 = document.querySelector('#password1').value;
    let error = null;
    if (password != pass1) {
        error = "Password Fields does not match";
    }
    setPasswordError(error);
  }
    
    return (
        <div className="login-page"> 
        <div className="login-container"> 
            <div className="login-form-container"> 
            <h2>Create Account</h2> 
            <Form method="post" id="signup_form" >
                <div className={`input-wrapper ${isFocused.username ? 'focused' : ''}`}>
                <label htmlFor="username">
                    <FontAwesomeIcon icon={faUser} />
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    required
                    onFocus={() => setIsFocused({ ...isFocused, username: true })}
                    onBlur={() => setIsFocused({ ...isFocused, username: false })}
                />
                </div>
                <div className={`input-wrapper ${isFocused.firstname ? 'focused' : ''}`}>
                <label htmlFor="firstname">
                    <FontAwesomeIcon icon={faSignature} /> 
                </label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="First Name"
                    required
                    onFocus={() => setIsFocused({ ...isFocused, firstname: true })}
                    onBlur={() => setIsFocused({ ...isFocused, firstname: false })}
                />
                </div>
                <div className={`input-wrapper ${isFocused.lastname ? 'focused' : ''}`}>
                <label htmlFor="lastname">
                    <FontAwesomeIcon icon={faSignature} />
                </label>
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Last Name"
                    required
                    onFocus={() => setIsFocused({ ...isFocused, lastname: true })}
                    onBlur={() => setIsFocused({ ...isFocused, lastname: false })}
                />
                </div>
                <div className={`input-wrapper ${isFocused.email ? 'focused' : ''}`}>
                <label htmlFor="email">
                    <FontAwesomeIcon icon={faEnvelope} />
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                    onFocus={() => setIsFocused({ ...isFocused, email: true })}
                    onBlur={() => setIsFocused({ ...isFocused, email: false })}
                />
                </div>
                <div className={`input-wrapper ${isFocused.password ? 'focused' : ''}`}>
                <label htmlFor="password1">
                    <FontAwesomeIcon icon={faLock} />
                </label>
                <input
                    type="password"
                    name="password1"
                    id="password1"
                    placeholder="Password"
                    required
                    onChange={handlePasswordChange}
                    onFocus={() => setIsFocused({ ...isFocused, password: true })}
                    onBlur={() => setIsFocused({ ...isFocused, password: false })}
                />
                </div>
                <div className={`input-wrapper ${isFocused.confirmPassword ? 'focused' : ''}`}>
                <label htmlFor="password2">
                    <FontAwesomeIcon icon={faLock} />
                </label>
                <input
                    type="password"
                    name="password2"
                    id="password2"
                    placeholder="Confirm Password"
                    required
                    onChange={checkPasswordFields}
                    onFocus={() => setIsFocused({ ...isFocused, confirmPassword: true })}
                    onBlur={() => setIsFocused({ ...isFocused, confirmPassword: false })}
                />
                {passwordError && <div className="password-error">{passwordError}</div>}
                </div>
                <div className="signup_in_group"> 
                <label htmlFor="editorReq">Editor Request ?</label>
                <input type="checkbox" name="editorReq" id="editorReq" />
                </div>
                <button type="submit" 
                        className={passwordError? "login_button_disabled login-button":"login_button_enabled login-button"} 
                        disabled={passwordError? true: false}
                >Sign Up</button>
                {error && <div className="error-message">{error}</div>}
                <div className="sign-up-option">
                Already have an account? <Link to="/login">Log In</Link> 
                </div>
            </Form>
            </div>
        </div>
    </div>
    )
}