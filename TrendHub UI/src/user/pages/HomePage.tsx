import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Timeline from '../components/timeline/Timeline';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import CreatePost from '../components/CreatePost';

const HomePage = () => {
  const [createModal, setCreateModal] = useState(false)
  const navigate = useNavigate();
  const user = useSelector((store: any) => store.user);
  const isLoggedIn = user.success;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className='homepage flex flex-row'>
        {createModal && <CreatePost setCreateModal={setCreateModal} />}
        <div className='homepage__nav flex-[0.16] border-r-2 border-gray-300'>
          <Sidebar setCreateModal={setCreateModal} />
        </div>
        <div className='homepage__timeline flex-[0.84]'>
          <Timeline />
        </div>
      </div>
    </>
  );
};

export default HomePage;
