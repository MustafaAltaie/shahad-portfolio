'use client';
import React, { useEffect, useState } from 'react';
import './Header.css';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

interface HeaderProps {
    scrollToEducations: () => void
    scrollToExperiences: () => void
    scrollToSkills: () => void
    scrollToContact: () => void
}

interface LiList {
    title: string
    target: () => void
}

const Header = (props: HeaderProps) => {
    const scrollToHome = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const liList: LiList[] = [
        {
            title: 'Home',
            target: scrollToHome,
        },
        {
            title: 'Educations',
            target: props.scrollToEducations
        },
        {
            title: 'Experiences',
            target: props.scrollToExperiences
        },
        {
            title: 'Skills',
            target: props.scrollToSkills
        },
        {
            title: 'Documents',
            target: props.scrollToContact
        },
    ]
    const [dark, setDark] = useState(true);
    const [hideNav, setHideNav] = useState(false);
    const [hasMonted, setHasMounted] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        if(window.innerWidth < 1024) {
            setHideNav(true);
        }

        const stored = localStorage.getItem('isDark');
        if (stored) {
            setDark(JSON.parse(stored));
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        const bodyClasses = document.body.classList;
        if (dark) {
            bodyClasses.add('darkMode');
            bodyClasses.remove('lightMode');
        } else {
            bodyClasses.add('lightMode');
            bodyClasses.remove('darkMode');
        }
        if (!mounted) return;
        localStorage.setItem('isDark', JSON.stringify(dark));
    }, [dark]);

    if(!hasMonted) return null;

    return (
        <header className='flex flex-col lg:flex-row lg:justify-between fixed w-full z-10 lg:px-5'>
            <div className='p-5'>
                <div className='logoWrapper flex items-center justify-between gap-10'>
                    <p className='text-lg'><span className='mainColor'>Shahad</span> Nazim Zangana</p>
                    <div className='flex gap-5 items-center'>
                        <div className="flex gap-2">
                            <SunIcon className='w-5 mainColor cursor-pointer' onClick={() => setDark(false)} />
                            <div onClick={() => setDark(!dark)} className="noTouchAction w-9 h-6 relative rounded-full border-thin cursor-pointer">
                                <div className={`mainBgColor w-5 h-5 rounded-full centeredY transition-all ${!dark ? 'left-[1.2px]' : 'left-[13px]'}`}></div>
                            </div>
                            <MoonIcon className='w-5 mainColor cursor-pointer' onClick={() => setDark(true)}  />
                        </div>
                        <div className="navToggle flex flex-col gap-1.5 lg:hidden" onClick={() => setHideNav(!hideNav)}>
                            <div className={`w-6 transition-all duration-500 ${!hideNav ? 'transform translate-y-2 rotate-45' : ''}`}></div>
                            <div className={`w-6 transition-all duration-500 ${!hideNav ? 'opacity-0' : 'opacity-100'}`}></div>
                            <div className={`w-6 transition-all duration-500 ${!hideNav ? 'transform -translate-y-1.5 -rotate-45' : ''}`}></div>
                        </div>
                    </div>
                </div>
            </div>
            <nav className={`overflow-hidden transition-all duration-700 ${hideNav ? 'max-h-0' : 'max-h-100'}`}>
                <ul className='flex flex-col lg:flex-row text-center lg:border-b-0'>
                    {liList.map(li =>
                    <li key={li.title} onClick={() => {li.target(); setHideNav(true)}} className='p-5 whitespace-nowrap lg:border-t-0 cursor-pointer'>{li.title}</li>)}
                </ul>
            </nav>
        </header>
    )
}

export default Header;