import { useState } from 'react'
import GoogleAuth from './components/GoogleAuth'
import CommentForm from './components/CommentForm'
import CommentsList from './components/CommentList'

const App = () => {
  const [user, setUser] = useState(null)
  const [comments, setComments] = useState([])

  const handleAuth = (user) => {
    setUser(user)
  }

  // const handleNewComment = (comment) => {
  //   setComments([...comments, comment])
  // }

  return (
    <div>
      <h1>Comment System</h1>
      <GoogleAuth onAuth={handleAuth} />
      {user && <CommentForm user={user} />}
      <CommentsList setComments={setComments} comments={comments} />
    </div>
  )
}

export default App
