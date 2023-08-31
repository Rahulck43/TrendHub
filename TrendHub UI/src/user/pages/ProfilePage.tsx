import React from 'react'
import Sidebar from '../components/Sidebar'
import Profile from '../components/Profile'


const ProfilePage = () => {
    return (
        <>
            <div className='homepage flex flex-row'>
                <div className='homepage__nav flex-[0.16] border-r-2 border-gray-300'>
                    <Sidebar />
                </div>
                <div className='flex-[0.84]'>
                    <Profile />
                </div>
            </div>
        </>
    )
}

export default ProfilePage