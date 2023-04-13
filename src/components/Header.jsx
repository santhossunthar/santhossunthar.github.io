import React from 'react';

const Header = () => {
    return (
        <section className="header">
            <div className="container-fluid">
                <div className="title">
                    <p>
                        Santhos Suntharalingam
                    </p>
                </div>

                <div className="container">
                    <div className="row w-75">
                        <div className="col-lg-6 col-sm">
                            <div className="profile-picture">
                                <img src="/images/profile-picture.png"
                                    alt="Profile Picture"
                                />
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm">
                            <div className="row justify-content-center">
                                <p className='about'>
                                    Data Analyst | CTF Player
                                </p>
                            </div>

                            <div className="row justify-content-end">
                                <p className='country'>
                                    Srilanka
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header
