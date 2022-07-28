import { useEffect, useState } from 'react';

import LatestUploads from '/components/LatestUploads/LatestUploads'
import Title from '/components/common/SectionTitle/SectionTitle'
import CategorySkeleton from '/components/common/Skeleton/CategorySkeleton'
import CategoryCard from '/components/common/CategoryCard/CategoryCard'
import OtherFeatures from '/components/common/OtherFeatures/OtherFeatures'
import {getRequest} from '/extra/request'

export default function Home() {

  const [categoryList, setCategoryList] = useState([])
  const [isCategoryLoading, setIsCategoryLoading] = useState(true)

  const fetcgCategories = async () => {
    try{
      const result = await getRequest('home_categories')
      setCategoryList(result.data)
      setIsCategoryLoading(false)
    }
    catch( err ){
      console.log( err )
    }
  }

  useEffect(() => {
    fetcgCategories()
  }, [])

  return (
    <>
      <LatestUploads />
      <div className="home-categories">

        <div className="categories-container">
          {isCategoryLoading && <CategorySkeleton count={8} />}
          {!isCategoryLoading && categoryList.length > 0 && <>
            <Title iconClass="fa-guitar-electric" title="Music Categories" />
            {categoryList?.map((item, index) => (
              <CategoryCard key={index} category_id={item.category_id} category_name={item.category_name} />
            ))}
          </>}
        </div>
      </div>
      <OtherFeatures />
    </>
  )
}
