import Icon from '/components/FontAwesome/FontAwesome'
import { APP_INFO } from '/constants'
import loading from '/assets/images/loading.svg'
import styles from '/styles/songdetail.module.scss'
import { copyToClipboard } from '/extra/utils'
import toast from 'react-hot-toast'

export default function SongDetail(props) {
    const { data } = props

    const copy = () => {
        toast.success("Link copied to clipboard.", {position: 'bottom-left'})
        copyToClipboard(APP_INFO.APP_URL + 's/' + data.short_url)
    }

    return <>
        <div className={styles.songDetailCont}>
            <div className={styles.sdLeft}>
                <img src={data.thumb ?? loading.src} alt="" />
            </div>

            <div className={styles.sdCenter}>
                <h1 className={styles.sdSongTitle}>
                    <Icon type="duotone" classes="fa-play pd-r-14" color1="var(--dark-pink)" color2="var(--light-yellow)" />
                    <span>{data.title}</span>
                </h1>
                <p className={styles.sdDataRow}>
                    <Icon type="regular" classes="fa-hand-point-right pd-r-6" />
                    <span className={`${styles.sdDataRt} mg-r-10`}>Category: </span>
                    <span className={styles.sdDataRd}>{data.cat_name}</span>
                </p>
                <p className={styles.sdDataRow}>
                    <Icon type="regular" classes="fa-hand-point-right pd-r-6" />
                    <span className={`${styles.sdDataRt} mg-r-10`}>Singer: </span>
                    <span className={styles.sdDataRd}>{data.singer_name}</span>
                </p>
                <p className={styles.sdDataRow}>
                    <Icon type="regular" classes="fa-hand-point-right pd-r-6" />
                    <span className={`${styles.sdDataRt} mg-r-10`}>Added: </span>
                    <span className={styles.sdDataRd}>{data.added_on + ' ' + data.added_at}</span>
                </p>
                <p className={styles.sdDataRow}>
                    <Icon type="regular" classes="fa-hand-point-right pd-r-6" />
                    <span className={`${styles.sdDataRt} mg-r-10`}>File Size: </span>
                    <span className={styles.sdDataRd}>{data.size}</span>
                </p>
                <p className={styles.sdDataRow}>
                    <Icon type="regular" classes="fa-hand-point-right pd-r-6" />
                    <span className={`${styles.sdDataRt} mg-r-10`}>Length: </span>
                    <span className={styles.sdDataRd}>{data.length}</span>
                </p>
                <p className={styles.sdDataRow}>
                    <Icon type="regular" classes="fa-hand-point-right pd-r-6" />
                    <span className={`${styles.sdDataRt} mg-r-10`}>Total Downloads: </span>
                    <span className={styles.sdDataRd}>{data.total_downloads}</span>
                </p>
                <p className={styles.sdDataRow}>
                    <Icon type="regular" classes="fa-hand-point-right pd-r-6" />
                    <span className={`${styles.sdDataRt} mg-r-10`}>Short URL: </span>
                    <span className={`${styles.sdDataRd} sd-short-link`}>{APP_INFO.APP_URL + 's/' + (data.short_url || '_____')}</span>
                    <span className={`pd-l-6 sd-data-lc-btn`} data-tip="Copy Link" onClick={copy}>
                        <Icon classes="fa-link" type="solid" />
                    </span>
                </p>
            </div>

            <div className={styles.sdRight}>
            
            </div>
        </div>
    </>
}