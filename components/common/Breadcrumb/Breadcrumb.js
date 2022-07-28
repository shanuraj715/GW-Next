import React from 'react'
import styles from '/styles/breadcrumb.module.scss'
import Icon from '../../FontAwesome/FontAwesome'
import Link from 'next/link'

export default function Breadcrumb(props) {

    const { data: list } = props

    let data = []

    const generateUrl = (id) => {
        return '/category/' + id
    }

    const breadcrumb = () => list?.map((item, index) => {
        return (
            item.id && (item.id !== '' && item.id !== '#') ? <React.Fragment key={index}>
                <Link href={generateUrl(item.id)}>
                    <a className={styles.breadcrumbLink}>
                        {item.title}
                    </a>
                </Link>
                {index < list.length - 1 && <Icon classes={`fa-chevron-right mg-lr-10 ${styles.breadcrumbSap}`} type="solid" />}
            </React.Fragment>
                :
                <React.Fragment key={index}>
                    <span className={styles.breadcrumbLink}>{item.title}</span>
                    {index < list.length - 1 && <Icon classes={`fa-chevron-right mg-lr-10 ${styles.breadcrumbSap}`} type="solid" />}
                </React.Fragment>
        )
    })

    return (
        <div className={styles.breadcrumbCont}>
            <Link href="/">
                <a>
                    <Icon classes={`fa-home ${styles.homeBtn}`} type="solid" />
                </a>
            </Link>
            <Icon classes={`fa-chevron-right mg-lr-10 ${styles.breadcrumbSap}`} type="solid" />
            {data.length !== 0 ? <Icon classes={`fa-chevron-right mg-lr-10 ${styles.breadcrumbSap}`} type="solid" /> : null}
            {breadcrumb()}
        </div>
    )

}
