import { Form, Link, redirect, useActionData, useLoaderData, useLocation } from "react-router-dom";
import { logIn } from "../../helper-functions";
import './auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
export async function action({request, params}) {
    const formData = await request.formData();
    try {
        const response = await logIn(formData.get("username"), formData.get("password"));
        console.log(response);
        if(!(response.status === 200)) {
            throw new Error(response.data);
        }
    } catch (error){
        console.log(error.message);
        return error.message;
    } 
    const previousLocation = JSON.parse(formData.get('previousLocation'));
    console.log(previousLocation);
    if (previousLocation) {
        return redirect(`${previousLocation}`)
      }
    return redirect('/');
}

export default function LogIn(){
    let error = useActionData()
    const location = useLocation();
    const [isFocused, setIsFocused] = useState({ username: false, password: false });

    return (
        <div className="login-page">
        <div className="login-container">
          <div className="login-form-container">
            <h2>Welcome Back</h2>
            <p className="login-subtitle">Log in to continue</p>
            <Form method="post" id="log_in_form">
              <input type="hidden" name="previousLocation" value={JSON.stringify(location.state?.from || '/')} />
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
              <div className={`input-wrapper ${isFocused.password ? 'focused' : ''}`}>
                <label htmlFor="password">
                  <FontAwesomeIcon icon={faLock} />
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                  onFocus={() => setIsFocused({ ...isFocused, password: true })}
                  onBlur={() => setIsFocused({ ...isFocused, password: false })}
                />
              </div>
              <button type="submit" className="login-button login_button_enabled">
                Log In
              </button>
              {error && <div className="error-message">{error}</div>}
              <div className="sign-up-option">
                Don't have an account? <Link to="../authenticate/signUp">Sign Up</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
}