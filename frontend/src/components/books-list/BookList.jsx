import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BackendApi } from "../../client/backend-api"
import { useUser } from "../../context/user-context"

const BookList = ({ openModal, setActiveBookIsbn, setIsOpen }) => {
  const { user, isAdmin } = useUser()
  const [books, setBooks] = useState([])
  const [borrowedBook, setBorrowedBook] = useState([])

  const fetchBooks = async () => {
    const { books } = await BackendApi.book.getAllBooks()
    setBooks(books)
  }

  const fetchUserBook = async () => {
    const { books } = await BackendApi.user.getBorrowBook()
    setBorrowedBook(books)
  }

  useEffect(() => {
    fetchBooks().catch(console.error)
    fetchUserBook().catch(console.error)
  }, [user])

  return (
    <>
      <div className="h-[100ch] flex justify-center items-center flex-col">
        <div className="mb-[200px] flex justify-center items-center flex-col">
          <div className="heading">
            <p className="fancyHeading">
              <span class="fancy">BookMania</span>
            </p>
            <p className="subHeading">Library Management System</p>
          </div>

          <div
            className={
              isAdmin
                ? "flex flex-col justify-center items-center absolute top-[300px]"
                : "flex flex-col justify-center items-center absolute top-[150px]"
            }
          >
            <div
              className={
                isAdmin ? "flex justify-between items-center min-w-[80%]  my-6" : "  mt-[150px]"
              }
            >
              <h3 className="text-xl font-bold text-white">BOOK LIST</h3>
              {isAdmin && (
                <Link to={"/admin/books/add"}>
                  <button className="addBookBtn">
                    <span>Add Book</span>
                  </button>
                </Link>
              )}
            </div>
            <div
              class={
                isAdmin
                  ? "relative overflow-x-auto w-full  flex  justify-center box min-w-[1300px]"
                  : "relative overflow-x-auto w-full  flex  justify-center box"
              }
            >
              <table class="w-[80%] text-[16px] text-left text-white ">
                <thead class="text-[17px] border-b border-gray-500 uppercase  text-white text-center">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      ISBN
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Available
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr class="border-b  border-gray-500  text-center font-semibold">
                      <th scope="row" class="px-6 py-2 text-white whitespace-nowrap ">
                        {book.name}
                      </th>
                      <td class="px-6 py-2">{book.isbn}</td>
                      <td class="px-6 py-2">{book.category}</td>
                      <td class="px-6 py-2">{book.quantity}</td>
                      <td class="px-6 py-2">{book.availableQuantity}</td>
                      <td class="px-6 py-2">₹{book.price}</td>
                      <td class="px-6 py-2 flex flex-row space-x-2 ">
                        <Link to={`/books/${book.isbn}`}>
                          <button className="bookButton">
                            <span class="text">
                              <svg
                                class="w-5 h-5 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                ></path>
                              </svg>
                              View
                            </span>
                          </button>
                        </Link>

                        {isAdmin && (
                          <>
                            <Link to={`/admin/books/${book.isbn}/edit`}>
                              <button className="bookButton">
                                <span class="text">
                                  <PencilSquareIcon className="w-4 h-4 mr-2" />
                                  Edit
                                </span>
                              </button>
                            </Link>
                            <Link to={"/"}>
                              <button
                                className="bookButton"
                                onClick={(e) => {
                                  setActiveBookIsbn(book.isbn)
                                  setIsOpen(true)
                                }}
                              >
                                <span class="text">
                                  <TrashIcon className="w-4 h-4 mr-2" />
                                  Delete
                                </span>
                              </button>
                            </Link>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="relative flex flex-col items-center top-[300px]">
            {user && !isAdmin && (
              <>
                <h3 className="text-xl font-bold text-white my-5">Borrowed Books</h3>

                {borrowedBook.length > 0 ? (
                  <>
                    <div
                      class={
                        isAdmin
                          ? "relative overflow-x-auto w-full  flex  justify-center box min-w-[1300px]"
                          : "relative overflow-x-auto w-full  flex  justify-center box"
                      }
                    >
                      <table class="w-[90%] text-[16px] text-left text-white ">
                        <thead class="text-[17px] border-b border-gray-500 uppercase  text-white text-center">
                          <tr>
                            <th scope="col" class="px-6 py-3">
                              Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                              ISBN
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Category
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Price
                            </th>
                            <th scope="col" class="px-6 py-3"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {borrowedBook.map((book) => (
                            <tr class="border-b  border-gray-500  text-center font-semibold">
                              <th scope="row" class="px-6 py-2 text-white whitespace-nowrap ">
                                {book.name}
                              </th>
                              <td class="px-6 py-2">{book.isbn}</td>
                              <td class="px-6 py-2">{book.category}</td>
                              <td class="px-6 py-2">₹{book.price}</td>
                              <td class="px-6 py-2 flex flex-row space-x-2 ">
                                <Link to={`/books/${book.isbn}`}>
                                  <button className="bookButton">
                                    <span class="text">
                                      <svg
                                        class="w-5 h-5 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M13 10V3L4 14h7v7l9-11h-7z"
                                        ></path>
                                      </svg>
                                      View
                                    </span>
                                  </button>
                                </Link>

                                {isAdmin && (
                                  <>
                                    <Link to={`/admin/books/${book.isbn}/edit`}>
                                      <button className="bookButton">
                                        <span class="text">
                                          <PencilSquareIcon className="w-4 h-4 mr-2" />
                                          Edit
                                        </span>
                                      </button>
                                    </Link>
                                    <Link to={"/"}>
                                      <button
                                        className="bookButton"
                                        onClick={(e) => {
                                          setActiveBookIsbn(book.isbn)
                                          setIsOpen(true)
                                        }}
                                      >
                                        <span class="text">
                                          <TrashIcon className="w-4 h-4 mr-2" />
                                          Delete
                                        </span>
                                      </button>
                                    </Link>
                                  </>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <h3 className="">No books Issued!</h3>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default BookList
