import Link from 'next/link'
import Title from '../SectionTitle/SectionTitle'
import styles from '/styles/otherfeatures.module.scss'

export default function OtherFeatures() {
    return (
        <div className={styles.otherFeaturesCont}>
            <Title iconClass="fa-lightbulb-on" title="Other Features" />
            <div className={styles.otherFeatureLinks}>
                <Link href="/">
                    <a className={`${styles.customBtn} ${styles.btnThree}`}>
                        <span>Download App</span>
                    </a>
                </Link>
                <Link href="/contact-us">
                    <a className={`${styles.customBtn} ${styles.btnThree}`}>
                        <span>Contact Us</span>
                    </a>
                </Link>
                <Link href="/create-account">
                    <a className={`${styles.customBtn} ${styles.btnThree}`}>
                        <span>Create Account</span>
                    </a>
                </Link>
                <Link href="/about-us">
                    <a className={`${styles.customBtn} ${styles.btnThree}`}>
                        <span>About Us</span>
                    </a>
                </Link>
                <Link href="/privacy-policy">
                    <a className={`${styles.customBtn} ${styles.btnThree}`}>
                        <span>Privacy Policy</span>
                    </a>
                </Link>
                <Link href="/copyright-policy">
                    <a className={`${styles.customBtn} ${styles.btnThree}`}>
                        <span>Copyright Policy</span>
                    </a>
                </Link>
            </div>
        </div>
    )

}
