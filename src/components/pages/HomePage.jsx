import React, { useEffect } from 'react';
import Body from '../Body';
import Footer from '../Footer';
import Header from '../Header';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className='App'>
            <Header />
            <Body />
            <Footer />
        </div>
    )
}

export default HomePage
