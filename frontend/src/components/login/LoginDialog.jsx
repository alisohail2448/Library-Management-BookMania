import React, { useState } from "react"


const LoginDialog = ({ showModal, setShowModal, handleLoginSubmit}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const onSubmit = (event) => {
    event.preventDefault()
    handleLoginSubmit(username, password)
    // console.log(username, password)
    setUsername("");
    setPassword("");
}


  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-[500px]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-modal outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4 border-b border-solid border-[#ca3df5] rounded-t">
                  <h3 className="loginText  text-2xl text-center font-semibold">Login</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="w-[400px]">
                  <form className="rounded px-8 pt-6  mb-4">
                    <div className="mb-4">
                      <label className="block loginText text-sm font-bold mb-2" for="username">
                        Username
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-[#b3b3b3] leading-tight focus:outline-none focus:shadow-outline bg-[#1d324d] border-none "
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block loginText text-sm font-bold mb-2" for="password">
                        Password
                      </label>
                      <input
                        className="shadow appearance-none border border-red-500 rounded w-full py-3 px-3 text-[#b3b3b3] mb-3 leading-tight focus:outline-none focus:shadow-outline bg-[#1d324d] border-none"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-4  border-t border-solid border-[#ca3df5] rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>

                  <button className="loginBtn" onClick={onSubmit}>
                    <span className="text">Sign in</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default LoginDialog
