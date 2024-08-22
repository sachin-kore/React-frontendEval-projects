import { useState } from 'react'
import { auth, provider, signInWithPopup, signOut } from '../firebase'

const GoogleAuth = ({ onAuth }) => {
  const [user, setUser] = useState(null)

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      setUser(result.user)
      onAuth(result.user)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null)
      onAuth(null)
    })
  }

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  )
}

export default GoogleAuth
