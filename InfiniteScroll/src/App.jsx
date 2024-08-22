import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import CardComponent from './CardComponent'

function App() {
  const loaderRef = useRef()
  const [images, setImages] = useState([])
  const [page, setPage] = useState(2)
  const [loading, setLoading] = useState(false)

  const fetchImages = async (index) => {
    try {
      const results = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${index}&_limit=15`,
      )
      const data = await results.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const getData = useCallback(async () => {
    if (loading) return
    setLoading(true)
    const data = await fetchImages(page)
    setImages((prevImage) => [...prevImage, ...data])

    setTimeout(() => {
      setLoading(false)
    }, 1000)
    setPage((prvePage) => prvePage + 1)
  }, [page, loading])
  useEffect(() => {
    fetchImages(1)
  }, [])
  localStorage.setItem('item', JSON.stringify(images))
  console.log(JSON.parse(localStorage.getItem('item')))

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0]
      if (target.isIntersecting) {
        getData()
      }
    })
    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [getData])

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Infinite scrolling</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '5px',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        {images?.map((image, index) => (
          <CardComponent key={index} image={image} />
        ))}
      </div>
      <div style={{ textAlign: 'center' }} ref={loaderRef}>
        {loading && <h2>loading images....</h2>}
      </div>
    </>
  )
}

export default App
