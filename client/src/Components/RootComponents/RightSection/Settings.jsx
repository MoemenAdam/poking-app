import { useState, useContext, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../UiComponents/LoadingSpinner'
import { UserCtx } from '../../../Store/Context/UserContext';
import {motion} from 'framer-motion';
import { BsImageFill } from "react-icons/bs";
import { UpdateMe } from '../../../Store/urls';
const url = UpdateMe();


export default function Settings() {
  const { setLogedIn } = useContext(UserCtx);
  const { Name, setName, Image, setImage, Token } = useContext(UserCtx);
  const { userName, setUserName } = useContext(UserCtx);
  const [ NameinSearch, setNameinSearch ] = useState(Name);
  const [Loading, setLoading] = useState(false);
  const [imgHover, setimgHover] = useState(false);
  const imgRef = useRef(null);
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (Loading) return;
    if (NameinSearch === '') {
      toast(' Name is required', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (NameinSearch.length > 24) {
      toast(' Name Should be les than 24 characters', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(url, {
        method:'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Token}`,
        },
        body: JSON.stringify({
          name: NameinSearch,
          userName: userName
        })
      });
      const res = await response.json();
      if(res.status === 'success'){
        setName(NameinSearch);
      }else{
        setLogedIn(false);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }

    // fetch here and set the user data
    // then setLogedIn(true);
    // setLogedIn(true);
  }
  const handleNameChange = (e) => {
    if (Loading) return;
    setNameinSearch(e.target.value);
  }
  const handleuserNameChange = (e) => {
    if (Loading) return;
    setUserName(e.target.value);
  }
  const handleFileChange = (e)=>{
    const size = e.target.files[0].size / 1e6;
    if(size > 2){
      toast('Image size should be less than 2MB', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => { 
      // setImage(reader.result);
    }
    setImage('default.jpg');
  }
  return (
    <div className="flex justify-center items-center min-h-screen  w-full -mt-[50px]">
      <div className='sm:w-[400px] w-[calc(100%-20px)] rounded-xl flex flex-col justify-center items-center text-xl text-white bg-background2'>
        <div className='flex justify-center items-center w-full text-center py-10 '>
          <div className='space-y-4'>
            <motion.div 
              onHoverStart={()=>{setimgHover(true)}}
              onHoverEnd={()=>{setimgHover(false)}}
              onClick={()=>{imgRef.current.click()}} 
              className='imgContainer cursor-pointer relative flex justify-center items-center'>
              {imgHover && 
                <div className='absolute text-primary'>
                  <BsImageFill className='text-gray'/>
                  <input 
                    onChange={handleFileChange}
                    ref={imgRef} className='hidden' type="file" accept="image/*"/>
                </div>
                
              }
              <div className={`w-24 h-24 ${Image === 'default.jpg' && 'imgPlaceholder'}`}>
              {Image !== 'default.jpg' && 
                <img className={`w-24 h-24  rounded-full select-none pointer-events-none ${imgHover?"opacity-20":''}`} src={Image} />
              }
              </div>
            </motion.div>
            <h1>{Name}</h1>
          </div>
        </div>
        <div className='flex flex-col items-center w-full bg-[#2a2a2a] p-10 '>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-10 w-full'>
          <div>
              <label className='text-[#8000ff] text-[15px] font-bold'>Your Name <span className='opacity-70'>(what users will see)</span></label>
              <div className='focus:border-b-primary border-b-primary border-b-2 pb-2'>
                <input onChange={handleNameChange} value={NameinSearch} type="Name" name="Name" id="Name" className='w-full bg-transparent outline-none border-none text-sm text-[#c286ff]' />
              </div>
            </div>
            <div>
              <label className='text-[#8000ff] text-[15px] font-bold'>User Name</label>
              <div className='focus:border-b-primary border-b-primary border-b-2 pb-2'>
                <input onChange={handleuserNameChange} value={userName} placeholder='Enter you user name' type="Name" name="Name" id="Name" className='w-full bg-transparent outline-none border-none text-sm text-[#c286ff]' />
              </div>
            </div>
            <button className={`text-center text-lg h-12 w-full bg-primary py-2 rounded-lg font-bold flex justify-center items-center  ${Loading ? "opacity-20 cursor-not-allowed" : ""}`}>
              {Loading ? <LoadingSpinner /> : 'Confirm'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
