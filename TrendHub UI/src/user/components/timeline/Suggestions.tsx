import React, { useEffect, useState } from 'react'
import apiInstance from '../../utils/apiInstance'
import { useNavigate } from 'react-router'


const Suggestion = () => {

  const [suggestions, setSuggestions] = useState([])
  const navigate=useNavigate()

  const handleViewProfile=async(userId:string)=>{
    navigate(`/profile/${userId}`)
  }

  const handleFollow=async(followingId:string)=>{
    const response=await apiInstance.post(`/users/${followingId}/follow`)
    console.log(response.data.success)
    if(response.data.success){
      fetchSuggestedUsers()
    }
  }

  const fetchSuggestedUsers = async () => {
    const response = await apiInstance.get(`/users/suggestions`)
    console.log(response.data.data)
    setSuggestions(response.data.data)
  }

  useEffect(() => {
    fetchSuggestedUsers()
  }, [])
  return (
    <div className='suggestions mt-8 mr-5 border-2 rounded-md p-4 h-1/4 overflow-auto'>
      <div className="suggestions_title text-gray-400 font-bold p-2">suggestions for you</div>


      {suggestions.map((suggestion) => (

        <div key={suggestion?._id} className="suggestion_username flex flex-row justify-between mt-4">
          <div onClick={()=>handleViewProfile(suggestion._id)} className="username_left flex items-center">
            <span className='avatar mr-[10px]'>
              {!suggestion.dp ? (<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:cursor-pointer">
                <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
              </svg>) :(<img src={suggestion?.dp}   className="w-6 h-6 hover:cursor-pointer">
              </img>)}
            </span>
            <div className="username_info flex flex-col ">
              <span className='username font-semibold text-sm hover:cursor-pointer'> {suggestion.name}</span>
              <span className='relation text-gray-400 text-xs '> new to instagram</span>
            </div>
          </div>
          <button type='button' onClick={()=>handleFollow(suggestion._id)} className='follow_button text-blue-400 font-bold hover:text-gray-700 cursor-pointer'>Follow</button>
        </div>
      ))
      }





    </div>
  )
}

export default Suggestion