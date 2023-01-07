import Link from 'next/link'
import Title from '../SectionTitle/SectionTitle'
import styles from '/styles/otherfeatures.module.scss'

export default function OtherFeatures() {
    return (
        <div className={styles.otherFeaturesCont}>
            <Title iconClass="fa-lightbulb-on" title="Other Features" />
            <div className={styles.otherFeatureLinks}>
                <Link href="/" className={`${styles.customBtn} ${styles.btnThree}`}>

                    <span>Download App</span>

                </Link>
                <Link href="/contact-us" className={`${styles.customBtn} ${styles.btnThree}`}>

                    <span>Contact Us</span>

                </Link>
                <Link
                    href="/create-account"
                    className={`${styles.customBtn} ${styles.btnThree}`}>

                    <span>Create Account</span>

                </Link>
                <Link href="/about-us" className={`${styles.customBtn} ${styles.btnThree}`}>

                    <span>About Us</span>

                </Link>
                <Link
                    href="/privacy-policy"
                    className={`${styles.customBtn} ${styles.btnThree}`}>

                    <span>Privacy Policy</span>

                </Link>
                <Link
                    href="/copyright-policy"
                    className={`${styles.customBtn} ${styles.btnThree}`}>

                    <span>Copyright Policy</span>

                </Link>
            </div>
        </div>
    );

}
