// src/components/CommentForm.js
import { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { addDoc, collection } from '@firebase/firestore'
import { db } from '../firebase'
// import AddComment from '../hooks/AddComment'

const CommentForm = ({ user }) => {
  const [comment, setComment] = useState('')

  const handleEditorChange = (content) => {
    setComment(content)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(addComment(comment, 1))
    setComment('') // Reset the editor
  }

  return (
    <form onSubmit={handleSubmit}>
      <Editor
        apiKey="959uwquk1ts3jyrqx0ojawh0cjnlhn6g1sxvt5ulu3mqsls4"
        initialValue="Welcome to TinyMCE!"
        init={{
          height: 200,
          menubar: false,
          plugins: 'link image code',
          toolbar:
            'undo redo | bold italic | alignleft aligncenter alignright | code',
        }}
        value={comment}
        onEditorChange={handleEditorChange}
      />

      {/* <Editor
        apiKey="959uwquk1ts3jyrqx0ojawh0cjnlhn6g1sxvt5ulu3mqsls4"
        init={{
          plugins:
            'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject('See docs to implement AI Assistant'),
            ),
        }}
        initialValue="Welcome to TinyMCE!"
        onEditorChange={handleEditorChange}
      /> */}
      <button type="submit">Submit Comment</button>
    </form>
  )
}

export default CommentForm

const addComment = (commentText, userId) => {
  try {
    // Reference to the "comments" collection in Firestore
    const commentsCollection = collection(db, 'comments')

    // Add a new document with the comment data
    const docRef = addDoc(commentsCollection, {
      text: commentText,
      userId: userId,
      timestamp: new Date(),
    })

    console.log('Comment added with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding comment: ', e)
  }
}
