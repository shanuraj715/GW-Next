import { useState, useEffect, useCallback } from 'react'
import styles from '/styles/search.module.scss'
import OtherFeatures from '/components/common/OtherFeatures/OtherFeatures'
import Title from '/components/common/SectionTitle/SectionTitle'
import SongCard from '/components/common/SongCard/SongCard'
import SongSkeleton from '/components/common/Skeleton/SongSkeleton'
import img from '/assets/images/no-result.svg'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { getRequest } from '/extra/request'

export default function Search(props) {

    const router = useRouter()
    const query = router.query
    const path = router.asPath

    const [searchStr, setSearchStr] = useState('')
    const [data, setData] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [perPageLimitResults, setPerPageLimitResults] = useState(20)
    const [totalResults, setTotalResults] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(1)

    const getPageNo = useCallback(() => {
        let arr = path.split('/')
        let indexOfSearch = arr.indexOf('search')
        let pageno = !isNaN(arr[indexOfSearch + 2]) ? parseInt(arr[indexOfSearch + 2]) : 1
        return pageno
    }, [path])

    const fetchData = useCallback(async () => {
        log(router)
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
        }
        catch (err) {
            log(err)
        }
    }, [getPageNo, perPageLimitResults, query, router])

    useEffect(() => {
        setIsLoading(true)
        
        setSearchStr(query.searchText)
        fetchData()
    }, [query, fetchData])

    return <>
        {isLoading === false && data.lengh === 0 && (<div className="no-result-container">
            <div className="no-result-image-c">
                <img src={img} alt="" />
            </div>
            <div className="no-res-data">
                <p className="no-res-title">No Result Found</p>
                <p className="no-res-desc">Sorry!!!<br />We do not have any data for your query.</p>
                <Link to="/" className="no-res-link">HomePage</Link>
            </div>
        </div>)}
    </>
}