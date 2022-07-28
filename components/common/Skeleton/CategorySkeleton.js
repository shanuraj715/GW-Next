import { useState, useEffect } from 'react'
import Icon from '/components/FontAwesome/FontAwesome'
import Title from '/components/common/SectionTitle/SectionTitle'
import styles from '/styles/songSkeleton.module.scss'

export default function CategorySkeleton(props) {
    const [arr, setArr] = useState([])

    const { count = 5 } = props

    useEffect(() => {
        let arr = []
        for (let i = 0; i < count; i++) arr.push(i)
        setArr(arr)
    }, [count])

    return (
        <>
            <div className={styles.categorySkeletonCont} id="category-skeleton-cont">
                <Title iconClass="fa-guitar-electric" title="Loading Categories" />
                {arr.map((item, index) => <p className={styles.categoryCard} key={index}>
                    <span>
                        <Icon classes="fa-arrow-alt-right" type="duotone" color1="var(--light-red)" color2="var(--light-pink)" />
                    </span>
                    <span className={styles.catSkeletonText}></span>
                </p>
                )}
            </div>
        </>
    )
}
