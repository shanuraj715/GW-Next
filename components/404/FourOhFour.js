import Link from 'next/link'
import styles from '/styles/err404.module.scss'
import { NextSeo } from 'next-seo';
import {APP_INFO} from '/constants'

export default function FourOhFour(props) {
    return <>
        <NextSeo
            title={`Page Not Found} | ${APP_INFO.APP_NAME}`}
            description="No page found for this request"
            openGraph={{
                url: APP_INFO.APP_URL,
                title: `Page Not Found} | ${APP_INFO.APP_NAME}`,
                description: "No page found for this request",
                images: [
                    { url: `${APP_INFO.APP_URL}/favicon.png` },
                ],
                type: 'article',
                site_name: APP_INFO.APP_NAME,
            }}
            noindex={true}
            nofollow={true}
        />
        <div id={styles.notfound}>
            <div className={styles.notfound}>
                <div className={styles.notfound404}>
                    <div></div>
                    <h1>404</h1>
                </div>
                <h2>Page not found</h2>
                <p>The page or file you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                <Link href="/">
                    Home
                </Link>
            </div>
        </div>
    </>;
}