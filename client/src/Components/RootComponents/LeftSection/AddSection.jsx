import { useEffect, useRef, useContext } from "react";
import { MdEmail } from "react-icons/md";
import { motion } from 'framer-motion';
import AddFriendCard from "../../UiComponents/AddFriendCard";
import { GetAUser } from "../../../Store/urls";
import { UserAuthCtx } from "../../../Store/Context/UserAuthContext";
const url = GetAUser();

// eslint-disable-next-line react/prop-types
export default function AddSection({ className = "" }) {
  const { Token } = useContext(UserAuthCtx);
  const inputRef = useRef(null);
  const inputFocus = () => {
    inputRef.current.focus();
  }
  const handleChange = async (e) => {
    console.log(e.target.value);
    // try {
    //   const response = await fetch(url, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${Token}`,
    //     },
    //     body: JSON.stringify({
    //       email: e.target.value
    //     })
    //   });
    //   const res = await response.json();
    //   console.log({ res });
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  }
  useEffect(() => {
    inputFocus();
  }, []);
  return (
    <div className={`border-r-2 border-background1 pt-5 sm:pl-5 pl-2 ${className}`}>
      <h1 className="text-2xl font-bold">Add Friend</h1>
      <MdEmail onClick={inputFocus} className="relative top-7   left-3 cursor-text" />
      <div className="pr-2">
        <input
          ref={inputRef}
          onChange={handleChange}
          className="truncate pl-10 py-2 mb-5 rounded-lg text-gray bg-[#383838] focus:border-b-primary border-b-[#BBBBBB] border-b-2  outline-none w-full border-0 bg-transparent font-bold placeholder-gray"
          type="text" placeholder="Search for frineds by email"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-[calc(100%-120px)] space-y-3 overflow-auto sm:pr-5 pr-2">
        <AddFriendCard Img="https://picsum.photos/200/300" Title="SomeName" />
        <AddFriendCard Img="https://picsum.photos/200/300" Title="SomeName" />
        <AddFriendCard Img="https://picsum.photos/200/300" Title="SomeName" />
        <AddFriendCard Img="https://picsum.photos/200/300" Title="SomeName" />
        <AddFriendCard Img="https://picsum.photos/200/300" Title="SomeName" />
        <AddFriendCard Img="https://picsum.photos/200/300" Title="SomeName" />
        <AddFriendCard Img="https://picsum.photos/200/300" Title="SomeName" />
        <AddFriendCard Img="https://picsum.photos/200/300" Title="SomeName" />
        <AddFriendCard Img="https://picsum.photos/200/300" Title="SomeName" />
        <AddFriendCard Img="https://picsum.photos/200/300" Title="SomeName" />
      </motion.div>
    </div>
  )
}