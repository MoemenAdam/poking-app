
export default function ReceivedMessage({message}) {
  return (
    <div className="bg-background1 w-fit py-2 px-10 rounded-lg relative">
      <div className="absolute top-0 left-0 w-0 h-0 border-solid border-transparent border-r-8 border-t-8 bg-background1"></div>
      {message}
    </div>
  )
}