import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaTwitter, FaLinkedinIn, FaGithub, FaHackerrank, FaStackOverflow } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { IoLocationOutline } from 'react-icons/io5';
import { SiTryhackme } from 'react-icons/si';
import { BsArrowUpCircleFill } from 'react-icons/bs';

const Main = () => {
    const [scrolled, setScrolled] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition > 0) {
                // User has scrolled, move the image to the specific position
                controls.start({ x: -150, y: -150, opacity: 0.8 });
                setScrolled(true);
            } else {
                // User is back at the top, move the image back to the original position
                controls.start({ x: 0, y: 0, opacity: 1 });
                setScrolled(false);
            }
        };

        // Attach the scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [controls]);

    const scrollToTop = (sectionID) => {
        const section = document.getElementById(sectionID);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="container-fluid vh-100 main" id='1'>
            <div className="row h-25 bg-secondary header">
                <div className="col bg-primary d-flex justify-content-center align-items-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={true}
                        transition={{ duration: 1 }}
                        className="h4 p-5 fw-bold text-light"
                    >
                        Santhos Suntharalingam
                    </motion.p>
                </div>
            </div>
           
            <div className="row h-75 bg-primary info">
                <div className="col-md-6 profile-img-bg p-3">
                    <div className="profile-img w-100 h-100 d-flex justify-content-center">
                        <motion.div
                            initial={{ opacity: 1, y: 0}}
                            animate={controls}
                            viewport={true}
                            transition={{ duration: 1 }}
                        >
                            <img src="/images/profile-pic.png"
                                alt="Profile Picture" className='img-fluid rounded-circle h-100 p-3'
                            />
                        </motion.div>
                    </div>
                </div>

                <div className="col-md-6 info-col bg-primary">
                    <div className="description d-flex flex-column justify-content-center w-100 h-100 p-5">
                        <h2 className="display-5 text-white">
                            Software Engineering Undergraduate
                        </h2>
                        <h6 className='mt-2'>
                            University of Kelaniya | Sri Lanka
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
                                <a href="https://tryhackme.com/p/santhos" target='_blank'>
                                    <SiTryhackme size={25} />
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
