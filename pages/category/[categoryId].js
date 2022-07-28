import { useState, useEffect, useCallback } from 'react'
import Breadcrumb from '/components/common/Breadcrumb/Breadcrumb'
import { getRequest } from '/extra/request'
import CategorySkeleton from '/components/common/Skeleton/CategorySkeleton'
import CategoryCard from '/components/common/CategoryCard/CategoryCard'
import Title from '/components/common/SectionTitle/SectionTitle'
import styles from '/styles/categorylist.module.scss'
import { useRouter } from 'next/router'
import { LIMITS } from '/constants'
import { urlParams } from '/extra/utils'
import SongSkeleton from '/components/common/Skeleton/SongSkeleton'
import SongCard from '/components/common/SongCard/SongCard'
import Link from 'next/link'
import paginationStyles from '/styles/pagination.module.scss'
import Tags from '/components/common/Tags/Tags'
import OtherFeatures from '/components/common/OtherFeatures/OtherFeatures'

export default function Category(props) {

    const router = useRouter()
    const path = router.asPath
    const query = router.query

    const [categories, setCategories] = useState([])
    const [songs, setSongs] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isLoadingCategories, setIsLoadingCategories] = useState(true)
    const [isLoadingSongs, setIsLoadingSongs] = useState(true)
    const [tags, setTags] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [breadcrumb, setBreadcrumb] = useState([])

    const perPageLimit = 20

    const getCategoryId = () => {
        let url = window.location.href
        let arr = url.split('/')
        let categoryIndex = arr.indexOf('category')
        let categoryId = arr[categoryIndex + 1]
        return categoryId.split('?')[0]
    }

    const fetchCategories = useCallback(async () => {
        const payload = {
            id: getCategoryId()
        }
        try {
            const result = await getRequest('category', payload)
            setCategories(result.data)
            setIsLoadingCategories(false)
            setTags(result.tags)
            setCategoryName(result.category_name)
            setBreadcrumb(result.breadcrumb)
            log(result)
        }
        catch (err) {
            log(err)
        }
    }, [])

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
            console.log(result)
            setSongs(result.data)
            setIsLoadingSongs(false)
            setTotalPages(Math.ceil(result.total_results / LIMITS.SONGS_PER_PAGE))
        }
        catch (err) {
            log(err)
        }
    }, [])

    useEffect(() => {
        console.clear()
        fetchCategories()
        fetchSongs()
    }, [path, query, fetchCategories, fetchSongs])

    return <>
        <Breadcrumb data={breadcrumb} />
        {isLoadingCategories && <CategorySkeleton count={8} />}
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

                    {/* PAGINATION */}
                    {totalPages > 1 &&
                        <div className={paginationStyles.paginationCont}>

                            <div className={paginationStyles.paginationBtnCont}>
                                <Link href={`${'/category/' + getCategoryId()}`}>
                                    <a>1</a></Link>
                                <Link href={`${'/category/' + getCategoryId() + '?page=' + (getPageNo() === 1 ? 1 : getPageNo() - 1)}`}>
                                    <a>Prev</a>
                                </Link>
                                <span>{getPageNo()}</span>
                                <Link href={`${'/category/' + getCategoryId() + (getPageNo() === totalPages ? '' : '?page=' + (getPageNo() + 1))}`}>
                                    <a>Next</a>
                                </Link>
                                <Link href={`${'/category/' + getCategoryId() + '?page=' + totalPages}`}>
                                    <a>{totalPages}</a>
                                </Link>
                            </div>
                        </div>}
                </div>
            </div>
            {tags.length > 0 && <Tags data={tags} />}
            <OtherFeatures />
        </>}
    </>
}