'use client';
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Educations from "./components/Educations/Educations";
import Experiences from "./components/Experiences/Experiences";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer/Footer";
import { useRef } from "react";
import { useReadProfileQuery } from "../../features/profile/profileApi";
import { useReadEducationsQuery } from "../../features/educations/educationApi";
import { useReadExpsQuery } from "../../features/experiences/experienceApi";
import { useReadBackendSkillsQuery } from "../../features/skills/skillsApi";
import { useReadFrontendSkillsQuery } from "../../features/skills/skillsApi";
import { useReadOtherSkillsQuery } from "../../features/skills/skillsApi";
import { useReadProjectsQuery } from "../../features/projects/projectsApi";
import { useReadSocialQuery } from "../../features/footer/socialApi";
import WaitingModal from "./dashboard/WaitingModal";

const Home = () => {
  const { data: profile, isLoading: proLoading } = useReadProfileQuery();
  const { data: educations, isLoading: eduLoading } = useReadEducationsQuery();
  const { data: experiences, isLoading: expLoading } = useReadExpsQuery();
  const { data: backend, isLoading: backLoading } = useReadBackendSkillsQuery();
  const { data: frontend, isLoading: frontLoading } = useReadFrontendSkillsQuery();
  const { data: other, isLoading: otherLoading } = useReadOtherSkillsQuery();
  const { data: projects, isLoading: projectsLoading } = useReadProjectsQuery();
  const { data: socials, isLoading: sociLoading } = useReadSocialQuery();

  const isDataLoading = proLoading || eduLoading || expLoading || backLoading || frontLoading || otherLoading || projectsLoading || sociLoading;

  const educationRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const skillRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  const projectRef = useRef<HTMLElement | null>(null);

  const scrollToEducations = () => educationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const scrollToExperiences = () => experienceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const scrollToSkills = () => skillRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const scrollToProject = () => projectRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (isDataLoading) return <WaitingModal />

  return (
    <main>
      <Header
        scrollToEducations={scrollToEducations}
        scrollToExperiences={scrollToExperiences}
        scrollToSkills={scrollToSkills}
        scrollToContact={scrollToContact}
        scrollToProject={scrollToProject}
      />
      <Profile profile={profile?.profile} />
      <Educations educations={educations} ref={educationRef} />
      <Experiences experiences={experiences} ref={experienceRef} />
      <Skills backend={backend} frontend={frontend} other={other} ref={skillRef} />
      <Projects projects={projects} ref={projectRef} />
      <Footer socials={socials} ref={contactRef} />
    </main>
  )
}

export default Home;