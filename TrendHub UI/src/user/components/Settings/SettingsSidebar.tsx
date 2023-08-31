import React from 'react'


const SettingsSidebar = ({setSelectedOption,selectedOption})=> {
    return (
        <>
        <div className='flex flex-col items-start font-medium'>
            <div className={`mt-10 ml-4 p-1  ${selectedOption === 'edit-profile' ? 'border-l-4 border-blue-600' : ''}`}>
                <button onClick={()=>setSelectedOption('edit-profile')} className='px-2 text-sm hover:cursor-pointer hover:bg-gray-300 rounded-lg'>Edit profile</button>
            </div>
            <div className={`mt-10 ml-4 p-1  ${selectedOption === 'account-settings' ? 'border-l-4 border-blue-600' : ''}`}>
                <button onClick={()=>setSelectedOption('account-settings')} className='px-2 text-sm hover:cursor-pointer hover:bg-gray-300 rounded-lg '>Account Settings</button>
            </div>
            <div className={`mt-10 ml-4 p-1  ${selectedOption === 'change-password' ? 'border-l-4 border-blue-600' : ''}`}>
                <button onClick={()=>setSelectedOption('change-password')} className='px-2 text-sm hover:cursor-pointer hover:bg-gray-300 rounded-lg '>Change password</button>
            </div>
            <div className={`mt-10 ml-4 p-1  ${selectedOption === 'logout' ? 'border-l-4 border-blue-600' : ''}`}>
                <button className='px-2 text-sm hover:cursor-pointer hover:bg-gray-300 rounded-lg '>Logout</button>
            </div>
        </div>
        </>
    )
}

export default SettingsSidebar