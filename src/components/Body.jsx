import React, { useEffect, useState } from 'react';
import ProjectData from '../ProjectData.json';
import Project from './Project';
import { motion, useAnimation } from 'framer-motion';

const Body = () => {
    const [scrolled, setScrolled] = useState(false);
    const profileInfoControls = useAnimation();
    const customEase = [0, 1.15, .2, .99];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition > 0) {
                // User has scrolled, move the image to the specific position
                profileInfoControls.start({ x: 0, y: 0, opacity: 1, transition: { duration: 1, ease: customEase } });

                setScrolled(true);
            } else {
                // User is back at the top, move the image back to the original position
                profileInfoControls.start({ x: 0, y: 10000, opacity: 1, transition: { duration: 1, ease: customEase } });
                setScrolled(false);
            }
        };

        // Attach the scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [profileInfoControls]);

    return (
        <section className='body'>
            <p></p>
            <motion.div
                initial={{ opacity: 1, y: 10000 }}
                animate={profileInfoControls}
                viewport={true}
                transition={{ duration: 1 }}
                className={!scrolled ? "profile-body" : "profile-body-small-scrolled"}>
                <div className={!scrolled ? "project-body" : "project-body-scrolled"}>
                    {ProjectData.map((project) => {
                        return (
                            <Project
                                key={project.Id}
                                name={project.Name}
                                bgimg={project.BgImg}
                                url={project.url} />)
                    })}
                </div>
            </motion.div>
        </section>
    )
}

export default Body
