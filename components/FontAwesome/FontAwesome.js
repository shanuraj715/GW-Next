import React, { Component } from 'react'

const FontAwesome = (props) => {

    const getStyle = () => ({
        '--fa-primary-color': props.color1 || '#353b48',
        '--fa-secondary-color': props.color2 || '#f5f6fa',
        '--fa-secondary-opacity': props.color2_opacity || '1.0'
    })

    return (
        props.type &&
        <>
            {props.type === 'solid' && <i className={`fas ${props.classes}`}></i>}


            {props.type === 'regular' && <i className={`far ${props.classes}`}></i>}


            {props.type === 'light' && <i className={`fal ${props.classes}`}></i>}


            {props.type === 'duotone' && <i className={`fad ${props.classes}`} style={getStyle()}></i>}


            {props.type === 'brands' && <i className={`fab ${props.classes}`}></i>}
        </>

    )
}

export default FontAwesome
