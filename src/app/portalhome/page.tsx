/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './portal.scss';
import { UserDetails } from '../types/types';
import withAuth from '../withAuth';
import { useRouter } from 'next/navigation';
import Hero1 from '../portalhome1/hero1';
import Commingsoon from '../commingsoon';
import Loading from '../Loading';
import Image from 'next/image';

const Hero = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [loading, setLoading] = useState(true);

  const openModal = (message: string) => {
    setModalContent(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent('');
  };

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const userDetailsString = localStorage.getItem('userDetails');
        const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;

        if (storedUserDetails) {
          const response = await axios.get(
            `https://backend-chess-tau.vercel.app/getinschooldetails?email=${storedUserDetails.email}`
          );
          setUserDetails(response.data.data || storedUserDetails);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  // Window resize listener with debounce
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      document.body.style.overflowY = isMobile ? 'auto' : 'hidden';
    };

    const debounceResize = () => {
      clearTimeout((handleResize as any).timeout);
      (handleResize as any).timeout = setTimeout(handleResize, 100);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', debounceResize);

    return () => {
      clearTimeout((handleResize as any).timeout);
      window.removeEventListener('resize', debounceResize);
      document.body.style.overflowY = 'hidden'; // Reset on unmount
    };
  }, []);

  const getActiveClass = (level: string) => {
    if (!userDetails) return '';
    const levelMap: { [key: string]: number } = {
      'Level 1': 1,
      'Level 2': 2,
      'Level 3': 3,
      'Level 4': 4,
      'Level 5': 5,
      'Level 6': 6,
    };
    const userLevel = levelMap[userDetails.level];
    const currentLevel = levelMap[level];
    return currentLevel <= userLevel ? 'active' : 'inactive';
  };

  const handleImageClick = (level: string) => {
    if (level === '2') {
      openModal('Coming Soon! Level 2 content will be available shortly.');
      return;
    }
    if (getActiveClass(`Level ${level}`) === 'active') {
      router.push(`/Afterschool${level}`);
    }
  };

  const getConnectorWidth = () => {
    if (!userDetails) return '0%';
    const levelMap: { [key: string]: number } = {
      'Level 1': 7,
      'Level 2': 20,
      'Level 3': 40,
      'Level 4': 60,
      'Level 5': 80,
      'Level 6': 100,
    };
    const userLevel = levelMap[userDetails.level];
    return `${userLevel}%`;
  };

  const getConnectorColor = () => {
    if (!userDetails) return 'white';
    const levelMap: { [key: string]: number } = {
      'Level 1': 1,
      'Level 2': 2,
      'Level 3': 3,
      'Level 4': 4,
      'Level 5': 5,
      'Level 6': 6,
    };
    const userLevel = levelMap[userDetails.level];
    return userLevel > 0 ? '#f26722' : 'white';
  };

  if (loading) {
    return <Loading />;
  }

  if (!userDetails) {
    return <div>No user details available.</div>;
  }

  return (
    <div className="hero">
      <div className="headers">
        <h2>Your Chess Journey</h2>
      </div>
      <div className="journey-container">
        <div className="chess-journey">
          <div className="level">
            <svg className="connector" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 10" preserveAspectRatio="none">
              <line
                x1="0"
                y1="5"
                x2={getConnectorWidth()}
                y2="5"
                stroke={getConnectorColor()}
                strokeWidth="10"
              />
            </svg>

            <div className={`step ${getActiveClass('Level 1')}`} onClick={() => handleImageClick('1')}>
                <div className="icon">
                <Image src="/images/chessicons/4.png" alt="Pawn" className="chess-icon pawn" width={100}
  height={100} />
                </div>
              <p>Pawn</p>
              <p>(Absolute Beginners)</p>
            </div>

            <div className={`step ${getActiveClass('Level 2')}`} onClick={() => handleImageClick('2') }>
              <div className="icon">
                <Image src="/images/chessicons/1.png" alt="Knight" className="chess-icon knight" width={100}
  height={100}/>
              </div>
              <p>Knight</p>
              <p>(Novice Players)</p>
            </div>

            <div className={`step ${getActiveClass('Level 3')}`} onClick={() => handleImageClick('3')}>
              <div className="icon">
                <Image src="/images/chessicons/5.png" alt="Bishop" className="chess-icon bishop" width={100}
  height={100} />
              </div>
              <p>Bishop</p>
              <p>(Intermediate Players)</p>
            </div>

            <div className={`step ${getActiveClass('Level 4')}`} onClick={() => handleImageClick('4')}>
              <div className="icon">
                <Image src="/images/chessicons/3.png" alt="Rook" className="chess-icon rook" width={100}
  height={100}/>
              </div>
              <p>Rook</p>
              <p>(Advanced Players)</p>
            </div>

            <div className={`step ${getActiveClass('Level 5')}`} onClick={() => handleImageClick('5')}>
              <div className="icon">
                <Image src="/images/chessicons/6.png" alt="Queen" className="chess-icon queen" width={100}
  height={100}/>
              </div>
              <p>Queen</p>
              <p>(Expert Players)</p>
            </div>

            <div className={`step ${getActiveClass('Level 6')}`} onClick={() => handleImageClick('6')}>
              <div className="icon">
                <Image src="/images/chessicons/2.png" alt="King" className="chess-icon king" width={100}
  height={100}/>
              </div>
              <p>King</p>
              <p>(Mastery Level)</p>
            </div>
          </div>
        </div>
      </div>
      <Commingsoon isOpen={modalOpen} onClose={closeModal} content={modalContent} />
      <Hero1 />
    </div>
  );
};

export default withAuth(Hero);
