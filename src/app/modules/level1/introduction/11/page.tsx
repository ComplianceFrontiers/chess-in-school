/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import '../1.scss';
import { UserDetails } from '../../../../types/types';
import withAuth from '@/app/withAuth';
import Loading from '@/app/Loading';
import ReactPlayer from 'react-player';

interface Puzzle {
  level:string;
  category: string;
  title: string;
  dateAndtime: string;
  total_puz_count: number;
  statusFlag?: string;
  scoreSum?: number; // Optional property, can be number or undefined
}
const M1: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [puzzlesWithStatus, setPuzzlesWithStatus] = useState<Puzzle[]>([]);
  const [isLoadingPage, setIsLoadingPage] = useState(false); // Add a state to manage page loading
  const [showVideo, setShowVideo] = useState(false); // Add a state to manage page loading// New state to toggle between image and video

  const puzzles = [
    { title: "Forks and Double Attacks - Part 3", level: "Knight", category: "Middlegame", dateAndtime: "2024-08-21T13:54", total_puz_count: 9, statusFlag: "Not Started" },
    { title: "hih", level: "Pawn", category: "Endgame", dateAndtime: "2024-09-19T12:42", total_puz_count: 1, statusFlag: "Not Started" }
  ];

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (typeof window !== 'undefined') {
        const userDetailsString = localStorage.getItem('userDetails');
        const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;

        if (storedUserDetails) {
          setUserDetails(storedUserDetails);

          const updatedPuzzlesSet = new Set<string>();

          for (const item of puzzles) {
            try {
              const arenaUserResponse = await axios.get('https://backend-chess-tau.vercel.app/get_Arena_user_inschool', {
                params: {
                  email: storedUserDetails.email,
                  category: item.category,
                  title: item.title,
                  date_time: item.dateAndtime,
                  file_ids: {},
                },
              });

              if (!arenaUserResponse.data.success) {
                // API returned success as false, handle it here
                const updatedPuzzle: Puzzle = {
                  ...item,
                  statusFlag: 'Not started', // Example status for failed API
                  scoreSum: 0, // Default to 0 if fetching fails
                };
                updatedPuzzlesSet.add(JSON.stringify(updatedPuzzle));
              } else {
                // API returned success as true
                const puzzleArena = arenaUserResponse.data.puzzleArena;
                const scoreSum = Object.values(puzzleArena).reduce((sum, arenaPuzzle: any) => {
                  const score = typeof arenaPuzzle.score === 'number' ? arenaPuzzle.score : 0;
                  return sum + score;
                }, 0);

                let statusFlag = 'Not Started';
                if (Object.values(puzzleArena).every((arenaPuzzle: any) => arenaPuzzle.option_guessed !== null)) {
                  statusFlag = 'Completed';
                } else if (Object.values(puzzleArena).some((arenaPuzzle: any) => arenaPuzzle.option_guessed !== null && arenaPuzzle.started)) {
                  statusFlag = 'In Progress';
                } else if (Object.values(puzzleArena).some((arenaPuzzle: any) => arenaPuzzle.option_guessed !== null)) {
                  statusFlag = 'Started';
                }

                const updatedPuzzle: Puzzle = {
                  ...item,
                  statusFlag,
                  scoreSum: scoreSum as number,
                };

                updatedPuzzlesSet.add(JSON.stringify(updatedPuzzle));
              }
            } catch (error) {
              console.error(`Error fetching data for puzzle ${item.title}:`, error);
              const updatedPuzzle: Puzzle = {
                ...item,
                statusFlag: 'Error Fetching Data', // Example status for error
                scoreSum: 0,
              };
              updatedPuzzlesSet.add(JSON.stringify(updatedPuzzle));
            }
          }

          setPuzzlesWithStatus(Array.from(updatedPuzzlesSet).map((item: string) => JSON.parse(item) as Puzzle));
        }
      }
    };

    fetchUserDetails();
  }, []);

  const handleNextClick = async () => {
    setIsLoadingPage(true); // Set loading state before making the request
    const userDetailsString = localStorage.getItem('userDetails');
    const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
    if (storedUserDetails) {
          setUserDetails(storedUserDetails);
    }
    try {
      // Sample data to send in the POST request
      const requestData = {
        email: storedUserDetails.email,
        course_title: 'theChessboard',
        completed: 10
      };

      // Make the POST request to the API
      const response = await axios.post('https://backend-chess-tau.vercel.app/update-course-completion-inschool', requestData);

      // Handle the response
      console.log('API Response:', response.data);
      router.push('/modules/level1/theChessboard/21'); // Redirect to the M2 page
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setIsLoadingPage(false); // Reset loading state after the request
    }
  };

  return (
    <div className="lesson-content">
       {isLoadingPage && <Loading />}

      <header className="fixed-header">
      <h3>1.1 Introduction</h3>
      </header>

      <section className="chessboard-info">
        {/* Video Section */}
        <div className="media-container">
        {!showVideo ? (
          <img
            src="/images/thumbnail.png" // Placeholder image
            alt="Introduction Thumbnail"
            className="intro-image"
            onClick={() => setShowVideo(true)} // Show video when image is clicked
            style={{ cursor: 'pointer' }} // Change cursor to pointer to indicate it's clickable
          />
        ) : (
          <ReactPlayer
            url="https://youtu.be/LUvIdC30djI"
            controls
            playing
            width="100%"
            height="650px"
          />
        )}
      </div>
        <br />
        <p>
  Welcome to “Basics of Chess," a course designed for complete beginners. Whether you
  are starting from scratch & have never played chess before, or already know a few
  basics and want to explore the game in a systematic way, you're in the right place! We will
  guide you step by step, making the learning process easy and enjoyable. By the end of this
  journey, you will have the knowledge and confidence to play chess with skill.
</p><br />

<p>
  Before we begin, let me introduce myself. My name is Sid, also known as the Chess Kid. I
  am the founder and lead coach of Delaware Chess Champs, a scholastic chess club that
  runs a community outreach program called “Chess for Kids.”
</p><br />

<p>
  As a former Delaware Junior Chess Champion and one of the top one hundred players in my
  age group in the U.S., I have played over 1,000 competitive games both domestically and
  internationally. I am passionate about sharing my love for chess with beginners like you.
</p><br />

<p>
  I invite you to join me on this journey—let us get started!
</p><br />

        
      

      {/* Navigation Buttons */}
      <section className="navigation-buttons">
        <button className="previous-button"></button>
        <button onClick={handleNextClick} className="next-button">Next</button>
      </section>
      </section>
    </div>
  );
};

export default withAuth(M1);
