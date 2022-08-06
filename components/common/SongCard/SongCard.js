import React, { Component } from 'react'
import Icon from '/components/FontAwesome/FontAwesome'
import styles from '/styles/songcard.module.scss'
import Link from 'next/link'

export default function SongCard(props) {

    const {url, title, field1, field2, field3} = props

    return (
        <Link href={url ?? '/'}>
            <a className={styles.songCard}>
                <div className={styles.songCardLogo}>
                    <Icon type="duotone" classes="fa-music" color1="var(--light-black)" color2="var(--light-red)" />
                </div>
                <div className={styles.songCardData}>
                    <p className={styles.songCardSt}>{title ?? ''}</p>
                    <p className={styles.songCardSd}>
                        <span>{field1}</span>
                        <span>{field2}</span>
                        <span>{field3}</span>
                    </p>
                </div>
            </a>
        </Link>
    )
}
