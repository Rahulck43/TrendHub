import React from 'react'
import {sendIcon} from '../../assets/icons/icons'


const Post = () => {
  return (
    <>
      <div className="post w-[550px] mx-40 mt-[30px] mb-[50px] ">
        <div className='header flex justify-between flex-row items-center mb-[10px]'>
          <div className="post__auther flex flex-row items-center font-bold ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:cursor-pointer">
              <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
            </svg>
            <span className='hover:cursor-pointer'> Rahul</span>
            <span className='text-xs text-gray-400'> •  8h</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="more__icon w-5 h-5 hover:cursor-pointer">
            <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
          </svg>
        </div>
        <div className=' image'>
          <img className='image w-full border border-solid rounded-md hover:cursor-pointer' src="https://drscdn.500px.org/photo/43752970/q%3D80_m%3D1500/v2?sig=9db1d25a30f973241abead54873cd84b4f5207af37170b2859568e439e562cf3" alt="post" />
        </div>
        <div className='footer'>
          <div className="footer__icons flex flex-row items-center justify-between ">
            <div className="main__icons flex  p-2 text-3xl">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-1 hover:cursor-pointer">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mx-1 hover:cursor-pointer">
                <path fill-rule="evenodd" d="M2 10c0-3.967 3.69-7 8-7 4.31 0 8 3.033 8 7s-3.69 7-8 7a9.165 9.165 0 01-1.504-.123 5.976 5.976 0 01-3.935 1.107.75.75 0 01-.584-1.143 3.478 3.478 0 00.522-1.756C2.979 13.825 2 12.025 2 10z" clip-rule="evenodd" />
              </svg>
              <span className='hover:cursor-pointer'>{sendIcon}</span>
              

            </div>
            <div className="save__icon">
              
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-1 hover:cursor-pointer">
                <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <span className='hover:cursor-pointer'>236 Likes</span>
          
        </div>
      </div>
    </>
  )
}

export default Post