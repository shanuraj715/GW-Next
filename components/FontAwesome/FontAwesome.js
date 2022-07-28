import React, { Component } from 'react'

export class FontAwesome extends Component {

    getStyle = ( ) => ({
            '--fa-primary-color': this.props.color1 || '#353b48',
            '--fa-secondary-color': this.props.color2 || '#f5f6fa',
            '--fa-secondary-opacity': this.props.color2_opacity || '1.0'
        })

    render() {
        return (
            <React.Fragment>
                { this.props.type ? 
                    <React.Fragment>
                        { this.props.type === 'solid' ? <i className={`fas ${this.props.classes}`}></i> : null }


                        { this.props.type === 'regular' ? <i className={`far ${this.props.classes}`}></i> : null }


                        { this.props.type === 'light' ? <i className={`fal ${this.props.classes}`}></i> : null }


                        { this.props.type === 'duotone' ? <i className={`fad ${this.props.classes}`} style={ this.getStyle() }></i> : null }


                        { this.props.type === 'brands' ? <i className={`fab ${this.props.classes}`}></i> : null }
                    </React.Fragment>
                : null }
            </React.Fragment>
        )
    }
}

export default FontAwesome
