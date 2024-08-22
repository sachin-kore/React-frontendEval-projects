import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
async function AddComment(commentText, userId) {
  console.log(commentText, userId)
  try {
    // Reference to the "comments" collection in Firestore
    const commentsCollection = collection(db, 'comments')

    // Add a new document with the comment data
    const docRef = await addDoc(commentsCollection, {
      text: commentText,
      userId: userId,
      timestamp: new Date(),
    })

    console.log(docRef)

    console.log('Comment added with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding comment: ', e)
  }
}

export default AddComment
