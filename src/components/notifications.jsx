import { useState } from "react"
import './notifications.css'

export default function Notifications(){
    const [activeTab, setTab] = useState('news');
    return (
        <div id='noti-main-div'>
            <div id="noti-tabs">
                <button
                    className={activeTab === 'news' ? 'active' : ''}
                    onClick={() => setTab('news')}
                >
                    News
                </button>
                <button
                    className={activeTab === 'notifications' ? 'active' : ''}
                    onClick={() => setTab('notifications')}
                >
                    Notifications
                </button>
            </div>
            <div id="noti-content">
                {activeTab === 'news' && (
                    <div id="news-content">
                        <h3>News</h3>
                    </div>
                )}
                {activeTab === 'notifications' && (
                    <div id="notifications-content">
                        <h3>Notifications</h3>
                    </div>
                )}
            </div>
        </div>
    )
}