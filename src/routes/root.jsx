import { NavLink, Link, Outlet, useLoaderData, useNavigate, redirect, Form, useLocation, useNavigation} from "react-router-dom";
import { getUser, LogOut } from "../helper-functions";
import BlogSearch from "../components/blogs-search";
import '../css/scrollbar.css'

export async function action({request, params}) {
    const formData = await request.formData();
    await LogOut();
    const previousLocation = JSON.parse(formData.get('previousLocation'));
    console.log(previousLocation);
    if (previousLocation) {
        return redirect(`${previousLocation}`)
    }
    return redirect('/');
}   

export async function loader() {
    
    let user = null;

    try{
        const res = await getUser();
        if(res){
            if(res.status === 200){
                user = res
                return user; 
            } else if(res.status === 401) {
                return user;
            } else {
                throw new Error("Cannot get user");
            }
        } throw new Error("Server Error");
    } catch(error){
        console.log(error.message);
        throw error
        
    }

}

export default function Root(){

    const user = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();
    const navigation = useNavigation();

   const handleLogIn = () => {
       navigate('authenticate/logIn', {state: {from:location.pathname}});
   }



    return (
        <>  
            <div>
                {navigation.state === 'loading' && <div className="loading-bar"></div>}
                {/* ... your other content ... */}
            </div>
            <div id="header">
                <Link to={"/"} id="header_heading">blog</Link>
                <BlogSearch />
                <div id="header_links">
                    <NavLink className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    } to={`/client/allBlogPosts`}>Blogs</NavLink>
                    <NavLink className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }to={`/client/allBlogRequests`}>Blog Requests</NavLink>
                    <NavLink className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    } to={`/editor/about`}>About</NavLink>
                    {user ? <Form method="post">
                        <button type="submit">Log Out</button>
                        <input type="hidden" name="previousLocation" value={JSON.stringify(location.pathname|| '/')} />
                        </Form> : 
                        <button onClick={handleLogIn}>Log In</button>
                    }
                </div>
            </div>
            <div id="content">
                <Outlet context={user}/>
            </div>
            <div id="footer">
                <span>By</span>
                <a href="https://github.com/kawaldhillon5" target="_blank" >Kawal dhillon</a>
            </div>
        </>
    )
}


