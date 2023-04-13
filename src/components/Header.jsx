import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <section className="header">
            <div className="container-fluid">
                <div className="title">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={true}
                        transition={{ duration: 0.3 }}
                    >
                        Santhos Suntharalingam
                    </motion.p>
                </div>

                <div className="container">
                    <div className="row w-75">
                        <div className="col-lg-6 col-sm">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={true}
                                transition={{ duration: 0.3 }}
                                className="profile-picture">
                                <img src="/images/profile-picture.png"
                                    alt="Profile Picture"
                                />
                            </motion.div>
                        </div>

                        <div className="col-lg-6 col-sm">
                            <div className="row justify-content-center">
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={true}
                                    transition={{ duration: 0.3 }}
                                    className='about'>
                                    Data Analyst | CTF Player
                                </motion.p>
                            </div>

                            <div className="row justify-content-end">
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={true}
                                    transition={{ duration: 0.3 }}
                                    className='country'>
                                    Srilanka
                                </motion.p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header
