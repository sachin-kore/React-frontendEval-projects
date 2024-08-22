import React from 'react'

const CardComponent = ({ image }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        height: '300px',
        border: '2px solid black',
        background: 'lightgray',
      }}
    >
      <h3 style={{ textAlign: 'center', color: 'black' }}>
        {image?.title.length > 10
          ? image.title.slice(0, 10) + '...'
          : image.title}
      </h3>
      <img
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          overflow: 'hidden',
        }}
        src={image?.thumbnailUrl}
      />
    </div>
  )
}

export default CardComponent
