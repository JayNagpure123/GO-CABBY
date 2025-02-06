import styles from '../aboutUs/about.module.css'
 
const AboutUs = () => {
  return (
    <>
      <div className={`${styles.canvas}`}>
        <h1 className={`text-light display-2 ${styles.heading}`}>About Us</h1>
        <div className={`${styles.textContainer}`}>
          <p className={`text-light ${styles.body} ${styles.top}`}>
            We provide a platform where employees can register their
            vehicles and offer rides to their colleagues. Riders can easily
            find and book rides that match their travel requirements, making
            commuting to and from work cost-effective, safe, and enjoyable.
          </p>
        </div>
        <div className={`${styles.textContainer}`}>
          <p className={`text-light ${styles.body} ${styles.bottom}`}>
            Our vision is to create a seamless and efficient ride-sharing
            platform that benefits both drivers and riders. We envision a
            future where carpooling is the norm, resulting in reduced
            traffic congestion, lower carbon emissions, and a more connected
            community.
          </p>
        </div>
      </div>
    </>
  );
};
 
export default AboutUs;