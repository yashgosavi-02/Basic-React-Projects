import { useNavigate } from "react-router-dom"


const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 text-white h-14 flex items-center">
      <div className="wrapper-container w-full">
        <div className="flex items-center gap-1 cursor-pointer font-bold" onClick={() => navigate('/')}>
          COIN 🪙
        </div>
      </div>
    </div>
  )
}

export default Navbar
