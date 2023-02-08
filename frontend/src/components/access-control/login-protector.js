import { toast } from "react-hot-toast"
import { NotificationManager } from "react-notifications"
import { Navigate } from "react-router-dom"
import { useUser } from "../../context/user-context"

export const WithLoginProtector = ({ children }) => {
    const { user } = useUser()
    if (user) {
        return children
    } else {
        toast.error('Please login to Proceed!',
        {
          style: {
            borderRadius: '10px',
            background: '#07182e',
            color: '#fff',
          },
        });
    }
    return <Navigate to="/" replace />
}
