import React, { useState, useEffect, Fragment } from "react"
import { BackendApi } from "../../client/backend-api"
import { useParams, useNavigate } from "react-router-dom"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import * as dayjs from "dayjs"
import { toast } from "react-hot-toast"

const people = [
  { name: "Category" },
  { name: "Sci-Fi" },
  { name: "Action" },
  { name: "Adventure" },
  { name: "Horror" },
  { name: "Romance" },
  { name: "Mystery" },
  { name: "Thriller" },
  { name: "Drama" },
  { name: "Fantasy" },
  { name: "Comedy" },
  { name: "Biography" },
  { name: "History" },
  { name: "Western" },
  { name: "Literature" },
  { name: "Poetry" },
  { name: "Philosophy" },
]

const BookForm = () => {
  const { bookIsbn } = useParams()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(people[0])
  const [book, setBook] = useState({
    name: "",
    isbn: bookIsbn || "",
    category: "",
    price: 0,
    quantity: 0,
    priceHistory: [],
    quantityHistory: [],
  })

  const updateBookField = (event) => {
    const field = event.target
    setBook((book) => ({ ...book, [field.name]: field.value }))
  }


  const formSubmit = (event) => {
    event.preventDefault()
    // console.log({...book, category: selected.name})
    if (bookIsbn) {
      const newPrice = parseInt(book.price, 10)
      const newQuantity = parseInt(book.quantity, 10)
      let newPriceHistory = book.priceHistory.slice()
      let newQuantityHistory = book.quantityHistory.slice()
      if (
        newPriceHistory.length === 0 ||
        newPriceHistory[newPriceHistory.length - 1].price !== newPrice
      ) {
        newPriceHistory.push({ price: newPrice, modifiedAt: dayjs().utc().format() })
      }
      if (
        newQuantityHistory.length === 0 ||
        newQuantityHistory[newQuantityHistory.length - 1].quantity !== newQuantity
      ) {
        newQuantityHistory.push({ quantity: newQuantity, modifiedAt: dayjs().utc().format() })
      }
      BackendApi.book
        .patchBookByIsbn(bookIsbn, {
          ...book,
          priceHistory: newPriceHistory,
          quantityHistory: newQuantityHistory,
        })
        .then(() => navigate(-1))
    } else {
      BackendApi.book
        .addBook({
          ...book,
          category: selected.name,
          priceHistory: [{ price: book.price, modifiedAt: Date.now() }],
          quantityHistory: [{ quantity: book.quantity, modifiedAt: Date.now() }],
        })
        .then(() => navigate("/"))
        toast.success('Book Added Successfully!',
        {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#07182e',
            color: '#fff',
          },
        });
    }
  }

  useEffect(() => {
    if (bookIsbn) {
      BackendApi.book.getBookByIsbn(bookIsbn).then(({ book, error }) => {
        if (error) {
          navigate("/")
        } else {
          setBook(book)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookIsbn])

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="addBox flex flex-col items-center  pt-6 sm:justify-center sm:pt-0 ">
        <div className="w-full px-6 py-4  overflow-hidden bg-transparent  sm:max-w-md sm:rounded-lg">
          <h3 className="text-3xl font-bold text-white my-2 text-center">
            {bookIsbn ? "Update Book" : "Add Book"}
          </h3>
          <form onSubmit={formSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white undefined">
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  value={book.name}
                  onChange={updateBookField}
                  className="block w-full mt-1 bg-white bg-opacity-20  py-2 pl-2 border-blue-300  rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="text" className="block text-sm font-medium text-white undefined">
                ISBN
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="isbn"
                  placeholder="ISBN"
                  required
                  value={book.isbn}
                  onChange={updateBookField}
                  className="block w-full mt-1 bg-white bg-opacity-20  py-2 pl-2 border-blue-300  rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="category" className="block text-sm font-medium text-white undefined">
                Category
              </label>
              <div className="flex flex-col items-start">
                <Listbox value={selected} onChange={setSelected}>
                  <div className="relative mt-1 w-full">
                    <Listbox.Button
                      className="relative w-full cursor-default rounded-lg bg-white bg-opacity-20 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                      name="Category"
                    > 
                      <span className="block truncate">{selected.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {people.map((category, categoryIdx) => (
                          <Listbox.Option
                            name={category}
                            onChange={updateBookField}
                            key={categoryIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? "bg-purple-100 text-purple-900" : "text-gray-900"
                              }`
                            }
                            value={category}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {category.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="price" className="block text-sm font-medium text-white undefined">
                Price
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="number"
                  name="price"
                  required
                  value={book.price}
                  onChange={updateBookField}
                  placeholder="Price"
                  className="block w-full mt-1 bg-white bg-opacity-20  py-2 px-2 border-blue-300  rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-white undefined">
                Quantity
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="number"
                  name="quantity"
                  value={book.quantity}
                  onChange={updateBookField}
                  placeholder="Quantity"
                  className="block w-full mt-1 bg-white bg-opacity-20  py-2 px-2 border-blue-300  rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <button
                type="submit"
                onClick={() => navigate("/")}
                className="text-[16px] text-white mr-2 hover:bg-slate-400 hover:bg-opacity-20  py-2 px-4 rounded-md"
              >
                <span className="text">Cancel</span>
              </button>
              <button type="submit" className="addBook">
                <span className="text"> {bookIsbn ? "Update Book" : "Add Book"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookForm
