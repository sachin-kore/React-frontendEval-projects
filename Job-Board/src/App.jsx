import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [postIds, setPostIds] = useState([])
  const [postMetaData, setPostMetaData] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = async (url) => {
    const data = await fetch(url)
    const res = await data.json()
    return res
  }
  const getJobTitle = (text) => {
    const arr = text.split(/\((YC [^)]+)\)/)
    if (arr.length > 1) {
      const part1 = arr[0]
      const part2 = arr[1]
      return `${part1} ${part2}`
    }
  }
  const getJobinfo = (text) => {
    const arr = text.split(/\((YC [^)]+)\)/)
    if (arr.length > 2) {
      return arr[2]
    }
  }
  const getFormettedDate = (uniqueTimeStamp) => {
    const date = new Date(uniqueTimeStamp * 1000)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const year = date.getFullYear()
    const formatedDate = `${month}/${day}/${year}`
    return formatedDate
  }
  const fetchPostMetaData = async (ids) => {
    setLoading(true)
    const apiCalls = ids.map((id) => {
      const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      return getData(url)
    })
    const results = await Promise.all(apiCalls)
    setLoading(false)
    if (results.length) {
      const newArr = results.map((item) => {
        const obj = {
          jobTitle: getJobTitle(item.title),
          jobInfo: getJobinfo(item.title),
          date: getFormettedDate(item.time),
          url: item.url
            ? item.url
            : `https://news.ycombinator.com/item?id=${item.id}`,
        }
        return obj
      })
      let copyPostMetadata = [...postMetaData]
      copyPostMetadata = [...copyPostMetadata, ...newArr]
      setPostMetaData(copyPostMetadata)
    }
  }
  const fetPostIds = async () => {
    const url = 'https://hacker-news.firebaseio.com/v0/jobstories.json'
    const data = await getData(url)
    const ids = data.splice(0, 9)
    setPostIds(data)
    fetchPostMetaData(ids)
  }

  const handleMore = () => {
    const copyIDs = [...postIds]
    if (copyIDs.length > 0) {
      const ids = copyIDs.splice(0, 6)
      fetchPostMetaData(ids)
      setPostIds(copyIDs)
    }
  }
  useEffect(() => {
    fetPostIds()
  }, [])

  return (
    <div className="app">
      <h1>HN Jobs</h1>
      <div className="cards-container">
        {postMetaData?.map((item, index) => {
          return (
            <div className="card" key={index}>
              <p>{item?.jobTitle}</p>
              <p>{item?.jobInfo}</p>
              <p>{item?.date}</p>
            </div>
          )
        })}
      </div>
      {loading ? null : (
        <button
          disabled={postIds.length === 0}
          onClick={handleMore}
          className="button"
        >
          More
        </button>
      )}
    </div>
  )
}

export default App
