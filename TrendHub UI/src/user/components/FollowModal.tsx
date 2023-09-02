import React from 'react'
import { useNavigate } from 'react-router'

const FollowModal = ({ followList }: { followList: [] }) => {
    const navigate=useNavigate()

    const viewProfile=async(userId:string)=>{
        navigate(`/profile/${userId}`)
        location.reload()
    }
    const closeModal = () => {
        navigate('.', { replace: true }); // Replace the current URL with itself to close the modal
      };

    return (
        <div className='modal-overlay ' >
            <div className=' relative z-10 ' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
                <div className=' fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
                <div className='flex justify-evenly items-center  min-w-full max-w-screen-xl fixed inset-0 z-10 overflow-y-auto '>
                    <div className='suggestions mt-8 mr-5 border-2 rounded-md p-4 h-2/5 overflow-auto bg-white w-1/4  '>
                        {/* <div className="suggestions_title text-gray-400 font-bold p-2">suggestions for you</div> */}
                        {followList.map((follow) => (
                        <div className="suggestion_username flex flex-row justify-between mt-4 ">
                            <div onClick={()=>viewProfile(follow._id)} className="username_left flex items-center cursor-pointer">
                                <span className='avatar mr-[10px]'>
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ">
                                        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                <div className="username_info flex flex-col ">
                                    <span className='username font-semibold text-lg '> {follow?.name}</span>
                                    {/* <span className='relation text-gray-400 text-xs '> new to instagram</span> */}
                                </div>
                            </div>
                            {/* <button type='button' className='follow_button text-blue-400 font-bold hover:text-gray-700 cursor-pointer'>Follow</button> */}
                        </div>
                        )) 
                        }
                    </div>
                
                </div>
            </div>
        </div>
    )
}

export default FollowModal