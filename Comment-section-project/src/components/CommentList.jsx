import GetComments from '../hooks/GetComments'

const CommentsList = ({ setComments, comments }) => {
  GetComments().then((comments) => {
    setComments(comments)
  })

  return (
    <div>
      hello
      {comments.map((comment, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: comment }} />
      ))}
    </div>
  )
}

export default CommentsList
