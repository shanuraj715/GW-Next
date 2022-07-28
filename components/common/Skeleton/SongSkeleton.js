import React, { Component } from 'react'
import styles from '/styles/songSkeleton.module.scss'
import Icon from '/components/FontAwesome/FontAwesome'

export default class SongSkeleton extends Component {

    state = {
        arr: []
    }

    componentDidMount() {
        let arr = []
        let count = this.props.count || 5
        for (let i = 0; i < count; i++) arr.push(i)
        this.setState({ arr: arr })
    }

    render() {
        return (
            <>
                <div className={styles.songSkeletonCont} id="song-skeleton-cont">
                    {this.state.arr.map((item, index) => <div className={styles.songSkeleton} key={index}>
                        <div className={styles.ssImg}>
                            <Icon type="duotone" classes="fa-music" color1="var(--light-black)" color2="var(--light-red)" />
                        </div>
                        <div className={styles.ssData}>
                            <div className={styles.ssTitle}></div>
                            <div className={styles.ssDesc}></div>
                        </div>
                    </div>
                    )}
                </div>
            </>
        )
    }
}
