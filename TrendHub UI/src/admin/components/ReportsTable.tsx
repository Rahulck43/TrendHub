import { useEffect, useState } from 'react'
import apiInstance from '../../user/utils/apiInstance'
import { AxiosResponse } from "axios"
import { confirmAlert } from 'react-confirm-alert'



const ReportsTable = () => {

    const [reportList, setReportList] = useState<any[]>([])

    const fetchReports = async () => {
        const response: AxiosResponse<any, any> = await apiInstance.get('/admin/reports')
        setReportList(response?.data?.data)
        console.log(response?.data?.data)
    }

    const handleBlock = async (postId: string,reportId:string) => {
        try {
            confirmAlert({
                title: 'Confirm Delete',
                message: 'Are you sure you want to delete this post from database?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: async () => {
                            try {
                                const response = await apiInstance.delete(`/admin/posts/${postId}/${reportId}`)
                                if (response.data.success) {
                                    window.location.reload()
                                }
                            } catch (error) {
                                console.error('Error deleting post:', error);
                            }
                        }
                    },
                    {
                        label: 'No'
                    }
                ]
            });

        }
        catch (error: any) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchReports()
    }, [])


    return (
        <div>
            <body className="antialiased font-sans">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">

                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                post
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                reason
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Reports
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {reportList.map((report: any) => (
                                            <tr key={report?._id}  >
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <img src={report.post.img} alt="post" className='h-12 w-12' />
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap"> {report.reason}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap"> {report.reporters.length}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="flex items-center gap-4">
                                                        <svg onClick={() => handleBlock(report.post._id,report._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer ease-in-out hover:text-red-600 transform hover:scale-110 rounded transition-all duration-300">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </div>



                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    )
}

export default ReportsTable