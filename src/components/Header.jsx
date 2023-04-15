import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';

const Header = () => {
    return (
        <section className="header">
            <div className="container-fluid">
                <div className="title">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={true}
                        transition={{ duration: 1 }}
                    >
                        Santhos Suntharalingam
                    </motion.p>
                </div>

                <div className="container">
                    <div className="row w-75">
                        <div className="col-lg-6 col-sm">
                            <motion.div
                                initial={{ opacity: 0, translateX: -100 }}
                                whileInView={{ opacity: 1, translateX: 0 }}
                                viewport={true}
                                transition={{ duration: 1 }}
                                className="profile-picture"
                            >
                                <img src="/images/profile-picture.png"
                                    alt="Profile Picture"
                                />
                            </motion.div>
                        </div>

                        <div className="col-lg-6 col-sm description">
                            <div className="row justify-content-center">
                                <motion.p
                                    initial={{ opacity: 0, translateX: 100 }}
                                    whileInView={{ opacity: 1, translateX: 0 }}
                                    viewport={true}
                                    transition={{ duration: 1 }}
                                    className='about'
                                >
                                    Data Analyst | CTF Player
                                </motion.p>
                            </div>

                            <div className="row justify-content-center">
                                <motion.div
                                    initial={{ opacity: 0, translateX: 100 }}
                                    whileInView={{ opacity: 1, translateX: 0 }}
                                    viewport={true}
                                    transition={{ duration: 1 }}
                                    className='social-profiles'
                                >
                                    <a href="#" className='social-link'>
                                        <FaTwitter />
                                    </a>
                                    <a href="#" className='social-link'>
                                        <FaLinkedinIn />
                                    </a>
                                </motion.div>
                            </div>

                            <div className="row justify-content-center">
                                <motion.div
                                    initial={{ opacity: 0, translateX: 100 }}
                                    whileInView={{ opacity: 1, translateX: 0 }}
                                    viewport={true}
                                    transition={{ duration: 1 }} className="item"
                                >
                                    <IoLocationOutline size={25} />
                                    <p className='country'>
                                        Srilanka
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header
