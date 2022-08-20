import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

import Title from '/components/common/SectionTitle/SectionTitle'
import OtherFeatures from '/components/common/OtherFeatures/OtherFeatures'
import { getRequest } from '/extra/request'
import toast from 'react-hot-toast';
import { NextSeo } from 'next-seo';
import Horizontal from '/components/ads/Horizontal'
import { API, LIMITS, OPERATION_CANCELED, APP_INFO } from '/constants'
import SongCard from '/components/common/SongCard/SongCard'
import SongSkeleton from '/components/common/Skeleton/SongSkeleton'
import paginationStyles from '/styles/pagination.module.scss'
import Link from 'next/link'


function LatestUploads(props) {

    const router = useRouter()
    const { pageNo = 1 } = router.query

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(props.data)
    const [totalPages, setTotalPages] = useState(props.totalPages)

    const fetchData = useCallback(async () => {
        setData([])
        setIsLoading(true)
        const params = {
            limit: LIMITS.LATEST_UPLOADS,
            order: 'song_id',
            by: 'desc',
            offset: (LIMITS.LATEST_UPLOADS * ((router.query.params && router.query.params[0]) ?? 1)) - LIMITS.LATEST_UPLOADS
        }
        try {
            const result = await getRequest('latest', params)
            setData(result.data)
            setIsLoading(false)
            setTotalPages(Math.ceil(result.results / LIMITS.LATEST_UPLOADS))
        } catch (err) {
            if (err.message !== OPERATION_CANCELED) {
                toast.error("An error occured")
            }
        }
    }, [router])

    // useEffect(() => {
    //     log("Latest Uploads Page Loaded")
    //     fetchData()
    // }, [fetchData])

    return <>
        <NextSeo
            title={`Latest Uploads - Page ${pageNo} | ${APP_INFO.APP_NAME}`}
            description="Browse by recent uploads."
            openGraph={{
                url: router.asPath,
                title: `Latest Uploads - Page ${pageNo} | ${APP_INFO.APP_NAME}`,
                description: "Browse by recent uploads.",
                images: [
                    { url: `${APP_INFO.APP_URL}/favicon.png` },
                ],
                type: 'article',
                site_name: APP_INFO.APP_NAME,
            }}
            noindex={true}
            nofollow={true}
        />
        <Title iconClass="fa-list-music" title="Latest Uploads" />
        {data?.map(item => {
            return <SongCard
                url={'/song/' + item.song_id + '/' + item.url}
                title={item.title}
                field1={item.category_name}
                field2={item.singer_name}
                field3={item.size}
                key={item.song_id} />
        })}
        <Horizontal />
        {totalPages > 1 && <div className={paginationStyles.paginationCont}>

            <div className={paginationStyles.paginationBtnCont}>
                <Link href={`${'/latest-uploads/1'}`}>
                    <a>1</a></Link>
                <Link href={`/latest-uploads/${parseInt(pageNo) === 1 ? 1 : parseInt(pageNo) - 1}`}>
                    <a>Prev</a>
                </Link>
                <span>{pageNo}</span>
                <Link href={`/latest-uploads/${parseInt(pageNo) === totalPages ? totalPages : parseInt(pageNo) + 1}`}>
                    <a>Next</a>
                </Link>
                <Link href={`/latest-uploads/${totalPages}`}>
                    <a>{totalPages}</a>
                </Link>
            </div>
        </div>
        }
        <OtherFeatures />
    </>
}



export async function getStaticPaths() {
    let arr = [];
    try {
        const payload = {
            limit: 0
        };
        const response = await getRequest('latest', payload)
        if (response.status) {
            const pages = Math.ceil(response.results / LIMITS.LATEST_UPLOADS)
            arr = []
            if (pages >= 1) arr.push({ params: { pageNo: String(1) } })
        }
        else {
            console.log(response)
        }
    }
    catch (err) {
        console.log(err)
    }
    return {
        paths: arr,
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    const payload = {
        limit: LIMITS.LATEST_UPLOADS,
        order: 'song_id',
        by: 'desc',
        offset: (LIMITS.LATEST_UPLOADS * (params.pageNo ?? 1)) - LIMITS.LATEST_UPLOADS
    };
    try {
        const response = await getRequest('latest', payload)
        if (response.status) {
            return {
                props: {
                    data: response.data,
                    totalPages: Math.ceil(response.results / LIMITS.LATEST_UPLOADS)
                },
                revalidate: 30
            }
        }
        return {
            props: {
                error: true,
                message: response.error.message
            },
            revalidate: 10,
        }
    }
    catch (err) {
        console.log(err)
    }
}

export default LatestUploads