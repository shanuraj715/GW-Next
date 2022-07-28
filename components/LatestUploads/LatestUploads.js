import React, { Component } from 'react'
import Title from '/components/common/SectionTitle/SectionTitle'
import Icon from '/components/FontAwesome/FontAwesome'
import SongCard from '/components/common/SongCard/SongCard'
import SongSkeleton from '/components/common/Skeleton/SongSkeleton'
import Link from 'next/link'
import styles from '/styles/latestuploads.module.scss'
import { API, LIMITS } from '/constants'
import toast from 'react-hot-toast';

export default class LatestUploads extends Component {

    state = {
        latestUploads: [],
        loadingLatestUploads: true
    }

    componentDidMount() {
        this.setState({ loadingLatestUploads: true }, () => {
            this.fetchLatestUploads()
        })
    }

    fetchLatestUploads = () => {
        fetch(API.URL + 'latest?limit=' + LIMITS.LATEST_UPLOADS + '&order=song_id&by=desc', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error("Error")
            })
            .then(json => {
                if (json.status) this.setState({ latestUploads: json.data, loadingLatestUploads: false })
                else toast.error(json.error.message, { position: 'bottom-left' })
            })
            .catch(err => {
                console.log(err)

            })
    }
    render() {
        return (
            <div className={styles.hLatestUploads}>
                <Title iconClass="fa-guitar-electric" title="Latest Uploads" />
                <div className={styles.hLuList}>
                    {this.state.loadingLatestUploads ? <SongSkeleton /> : this.state.latestUploads?.map((item, index) => {
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
}
