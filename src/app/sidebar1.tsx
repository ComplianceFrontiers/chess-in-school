/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./side1.scss";
import { useRouter,usePathname } from "next/navigation";

// Updated topics structure with new data
const topics = [
   
  {
      title: "1. The Chessboard",              
      completed: true,
      submodules: [
        { title: "1.1 Introduction", completed: true },
        { title: "1.2 Board Set-up", completed: true },
        { title: "1.3 Letters & Numbers", completed: true },
        { title: "1.4 Understanding ‘File’", completed: true },
        { title: "1.5 Understanding ‘Rank’", completed: true },
        { title: "1.6 Understanding ‘Diagonals’", completed: true },
        { title: "1.7 Name of the Squares", completed: true }
      ]
    },
    {
      title: "2. Introduction to Pieces",
      completed: true,
      submodules: [
        { title: "2.1 Know the pieces", completed: true },
        { title: "2.2 ‘Major’ and ‘Minor’ Pieces", completed: true },
        { title: "2.3 Understanding the ‘King’", completed: true },
        { title: "2.4 Understanding the ‘Bishop’", completed: true },
        { title: "2.5 Understanding the ‘Rook’", completed: true },
        { title: "2.6 Understanding the ‘Knight’", completed: true },
        { title: "2.7 Understanding the ‘Pawn’", completed: true },
        { title: "2.8 Understanding the ‘Queen’", completed: true }
      ]
    },
    {
      title: "3. Arrangnment of Pieces",
      completed: true,
      submodules: [
        { title: "3.1 Light Side", completed: true },
        { title: "3.2 Dark Side", completed: true }
      ]
    },
    {
      title: "4. Special Moves",
      completed: true,
      submodules: [
        { title: "4.1 Castling", completed: true },
        { title: "4.2 Promotion", completed: true },
        { title: "4.3 En-passant", completed: true }
      ]
    },
    {
      title: "5. Winning in Chess (CCA)",
      completed: true,
      submodules: [
        { title: "5.1 Checkmate", completed: true },
        { title: "5.2 Checks", completed: true },
        { title: "5.3 Stalemate", completed: true },
        { title: "5.4 Attack & Defense", completed: true },
        { title: "5.5 Capture", completed: true },
        { title: "5.6 Draw", completed: true }
      ]
    },
    {
      title: "6. Understanding Piece Exchanges",
      completed: true,
      submodules: [
        { title: "6.1 Fair Trade", completed: true },
        { title: "6.2 Exchange Up", completed: true },
        { title: "6.3 Exchange Down", completed: true },
        { title: "6.4 Material Up", completed: true },
        { title: "6.5 Material Down", completed: true }
      ]
    },
    {
      title: "7. Stages of the Game",
      completed: true,
      submodules: [
        { title: "7.1 Opening", completed: true },
        { title: "7.2 Middlegame", completed: true },
        { title: "7.3 Endgame", completed: true }
      ]
    },
    {
      title: "8. Notation",
      completed: true,
      submodules: [{ title: "8 Notation", completed: true }]
    },
    {
      title: "9. Chess Game",
      completed: true,
      submodules: [{ title: "9 Chess Game", completed: true }]
    }
];

  
const Sidebar1: React.FC = () => {
  const router = useRouter();
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [userCourses, setUserCourses] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const currentPath = usePathname(); 

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarMinimized(true); // Minimize sidebar on small screens
    } else {
      setIsSidebarMinimized(false); // Maximize sidebar on larger screens
    }
  };

  useEffect(() => {
    handleResize(); // Call it initially to set the correct sidebar state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchUserCourses = async () => {
      const userDetailsString = localStorage.getItem('userDetails');
      const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
      const email = storedUserDetails ? storedUserDetails.email : '';

      if (email) {
        try {
          const response = await axios.get(`https://backend-chess-tau.vercel.app/getinschooldetails?email=${email}`);
          const data = response.data;

          if (data && data["data"] && Array.isArray(data["data"]["registered_inschool_courses"])) {
            const courseTitles = data["data"]["registered_inschool_courses"]
              .map((course: { course_title: string }) => course.course_title.trim().toLowerCase());
            setUserCourses(courseTitles);
          } else {
            setUserCourses([]);
          }
        } catch (error) {
          console.error("Error fetching user courses:", error);
          setUserCourses([]);
        }
      }
    };

    fetchUserCourses();
  }, []);
  useEffect(() => {
    console.log("User Courses after setting:", userCourses);
  }, [userCourses]);

  const toggleSidebar = () => setIsSidebarMinimized(!isSidebarMinimized);

  const handleGoBack = () => router.push('/Afterschool1');

  const handleSubmoduleClick = (title: string) => {
    toggleSidebar()
    const submodulePaths: Record<string, string> = {

      "1.1 Introduction": "/modules/level1/introduction/11",
      "1.2 Board Set-up": "/modules/level1/theChessboard/21",
      "1.3 Letters & Numbers": "/modules/level1/theChessboard/22",
      "1.4 Understanding ‘File’": "/modules/level1/theChessboard/23",
      "1.5 Understanding ‘Rank’": "/modules/level1/theChessboard/24",
      "1.6 Understanding ‘Diagonals’": "/modules/level1/theChessboard/25",
      "1.7 Name of the Squares": "/modules/level1/theChessboard/26",
      "2.1 Know the pieces": "/modules/level1/introductionToPieces/31",
      "2.2 ‘Major’ and ‘Minor’ Pieces": "/modules/level1/introductionToPieces/32",
      "2.3 Understanding the ‘King’": "/modules/level1/introductionToPieces/33",
      "2.4 Understanding the ‘Bishop’": "/modules/level1/introductionToPieces/34",
      "2.5 Understanding the ‘Rook’": "/modules/level1/introductionToPieces/35",
      "2.6 Understanding the ‘Knight’": "/modules/level1/introductionToPieces/36",
      "2.7 Understanding the ‘Pawn’": "/modules/level1/introductionToPieces/37",
      "2.8 Understanding the ‘Queen’": "/modules/level1/introductionToPieces/38",
      "3.1 Light Side": "/modules/level1/ArrangnmentOfPieces/41",
      "3.2 Dark Side": "/modules/level1/ArrangnmentOfPieces/42",
      "4.1 Castling": "/modules/level1/specialMoves/51",
      "4.2 Promotion": "/modules/level1/specialMoves/52",
      "4.3 En-passant": "/modules/level1/specialMoves/53",
      "5.1 Checkmate": "/modules/level1/winningInChess/61",
      "5.2 Checks": "/modules/level1/winningInChess/62",
      "5.3 Stalemate": "/modules/level1/winningInChess/63",
      "5.4 Attack & Defense": "/modules/level1/winningInChess/64",
      "5.5 Capture": "/modules/level1/winningInChess/65",
      "5.6 Draw": "/modules/level1/winningInChess/66",
      "6.1 Fair Trade": "/modules/level1/understandingPieceExchanges/71",
      "6.2 Exchange Up": "/modules/level1/understandingPieceExchanges/72",
      "6.3 Exchange Down": "/modules/level1/understandingPieceExchanges/73",
      "6.4 Material Up": "/modules/level1/understandingPieceExchanges/74",
      "6.5 Material Down": "/modules/level1/understandingPieceExchanges/75",
      "7.1 Opening": "/modules/level1/stagesOfTheGame/81",
      "7.2 Middlegame": "/modules/level1/stagesOfTheGame/82",
      "7.3 Endgame": "/modules/level1/stagesOfTheGame/83",
      "8 Notation": "/modules/level1/notation/91",
      "9 Chess Game": "/modules/level1/chessGame/101",
    
    };

    const path = submodulePaths[title];
  if (path && isAccessible(title)) {
    // Minimize sidebar and save state to localStorage
    setIsSidebarMinimized(true);
    localStorage.setItem("sidebarMinimized", "true"); // Store state in localStorage
    router.push(path); // Navigate to the route
  } else {
    setShowAlert(true);
  }
};
      const closeAlert = () => setShowAlert(false); // Close the alert popup


  const isAccessible = (title: string) => {
    if (title.startsWith("1.")) {
      return userCourses.includes("thechessboard");
    } 
    else if (title.startsWith("2.")) {
      return userCourses.includes("introductiontopieces");
    } else if (title.startsWith("3.")) {
      return userCourses.includes("arrangnmentofpieces");
    } else if (title.startsWith("4.")) { 
      return userCourses.includes("specialmoves");
    } 
    else if (title.startsWith("5.")) {
      return userCourses.includes("winninginchess");
    } else if (title.startsWith("6.")) {
      return userCourses.includes("understandingpieceexchanges");
    } else if (title.startsWith("7.")) {
      return userCourses.includes("stagesofthegame");
    } else if (title.startsWith("8.")) {
      return userCourses.includes("notation");
    }else if (title.startsWith("9.")) {
        return userCourses.includes("chessgame");
    }  else {return false}
  };

  const isActive = (submoduleTitle: string) => {
    const submodulePaths: Record<string, string> = {
      "1.1 Introduction": "/modules/level1/introduction/11",
      "1.2 Board Set-up": "/modules/level1/theChessboard/21",
      "1.3 Letters & Numbers": "/modules/level1/theChessboard/22",
      "1.4 Understanding ‘File’": "/modules/level1/theChessboard/23",
      "1.5 Understanding ‘Rank’": "/modules/level1/theChessboard/24",
      "1.6 Understanding ‘Diagonals’": "/modules/level1/theChessboard/25",
      "1.7 Name of the Squares": "/modules/level1/theChessboard/26",
      "2.1 Know the pieces": "/modules/level1/introductionToPieces/31",
      "2.2 ‘Major’ and ‘Minor’ Pieces": "/modules/level1/introductionToPieces/32",
      "2.3 Understanding the ‘King’": "/modules/level1/introductionToPieces/33",
      "2.4 Understanding the ‘Bishop’": "/modules/level1/introductionToPieces/34",
      "2.5 Understanding the ‘Rook’": "/modules/level1/introductionToPieces/35",
      "2.6 Understanding the ‘Knight’": "/modules/level1/introductionToPieces/36",
      "2.7 Understanding the ‘Pawn’": "/modules/level1/introductionToPieces/37",
      "2.8 Understanding the ‘Queen’": "/modules/level1/introductionToPieces/38",
      "3.1 Light Side": "/modules/level1/ArrangnmentOfPieces/41",
      "3.2 Dark Side": "/modules/level1/ArrangnmentOfPieces/42",
      "4.1 Castling": "/modules/level1/specialMoves/51",
      "4.2 Promotion": "/modules/level1/specialMoves/52",
      "4.3 En-passant": "/modules/level1/specialMoves/53",
      "5.1 Checkmate": "/modules/level1/winningInChess/61",
      "5.2 Checks": "/modules/level1/winningInChess/62",
      "5.3 Stalemate": "/modules/level1/winningInChess/63",
      "5.4 Attack & Defense": "/modules/level1/winningInChess/64",
      "5.5 Capture": "/modules/level1/winningInChess/65",
      "5.6 Draw": "/modules/level1/winningInChess/66",
      "6.1 Fair Trade": "/modules/level1/understandingPieceExchanges/71",
      "6.2 Exchange Up": "/modules/level1/understandingPieceExchanges/72",
      "6.3 Exchange Down": "/modules/level1/understandingPieceExchanges/73",
      "6.4 Material Up": "/modules/level1/understandingPieceExchanges/74",
      "6.5 Material Down": "/modules/level1/understandingPieceExchanges/75",
      "7.1 Opening": "/modules/level1/stagesOfTheGame/81",
      "7.2 Middlegame": "/modules/level1/stagesOfTheGame/82",
      "7.3 Endgame": "/modules/level1/stagesOfTheGame/83",
      "8 Notation": "/modules/level1/notation/91",
      "9 Chess Game": "/modules/level1/chessGame/101",
    
    };
    return currentPath === submodulePaths[submoduleTitle];
  };

  return (
    <div className={`course-content1 ${isSidebarMinimized ? "minimized" : ""}`}>
      <div className="header1">
        {!isSidebarMinimized && (
          <button className="go-back-button1" onClick={handleGoBack}>
            &lt;
          </button>
        )}
        <button className="toggle-button1" onClick={toggleSidebar}>
          {isSidebarMinimized ? "☰" : "☰"}
        </button>
      </div>
      {!isSidebarMinimized && (
        <div className="module1">
          <div className="module-header1">
            <span>Pawn Level</span>
            <span className="progress">
              <span className="topics-count">{topics.length} Topics</span>
            </span>
          </div>
          <div className="topics1">
            {topics.map((topic, index) => (
              <div
                className={`topic1 ${topic.completed ? "completed" : ""}`}
                key={index}
              >
                <div>
                  <span className="title">{topic.title}</span>
                </div>
                <div className="submodules1">
                  {topic.submodules.map((submodule, subIndex) => (
                    <div
                      className={`submodule1 ${submodule.completed ? "completed" : ""} ${isActive(submodule.title) ? "active" : ""}`}
                      key={subIndex}
                      onClick={() => handleSubmoduleClick(submodule.title)}
                    >
                      <span className={`icon ${submodule.completed ? "check" : ""}`}></span>
                      <span className="title">{submodule.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showAlert && (
        <div className="alert-popup1">
    <div className="alert-content1">
      <h2>Module Access Restricted</h2>
      <p>Please Complete previous modules to unlock.</p>
      <button className="close-button1" onClick={closeAlert}>Got It</button>
    </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar1;