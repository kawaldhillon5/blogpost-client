import { useEffect, useState } from "react"
import './notifications.css'
import { useOutletContext } from "react-router-dom";
import { deleteNotification, getRequestFunc } from "../helper-functions";

export default function Notifications(){
    const [activeTab, setTab] = useState('notifications');
    const [error, setError] = useState(null);
    const [news, setNews] = useState([]);
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true);

    const user = useOutletContext();

    const handelDismiss = async (e, id)=>{
        e.stopPropagation();
        const item = e.target.parentNode;
        item.classList.add('noti-dismissed');
        await deleteNotification(id);
        setTimeout(()=>{
            setNotifications((prevNotifications) =>
                prevNotifications.filter((notification) => notification._id !== id)
            );
        }, 300);
    }

    useEffect(()=>{
        if(!user){
            setError(null);
            setTab('news');
        }
    },[activeTab]);    

    useEffect(()=>{
        const getData = async () =>{
            try{
                setLoading(true);
                let response =  await getRequestFunc(`client/${activeTab}`);
                if(response.status === 200){ 
                    if(activeTab === 'news'){
                        setNews(response.data);
                    } else {
                        setNotifications(response.data.notifications)
                }}else {
                    if(response.status === 500){
                        throw new Error('Server Error');
                    } else {
                        throw new Error(response.data);
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }; 
        getData();
    },[activeTab]);

    return (
        <div id='noti-main-div'>
            <div id="noti-tabs">
                <button
                    className={activeTab === 'news' ? 'active' : ''}
                    onClick={() => setTab('news')}
                >
                    News
                </button>
                {user &&<button
                    className={activeTab === 'notifications' ? 'active' : ''}
                    onClick={() => setTab('notifications')}
                >
                    Notifications
                </button>}
            </div>
            <div id="noti-content">
              {
                loading ? 
                    <div id="noti-loading-div"><div className="loader"></div></div>
                    : error ?
                    <div id="noti-error-div">{error}</div>
                    : activeTab === 'news' ?
                    <div id="news-content">
                    {news.length ?
                        <ul id="news-content-list">
                        {news.map((item,n) =>(
                            <li className="news-content-item" key={n}>
                                {item.text}
                            </li>
                        ))}
                        </ul>
                        : <i>No News</i>
                    } 
                    </div>
                    : activeTab === "notifications" ?
                    <div id="notifications-content">
                        {notifications.length ?
                            <ul id="noti-content-list">
                            {notifications.map(item =>(
                                <li key={item._id} className="noti-content-item">
                                    <p>{item.text}</p>
                                    <button className="noti-dismiss-button" onClick={(e)=>{handelDismiss(e,item._id)}}>✖</button>
                                </li>
                            ))}
                            </ul>
                            : <i>No Notifications</i>
                        } 
                    </div> 
                    : null 
              }
            </div>
        </div>
    )
}
