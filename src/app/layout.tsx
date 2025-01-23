"use client";
import { Inter } from "next/font/google";
import { usePathname} from "next/navigation";
import Sidebar from "./sidebar";
import AdminHeader from "./admin/admin_header/adminHeader";
import "./globals.css";
import "./si.scss";
import SignIn from "./signin/page";
import { useState, useEffect } from "react";
import Sidebar1 from "./sidebar1"; 
import Sidebar2 from "./sidebar2"; 

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
 
  

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="layout-container">
              
                  {(pathname === "/portalhome" ||
                    pathname === "/imagepuzzle" ||
                    pathname === "/arena/puzzleArena" ||
                    pathname === "/learnclass" ||
                    pathname === "/arena/startArena" ||
                    pathname === "/puzzles" ||
                    pathname === "/levels/level1" ||
                    pathname === "/levels/level2" ||
                    pathname === "/levels/level3" ||
                    pathname === "/levels/level4" ||
                    pathname === "/chessPuzzle" ||
                    pathname === "/ChessPuzzle" ||
                    pathname === "/levels/level2test" ||
                    pathname === "/levels/level3test" ||
                    pathname === "/levels/level4test" ||
                    pathname === "/tournaments" ||
                    pathname === "/tournamentRegistration" ||
                    pathname === "/arena/insidepuzzlearena" ||
                    pathname === "/learning" ||
                    pathname === "/Afterschool1" ||
                    pathname === "/Afterschool2" ||
                    pathname === "/coaching") && (
                      <Sidebar />                    )}

                  {(pathname === "/modules/level1/introduction/11" ||
                    pathname === "/modules/level1/theChessboard/21" ||
                    pathname === "/modules/level1/theChessboard/22" ||
                    pathname === "/modules/level1/theChessboard/23" ||
                    pathname === "/modules/level1/theChessboard/24" ||
                    pathname === "/modules/level1/theChessboard/25" ||
                    pathname === "/modules/level1/theChessboard/26" ||
                    pathname === "/modules/level1/introductionToPieces/31" ||
                    pathname === "/modules/level1/introductionToPieces/32" ||
                    pathname === "/modules/level1/introductionToPieces/33" ||
                    pathname === "/modules/level1/introductionToPieces/34" ||
                    pathname === "/modules/level1/introductionToPieces/35" ||
                    pathname === "/modules/level1/introductionToPieces/36" ||
                    pathname === "/modules/level1/introductionToPieces/37" ||
                    pathname === "/modules/level1/introductionToPieces/38" ||
                    pathname === "/modules/level1/ArrangnmentOfPieces/41" ||
                    pathname === "/modules/level1/ArrangnmentOfPieces/42" ||
                    pathname === "/modules/level1/specialMoves/51" ||
                    pathname === "/modules/level1/specialMoves/52" ||
                    pathname === "/modules/level1/specialMoves/53" ||
                    pathname === "/modules/level1/winningInChess/61" ||
                    pathname === "/modules/level1/winningInChess/62" ||
                    pathname === "/modules/level1/winningInChess/63" ||
                    pathname === "/modules/level1/winningInChess/64" ||
                    pathname === "/modules/level1/winningInChess/65" ||
                    pathname === "/modules/level1/winningInChess/66" ||
                    pathname === "/modules/level1/understandingPieceExchanges/71" ||
                    pathname === "/modules/level1/understandingPieceExchanges/72" ||
                    pathname === "/modules/level1/understandingPieceExchanges/73" ||
                    pathname === "/modules/level1/understandingPieceExchanges/74" ||
                    pathname === "/modules/level1/understandingPieceExchanges/75" ||
                    pathname === "/modules/level1/stagesOfTheGame/81" ||
                    pathname === "/modules/level1/stagesOfTheGame/82" ||
                    pathname === "/modules/level1/stagesOfTheGame/83" ||
                    pathname === "/modules/level1/notation/91" ||
                    pathname === "/modules/level1/chessGame/101") && (
                      <Sidebar1/>
                  )}
                  {/* level2 knight */}
                  {(pathname === "/modules/level2/chessOpening/11" ||
                    pathname === "/modules/level2/chessOpening/12" ||
                    pathname === "/modules/level2/chessOpening/13" ||
                    pathname === "/modules/level2/tactics1/21" ||
                    pathname === "/modules/level2/tactics1/22" ||
                    pathname === "/modules/level2/tactics1/23" ||
                    pathname === "/modules/level2/tactics1/24" ||
                    pathname === "/modules/level2/tactics1/25" ||
                    pathname === "/modules/level2/tactics1/26" ||
                    pathname === "/modules/level2/tactics2/31" ||
                    pathname === "/modules/level2/tactics2/32" ||
                    pathname === "/modules/level2/tactics2/33" ||
                    pathname === "/modules/level2/tactics2/34" ||
                    pathname === "/modules/level2/tactics2/35" ||
                    pathname === "/modules/level2/tactics2/36" ||
                    pathname === "/modules/level2/tactics2/37" ||
                    pathname === "/modules/level2/positionalCalculations/41" ||
                    pathname === "/modules/level2/positionalCalculations/42" ||
                    pathname === "/modules/level2/positionalCalculations/43" ||
                    pathname === "/modules/level2/positionalCalculations/44" ||
                    pathname === "/modules/level2/strategyAndPlanning/51" ||
                    pathname === "/modules/level2/strategyAndPlanning/52" ||
                    pathname === "/modules/level2/strategyAndPlanning/53" ||
                    pathname === "/modules/level2/checkAndCheckmates/61" ||
                    pathname === "/modules/level2/checkAndCheckmates/62" ||
                    pathname === "/modules/level2/checkmatePatterns/71" ||
                    pathname === "/modules/level2/checkmatePatterns/72" ||
                    pathname === "/modules/level2/checkmatePatterns/73" ||
                    pathname === "/modules/level2/checkmatePatterns/74" ||
                    pathname === "/modules/level2/checkmatePatterns/75" ||
                    pathname === "/modules/level2/checkmatePatterns/76" ||
                    pathname === "/modules/level2/checkmatePatterns/77" ||
                    pathname === "/modules/level2/checkmatePatterns/78" ||
                    pathname === "/modules/level2/gameAnalysis/81" ||
                    pathname === "/modules/level2/chessStudyPlan/91") && (
                      <Sidebar2/>
                  )}

<div className="content-container">
                    {(pathname === "/admin" ||
                      pathname === "/admin/admin_upcoming_activities" ||
                      pathname === "/admin/admin_tournaments" ||
                      pathname === "/admin/admin_image_demo" ||
                      pathname === "/admin/StudentDetails") && <AdminHeader />}

  

  {/* Display SignIn or children based on the pathname */}
  {pathname === "/" ? (
    <SignIn />
  ) : (
    <>{children}</>
  )}
</div>

        
        </div>
      </body>
    </html>
  );
}
