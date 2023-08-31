import React from 'react'
import Suggestions from './Suggestions'
import Post from './Post'


const Timeline = () => {
    return (
        <>
            <div className="flex flex-row">
                <div className='timeline__left flex-[0.7] '>
                    <div className='posts '>
                        <Post />
                        <Post />
                        <Post />
                    </div>
                </div >
                <div className='timeline__right flex-[0.3]'>
                    <Suggestions />
                </div>
            </div>
        </>
    )
}

export default Timeline