import React, { Component } from 'react'
import Icon from '/components/FontAwesome/FontAwesome'
import styles from '/styles/songcard.module.scss'
import Link from 'next/link'

export default class SongCard extends Component {
    render() {
        return (
            <Link href={this.props.url || '/'}>
                <a className={styles.songCard}>
                    <div className={styles.songCardLogo}>
                        <Icon type="duotone" classes="fa-music" color1="var(--light-black)" color2="var(--light-red)" />
                    </div>
                    <div className={styles.songCardData}>
                        <p className={styles.songCardSt}>{this.props.title || ''}</p>
                        <p className={styles.songCardSd}>
                            <span>{this.props.field1}</span>
                            <span>{this.props.field2}</span>
                            <span>{this.props.field3}</span>
                        </p>
                    </div>
                </a>
            </Link>
        )
    }
}
