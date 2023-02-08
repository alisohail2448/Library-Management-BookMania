import { useState, useEffect, createContext, useContext } from "react"
import { NotificationManager } from "react-notifications"
import { BackendApi } from "../client/backend-api"
import toast from "react-hot-toast"

const UserContext = createContext({
  user: null,
  loginUser: () => {},
})

const useUser = () => useContext(UserContext)

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setIsAdmin(user && user.role === "admin")
  }, [user])

  useEffect(() => {
    BackendApi.user
      .getProfile()
      .then(({ user, error }) => {
        if (error) {
          console.error(error)
        } else {
          setUser(user)
        }
      })
      .catch(console.error)
  }, [])

  const loginUser = async (username, password) => {
    const { user, error } = await BackendApi.user.login(username, password)
    if (error) {
      toast.error(error)
    } else {
      toast.success("Logged in Successfully!", {
        style: {
          borderRadius: "10px",
          background: "#07182e",
          color: "#fff",
        },
      })
      setUser(user)
    }
  }

  const logoutUser = async () => {
    setUser(null)
    await BackendApi.user.logout()
    toast.success("Logout Successfully!", {
      style: {
        borderRadius: "10px",
        background: "#07182e",
        color: "#fff",
      },
    })
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, isAdmin }}>
      {children}
    </UserContext.Provider>
  )
}

export { useUser, UserProvider }
