import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { IoLocationOutline } from 'react-icons/io5';

const Main = () => {
    return (
        <section className="main w-100 h-100">
            <div className="row w-100 h-25 bg-secondary">
                <div className="col bg-primary d-flex justify-content-center align-items-center fw-bold text-light">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={true}
                        transition={{ duration: 1 }}
                    >
                        Santhos Suntharalingam
                    </motion.p>
                </div>
            </div>

            <div className="row w-100 h-75">
                <div className="col-md-6 h-50 p-2 mt-2 mb-2">
                    <div className="w-100 h-100 d-flex justify-content-center">
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

                <div className="col-md-6 h-50 d-flex justify-content-center align-items-center">
                    <div className="description d-flex flex-column justify-content-center align-items-center w-100 h-100 p-3">
                        <h2 className="h2">Software Engineering Undergraduate</h2>
                        <h5 className='mt-2'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                        </h5>
                        <ul className="list-group list-group-horizontal mt-2 mb-4">
                            <li className="list-group-item list-group-item-sm ps-3 pe-3"><SiGmail size={25} /></li>
                            <li className="list-group-item list-group-item-sm ps-3 pe-3"><FaLinkedinIn size={25} /></li>
                            <li className="list-group-item list-group-item-sm ps-3 pe-3"><FaTwitter size={25} /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main
