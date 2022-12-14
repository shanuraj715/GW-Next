import { useState, useEffect, useCallback } from 'react'
import Breadcrumb from '/components/common/Breadcrumb/Breadcrumb'
import { getRequest } from '/extra/request'
import CategorySkeleton from '/components/common/Skeleton/CategorySkeleton'
import CategoryCard from '/components/common/CategoryCard/CategoryCard'
import Title from '/components/common/SectionTitle/SectionTitle'
import styles from '/styles/categorylist.module.scss'
import { useRouter } from 'next/router'
import { LIMITS, APP_INFO } from '/constants'
import { urlParams } from '/extra/utils'
import SongSkeleton from '/components/common/Skeleton/SongSkeleton'
import SongCard from '/components/common/SongCard/SongCard'
import Link from 'next/link'
import paginationStyles from '/styles/pagination.module.scss'
import Tags from '/components/common/Tags/Tags'
import { NextSeo } from 'next-seo';
import OtherFeatures from '/components/common/OtherFeatures/OtherFeatures'
import Horizontal from '/components/ads/Horizontal'

export default function Category(props) {

    const { data, error, message } = props

    const router = useRouter()
    const path = router.asPath
    const query = router.query

    const [categories, setCategories] = useState([])
    const [songs, setSongs] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isLoadingSongs, setIsLoadingSongs] = useState(true)
    const [tags, setTags] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [breadcrumb, setBreadcrumb] = useState([])

    const getCategoryId = () => {
        let url = window.location.href
        let arr = url.split('/')
        let categoryIndex = arr.indexOf('category')
        let categoryId = arr[categoryIndex + 1]
        return categoryId.split('?')[0]
    }

    const getPageNo = () => {
        let params = urlParams()
        return Number(params.page || 1)
    }

    const fetchSongs = useCallback(async () => {
        let offset = (LIMITS.SONGS_PER_PAGE * getPageNo()) - LIMITS.SONGS_PER_PAGE
        const payload = {
            cid: getCategoryId(),
            limit: LIMITS.SONGS_PER_PAGE,
            offset: offset
        }
        try {
            const result = await getRequest('songs', payload)
            setSongs(result.data)
            setIsLoadingSongs(false)
            setTotalPages(Math.ceil(result.total_results / LIMITS.SONGS_PER_PAGE))
        }
        catch (err) {
            log(err)
        }
    }, [])

    useEffect(() => {
        setCategories(data.data)
        setCategoryName(data.category_name)
        setBreadcrumb(data.breadcrumb)
        fetchSongs()
        setTags(data.tags)
    }, [path, query, fetchSongs, data])

    return <>
        <NextSeo
            title={`${data.breadcrumb[data.breadcrumb.length - 1].title} - ${APP_INFO.APP_NAME}`}
            description={`Download all songs of ${data.category_name} on your device and enjoy. All songs are availabe in high quality.`}
            openGraph={{
                url: router.asPath,
                title: `${data.breadcrumb[data.breadcrumb.length - 1].title} - ${APP_INFO.APP_NAME}`,
                description: `Download all songs of ${data.category_name} on your device and enjoy. All songs are availabe in high quality.`,
                images: [
                    { url: `${APP_INFO.APP_URL}/favicon.png`},
                ],
                type: 'article',
                site_name: APP_INFO.APP_NAME,
            }}
        />
        <Breadcrumb data={breadcrumb} />
        <Horizontal />
        {categories.length > 0 && pageNo === 1 && <div className={styles.cCatCont}>
            <Title iconClass="fa-guitar-electric" title={'Categories of ' + categoryName} />
            <div className={styles.categoriesContainer}>
                {categories?.map((item, index) => (
                    <CategoryCard key={index} category_id={item.category_id} category_name={item.category_name} />
                ))}
            </div>
        </div>}
        {songs.length > 0 && <>
            <div className={styles.cSongCont}>
                <Title iconClass="fa-music" title="All Songs" />
                <div className={styles.songsContainer}>
                    {isLoadingSongs ? <SongSkeleton count={20} /> : songs?.map((item, index) => {
                        return <SongCard
                            key={index}
                            title={item.title}
                            url={'/song/' + item.song_id + '/' + item.url}
                            field1={item.category_name}
                            field2={item.singer_name}
                            field3={item.size}
                        />
                    })}
                    <Horizontal />

                    {/* PAGINATION */}
                    {totalPages > 1 &&
                        <div className={paginationStyles.paginationCont}>

                            <div className={paginationStyles.paginationBtnCont}>
                                <Link href={`${'/category/' + getCategoryId()}`}>
                                    1</Link>
                                <Link href={`${'/category/' + getCategoryId() + '?page=' + (getPageNo() === 1 ? 1 : getPageNo() - 1)}`}>
                                    Prev
                                </Link>
                                <span>{getPageNo()}</span>
                                <Link href={`${'/category/' + getCategoryId() + (getPageNo() === totalPages ? '' : '?page=' + (getPageNo() + 1))}`}>
                                    Next
                                </Link>
                                <Link href={`${'/category/' + getCategoryId() + '?page=' + totalPages}`}>
                                    {totalPages}
                                </Link>
                            </div>
                        </div>}
                </div>
            </div>
        </>}
        {tags.length > 0 && <Tags data={tags} />}
        <OtherFeatures />
    </>;
}

export async function getServerSideProps(context) {
    const payload = {
        id: context.query.categoryId
    }
    const response = await getRequest('category', payload)
    if (response.status) {
        return {
            props: {
                data: response
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