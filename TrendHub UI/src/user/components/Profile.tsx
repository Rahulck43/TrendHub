import { useEffect, useState } from "react";
import apiInstance from "../utils/apiInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import PostModal from "./PostModal";
// import SettingsModal from "./SettingsModal";




const Profile = () => {
    const userName = useSelector((store: any) => store.user.userName)
    const [userData, setUserData]: any = useState('')
    const [userPosts, setUserPosts] = useState([])
    const [selectedPost, setSelectedPost]=useState('')
    const navigate = useNavigate()

    useEffect(() => {
        (async function () {
            const response: any = await apiInstance.get(`/profile/${userName}`)
            setUserData(response.data.userData)
            setUserPosts(response.data.userPosts)
        })();

    }, [])
    return (
        <div>
            <section className="pt-10">
            {selectedPost && (
                <PostModal
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                />
            )}
                <div className="w-8/12 px-4 mx-auto ">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded-lg mt-16">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4 flex justify-center">
                                    <div className="relative">
                                        <img alt="Dp" src={userData.dp} className=" rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                                    </div>
                                </div>
                                <div className="w-full px-4 text-center mt-20">
                                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                22
                                            </span>
                                            <span className="text-sm text-blueGray-400">Friends</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                               {userPosts.length}
                                            </span>
                                            <span className="text-sm text-blueGray-400">posts</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                               { <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/settings')} viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:cursor-pointer">
                                                    <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
                                                </svg>}

                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center ">
                                <h3 className="text-xl font-semibold leading-normal  text-blueGray-700 mb-2">
                                    {userData.userName}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                    <br />
                                    <p>{userData.bio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t-2 border-gray-300 ">
                    <div className="mx-28 p-4 flex flex-wrap justify-center">
                        {Array.isArray(userPosts) && userPosts.length > 0 ?
                            userPosts.map((post) => (
                                <div key={post._id} onClick={() => setSelectedPost(post)} className=' image w-1/4 ml-2 mt-2'>
                                    <img className='image  border border-solid rounded-sm hover:cursor-pointer' src={post.img} alt="post" />
                                </div>

                            )) : (
                                <p>No posts to display</p>
                            )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Profile