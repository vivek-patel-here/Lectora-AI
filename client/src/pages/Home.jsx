import { useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext.jsx";
import Hero from "../components/Hero.jsx";
import Feature from "../components/Feature.jsx";
import Footer from "../components/Footer.jsx";
function Home() {
  //fetching states and methods from context
  const {
    fetchCourse,
    topic,
    theory,
    detailedExplanation,
    codeSnippet,
    youtubeIds,
    exercise,
    quizzes,
  } = useContext(GlobalContext);

  const [input, handleInput] = useState("");
  const onChangeHandler = (e) => {
    handleInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchCourse(input);
  };

  

  return (
    <div className="w-screen h-fit">
      <Hero/>
      <Feature/>
      <Footer/>
      
    </div>
  );
}

export default Home;
