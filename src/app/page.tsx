'use client';
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Experiences from "./components/Experiences/Experiences";
import Skills from "./components/Skills/Skills";
import Footer from "./components/Footer/Footer";
import { useEffect, useRef } from "react";
import { useReadProfileQuery } from "../../features/profile/profileApi";
import { useReadExpsQuery } from "../../features/experiences/experienceApi";
import { useReadOtherSkillsQuery } from "../../features/skills/skillsApi";
import { useReadSocialQuery } from "../../features/footer/socialApi";
import WaitingModal from "./dashboard-shahad-zangana-1993-secret/WaitingModal";
import Educations from "./components/Educations/Educations";


const Home = () => {
  const { data: profile, isLoading: proLoading } = useReadProfileQuery();
  const { data: experiences, isLoading: expLoading } = useReadExpsQuery();
  const { data: other, isLoading: otherLoading } = useReadOtherSkillsQuery();
  const { data: socials, isLoading: sociLoading } = useReadSocialQuery();

  const isDataLoading = proLoading || expLoading || otherLoading || sociLoading;

  const educationRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const skillRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  const scrollToEducations = () => educationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const scrollToExperiences = () => experienceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const scrollToSkills = () => skillRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  useEffect(() => {
    const storedScroll = localStorage.getItem('scrollAmount');
    if (storedScroll) {
      setTimeout(() => {
        window.scrollTo({ behavior: 'smooth', top: JSON.parse(storedScroll) });
      }, 1000)
    }
    const scrollAmount = () => {
      localStorage.setItem('scrollAmount', JSON.stringify(window.scrollY));
    }
    window.addEventListener('scroll', scrollAmount);
    return () => window.removeEventListener('scroll', scrollAmount);
  }, []);

  if (isDataLoading) return <WaitingModal />

  return (
    <main>
      <Header
        scrollToEducations={scrollToEducations}
        scrollToExperiences={scrollToExperiences}
        scrollToSkills={scrollToSkills}
        scrollToContact={scrollToContact}
      />
      <Profile profile={profile?.profile} />
      <Educations ref={educationRef} />
      <Experiences experiences={experiences} ref={experienceRef} />
      <Skills other={other} ref={skillRef} />
      <Footer socials={socials} ref={contactRef} />
    </main>
  )
}

export default Home;