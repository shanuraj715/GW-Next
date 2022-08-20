import { useState, useContext } from 'react';

import LatestUploads from '/components/LatestUploads/LatestUploads'
import Title from '/components/common/SectionTitle/SectionTitle'
import CategoryCard from '/components/common/CategoryCard/CategoryCard'
import OtherFeatures from '/components/common/OtherFeatures/OtherFeatures'
import { getRequest } from '/extra/request'
import { AppContext } from '/Store'
import { APP_INFO } from '/constants'
import { NextSeo } from 'next-seo';
import Horizontal from '/components/ads/Horizontal'

export default function Home(props) {

  const [categoryList] = useState(props.data ?? [])

  return (
    <>
      <NextSeo
        title={APP_INFO.APP_NAME}
        description={APP_INFO.APP_DESCRIPTION}
        openGraph={{
          url: APP_INFO.APP_URL,
          title: APP_INFO.APP_NAME,
          description: APP_INFO.APP_DESCRIPTION,
          images: [
            { url: `${APP_INFO.APP_URL}/favicon.png` },
          ],
          type: 'article',
          site_name: APP_INFO.APP_NAME,
        }}
      />

      <Horizontal />
      <LatestUploads />
      <Horizontal />
      <div className="home-categories">

        <div className="categories-container">
          {categoryList.length > 0 && <>
            <Title iconClass="fa-guitar-electric" title="Music Categories" />
            {categoryList?.map((item, index) => (
              <CategoryCard key={index} category_id={item.category_id} category_name={item.category_name} />
            ))}
          </>}
        </div>
      </div>
      <Horizontal />
      <OtherFeatures />
    </>
  )
}

export async function getStaticProps() {
  let data = []
  try {
    const result = await getRequest('home_categories')
    if (result.status) {
      data = result.data
    }
  }
  catch (err) {
    console.log(err)
  }

  return {
    props: {
      data,
    },
    revalidate: 15
  }
}