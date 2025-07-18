import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed){
      str += "0123456789"
    }

    if(charAllowed){
      str += "!@#$%^&*_-+=[]{}~`"
    }

    for(let i = 0; i < length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 99)
    window.navigator.clipboard.writeText(password)
    alert("Password copied to clipboard!")
  },
  [password])

  useEffect(() => {
    passwordGenerator()
  }, [length,numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
    

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg
      px-4 my-8 text-orange-500 bg-gray-800'
      >
        <h1 className="text-4xl text-center font-bold text-white mt-4 mb-6 my-3">
  <span
    className="rounded-2xl px-4 py-1 shadow-lg inline-block"
  >
    Password Generator
  </span>
</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 bg-white'
        >

          <input 
                type = "text"
                value = {password}
                className='outline-none w-full py-1 px-3'
                placeholder = "Password"
                readOnly
                ref={passwordRef}
              />

              <button onClick={copyPasswordToClipboard}
               className = 'outline-none bg-blue-700
              text-white px-3 py-0.5 shrink-0'
              >copy</button>



        </div>

         <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type = "range"
              min = {8}
              max = {100}
              value = {length}
              className='cursor-pointer'
              onChange={(e) => {setLength(+e.target.value)}}
              />

              <label>Length : {length}</label>
              </div>
              <div className='flex items-center gap-x-1'
              >

                <input
                    type='checkbox'
                    defaultChecked = {numberAllowed}
                    id='numberInput'
                    onChange={() => {
                      setnumberAllowed((prev) => !prev)
                    }}

                />

                <label htmlFor='numberInput'>Numbers</label>

              </div>
              <div className='flex items-center gap-x-1'>

                <input
                    type='checkbox'
                    defaultChecked = {charAllowed}
                    id='characterInput'
                    onChange={() => {
                      setCharAllowed((prev) => !prev)
                    }}

                />

                <label htmlFor='characterInput'>Characters</label>

              </div>
          </div>
      </div>
    </>

  )
}

export default App
