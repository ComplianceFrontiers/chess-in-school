/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import '../../introduction/1.scss';
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
  const [showVideo, setShowVideo] = useState(false); // Add a state to manage page loading

  const puzzles = [
    { title: "Forks and Double Attacks - Part 3", level: "Knight", category: "Middlegame", dateAndtime: "2024-08-21T13:54", total_puz_count: 9, statusFlag: "Not Started" },
    { title: "hih", level: "Pawn", category: "Endgame", dateAndtime: "2024-09-19T12:42", total_puz_count: 1, statusFlag: "Not Started" }
  ];

  
  const handleButtonClick = async (
    level:string,
    title: string,
    category: string,
    date_time: string,
    puzzle_no: number,
    score: string,
    index: number
  ) => {
    setLoading((prevLoading) => ({ ...prevLoading, [index]: true }));
    const userDetailsString = localStorage.getItem('userDetails');
    const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
    const email = storedUserDetails?.email;

    if (email) {
      try {
        const createArenaApiUrl = 'https://backend-chess-tau.vercel.app/create_Arena_user_inschool';
        const imagesApiUrl = `https://backend-chess-tau.vercel.app/images/title?level=${encodeURIComponent(level)}&category=${encodeURIComponent(category)}&title=${encodeURIComponent(title)}`;

        const createArenaResponse = await axios.post(createArenaApiUrl, { email, category, title, puzzle_no });

        if (createArenaResponse.data.success) {
          const imagesResponse = await axios.get(imagesApiUrl);
          router.push(`/arena/startArena?title=${encodeURIComponent(title)}&level=${encodeURIComponent(level)}&category=${encodeURIComponent(category)}&date_time=${encodeURIComponent(date_time)}&score=${encodeURIComponent(score)}`);
        } else {
          setError('Failed to create or update PuzzleArena. Please try again later.');
        }
      } catch (error) {
        console.error('Error during API calls:', error);
        setError('An error occurred while processing your request. Please try again later.');
      } finally {
        setLoading((prevLoading) => ({ ...prevLoading, [index]: false }));
      }
    }
  };

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
          course_title: 'understandingPieceExchanges',
          completed: 60
        };
    
        // Make the POST request to the API
        const response = await axios.post('https://backend-chess-tau.vercel.app/update-course-completion-inschool', requestData);
    
        // Handle the response
        console.log('API Response:', response.data);
        router.push('/modules/level1/understandingPieceExchanges/74'); // Redirect to the M2 page
} catch (error) {
      console.error('API Error:', error);
    } finally {
      setIsLoadingPage(false); // Reset loading state after the request
    }
  };
   const handlePreviousClick = () => {
      setIsLoadingPage(true);
      router.push('/modules/level1/understandingPieceExchanges/72'); // Redirect to the previous page (adjust the path as needed)
    };
  return (
    <div className="lesson-content">
     {isLoadingPage && <Loading />}


      <header className="fixed-header">
    
    <h3>6.3 Exchange Down</h3>
    </header>
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
            url="https://www.youtube.com/watch?v=2Ja4AU17u94"
            controls
            playing
            width="100%"
            height="650px"
          />
        )}
      </div><br />
        <section className="chessboard-info">
    <p style={{ fontFamily: 'Montserrat, sans-serif', color: 'black', fontSize: '16px' }}>
        Being 'exchange down' in chess refers to a material disadvantage where you have traded a higher-value piece, typically a rook, for a lower-value piece, usually a knight or bishop. In standard piece valuation, a rook is worth five points, while a knight or bishop is worth three points. Losing a rook in exchange for a knight or bishop results in a net loss of two points. Being exchange down can make the endgame more difficult, as rooks are often more powerful in open positions and can control more squares than knights or bishops. Additionally, losing a rook means giving up control of open files and ranks, which can make it harder to exert pressure on the opponent and control key areas of the board.
    </p><br />

    <p style={{ fontFamily: 'Montserrat, sans-serif', color: 'black', fontSize: '16px' }}>
        Being exchange down can be strategically acceptable in certain situations. Positional compensation can justify the decision if it leads to significant advantages, such as control of the center, a strong pawn structure, or a powerful knight or bishop. Additionally, dynamic potential plays a role, where the activity of your remaining pieces or the creation of threats can offset the material loss, especially in the middlegame. However, there are risks associated with being exchange down. It can leave you in a vulnerable position, particularly susceptible to an opponent's attack if they effectively utilize their rooks to dominate the board. The endgame also becomes more challenging when down in material, as the opponent's rooks can outmaneuver your minor pieces, making it difficult to defend or create winning chances.
    </p>
    </section>
    {/* Navigation Buttons */}
    <section className="navigation-buttons">
        <button onClick={handlePreviousClick} className="previous-button">Previous Page</button>
        <button onClick={handleNextClick} className="next-button">Next</button>
    </section>
</div>

  );
};

export default withAuth(M1);
