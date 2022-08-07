import styles from '/styles/loadingBoxes.module.scss'

export default function LoadingBoxes() {


    return <div className={`d-flex align-items-center justify-content-center w-100 ${styles.container}`}>
        <div className={styles.wrapper}>
            <div className={styles.boxWrap}>
                <div className={`${styles.box} ${styles.one}`}></div>
                <div className={`${styles.box} ${styles.two}`}></div>
                <div className={`${styles.box} ${styles.three}`}></div>
                <div className={`${styles.box} ${styles.four}`}></div>
                <div className={`${styles.box} ${styles.five}`}></div>
                <div className={`${styles.box} ${styles.six}`}></div>
            </div>
        </div>
    </div>
}