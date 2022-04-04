import React from 'react'
import NotificationBar from '../notification-bar'
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import DoneIcon from '@material-ui/icons/Done';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const ChatBoot = () => {
  return (
    <div className='chatbox-warpper'>
        <NotificationBar />
        <div className='inner-chatbox-area'>
            <div className='chat-user-list'>
                <div className='chat-list-filter'>
                    <form className="main-form">
                        <div className="field-group flexFull searchField">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter customer name, phone or conversation tag"
                                name="name"
                            />
                            <div className='search-field'>
                                <SearchIcon />
                            </div>
                        </div>
                    </form>
                    <ul className="user-list-main">
                        <li>
                            <h5> Mad Dab Labs dispo <span>8:45 PM</span></h5>
                            <p>Weed a gram aoora back order for</p>
                        </li>
                        <li>
                            <h5> Hutebox <span>Yesterday</span></h5>
                            <p>Weed a gram aoora back order for</p>
                        </li>
                        <li>
                            <h5> Khusleaf <span>Monday</span></h5>
                            <p>Hi sorry contact us after </p>
                        </li>
                        <li>
                            <h5> Smoking Buddha <span>Saturday</span></h5>
                            <p>Weed a gram aoora back order for</p>
                        </li>
                        <li>
                            <h5> The Amazing Haze <span>Wednesday</span></h5>
                            <p>Weed a gram aoora back order for</p>
                        </li>
                        <li>
                            <h5> Mad Dab Labs dispo <span>8:45 PM</span></h5>
                            <p>Weed a gram aoora back order for</p>
                        </li>
                        <li>
                            <h5> Hutebox <span>Yesterday</span></h5>
                            <p>Weed a gram aoora back order for</p>
                        </li>
                        <li>
                            <h5> Khusleaf <span>Monday</span></h5>
                            <p>Hi sorry contact us after </p>
                        </li>
                        <li>
                            <h5> Smoking Buddha <span>Saturday</span></h5>
                            <p>Weed a gram aoora back order for</p>
                        </li>
                        <li>
                            <h5> The Amazing Haze <span>Wednesday</span></h5>
                            <p>Weed a gram aoora back order for</p>
                        </li>
                        <li>
                            <h5> Mad Dab Labs dispo <span>8:45 PM</span></h5>
                            <p>Weed a gram aoora back order for</p>
                        </li>
                        <li>
                            <h5> Hutebox <span>Yesterday</span></h5>
                            <p>Weed a gram aoora back order for</p>
                        </li>
                        <li>
                            <h5> Khusleaf <span>Monday</span></h5>
                            <p>Hi sorry contact us after </p>
                        </li>
                        <li>
                            <h5> Smoking Buddha <span>Saturday</span></h5>
                            <p>Weed a gram aoora back order for</p>
                        </li>
                        <li>
                            <h5> The Amazing Haze <span>Wednesday</span></h5>
                            <p>Weed a gram aoora back order for</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='chat-discussion-area'>
                <div className='all-discuss-section'>
                    <div className='chat-header'>
                        <h4>White Rabbit Delivery</h4>
                        <div className='header-action'>
                            <DoneIcon />
                            <MoreVertIcon />
                        </div>
                    </div>
                    <div className='chat-now'>

                    </div>
                    <div className='chat-text-editor'>
                    <Tabs defaultActiveKey="all" transition={false} id="noanim-tab-example" className="mb-3">
                        <Tab eventKey="all" title="Message">
                            <div className='chat-textarea'>
                                <form className="main-form">
                                    <div className="field-group flexFull">
                                        <textarea placeholder='Type your message...'></textarea>
                                    </div>
                                    <div className="field-group btn-groups flexFull">
                                        <button type="button" className="btn btn-primary">Send & Close</button>
                                        <button type="button" className="btn btn-primary">Send</button>
                                    </div>
                                </form>
                            </div>
                        </Tab>
                        <Tab eventKey="filter" title="Internal Note">
                            <div className='chat-textarea'>
                                <form className="main-form">
                                    <div className="field-group flexFull">
                                        <textarea placeholder='Type your note, only you and your teammates will see it.'></textarea>
                                    </div>
                                    <div className="field-group btn-groups flexFull">
                                        <button type="button" className="btn btn-primary">Send & Close</button>
                                        <button type="button" className="btn btn-primary">Send</button>
                                    </div>
                                </form>
                            </div>
                        </Tab>
                    </Tabs>
                    </div>
                </div>
            </div>
            <div className='chat-compassion-area'>
                <div className='user-compassion-details'>
                    <div className='user-name-head'>
                        <h4>White Rabbit Delivery</h4>
                        <EditIcon />
                    </div>
                    <ul className='personal-info'>
                        <li>
                            <h5>Phone Number</h5>
                            <p>(289) 556-6684</p>
                        </li>
                        <li>
                            <h5>Subscription</h5>
                            <p>Opted In</p>
                        </li>
                        <li>
                            <h5>Email</h5>
                            <p>Whiterabbitdel@gmail.com</p>
                        </li>
                        <li>
                            <button type="button" className='btn-links'>Edit Contact</button>
                            <button type="button" className='btn-links'> View in LocalContacts</button>
                        </li>
                    </ul>
                </div>
                <div className='conversation-tags'>
                    <h4>Conversation Tags</h4>
                    <button type='button' className='btn btn-addd-tag'> <AddIcon /> Add Tags</button>
                </div>
                <div className='monthly-balance-box'>
                    <h4>Monthly Balance</h4>
                    <ul>
                        <li>
                            <b>Credit used</b> $1900
                        </li>
                        <li>
                            <b>Credit balance</b> $75000
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatBoot