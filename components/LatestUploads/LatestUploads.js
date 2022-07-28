import { useState, useEffect } from 'react'
import Title from '/components/common/SectionTitle/SectionTitle'
import Icon from '/components/FontAwesome/FontAwesome'
import SongCard from '/components/common/SongCard/SongCard'
import SongSkeleton from '/components/common/Skeleton/SongSkeleton'
import Link from 'next/link'
import styles from '/styles/latestuploads.module.scss'
import { API, LIMITS } from '/constants'
import toast from 'react-hot-toast';
import { getRequest } from '/extra/request'
import { OPERATION_CANCELED } from '/constants'

export default function LatestUploads(props) {

    const [latestUploads, setLatestUploads] = useState([])
    const [loadingLatestUploads, setLoadingLatestUploads] = useState(true)

    const fetchLatestUploads = async () => {
        const params = {
            limit: LIMITS.LATEST_UPLOADS,
            order: 'song_id',
            by: 'desc'
        }
        try {
            const result = await getRequest('latest', params)
            setLatestUploads(result.data)
            setLoadingLatestUploads(false)
        } catch (err) {
            if(err.message !== OPERATION_CANCELED){
                toast.error("An error occured")
            }
        }
    }

    useEffect(() => {
        setLoadingLatestUploads(true);
        fetchLatestUploads()
    }, [])

    return (
        <div className={styles.hLatestUploads}>
            <Title iconClass="fa-guitar-electric" title="Latest Uploads" />
            <div className={styles.hLuList}>
                {loadingLatestUploads ? <SongSkeleton /> : latestUploads?.map((item, index) => {
                    return <SongCard
                        url={'/song/' + item.song_id + '/' + item.url}
                        title={item.title}
                        field1={item.category_name}
                        field2={item.singer_name}
                        field3={item.size}
                        key={index} />
                })}
            </div>
            <p className={styles.latestUploadMoreBtn}>
                <Link href="/latest-uploads">
                    <a>Browse Latest Uploads <Icon type="solid" classes="fa-angle-double-right" /></a>
                </Link>
            </p>
        </div>
    )
}
