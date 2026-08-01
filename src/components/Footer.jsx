import React from 'react'

const Footer = () => {
    return (
        <footer className='w-full bg-slate-800 text-white flex flex-col justify-center items-center py-4 mt-8'>
            <div className='logo font-bold text-white text-2xl'>
                <span className="text-green-500">&lt;</span>

                <span>Pass</span>
                <span className="text-green-500">OP/ &gt;</span>
            </div>
            <div className='flex justify-center items-center mt-2'>
                Created with <img className='w-7 mx-2' src="icons/heart.png" alt="" />by CodeWithNaeem
            </div>
        </footer>
    )
}

export default Footer
