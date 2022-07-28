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
                <div className="song-skeleton-cont" id="song-skeleton-cont">
                    {this.state.arr.map((item, index) => <div className="song-skeleton" key={ index }>
                            <div className="ss-img">
                                <Icon type="duotone" classes="fa-music" color1="var(--light-black)" color2="var(--light-red)" />
                            </div>
                            <div className="ss-data">
                                <div className="ss-title"></div>
                                <div className="ss-desc"></div>
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
    }
}
