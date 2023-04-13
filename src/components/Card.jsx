import React from 'react'
import { motion } from 'framer-motion';

const Card = ({imgName, projectName}) => {
    return (
        <div className="card mb-5 mt-5 shadow-sm">
            <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 2 } }}
                src={"/images/"+imgName}
                alt="Card Image"
                className='img img-fluid'
            />

            <div className="card-body">
                <div className="card-title"
                >
                    {projectName}
                </div>

                <motion.div
                    initial={{ opacity: 0, translateY: 100 }}
                    animate={{ opacity: 1, translateY: 0, transition: { duration: 0.5 } }}
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
