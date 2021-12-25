import React, { useState, useEffect } from 'react'
import TopNav from './TopNav/TopNav'
import BulletsNav from './BulletsNav'
import InfoBlurb from './InfoBlurb'
import HeaderSlider from './HeaderSlider'

function Header(props) {
  const [activeBullet, setActiveBullet] = useState(0)
  const [imageGallery, setImageGallery] = useState([])
  const defaultObject = { title: '', description:  '', image: ''}
  const initialObject = imageGallery.length ? imageGallery[0].image : 'https://res.cloudinary.com/jkeohan/image/upload/v1560709227/mars-landing_eh42f9.jpg'

  const id = '1vaLjOuDB7iE9yv4lA3wGqPjV6vA8z6WcetuTerUiGR4'
  const jsonDataUrl = `https://spreadsheets.google.com/feeds/list/${id}/od6/public/values?alt=json`
  // const fullUrl = `https://spreadsheets.google.com/feeds/list/1vaLjOuDB7iE9yv4lA3wGqPjV6vA8z6WcetuTerUiGR4/od6/public/values?alt=json`
  // const googleDoc = 'https://docs.google.com/spreadsheets/d/1vaLjOuDB7iE9yv4lA3wGqPjV6vA8z6WcetuTerUiGR4/edit#gid=0'

  const formatImageGalleryData = (obj) => {
    return {
      title: obj.gsx$title.$t,
      description: obj.gsx$description.$t,
      image: obj.gsx$image.$t
    }
  }

  const handleClick = (id) => {
    setActiveBullet(id)
  }

  useEffect( () => {
    let makeAPICall = async () => {
      const data = await fetch(jsonDataUrl)
      const imageGalleryItems = await data.json()
      const imageGalleryArr = imageGalleryItems.feed.entry.map( d =>formatImageGalleryData(d) )
      setImageGallery(imageGalleryArr)
    }
    makeAPICall()
  },[])

  useEffect( () => {

  
  },[activeBullet])

  const style = {
    backgroundImage: imageGallery.length ? `url(${imageGallery[activeBullet].image}` : `url(${defaultObject.image})`
  }

  return (
    <div className="container">
      <header style={style}>
      <div className="gradient_container_top"></div>
      <div className="gradient_container_bottom"></div>
       <TopNav {...props} />
       {imageGallery.length ? 
        <InfoBlurb  activeBullet={imageGallery[activeBullet]}/> : 
        <InfoBlurb  activeBullet={initialObject[activeBullet]}/>
        }
       <BulletsNav activeBullet={activeBullet} imageGallery={imageGallery} onClick={handleClick}/>

        <HeaderSlider />
        <section className="more_bar">
          <div className="title">
            MORE
          </div>
          <div className="arrow_down"></div>
        </section>
      </header>

  </div>
  )
}

export default Header