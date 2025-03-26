import { FaSearch } from 'react-icons/fa'

export function Home() {
    return (
        <div className='bg-transparent h-screen'>
            <div className="pt-16 sm:pt-20 md:pt-24">
                <form className='bg-[#454C59] p-3 rounded-full flex items-center max-w-md mx-auto'>
                    <input 
                        type="search" 
                        id="default-search" 
                        placeholder='Search for flights' 
                        className="bg-transparent focus:outline-none block w-full p-2 text-sm text-gray-400 placeholder-gray-500" 
                    />
                    <FaSearch className='text-gray-500 mr-3' />
                </form>
            </div>
        </div>
    )
}