import React, { Component } from 'react'
import Link from 'next/link'
import Icon from '/components/FontAwesome/FontAwesome'
import styles from '/styles/categorycard.module.scss'

export default function CategoryCard({category_id, category_name}) {
    return (
        <Link href={`/category/${category_id}`}>
            <a className={styles.categoryCard}>
                <span>
                    <Icon classes="fa-arrow-alt-right" type="duotone" color1="var(--light-red)" color2="var(--light-pink)" />
                </span>
                <span>{category_name}</span>
            </a>
        </Link>
    )
}

