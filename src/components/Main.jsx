import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedinIn, FaGithub, FaHackerrank, FaStackOverflow } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { IoLocationOutline } from 'react-icons/io5';

const Main = () => {
    return (
        <section className="main w-100 h-100">
            <div className="row w-100 bg-secondary header">
                <div className="col bg-primary d-flex justify-content-center align-items-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={true}
                        transition={{ duration: 1 }}
                        className="h4 fw-bold text-light"
                    >
                        Santhos Suntharalingam
                    </motion.p>
                </div>
            </div>

            <div className="row w-100 info">
                <div className="col-md-6 h-50 p-3">
                    <div className="profile-img w-100 h-100 d-flex justify-content-center">
                        <motion.div
                            initial={{ opacity: 0, translateX: -100 }}
                            whileInView={{ opacity: 1, translateX: 0 }}
                            viewport={true}
                            transition={{ duration: 1 }}
                        >
                            <img src="/images/profile-pic.png"
                                alt="Profile Picture" className='img-fluid h-100'
                            />
                        </motion.div>
                    </div>
                </div>

                <div className="col-md-6 h-50">
                    <div className="description d-flex flex-column justify-content-center w-100 h-100 p-3">
                        <h2 className="display-6">
                            Software Engineering Undergraduate
                        </h2>
                        <h6 className='mt-2'>
                            ReactJS | NodeJS | .NET Framework | ASP.NET | .NET Core | Spring Boot 
                        </h6>
                        <ul className="list-group list-group-horizontal mt-2 mb-4">
                            <li className="list-group-item ps-3 pe-3">
                                <a href="mailto:santhoshsunthar@gmail.com?subject=Hello%20Santhos,%20From%20GitHub" target='_blank'>
                                    <SiGmail size={25} />
                                </a>
                            </li>
                            <li className="list-group-item ps-3 pe-3">
                                <a href="https://www.linkedin.com/in/santhossunthar/" target='_blank'>
                                    <FaLinkedinIn size={25} />
                                </a>
                            </li>
                            <li className="list-group-item ps-3 pe-3">
                                <a href="https://github.com/santhossunthar" target='_blank'>
                                    <FaGithub size={25} />
                                </a>
                            </li>
                            <li className="list-group-item ps-3 pe-3">
                                <a href="https://www.hackerrank.com/santhossunthar" target='_blank'>
                                    <FaHackerrank size={25} />
                                </a>
                            </li>
                            <li className="list-group-item ps-3 pe-3">
                                <a href="https://stackoverflow.com/users/22310579/santhos" target='_blank'>
                                    <FaStackOverflow size={25} />
                                </a>
                            </li>
                            <li className="list-group-item ps-3 pe-3">
                                <a href="https://twitter.com/santhossunthar" target='_blank'>
                                    <FaTwitter size={25} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main
