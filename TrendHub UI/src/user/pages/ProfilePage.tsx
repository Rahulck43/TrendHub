import React from 'react'
import Sidebar from '../components/Sidebar'
import Profile from '../components/Profile'
import { useParams } from 'react-router'


const ProfilePage = () => {

    const {userId}=useParams()
    return (
        <>
            <div className='homepage flex flex-row'>
                <div className='homepage__nav flex-[0.16] border-r-2 border-gray-300'>
                    <Sidebar />
                </div>
                <div className='flex-[0.84]'>
                    <Profile userId={userId} />
                </div>
            </div>
        </>
    )
}

export default ProfilePage