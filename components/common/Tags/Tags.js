import styles from '/styles/tags.module.scss'
import Title from '../SectionTitle/SectionTitle'

export default function Tags({data}) {

    return <div className={styles.tagsBlock}>
        <Title iconClass="fa-tags" title="Tags Related To This Page" />
        <div className={styles.tagsContainer}>
            <div className={styles.tagsList}>
                {data.map((item, index) => {
                    return <span className={styles.tagText} key={index}>{item}</span>

                })}
            </div>
        </div>
    </div>
}
