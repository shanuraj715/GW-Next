import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Breadcrumb from '/components/common/Breadcrumb/Breadcrumb'
import SongDetail from '/components/common/SongDetail/SongDetail'
import Icon from '/components/FontAwesome/FontAwesome'
import styles from '/styles/song.module.scss'
import buttonStyles from '/styles/otherfeatures.module.scss'
import OtherFeatures from '/components/common/OtherFeatures/OtherFeatures'
import Tags from '/components/common/Tags/Tags'
import Title from '/components/common/SectionTitle/SectionTitle'
import GraphComment from '/components/GraphComment/GraphComment'
import SongCard from '/components/common/SongCard/SongCard'
import FourOhFour from '/components/404/FourOhFour'
import SongShare from '/components/SongShare/SongShare'
import { APP_INFO } from '/constants'
import ReactTooltip from 'react-tooltip';


import { getRequest } from '/extra/request'

export default function SongPage(props) {

    const router = useRouter()
    const query = router.query

    const { data, error, message } = props

    const songDataObj = {
        thumb: data?.thumb,
        songId: data?.song_id,
        title: data?.title,
        cat_id: data?.category_id,
        cat_name: data?.category_name,
        singer_id: data?.singer_id,
        singer_name: data?.singer_name,
        album_id: data?.album_id,
        album_name: data?.album_name,
        added_on: data?.added_date,
        added_at: data?.added_time,
        size: data?.size,
        length: data?.length,
        total_downloads: data?.total_downloads,
        short_url: data?.short_url,
        url_title: data?.url_title,
        file_path: data?.file,
        file_key: data?.file_key,
    }

    const [songData, setSongData] = useState(songDataObj)
    const [tags, setTags] = useState(data?.tags ?? [])
    const [relatedFiles, setRelatedFiles] = useState(data?.related_files ?? [])
    const [breadcrumb, setBreadcrumb] = useState(data?.breadcrumb ?? [])

    const audioPlayHandler = () => {
        if (songData.songId) {
            // updateSid(parseInt(songData.songId))
        }
        else
            toast.error("Loading Data. Please wait...", { position: 'bottom-left' })

    }

    const download = () => {
        let song_id = parseInt(data?.song_id)
        let key = songData.file_key
        window.open(APP_INFO.DOWNLOAD_SERVER_URL + '?file_id=' + song_id + '&auth_key=' + key, '_blank')
    }

    const toggleSongShareModal = () => {
        let m = document.getElementById('songShareMod')
        let modal = document.getElementById("songShareModal")
        if (m.style.display === 'none') {
            modal.classList.add('modalOpen')
            modal.classList.remove('modalClose')
            document.body.style.maxHeight = '100vh';
            document.body.style.overflow = 'hidden';
            m.style.display = "grid";
        }
        else {
            modal.classList.add('modalRemove')
            modal.classList.remove('modalOpen')
            setTimeout(() => {
                m.style.display = 'none'
                modal.classList.remove('modalRemove')
                document.body.style.maxHeight = 'initial';
                document.body.style.overflow = 'initial';
            }, 200)
        }
    }

    useEffect(() => {

    }, [])

    return <>
        {!error && <>
            <Breadcrumb data={breadcrumb} />
            <SongDetail data={songData} />
            <div className={styles.sdBtnsCont}>
                <button className={`${buttonStyles.customBtn} ${styles.btn15}`} onClick={audioPlayHandler}>
                    <Icon classes="fa-play pd-r-10" type="solid" />
                    Play Now
                </button>
                <button className={`${buttonStyles.customBtn} ${styles.btn15}`} onClick={download}>
                    <Icon classes="fa-download pd-r-10" type="solid" />
                    Download
                </button>
                <button className={`${buttonStyles.customBtn} ${styles.btn15}`} onClick={toggleSongShareModal}>
                    <Icon classes="fa-share-alt pd-r-10" type="solid" />
                    Share
                </button>
            </div>
            {tags.length !== 0 && <Tags data={tags} />}
            <div className="">
                <Title iconClass="fa-list-music" title="Related Files" />
                <div className="related-files-cont">
                    {relatedFiles?.map((item, index) => <SongCard
                        key={index}
                        url={'/song/' + item.song_id + '/' + item.url}
                        title={item.title}
                        field1={item.category_name}
                        field2={item.singer_name}
                        field3={item.size}
                    />
                    )}
                </div>
            </div>
            <Title iconClass="fa-comment" title="Comments" />
            <GraphComment key={songData.songId} />
            <OtherFeatures />

            <SongShare toggle={toggleSongShareModal} short_url={APP_INFO.APP_URL + 's/' + songData.short_url} />
        </>}
        {error && <FourOhFour />}

    </>
}

export async function getServerSideProps(context) {
    const { songId } = context.query
    const params = {
        id: songId,
    }
    const response = await getRequest('song', params)

    if (response.status) {
        return {
            props: {
                data: response.data
            }
        }
    }
    return {
        props: {
            error: true,
            message: response.error.message
        }
    }
}