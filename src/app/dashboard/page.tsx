import Header from "./Header/Header";
import Profile from "./Profile/Profile";
import Educations from "./Educations/Educations";
import Experiences from "./Experiences/Experiences";
import Skills from "./Skills/Skills";
import Footer from "./Footer/Footer";
import Projects from "./Projects/Projects";

const Dashboard = () => {
  return (
    <main>
      <Header />
      <Profile />
      <Educations />
      <Experiences />
      <Skills />
      <Projects />
      <Footer />
    </main>
  )
}

export default Dashboard;