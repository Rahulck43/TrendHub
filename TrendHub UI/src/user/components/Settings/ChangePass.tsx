import React from 'react'


const ChangePass = () => {
  return (
    <>
      <form autoComplete='off'>
        <div className="mb-6">
          <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white" htmlFor="currentPassword">Current Password</label>
          <input className="block w-1/2 mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="currentPassword" type="text" />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white" htmlFor="newPassword">New Password</label>
          <input className="block w-1/2 mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="newPassword" type="text" />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Confirm Password</label>
          <input type="text" id="confirmPassword" className="block w-1/2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change password</button>
      </form>
    </>
  )
}

export default ChangePass