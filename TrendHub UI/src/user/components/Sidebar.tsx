import logo from '../assets/images/logo-color.png'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../utils/store/userSlice'
import apiInstance from '../utils/apiInstance'


const Sidebar = ({ setCreateModal }:{ setCreateModal:any }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const user = useSelector((store: any) => store.user)
    const isLoggedIn = user.success
    const handleClick = async (action: String) => {
        if (action === 'profile') {
            navigate(`/profile/${user.userId}`)
        } else if (action === 'home') {
            navigate('/home')
        } else if (action === 'logout') {
            dispatch(logout())
            await apiInstance.post('/logout')
            navigate('/')
        }
    }

    return (
        <>
            <div className='fixed flex flex-col justify-between z-10 border-gray-600'>
                <img src={logo} className='h-16 ' alt="logo" />
                <div className='side_Buttons flex flex-col'>
                    <button onClick={() => handleClick('home')} className='flex flex-row mx-[10px] my-[5px] px-[15px] py-[10px] items-center hover:bg-gray-300 rounded-2xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                        </svg>
                        <span className='text-lg font-bold ml-[10px]'>Home</span>
                    </button>
                    <button className='flex flex-row mx-[10px] my-[5px] px-[15px] py-[10px] items-center hover:bg-gray-300 rounded-2xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                        </svg>
                        <span className='text-lg font-bold ml-[10px]'>Search</span>
                    </button>
                    <button className='flex flex-row mx-[10px] my-[5px] px-[15px] py-[10px] items-center hover:bg-gray-300 rounded-2xl '>
                        <img className="w-6 h-6" src="https://img.icons8.com/ios/50/compass--v1.png" alt="compass" />
                        <span className='text-lg font-bold ml-[10px]'>Explore</span>
                    </button>
                    <button className='flex flex-row mx-[10px] my-[5px] px-[15px] py-[10px] items-center hover:bg-gray-300 rounded-2xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                        </svg>
                        <span className='text-lg font-bold ml-[10px]'>Messages</span>
                    </button>
                    <button className='flex flex-row mx-[10px] my-[5px] px-[15px] py-[10px] items-center hover:bg-gray-300 rounded-2xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                        <span className='text-lg font-bold ml-[10px]'>Notifications</span>
                    </button>
                    
                        <button onClick={()=>setCreateModal(true)} className='flex flex-row mx-[10px] my-[5px] px-[15px] py-[10px] items-center hover:bg-gray-300 rounded-2xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                            </svg>
                            <span className='text-lg font-bold ml-[10px]'>Create</span>
                        </button>
                    <button onClick={() => handleClick('profile')} className='flex flex-row mx-[10px] my-[5px] px-[15px] py-[10px] items-center hover:bg-gray-300 rounded-2xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                        </svg>
                        <span className='text-lg font-bold ml-[10px]'>Profile</span>
                    </button>
                    {isLoggedIn ? <button onClick={() => handleClick('logout')} className='flex flex-row mx-[10px] my-[5px] px-[15px] py-[10px] items-center hover:bg-gray-300 rounded-2xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clipRule="evenodd" />
                        </svg>
                        <span className='text-lg font-bold ml-[10px]'>Logout</span>
                    </button> : ''}
                </div>
                <div className='flex flex-col fixed bottom-10'>
                    <button className='flex flex-row mx-[10px] my-[5px] px-[15px] py-[10px] items-center hover:bg-gray-300 rounded-2xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>
                        <span className='text-lg font-bold ml-[10px]'>More</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar