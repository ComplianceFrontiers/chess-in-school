/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./side2.scss";
import { useRouter,usePathname } from "next/navigation";
// Define the topics structure (unchanged)
const topics = [
    {
      title: "1. Chess Openings",
      completed: true,
      submodules: [
        { title: "1.1 Opening Principles", completed: true },
        { title: "1.2 White Opening", completed: true },
        { title: "1.3 Black Opening", completed: true }
      ]
    },
    {
      title: "2. Tactics [1]",
      completed: true,
      submodules: [
        { title: "2.1 Pins & Skewers", completed: true },
        { title: "2.2 Forks & Double Attacks", completed: true },
        { title: "2.3 Removal of Defender", completed: true }, //Skewers
        { title: "2.4 Deflection", completed: true },
        { title: "2.5 Decoy", completed: true }
      ]
    },
    {
      title: "3. Tactics [2]",
      completed: true,
      submodules: [
        { title: "3.1 Overloading", completed: true },
        { title: "3.2 X-Ray attack", completed: true },
        { title: "3.3 Zwischenzug (Intermezzo)", completed: true },
        { title: "3.4 Desperado", completed: true },
        { title: "3.5 Interference", completed: true },
        { title: "3.6 Back Rank Tactics", completed: true }
      ]
    },
    {
      title: "4. Positional Calculations",
      completed: true,
      submodules: [
        { title: "4.1 Middlegame: Art of Calculation", completed: true },
        { title: "4.2 Pawn Structures", completed: true },
        { title: "4.3 Piece Activity", completed: true },
        { title: "4.4 Manoeuvring", completed: true }
      ]
    },
    {
      title: "5. Strategy & Planning",
      completed: true,
      submodules: [
        { title: "5.1 Pawn breaks", completed: true },
        { title: "5.2 Weak squares", completed: true },
        { title: "5.3 Piece coordination", completed: true }
      ]
    },
    {
      title: "6. Checks & Checkmates",
      completed: true,
      submodules: [
        { title: "6.1 Mate in 1", completed: true },
        { title: "6.2 Mate in 2", completed: true }
      ]
    },
    {
      title: "7. Chackmate Patterns",
      completed: true,
      submodules: [
        { title: "7.1 Anastasia’s Mate", completed: true },
        { title: "7.2 Back Rank Mate", completed: true },
        { title: "7.3 Blackburne’s Mate", completed: true },
        { title: "7.4 Box Mate (Rook Mate)", completed: true },
        { title: "7.5 Fool's Mate", completed: true },
        { title: "7.6 Morphy's Mate", completed: true },
        { title: "7.7 Scholar's Mate", completed: true },
        { title: "7.8 Smothered Mate", completed: true }
      ]
    },
    {
      title: "8. Game Analysis",
      completed: true,
      submodules: [
        { title: "8.1 Game Analysis", completed: true }
      ]
    },
    {
      title: "9. Chess Study Plan",
      completed: true,
      submodules: [
        { title: "9.1 Chess Study Plan", completed: true }
      ]
    }
  ];

const Sidebar2: React.FC = () => {
  const router = useRouter();
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [userCourses, setUserCourses] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false); // Add state for alert
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
  const handleGoBack = () => router.push('/Afterschool2');
  const handleSubmoduleClick = (title: string) => {
    toggleSidebar()
    const submodulePaths: Record<string, string> = {
        // Chess Openings
        "1.1 Opening Principles": "/modules/level2/chessOpening/11",
        "1.2 White Opening": "/modules/level2/chessOpening/12",
        "1.3 Black Opening": "/modules/level2/chessOpening/13",
        
        // Tactics [1]
        "2.1 Pins & Skewers": "/modules/level2/tactics1/21",
        "2.2 Forks & Double Attacks": "/modules/level2/tactics1/22",
        "2.3 Removal of Defender": "/modules/level2/tactics1/23",
        "2.4 Deflection": "/modules/level2/tactics1/24",
        "2.5 Decoy": "/modules/level2/tactics1/25",
    
        // Tactics [2]
        "3.1 Overloading": "/modules/level2/tactics2/31",
        "3.2 X-Ray attack": "/modules/level2/tactics2/32",
        "3.3 Zwischenzug (Intermezzo)": "/modules/level2/tactics2/33",
        "3.4 Desperado": "/modules/level2/tactics2/34",
        "3.5 Interference": "/modules/level2/tactics2/35",
        "3.6 Back Rank Tactics": "/modules/level2/tactics2/36",
    
        // Positional Calculations
        "4.1 Middlegame: Art of Calculation": "/modules/level2/positionalCalculations/41",
        "4.2 Pawn Structures": "/modules/level2/positionalCalculations/42",
        "4.3 Piece Activity": "/modules/level2/positionalCalculations/43",
        "4.4 Manoeuvring": "/modules/level2/positionalCalculations/44",
    
        // Strategy & Planning
        "5.1 Pawn breaks": "/modules/level2/strategyAndPlanning/51",
        "5.2 Weak squares": "/modules/level2/strategyAndPlanning/52",
        "5.3 Piece coordination": "/modules/level2/strategyAndPlanning/53",
    
        // Checks & Checkmates
        "6.1 Mate in 1": "/modules/level2/checkAndCheckmates/61",
        "6.2 Mate in 2": "/modules/level2/checkAndCheckmates/62",
    
        // Checkmate Patterns
        "7.1 Anastasia’s Mate": "/modules/level2/checkmatePatterns/71",
        "7.2 Back Rank Mate": "/modules/level2/checkmatePatterns/72",
        "7.3 Blackburne’s Mate": "/modules/level2/checkmatePatterns/73",
        "7.4 Box Mate (Rook Mate)": "/modules/level2/checkmatePatterns/74",
        "7.5 Fool's Mate": "/modules/level2/checkmatePatterns/75",
        "7.6 Morphy's Mate": "/modules/level2/checkmatePatterns/76",
        "7.7 Scholar's Mate": "/modules/level2/checkmatePatterns/77",
        "7.8 Smothered Mate": "/modules/level2/checkmatePatterns/78",
    
        // Game Analysis
        "8.1 Game Analysis": "/modules/level2/gameAnalysis/81",
    
        // Chess Study Plan
        "9.1 Chess Study Plan": "/modules/level2/chessStudyPlan/91"
      };
    const path = submodulePaths[title];
    if (path && isAccessible(title)) {
      setIsSidebarMinimized(true);
    localStorage.setItem("sidebarMinimized", "true"); // Store state in localStorage
      router.push(path);
    } else {
      setShowAlert(true);
    }
  };
      const closeAlert = () => setShowAlert(false); // Close the alert popup
  const isAccessible = (title: string) => {
    if (title.startsWith("1.")) {
      return userCourses.includes("chessopening");
    } else if (title.startsWith("2.")) {
      return userCourses.includes("tactics1");
    } else if (title.startsWith("3.")) {
      return userCourses.includes("tactics2");
    } else if (title.startsWith("4.")) {
      return userCourses.includes("positionalcalculations");
    } else if (title.startsWith("5.")) {
      return userCourses.includes("strategyandplanning");
    } else if (title.startsWith("6.")) {
      return userCourses.includes("checkandcheckmates");
    } else if (title.startsWith("7.")) {
      return userCourses.includes("checkmatepatterns");
    } else if (title.startsWith("8.")) {
      return userCourses.includes("gameanalysis");
    } else if (title.startsWith("9.")) {
      return userCourses.includes("chessStudyplan");
    }
    else {return false}
  };
  const isActive = (submoduleTitle: string) => {
    const submodulePaths: Record<string, string> = {
      "1.1 Opening Principles": "/modules/level2/chessOpening/11",
      "1.2 White Opening": "/modules/level2/chessOpening/12",
      "1.3 Black Opening": "/modules/level2/chessOpening/13",
      
      // Tactics [1]
      "2.1 Pins & Skewers": "/modules/level2/tactics1/21",
      "2.2 Forks & Double Attacks": "/modules/level2/tactics1/22",
      "2.3 Removal of Defender": "/modules/level2/tactics1/23",
      "2.4 Deflection": "/modules/level2/tactics1/24",
      "2.5 Decoy": "/modules/level2/tactics1/25",
  
      // Tactics [2]
      "3.1 Overloading": "/modules/level2/tactics2/31",
      "3.2 X-Ray attack": "/modules/level2/tactics2/32",
      "3.3 Zwischenzug (Intermezzo)": "/modules/level2/tactics2/33",
      "3.4 Desperado": "/modules/level2/tactics2/34",
      "3.5 Interference": "/modules/level2/tactics2/35",
      "3.6 Back Rank Tactics": "/modules/level2/tactics2/36",
  
      // Positional Calculations
      "4.1 Middlegame: Art of Calculation": "/modules/level2/positionalCalculations/41",
      "4.2 Pawn Structures": "/modules/level2/positionalCalculations/42",
      "4.3 Piece Activity": "/modules/level2/positionalCalculations/43",
      "4.4 Manoeuvring": "/modules/level2/positionalCalculations/44",
  
      // Strategy & Planning
      "5.1 Pawn breaks": "/modules/level2/strategyAndPlanning/51",
      "5.2 Weak squares": "/modules/level2/strategyAndPlanning/52",
      "5.3 Piece coordination": "/modules/level2/strategyAndPlanning/53",
  
      // Checks & Checkmates
      "6.1 Mate in 1": "/modules/level2/checkAndCheckmates/61",
      "6.2 Mate in 2": "/modules/level2/checkAndCheckmates/62",
  
      // Checkmate Patterns
      "7.1 Anastasia’s Mate": "/modules/level2/checkmatePatterns/71",
      "7.2 Back Rank Mate": "/modules/level2/checkmatePatterns/72",
      "7.3 Blackburne’s Mate": "/modules/level2/checkmatePatterns/73",
      "7.4 Box Mate (Rook Mate)": "/modules/level2/checkmatePatterns/74",
      "7.5 Fool's Mate": "/modules/level2/checkmatePatterns/75",
      "7.6 Morphy's Mate": "/modules/level2/checkmatePatterns/76",
      "7.7 Scholar's Mate": "/modules/level2/checkmatePatterns/77",
      "7.8 Smothered Mate": "/modules/level2/checkmatePatterns/78",
  
      // Game Analysis
      "8.1 Game Analysis": "/modules/level2/gameAnalysis/81",
  
      // Chess Study Plan
      "9.1 Chess Study Plan": "/modules/level2/chessStudyPlan/91"
    };
    return currentPath === submodulePaths[submoduleTitle];
  };
  return (
    <div className={`course-content2 ${isSidebarMinimized ? "minimized" : ""}`}>
      <div className="header2">
        {!isSidebarMinimized && (
          <button className="go-back-button2" onClick={handleGoBack}>
            &lt;
          </button>
        )}
        <button className="toggle-button2" onClick={toggleSidebar}>
          {isSidebarMinimized ? "☰" : "☰"}
        </button>
      </div>
      {!isSidebarMinimized && (
        <div className="module2">
          <div className="module-header2">
            <span>Knight level</span>
            <span className="progress">
              <span className="topics-count">{topics.length} Topics</span>
            </span>
          </div>
          <div className="topics2">
            {topics.map((topic, index) => (
              <div
                className={`topic2 ${topic.completed ? "completed" : ""}`}
                key={index}
              >
                <div>
                  <span className="title">{topic.title}</span>
                </div>
                <div className="submodules2">
                  {topic.submodules.map((submodule, subIndex) => (
                    <div
                      className={`submodule2 ${submodule.completed ? "completed" : ""} ${isActive(submodule.title) ? "active" : ""}`}
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
        <div className="alert-popup2">
    <div className="alert-content2">
      <h2>Module Access Restricted</h2>
      <p>Please Complete previous modules to unlock.</p>
      <button className="close-button2" onClick={closeAlert}>Got It</button>
    </div>
        </div>
      )}
    </div>
  );
};
export default Sidebar2;
