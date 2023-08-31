import SettingsSidebar from '../components/Settings/SettingsSidebar'
import Sidebar from '../components/Sidebar'
import EditProfile from '../components/Settings/EditProfile'
import ChangePass from '../components/Settings/ChangePass'
import AccountSettings from '../components/Settings/AccountSettings'
import { useState } from 'react'


const SettingsPage = () => {
    const [selectedOption, setSelectedOption] = useState('account-settings')

    const renderOption = () => {
        switch (selectedOption) {
            case 'edit-profile':
                return <EditProfile />
            case 'account-settings':
                return <AccountSettings />
            case 'change-password':
                return <ChangePass />
        }
    }

    return (
        <div className='homepage flex flex-row'>
            
            <div className='homepage__nav flex-[0.16] border-r-2 border-gray-300'>
                <Sidebar />
            </div>
            <div className='flex-[0.84] border-l h-full min-h-screen'>
                <div className='w-1/6'>
                    <p className='mt-3 ml-1 font-extrabold text-xl '>Settings</p>
                </div>
                <div className='container ml-32 mt-20 flex  border-2 w-4/6'>
                    <div className='settings  border-r-2 w-1/5 '>
                        <SettingsSidebar setSelectedOption= {setSelectedOption}  selectedOption={selectedOption} />
                    </div>
                    <div className='edit flex-1 ml-8 my-6  '>

                       {renderOption()}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default SettingsPage