import React, { useState, useEffect, useRef } from 'react';
import apiInstance from '../utils/apiInstance';
import { useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';



const PostModal = ({ selectedPost, setSelectedPost }) => {

    const userId = useSelector((store: any) => store.user.userId)
    const [post, setPost] = useState(selectedPost)
    const [comment, setComment] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [ReportModal, setReportModal] = useState(false)
    const [editComment, setEditComment] = useState('')
    const[reportMessage,setReportMessage]=useState('')
    const [editedComment, setEditedComment] = useState('')
    const [reason,setReason]=useState('')
    const [editPost, setEditPost] = useState(false)
    const [editedPost, setEditedPost] = useState('')
    const dropdownRef = useRef(null)
    const reportRef = useRef(null)


    const handleLike = async () => {
        const response = await apiInstance.put(`/posts/${selectedPost._id}/like`, { userId })
        if (response.data.success) {
            fetchPost()
        }
    }

    const handleCommentSubmit = async () => {
        if (comment.trim() === "") {
            return;
        }
        try {
            const response = await apiInstance.post(`/posts/${selectedPost._id}/comment`, { userId, comment })
            if (response.data.success) {
                fetchPost()
                setComment('')
            }
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const fetchPost = async () => {
        try {
            const response = await apiInstance.get(`/posts/${selectedPost._id}`)
            setPost(response.data.data)
        } catch (error) {

        }
    }

    const handleDeletePost = async () => {
        try {
            confirmAlert({
                title: 'Confirm Delete',
                message: 'Are you sure you want to delete this post?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: async () => {
                            try {
                                const response = await apiInstance.delete(`/posts/${selectedPost._id}?userId=${userId}`)
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


    const saveEditedPost = async () => {
        const response = await apiInstance.put(`/posts/${selectedPost._id}`, { editedPost, userId })
        if (response.data.success) {
            setEditPost(false)
            fetchPost()
        }
    }

    const handleReportPost = async () => {
        try {
            const response = await apiInstance.post(`/posts/${selectedPost._id}/report`, { userId,reason })
            console.log('response',response)
            if (response.data.success) {
                console.log('post reported successfully')
                const message=response.data.message
                setReportMessage(message)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleCommentLike = async (commentId: String) => {
        try {
            const response = await apiInstance.put(`/posts/${selectedPost._id}/comments/${commentId}/like`, { userId })
            if (response.data.success) {
                fetchPost()
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }

    const handleDeleteComment = async (commentId: String) => {
        try {
            const response = await apiInstance.delete(`/posts/${selectedPost._id}/comments/${commentId}`)
            if (response.data.success) {
                fetchPost()
            }
        } catch (error) {

        }
    }

    const handleEditComment = async (commentId: string, comment: string) => {
        setEditComment(commentId)
        setEditedComment(comment)
    }

    const handleSaveComment = async (commentId: string) => {
        const response = await apiInstance.put(`/posts/${selectedPost._id}/comments/${commentId}`, { editedComment })
        if (response.data.success) {
            setEditComment('')
            fetchPost()
        }
    }


    useEffect(() => {
        fetchPost()
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (reportRef.current && !reportRef.current.contains(event.target)) {
                setReportModal(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className='modal-overlay ' >
            <div className=' relative z-10 ' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
                <div className=' fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
                <div className='flex justify-evenly items-center  min-w-full max-w-screen-xl fixed inset-0 z-10 overflow-y-auto '>
                    <div className='w-4/5 flex  min-h-full h-full items-end justify-center text-center sm:items-center sm:p-0'>
                        <div className='min-w-full h-4/5 flex relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                            <div className='w-3/5 '>
                                <img
                                    src={selectedPost.img}
                                    alt='Post'
                                    className='w-full h-full '
                                />
                            </div>
                            <div className='w-2/5 bg-gray-100 flex flex-col '>
                                <div className='flex items-center justify-between border-b-1 shadow-sm'>
                                    <div>
                                        <p className='pl-2 pt-1 text-lg font-semibold '>Rahul ck</p>
                                    </div>
                                    <div className='flex gap-2' >
                                        <div className="relative inline-block text-left" ref={dropdownRef}>
                                            <div>
                                                <svg onClick={() => setIsOpen(!isOpen)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:cursor-pointer">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                </svg>
                                            </div>
                                            {isOpen && (userId === selectedPost?.userId) && (
                                                <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                        <p
                                                            onClick={() => setEditPost(true)}
                                                            className="block px-4 py-2 text-sm text-gray-700  hover:text-blue-900 hover:cursor-pointer"
                                                            role="menuitem"
                                                        >
                                                            Edit
                                                        </p>
                                                        <p
                                                            onClick={handleDeletePost}
                                                            className="block px-4 py-2 text-sm text-gray-700  hover:text-red-900 hover:cursor-pointer"
                                                            role="menuitem"
                                                        >
                                                            Delete
                                                        </p>
                                                    </div>
                                                </div>
                                            )}{isOpen && (userId !== selectedPost?.userId) && (
                                                <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ">
                                                    <div className="py-1 flex items-center gap-1 p-2 hover:text-red-900 hover:cursor-pointer" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                        <svg onClick={() => setReportModal(!ReportModal)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:text-red-900 hover:cursor-pointer">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                        </svg>

                                                        <p
                                                            onClick={() => setReportModal(!ReportModal)}
                                                            className="block  py-2 text-sm text-gray-700 hover:text-red-900 hover:cursor-pointer "
                                                            role="menuitem"
                                                        >
                                                            report
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

       {/* -- report modal -- */}
                                        {ReportModal && <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
                                            <div ref={reportRef} className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
                                                <div className="w-full">
                                                    {reportMessage.length? (
                                                    <div className="m-8 p-2 max-w-[400px] mx-auto">
                                                            <p className='text-green-700'>{reportMessage}</p>
                                                        </div>):
                                                        (<div className="m-8 p-2 max-w-[400px] mx-auto">
                                                        <div className="mb-2">
                                                            <h1 className="mb-4  text-3xl font-extrabold">Report Post</h1>
                                                            <p className="text-gray-600 ">Tell us whats wrong with this post.</p>
                                                        </div>
                                                        <div className="">
                                                            <textarea class="ml-4 mb-2 rounded focus:outline-none focus:border-green-700"
                                                             name="reportDescription"
                                                             id="" 
                                                             cols="30" rows="4"
                                                             onChange={(e) => setReason(e.target.value)}
                                                             value={reason}
                                                             >

                                                             </textarea>
                                                            <div className='flex justify-end mr-[1.9rem] '>
                                                                <button onClick={handleReportPost} className="mr-20 bg-gray-300 hover:bg-gray-400 text-red-800 font-bold py-2 px-4 rounded inline-flex items-center" >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                                    </svg>
                                                                    <span className='ml-2'>Report</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>)}
                                                </div>
                                            </div>
                                        </div>}

                                        <svg onClick={() => setSelectedPost('')} className="w-6 h-6 hover:cursor-pointer hover:text-lime-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div id='comments' className='h-full border-b-1 p-2 pr-10 shadow max-h-80 overflow-auto bg-stone-50 '>
                                    {post?.comments?.map((comment: any) => (
                                        <div key={comment._id} className="border rounded-md p-3 ml-3 my-3 max-w-md min">
                                            <div className="flex gap-3 items-start">
                                                <img
                                                    src={comment.userId.dp}
                                                    className="object-cover w-8 h-8 rounded-full 
                                                    border-2 border-emerald-400 shadow-emerald-400 hover:cursor-pointer"
                                                />
                                                <div className="flex flex-col flex-grow">
                                                    <div className='flex items-center justify-between'>
                                                        <h3 className="font-semibold hover:cursor-pointer">
                                                            {comment.userId.userName}
                                                        </h3>
                                                        <div className='flex items-center gap-0'>

                                                            {!(comment.likes.includes(userId)) ? (<svg onClick={() => handleCommentLike(comment._id)}
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke-width="1.5"
                                                                stroke="currentColor"
                                                                className="w-4 h-4 hover:cursor-pointer ease-in-out  hover:scale-125"
                                                            >
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                                                />
                                                            </svg>) : (<svg onClick={() => handleCommentLike(comment._id)}
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="red"
                                                                viewBox="0 0 24 24"
                                                                stroke-width="1.5"
                                                                // stroke="currentColor"
                                                                className="w-4 h-4 hover:cursor-pointer ease-in-out  hover:scale-125"
                                                            >
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                                                />
                                                            </svg>)}
                                                            {comment.likes.length > 0 && <p className='text-xs'>{comment.likes.length}</p>}
                                                        </div>
                                                    </div>
                                                    {userId === selectedPost?.userId && editComment === comment._id ? (
                                                        // Edit mode
                                                        <div className="flex items-end justify-between">
                                                            <div className="break-all ">
                                                                <textarea className='text-sm rounded h-6'
                                                                    value={editedComment}
                                                                    onChange={(e) => setEditedComment(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="flex text-xs gap-1 pl-4">
                                                                <p
                                                                    className="font-semibold text-gray-400 px-1 hover:text-gray-600 hover:cursor-pointer"
                                                                    onClick={() => handleSaveComment(comment._id)}
                                                                >
                                                                    Save
                                                                </p>
                                                                <p
                                                                    className="font-semibold text-gray-400 px-1 hover:text-gray-600 hover:cursor-pointer"
                                                                    onClick={() => setEditComment('')}
                                                                >
                                                                    Cancel
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        // View mode
                                                        <div className="flex items-end justify-between">
                                                            <div className="break-all">
                                                                <p className="text-sm">{comment.comment}</p>
                                                            </div>
                                                            {userId === selectedPost?.userId && (
                                                                <div className="flex text-xs gap-1 pl-4">
                                                                    <p
                                                                        className="font-semibold text-gray-400 px-1 hover:text-gray-600 hover:cursor-pointer"
                                                                        onClick={() => handleEditComment(comment._id, comment.comment)}
                                                                    >
                                                                        Edit
                                                                    </p>
                                                                    <p
                                                                        className="font-semibold text-gray-400 px-1 hover:text-gray-600 hover:cursor-pointer"
                                                                        onClick={() => handleDeleteComment(comment._id)}
                                                                    >
                                                                        Delete
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {!editPost ? (<div className='p-2 flex flex-col justify-around h-full ' >
                                    <div className='flex '>
                                        {!(post.likes.includes(userId)) ? (<svg onClick={handleLike} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:cursor-pointer ease-in-out  hover:scale-125">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>) : (<svg onClick={handleLike} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E60000" className="w-6 h-6 hover:cursor-pointer ease-in-out  hover:scale-125">
                                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                        </svg>
                                        )}
                                        <p>{post.likes.length} likes</p>
                                    </div>
                                    <div>
                                        <p>{post?.caption}</p>
                                    </div>
                                    <br /><br />
                                    <div className="flex border rounded-xl border-[#e0e0e0] bg-white items-center justify-start ">
                                        <input
                                            type="text"
                                            name="comment"
                                            id="comment"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Add a comment..."
                                            className=" w-full py-3 px-4 rounded-xl border-none bg-transparent text-base font-medium  focus:outline-none"
                                        />
                                        <svg onClick={handleCommentSubmit} type="submit" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:cursor-pointer hover:text-blue-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                        </svg>
                                    </div>
                                </div>) : (<div className='p-2 flex flex-col justify-around h-full ' >
                                    <div className='flex '>
                                        {!(post.likes.includes(userId)) ? (<svg onClick={handleLike} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:cursor-pointer ease-in-out  hover:scale-125">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>) : (<svg onClick={handleLike} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E60000" className="w-6 h-6 hover:cursor-pointer ease-in-out  hover:scale-125">
                                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                        </svg>
                                        )}
                                        <p>{post.likes.length} likes</p>
                                    </div>
                                    <div>

                                        <textarea className='text-sm rounded mt-2'
                                            value={editedPost}
                                            onChange={(e) => setEditedPost(e.target.value)}
                                        />
                                        <p className="font-semibold text-gray-800 px-1 hover:text-gray-600 hover:cursor-pointer text-sm" onClick={saveEditedPost}>Save</p>
                                        <p className="font-semibold text-gray-800 px-1 hover:text-gray-600 hover:cursor-pointer text-sm" onClick={() => setEditPost(false)}>Cancel</p>
                                    </div>
                                    <br /><br />
                                    <div className="flex border rounded-xl border-[#e0e0e0] bg-white items-center justify-start ">
                                        <input
                                            type="text"
                                            name="comment"
                                            id="comment"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Add a comment..."
                                            className=" w-full py-3 px-4 rounded-xl border-none bg-transparent text-base font-medium  focus:outline-none"
                                        />
                                        <svg onClick={handleCommentSubmit} type="submit" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:cursor-pointer hover:text-blue-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                        </svg>
                                    </div>
                                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostModal;
