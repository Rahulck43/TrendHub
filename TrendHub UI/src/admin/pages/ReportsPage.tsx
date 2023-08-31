import React, { useEffect } from 'react'
import SideBar from '../components/SideBar'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import ReportsTable from '../components/ReportsTable'


const ReportsPage = () => {


    const navigate = useNavigate()
    const { success } = useSelector((store: any) => store.admin)
  
    useEffect(() => {
      if (!success) {
        navigate('/admin')
      }
    }, [success])
  

    return (
        <div className='homepage flex flex-row'>
            <div className=' flex-[0.16] border-r-2 border-gray-300'>
                <SideBar />
            </div>
            <div className=" flex-[0.84]">
        <ReportsTable/>
            </div>
        </div>
    )
}

export default ReportsPage