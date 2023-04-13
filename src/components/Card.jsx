import React from 'react'
import { motion } from 'framer-motion';

const Card = ({ imgName, projectName }) => {
    return (
        <div className="card mb-5 mt-5 shadow-sm">
            <motion.img
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={false}
                transition={{ duration: 2 }}
                src={"/images/" + imgName}
                alt="Card Image"
                className='img img-fluid'
            />

            <div className="card-body">
                <motion.div
                    initial={{ opacity: 0, translateX: -100 }}
                    whileInView={{ opacity: 1, translateX: 0 }}
                    viewport={false}
                    transition={{ duration: 0.5 }}
                    className="card-title"
                >
                    {projectName}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, translateX: 100 }}
                    whileInView={{ opacity: 1, translateX: 0 }}
                    viewport={false}
                    transition={{ duration: 0.5 }}
                    className="view-more">
                    <a href="#" className='card-btn'>
                        View More
                    </a>
                </motion.div>
            </div>
        </div>
    )
}

export default Card
