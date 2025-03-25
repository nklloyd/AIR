import React from 'react'
import { FaSearch } from 'react-icons/fa'

export function Home() {
    return (
        <form className='bg-[#29334D] p-2 rounded-full flex items-center'>
            <input type='text' placeholder='Search'
            className='bg-transparent focus:outline-none w-24 sm:w-64 ml-3 mr-auto placeholder-gray-600'/>
            <FaSearch className='text-gray-500 mr-3' />
        </form>
    )
}