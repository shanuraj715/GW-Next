import React, { Component } from 'react'
import { Icon, Title } from '../../components/Index'

export default class CategorySkeleton extends Component {
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
                <div className="category-skeleton-cont" id="category-skeleton-cont">
                    <Title iconClass="fa-guitar-electric" title="Loading Categories" />
                    {this.state.arr.map((item, index) => <span className="category-card" key={index}>
                        <span>
                            <Icon classes="fa-arrow-alt-right" type="duotone" color1="var(--light-red)" color2="var(--light-pink)" />
                        </span>
                        <span className="cat-skeleton-text"></span>
                    </span>
                    )}
                </div>
            </>
        )
    }
}
