import React, { Suspense } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { NotificationContainer } from "react-notifications"
import { UserProvider } from "./context/user-context"
import styles from "./index.css"
import AppLayout from "./components/layout/AppLayout"

export const App = () => (
  <UserProvider>
    <Suspense fallback={null}>
      <Router>
        <AppLayout />
        <NotificationContainer />
      </Router>
    </Suspense>
  </UserProvider>
)
