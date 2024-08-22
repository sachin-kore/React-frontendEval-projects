import { collection, getDoc } from '@firebase/firestore'
import { db } from '../firebase'

async function GetComments() {
  const commentsCollection = collection(db, 'comments')
  const commentSnapshot = await getDoc(commentsCollection)
  const commentsList = commentSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  console.log(commentsList)
  return commentsList
}

export default GetComments
