import Market from "../components/Market"
// import Search from "../components/Search"
import Trending from "../components/Trending"


const CryptoHome = () => {
  return (
    <div className="wrapper-container">
        {/* <Search /> */}
        <Trending />
        <Market />
    </div>
  )
}

export default CryptoHome