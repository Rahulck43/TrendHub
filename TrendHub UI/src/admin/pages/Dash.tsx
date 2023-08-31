import  { useEffect } from 'react'
import SideBar from '../components/SideBar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'


const Dash = () => {

  const navigate = useNavigate()
  const { success } = useSelector((store: any) => store.admin)

  useEffect(() => {
    if (!success) {
      navigate('/admin')
    }
  }, [success])

  return (

    <div>
      <SideBar />

    </div>
  )
}

export default Dash