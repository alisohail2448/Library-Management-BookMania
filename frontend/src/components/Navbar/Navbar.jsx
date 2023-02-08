import React from "react"
import { BookOpenIcon } from "@heroicons/react/24/outline"
import Dropdown from "./Dropdown"
import { Link } from "react-router-dom"

const Navbar = ({ setShowModal, user, handleLogout }) => {
  return (
    <div>
      <div class="flex justify-center bg-transparent">
        <nav class="self-center w-full max-w-5xl ">
          <div class="flex flex-col lg:flex-row justify-between items-center text-white">
            <div className="flex flex-row justify-center items-center h-16">
              <div className="mt-[10px]">
                <Link to={'/'} >
                <BookOpenIcon className="h-10 w-10 mr-1" />
                </Link>
              </div>
              <div>
                <Link to={'/'} >
                <p className="navHeading">
                  <span class="navFancy">BookMania</span>
                </p>  
                </Link>
              </div>
            </div>
            {user ? (
             <Dropdown handleLogout={handleLogout}/>
            ) : (
              <ul class="hidden lg:flex items-center text-[20px] font-semibold pl-32">
                <button onClick={() => setShowModal(true)}>
                  <li class="hover:underline underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-5">
                    <a href="#">Login</a>
                  </li>
                </button>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
