import { Tab } from "@headlessui/react"
import { BackwardIcon, PencilSquareIcon, RocketLaunchIcon } from "@heroicons/react/24/outline"
import { Link, useNavigate, useParams } from "react-router-dom"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useEffect, useState } from "react"
import { makeChartOptions } from "../book/chart-options"
import { useUser } from "../../context/user-context"
import { BackendApi } from "../../client/backend-api"
import { toast } from "react-hot-toast"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function TabPage() {
  const navigate = useNavigate()
  const [chartOptions, setChartOptions] = useState(null)
  const { bookIsbn } = useParams()
    const { user, isAdmin } = useUser()
    const [book, setBook] = useState(null)



    const borrowBook = () => {
      if (book && user) {
          BackendApi.user
              .borrowBook(book.isbn, user._id)
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
                      toast.success('Book Borrowed Successfully!',
                      {
                        style: {
                          borderRadius: '10px',
                          background: '#07182e',
                          color: '#fff',
                        },
                      });
                  }
              })
              .catch(console.error)
      }
  }

  const returnBook = () => {
      if (book && user) {
          BackendApi.user
              .returnBook(book.isbn, user._id)
              .then(({ book, error }) => {
                  if (error) {
                    toast.error(error,
                      {
                        style: {
                          borderRadius: '10px',
                          background: '#07182e',
                          color: '#fff',
                        },
                      })
                  } else {
                      setBook(book)
                      toast.success('Book Returned Successfully!',
                      {
                        style: {
                          borderRadius: '10px',
                          background: '#07182e',
                          color: '#fff',
                        },
                      });
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



  // useEffect(() => {
  //   if (book) {
  //     setChartOptions(makeChartOptions(book.priceHistory))
  //     console.log(book.priceHistory)
  //   }
  // }, [])

  return (
    <>
      {book && (
        <div className="h-[100vh] flex items-center justify-center">
          <div className="w-full px-2 pb-16 sm:px-0 flex items-center justify-center flex-col">
            <Tab.Group>
              <Tab.List className="flex space-x-1 w-[400px] rounded-xl bg-blue-900/20 p-1">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  Book Details
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  Price History
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  Quantity History
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2 w-[700px] ">
                <Tab.Panel
                  className={classNames(
                    "rounded-xl bg-black bg-opacity-30",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  )}
                >
                  <table class="w-[100%] text-[14px] text-left text-white flex justify-around py-4">
                    <thead class="text-[17px]  capitalize  text-gray-300 text-start flex flex-col w-[45%]">
                      <tr className="ml-4">
                        <th scope="col" class="px-6 py-3">
                          Name
                        </th>
                      </tr>
                      <tr className="ml-4">
                        <th scope="col" class="px-6 py-3">
                          ISBN
                        </th>
                      </tr>
                      <tr className="ml-4">
                        <th scope="col" class="px-6 py-3">
                          Category
                        </th>
                      </tr>
                      <tr className="ml-4">
                        <th scope="col" class="px-6 py-3">
                          Quantity
                        </th>
                      </tr>
                      <tr className="ml-4">
                        <th scope="col" class="px-6 py-3">
                          Available
                        </th>
                      </tr>
                      <tr className="ml-4">
                        <th scope="col" class="px-6 py-3">
                          Price
                        </th>
                      </tr>
                      <tr>
                        <td className="flex justify-between">
                          {isAdmin ? (
                            <Link to={`/admin/books/${book.isbn}/edit`}>
                              <button className="bookButton mt-12">
                                <span class="text">
                                  <PencilSquareIcon className="w-4 h-4 mr-2" />
                                  Edit
                                </span>
                              </button>
                            </Link>
                          ) : (
                            <>
                              <button
                                className="bookButton mt-12 disabled:opacity-30 disabled:cursor-not-allowed"
                                onClick={borrowBook}
                                disabled={book && user && book.borrowedBy.includes(user._id)}
                              >
                               <span className="text">
                               <PencilSquareIcon className="w-4 h-4 mr-2" />
                                  Borrow
                               </span>
                              </button>

                              <button
                                className="bookButton mt-12 disabled:opacity-30 disabled:cursor-not-allowed"
                                onClick={returnBook}
                                disabled={book && user && !book.borrowedBy.includes(user._id)}
                              >
                                <span class="text">
                                  <RocketLaunchIcon className="w-4 h-4 mr-2" />
                                  Return
                                </span>
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    </thead>
                    <tbody className="text-[17px] w-[40%]">
                      <tr>
                        <td class="py-3 text-white">{book.name}</td>
                      </tr>
                      <tr>
                        <td class="py-3">{book.isbn}</td>
                      </tr>
                      <tr>
                        <td class="py-3">{book.category}</td>
                      </tr>
                      <tr>
                        <td class="py-3">{book.quantity}</td>
                      </tr>
                      <tr>
                        <td class="py-3">{book.availableQuantity}</td>
                      </tr>
                      <tr>
                        <td class="py-3">₹{book.price}</td>
                      </tr>
                      <tr>
                        <td>
                          <button
                            onClick={() => navigate(-1)}
                            className="bg-gray-400 bg-opacity-20 hover:bg-blue-100 hover:bg-opacity-20 px-4 py-3 text-sm  font-semibold text-white rounded-md flex items-center mt-12"
                          >
                            <BackwardIcon className="w-4 h-4 mr-2" />
                            Go Back
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Tab.Panel>
                <Tab.Panel
                  className={classNames(
                    "rounded-xl bg-black bg-opacity-30 ",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  )}
                >
                  {/* {
                  if (book && tabIndex > 0) {
                    setChartOptions(
                      makeChartOptions(
                        tabIndex,
                        tabIndex === 1 ? book.priceHistory : book.quantityHistory
                      )
                    )
                  }
                } */}

                  <div className="">
                    {book && book.priceHistory.length > 0 ? (
                      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                    ) : (
                      <h3>No history found!</h3>
                    )}
                  </div>
                </Tab.Panel>
                <Tab.Panel
                  className={classNames(
                    "rounded-xl bg-black bg-opacity-30 ",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  )}
                >
                  Content 3
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      )}
    </>
  )
}
