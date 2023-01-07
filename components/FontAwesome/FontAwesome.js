import React, { Component } from 'react'

const FontAwesome = () => {

    const getStyle = () => ({
        '--fa-primary-color': props.color1 || '#353b48',
        '--fa-secondary-color': props.color2 || '#f5f6fa',
        '--fa-secondary-opacity': props.color2_opacity || '1.0'
    })

    return (
        <React.Fragment>
            {props.type ?
                <React.Fragment>
                    {props.type === 'solid' ? <i className={`fas ${props.classes}`}></i> : null}


                    {props.type === 'regular' ? <i className={`far ${props.classes}`}></i> : null}


                    {props.type === 'light' ? <i className={`fal ${props.classes}`}></i> : null}


                    {props.type === 'duotone' ? <i className={`fad ${props.classes}`} style={getStyle()}></i> : null}


                    {props.type === 'brands' ? <i className={`fab ${props.classes}`}></i> : null}
                </React.Fragment>
                : null}
        </React.Fragment>
    )
}

export default FontAwesome
