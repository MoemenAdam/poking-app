import Logo from '../../assets/logo.png';
import { CiLock } from "react-icons/ci";
import {motion} from 'framer-motion';
import { useContext } from 'react';
import { FreindsCtx } from '../../Store/FreindsContext';
import { FaDeleteLeft } from "react-icons/fa6";
import Chat from './Chat';

export default function RightSection({ className = "" }) {
  const { FreindsWith, setFreindsWith } = useContext(FreindsCtx);

  const Empty = () => {
    return (
      <motion.section
        initial={{ opacity: 0, backgroundColor: '#202020' }}
        animate={{ opacity: 1, backgroundColor: '#2C2C2C' }}
        transition={{ duration: 1 }}
        className='flex flex-col justify-between items-center px-5 h-full'>
        <div></div>
        <div className='flex flex-col gap-4 items-center text-center pointer-events-none'>
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            src={Logo} className='w-32 opacity-20 select-none' alt="logo" />
          <h1 className='text-2xl'>WhosApp</h1>
          <p className='text-gray'>
            Send and receive messages without a phone number only with email. <br />
            Use WhosApp on your browser and phone at the same time.
          </p>
        </div>
        <div className='text-gray mb-10 flex text-center items-center gap-2'>
          <CiLock/> End-to-end encrypted
        </div>
      </motion.section>
    )
  }

  const handleRemoveFreind = () => {
    const res = window.confirm('Are you sure you want to remove this friend?');
    if (res) {
      setFreindsWith(null);
    }
  }
  return (
    <div className={`${className}`}>
      {!FreindsWith && <Empty />}
      {FreindsWith && 
        <div className='flex flex-col h-full bg-background2'>
          <div className='flex justify-between items-center p-4 bg-background2'>
            <div className='flex items-center gap-4'>
              <img className='w-10 h-10 rounded-full' src={FreindsWith.Img} alt="" />
              <div className='flex flex-col'>
                <h1 className='text-lg font-bold'>{FreindsWith.Title}</h1>
              </div>
            </div>
            <div>
              <FaDeleteLeft onClick={handleRemoveFreind} className='text-gray cursor-pointer' title='remove freind' size={30}/>
            </div>
          </div>
          <div className='flex-grow bg-background2 mainBg overflow-hidden'>
            <Chat />
          </div>
          <div className=''>
            <input className='w-full h-full bg-transparent outline-none border-0 p-4' 
             type="text"  placeholder='Type a message' />
          </div>
        </div>
      }
    </div>
  )
}