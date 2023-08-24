import React, { useEffect, useState } from 'react';
import ProjectData from '../ProjectData.json';
import Project from './Project';

const Body = () => {
    return (
        <section className='body'>
            {ProjectData.map((project) => {
                return (
                    <Project
                        key={project.Id}
                        name={project.Name}
                        bgimg={project.BgImg}
                        url={project.url} />)
            })}          
        </section>
    )
}

export default Body
