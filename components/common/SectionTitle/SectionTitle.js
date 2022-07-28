import React, { Component } from 'react'
import styles from '/styles/sectiontitle.module.scss'
import Icon from '/components/FontAwesome/FontAwesome'
export default class SectionTitle extends Component {
    render() {
        return (
            <div className={styles.sectionTitleCont}>
                <span className={styles.sti}>
                    <Icon classes={this.props.iconClass} type="regular" />
                </span>
                <h3 className={styles.sectionTitle}>{this.props.title}</h3>
            </div>
        )
    }
}
