import { useState, useEffect } from 'react';
import styles from '../home/home.module.css'
import AboutUs from '../aboutUs/AboutUs'
import FAQ from '../faq/FAQ';
 
const Home = () => {
    const [background, setBackground] = useState(0);
 
    useEffect(() => {
        const intervalId = setInterval(() => {
            setBackground(prev => prev + 1);
        }, 3 * 1000);
 
        return () => clearInterval(intervalId);
    }, []);
 
    return <>
        <div className={`${styles.homeContainer} ${background % 5 === 0 ? styles.bg1 : background % 5 === 1 ? styles.bg2 : background % 5 === 2 ? styles.bg3 : background % 5 === 3 ? styles.bg4 : styles.bg5}`}>
            <h1 className={`display-1 text-light ${styles.heading}`}>GO CABBY</h1>
            <p className={`text-light mt-3 ${styles.subHeading}`}>Powered by @Cabby 2025. All rights reserved</p>
            <button className='btn btn-light btn-lg'>Know More</button>
        </div>
        <AboutUs />
        <FAQ />
    </>
}
 
export default Home;