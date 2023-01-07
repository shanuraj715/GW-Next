import { useRouter } from 'next/router'
import { useEffect, useState, useCallback } from 'react'
import { getRequest } from '/extra/request'
import LoadingBoxes from '/components/common/LoadingBoxes/LoadingBoxes'
import styles from '/styles/linkShortnerPage.module.scss'
import errorImage from '/assets/images/2953962.png'
import Image from "next/legacy/image";
import Link from 'next/link'

export default function LinkShort() {

    const router = useRouter()
    const { query } = router

    const [errorText, setErrorText] = useState(null)

    const fetchData = useCallback(async () => {
        const payload = {
            str: query.string,
        }
        try {
            const response = await getRequest('getLink', payload)
            if (response.status) {
                router.replace(response.data.ref_page.charAt(0) === '/' ? response.data.ref_page : `/${response.data.ref_page}`)
            }
            else {
                setErrorText("Your link is invalid. There is no data available for this link.")
            }
        }
        catch (err) {
            console.log(err)
        }
    }, [query, router])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return <div className="mb-5">
        {!errorText && <>
            <LoadingBoxes />
            <p className={styles.normalMessage}>Please wait. Redirecting you to the page.</p>
        </>}
        {errorText && <div className={styles.errorContainer}>
            <div className={styles.errorImage}>
            <Image src={errorImage} alt="" />
            </div>
            <p className={styles.errorMessage}>{errorText}</p>
            <Link href="/">
                <a className={styles.homeBtn}>
                    Go to Home
                </a>
            </Link>
        </div>
        }
    </div>
}