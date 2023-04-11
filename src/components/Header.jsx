import React from 'react';
import ProfilePicture from '../assets/images/profile-picture.png';

const Header = () => {
    return (
        <section className="header">
            <div className="container-fluid">
                <p id='title'>Santhos Suntharalingam</p>

                <div className="container">
                    <div className="row w-75">
                        <div className="col-lg-6 col-sm">
                            <div className="profile-picture">
                                <img src={ProfilePicture} alt="Profile Picture" />
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm">
                            <div className="row justify-content-center">
                                <p className='about'>Data Analyst | CTF Player</p>
                            </div>

                            <div className="row justify-content-end">
                                <p className='country'>Srilanka</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header
