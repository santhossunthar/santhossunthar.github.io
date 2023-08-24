import React from 'react'
import { motion } from 'framer-motion';

const Card = ({ name, bgimg, url }) => {
    return (
        <div className="card glass-card">
            <motion.img
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={false}
                transition={{ duration: 2 }}
                src={"/images/" + bgimg}
                alt="Card Image"
                className='card-img-top img-fluid'
            />

            <div className="card-body">
                <motion.div
                    initial={{ opacity: 0, translateX: -100 }}
                    whileInView={{ opacity: 1, translateX: 0 }}
                    viewport={false}
                    transition={{ duration: 0.5 }}
                    className="card-title"
                >
                    {name}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, translateX: 100 }}
                    whileInView={{ opacity: 1, translateX: 0 }}
                    viewport={false}
                    transition={{ duration: 0.5 }}
                    className="view-more">
                    <a href={url} target='_blank' className='btn btn-outline-primary'>
                        View More
                    </a>
                </motion.div>
            </div>
        </div>
    )
}

export default Card
