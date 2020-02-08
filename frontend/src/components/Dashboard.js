import React from 'react';
import { useHistory } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

function Dashboard(props)
{
    const history = useHistory();

    const logout = async event =>
    {
        // window.alert("You have successfully logged out!");
        history.push('/');
    };

    return(
        <>
            <div className="dashboard-box">
                <div className="box-header">
                    <h1>Dashboard</h1>
                </div>
                <FaSearch />
                <input type="search" placeholder="Search..." className="input-field search-bar" />
                <div className="dashboard-contact">
                    <div className="contact-list">
                        Contact List
                        <hr />
                        <p>Jeff Bezos</p>
                        <p>Satya Nadella</p>
                    </div>
                    <div className="contact-info">
                        {/* I believe we're gonna have to use a span to show the information of each contact. */}
                        Contact Information
                        <hr />
                        <p>
                            Name: Jeff Bezos<br />
                            Phone: XXX-XXX-XXXX<br />
                            Email: jbezos@amazon.com<br />
                        </p>
                    </div>
                </div>
                <button className="submit-button" onClick={logout}>
                    <IoIosLogOut />
                </button>
            </div>
        </>
    );
}

export default Dashboard;