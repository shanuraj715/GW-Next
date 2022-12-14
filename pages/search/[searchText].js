import { useState, useEffect, useCallback } from 'react'
import styles from '/styles/search.module.scss'
import OtherFeatures from '/components/common/OtherFeatures/OtherFeatures'
import Title from '/components/common/SectionTitle/SectionTitle'
import SongCard from '/components/common/SongCard/SongCard'
import SongSkeleton from '/components/common/Skeleton/SongSkeleton'
import noResultImage from '/assets/images/no-result.png'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { getRequest } from '/extra/request'
import { pascalCase } from '/extra/utils'
import paginationStyles from '/styles/pagination.module.scss'

export default function Search(props) {

    const router = useRouter()
    const query = router.query
    const path = router.asPath

    const [searchStr, setSearchStr] = useState('')
    const [data, setData] = useState([])
    const [perPageLimitResults, setPerPageLimitResults] = useState(20)
    const [totalResults, setTotalResults] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(1)
    const [noResult, setNoResult] = useState(false)

    const getPageNo = useCallback(() => {
        return parseInt(query.page ?? 1)
    }, [query])

    const fetchData = useCallback(async () => {
        setNoResult(false)
        let offset = (getPageNo() * perPageLimitResults) - perPageLimitResults
        const payload = {
            str: query.searchText,
            offset: offset,
            limit: perPageLimitResults
        }
        try {
            const result = await getRequest('search', payload)
            setData(result.data)
            setTotalResults(result.total_results)
            setIsLoading(false)
            setTotalPages(Math.ceil((result.total_results || 1) / perPageLimitResults))
            if (result.data.length === 0) {
                setNoResult(true)
                toast.error("Zero result found...", { position: 'bottom-left' })
            }
        }
        catch (err) {
            log(err)
        }
    }, [getPageNo, perPageLimitResults, query])

    useEffect(() => {
        setIsLoading(true)
        setSearchStr(query.searchText)
        fetchData()
    }, [query, fetchData])

    const noResultJsx = () => {
        return (
            <div className={styles.noResultContainer}>
                <div className={styles.noResultImageC}>
                    <img src={noResultImage.src} alt="" />
                </div>
                <div className={styles.noResData}>
                    <p className={styles.noResTitle}>No Result Found</p>
                    <p className={styles.noResDesc}>Sorry!!!<br />We do not have any data for your query.</p>
                    <Link href="/" className={styles.noResLink}>
                        
                            HomePage
                        
                    </Link>
                </div>
            </div>
        );
    }

    const pagination = () => {
        return (
            <div className={paginationStyles.paginationCont}>
                <div className={paginationStyles.paginationBtnCont}>
                    <Link href={`/search/${searchStr}`}>1</Link>
                    <Link href={`/search/${searchStr}?page=${(getPageNo() <= 1 ? 1 : getPageNo() - 1)}`}>Prev</Link>
                    <span>{getPageNo()}</span>
                    <Link href={`/search/${searchStr}?page=${(getPageNo() === totalPages ? totalPages : getPageNo() + 1)}`}>Next</Link>
                    <Link href={`/search/${searchStr}?page=${totalPages}`} legacyBehavior>
                        {totalPages}
                    </Link>
                </div>
            </div>
        );
    }

    return <>
        {noResult && noResultJsx()}
        {isLoading && <SongSkeleton count={perPageLimitResults} />}
        {data.length > 0 && !isLoading && <>
            <Title iconClass="fa-search" title={"Search result for " + pascalCase(searchStr)} />
            <div className={styles.songsContainer}>
                {data.map((item, index) => {
                    return <SongCard key={index}
                        url={'/song/' + item.song_id + '/' + item.url}
                        title={item.title}
                        field1={item.category_name}
                        field2={item.singer_name}
                        field3={item.size}
                    />
                })}
            </div>
            {totalResults > perPageLimitResults && pagination()}
        </>}
        <OtherFeatures />
    </>
}