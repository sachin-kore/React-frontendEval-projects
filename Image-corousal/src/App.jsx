import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    'https://via.placeholder.com/600x300?text=Image+1',
    'https://via.placeholder.com/600x300?text=Image+2',
    'https://via.placeholder.com/600x300?text=Image+3',
  ]

  function FetchData() {
    let res = fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => res.json())
      .then((response) => setData(response.slice(0, 10)))
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    FetchData()
  }, [])

  function goToPrevious() {
    const newIndex = currentIndex === 0 ? data.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }
  function moveNext() {
    const newIndex = currentIndex === data.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  function handleCourselDots(index) {
    setCurrentIndex(index)
  }

  return (
    <div className="couroousal">
      <h1 style={{ textAlign: 'center' }}>Image Courousal</h1>
      <div className="couroousalContainer">
        {data.map((item, index) => (
          <img
            key={item.id}
            className={`image${currentIndex === index ? 'activ' : ''} `}
            src={item.url}
            alt={index + 1}
          />
        ))}
      </div>
      <div className="btns">
        <button className="btn" onClick={goToPrevious}>
          {'<'}
        </button>
        <button className="btn" onClick={moveNext}>
          {'>'}
        </button>
      </div>
      <div className="dots">
        {data.map((el, index) => (
          <p
            className={`dot ${currentIndex === index ? 'selected' : ''}`}
            key={index}
            onClick={() => handleCourselDots(index)}
          ></p>
        ))}
      </div>
    </div>
  )
}

export default App
