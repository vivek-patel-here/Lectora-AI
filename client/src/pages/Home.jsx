import Navbar from "../components/Navbar";

function Home({ func }) {
  
  return (
    <div className="h-screen w-screen bg-black ">
      <Navbar logoutHandler={func} />
      I am Home
    </div>
  );
}

export default Home;
