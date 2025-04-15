import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-around items-center dark:bg-blue-700 text-white p-1 '>
      <ul className='ul1 text-2xl'>My Task</ul>
      <ul className='ul2 flex justify-around items-center gap-5' >
        <li className='hover:font-bold transition-all cursor-pointer w-15 text-center'>Home</li>
        <li className='hover:font-bold transition-all cursor-pointer w-15 text-center'>Login</li>
      </ul>
    </div>
  )
}

export default Navbar
