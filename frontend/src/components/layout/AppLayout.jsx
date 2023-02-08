import React, { useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { useUser } from "../../context/user-context"
import BookForm from "../book-form/BookForm"
import BookList from "../books-list/BookList"
import LoginDialog from "../login/LoginDialog"
import Navbar from "../Navbar/Navbar"
import { WithLoginProtector } from "../access-control/login-protector"
import { WithAdminProtector } from "../access-control/admin-protector"
import DeleteDialog from "../delete/DeleteDialog"
import { BackendApi } from "../../client/backend-api"
import Book from "../book/Book"

const AppLayout = () => {
  const [showModal, setShowModal] = useState(false)

  const [isOpen, setIsOpen] = useState(false)
  const [activeBookIsbn, setActiveBookIsbn] = useState("")
  const { user, loginUser, logoutUser, isAdmin } = useUser()
  const [books, setBooks] = useState([]);
  const [borrowedBook, setBorrowedBook] = useState([])

  const navigate = useNavigate()

  const handleLoginSubmit = async (username, password) => {
    loginUser(username, password)
    setShowModal(false)
  }



  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  const handleLogout = () => {
    logoutUser()
  }


  const fetchBooks = async () => {
    const { books } = await BackendApi.book.getAllBooks()
    setBooks(books)
}

const fetchUserBook = async () => {
  const { books } = await BackendApi.user.getBorrowBook()
  setBorrowedBook(books)
}


  
  const deleteBook = () => {
    console.log("delete book is calling")
    if (activeBookIsbn && books.length) {
        BackendApi.book.deleteBook(activeBookIsbn).then(({ success }) => {
            fetchBooks().catch(console.error)
            setActiveBookIsbn("")
            toast.success('Deleted Successfully!',
            {
              style: {
                borderRadius: '10px',
                background: '#07182e',
                color: '#fff',
              },
            });
            closeModal()
        })
    }
}



  useEffect(() => {
     fetchBooks().catch(console.error)
     fetchUserBook().catch(console.error)
    if (!user) {
      navigate("/")
    } else if (isAdmin) {
      navigate("/admin/books/add")
    }
  }, [user, isAdmin])

  return (
    <div className="h-[100vh] bg">
      <Navbar setShowModal={setShowModal} user={user} handleLogout={handleLogout}  />
      <Routes>
        <Route path="/books" exact element={<BookList openModal={openModal}setActiveBookIsbn={setActiveBookIsbn} setIsOpen={setIsOpen} books={books} borrowedBook={borrowedBook} />} />
        <Route
          path="/books/:bookIsbn"
          exact
          element={
            <WithLoginProtector>
                <Book />
            </WithLoginProtector>
          }
        />
        <Route
          path="/admin/books/add"
          exact
          element={
            <WithLoginProtector>
              <WithAdminProtector>
                <BookForm />
              </WithAdminProtector>
            </WithLoginProtector>
          }
        />
        <Route
          path="/admin/books/:bookIsbn/edit"
          exact
          element={
            <WithLoginProtector>
              <WithAdminProtector>
                <BookForm />
              </WithAdminProtector>
            </WithLoginProtector>
          }
        />
        <Route path="*" element={<Navigate to="/books" replace />} />
      </Routes>
      <LoginDialog
        showModal={showModal}
        setShowModal={setShowModal}
        handleLoginSubmit={handleLoginSubmit}
      />
      <DeleteDialog isOpen={isOpen} openModal={openModal} closeModal={closeModal} deleteBook={deleteBook} />
      <Toaster position="bottom-center" reverseOrder={false}  />
    </div>
  )
}

export default AppLayout
