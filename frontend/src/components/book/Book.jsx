import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import TabPage from '../tabs/Tab.jsx'
import { BackendApi } from '../../client/backend-api/index.js'
import { useUser } from '../../context/user-context.js'

const Book = () => {
    const { bookIsbn } = useParams()
    const { user, isAdmin } = useUser()
    const [book, setBook] = useState(null)



    const borrowBook = () => {
      console.log("Borrow book")
      // if (book && user) {
      //     BackendApi.user
      //         .borrowBook(book.isbn, user._id)
      //         .then(({ book, error }) => {
      //             if (error) {
      //                 toast.error(error)
      //             } else {
      //                 setBook(book)
      //             }
      //         })
      //         .catch(console.error)
      // }
  }

  const returnBook = () => {
      if (book && user) {
          BackendApi.user
              .returnBook(book.isbn, user._id)
              .then(({ book, error }) => {
                  if (error) {
                      toast.error(error)
                  } else {
                      setBook(book)
                  }
              })
              .catch(console.error)
      }
  }

  useEffect(() => {
      if (bookIsbn) {
          BackendApi.book
              .getBookByIsbn(bookIsbn)
              .then(({ book, error }) => {
                  if (error) {
                    toast.error(error,
                    {
                      style: {
                        borderRadius: '10px',
                        background: '#07182e',
                        color: '#fff',
                      },
                    });
                  } else {
                      setBook(book)
                  }
              })
              .catch(console.error)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookIsbn])


  return (
    <div className='w-full h-[100%]'>
        <TabPage  />
    </div>
  )
}

export default Book