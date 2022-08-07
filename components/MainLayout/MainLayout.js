import {useState} from 'react'
import SocialMeta from '/components/common/SocialMeta/SocialMeta'

function MainLayout(props) {

  const { children } = props

  return (
    <>
      {children}
    </>
  )
}

export default MainLayout