import Link from 'next/link'
import styles from '/styles/err404.module.scss'

export default function FourOhFour(props) {
    return <>
        <div id={styles.notfound}>
            <div className={styles.notfound}>
                <div className={styles.notfound404}>
                    <div></div>
                    <h1>404</h1>
                </div>
                <h2>Page not found</h2>
                <p>The page or file you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </div>
        </div>
    </>
}