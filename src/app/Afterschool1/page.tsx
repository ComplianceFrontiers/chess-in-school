'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import withAuth from '../withAuth';
import './Afterschool1.scss';
import axios from 'axios';
import Loading from '../Loading';

interface CoursePaths {
  [key: string]: string;
}

const coursePaths: CoursePaths = {
  'theChessboard': '/modules/level1/introduction/11',
  'introductionToPieces': '/modules/level1/introductionToPieces/31',
  'ArrangnmentOfPieces': '/modules/level1/ArrangnmentOfPieces/41',
  'specialMoves': '/modules/level1/specialMoves/51',
  'winningInChess': '/modules/level1/winningInChess/61',
  'understandingPieceExchanges': '/modules/level1/understandingPieceExchanges/71',
  'stagesOfTheGame': '/modules/level1/stagesOfTheGame/81',
  'notation': '/modules/level1/notation/91',
  'chessGame': '/modules/level1/chessGame/101'

};

const courseImages: CoursePaths = {
  'theChessboard': '/images/level2/1.png',
  'introductionToPieces': '/images/level2/12.png',
  'ArrangnmentOfPieces': '/images/level2/13.png',
  'specialMoves': '/images/level2/14.png',
  'winningInChess': '/images/level2/1.png',
  'understandingPieceExchanges': '/images/level2/12.png',
  'stagesOfTheGame': '/images/level2/13.png',
  'notation': '/images/level2/14.png',
  'chessGame': '/images/level2/1.png'
};

interface CourseStatus {
  status: string;
  completed: number;
}

const MyAccount = () => {
  const router = useRouter();
  const [courseStatuses, setCourseStatuses] = useState<{ [key: string]: CourseStatus }>({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetailsString = localStorage.getItem('userDetails');
      const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;

      if (storedUserDetails && storedUserDetails.email) {
        try {
          const response = await axios.get('https://backend-chess-tau.vercel.app/getinschooldetails', {
            params: { email: storedUserDetails.email }
          });

          if (response.data.success) {
            const registeredCourses = response.data.data.registered_inschool_courses;
            const statuses = registeredCourses.reduce((acc: { [key: string]: CourseStatus }, course: { course_title: string, status: string, completed: number }) => {
              acc[course.course_title] = { status: course.status, completed: course.completed };
              return acc;
            }, {});

            setCourseStatuses(statuses);
          } else {
            console.error('Failed to fetch user details:', response.data.message);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };
    fetchUserDetails();
  }, []);

  const handleViewProgress = async (courseTitle: string) => {
    const path = coursePaths[courseTitle];
    if (path) {
      try {
        setLoading(true);
        const userDetailsString = localStorage.getItem('userDetails');
        const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;

        if (storedUserDetails && storedUserDetails.email) {
          if (courseStatuses[courseTitle]?.status !== 'Completed') {
            const response = await axios.post('https://backend-chess-tau.vercel.app/update_registered_courses_inschool', {
              email: storedUserDetails.email,
              course_title: courseTitle,
              status: 'In Progress',
            });

            if (response.data.success) {
              setCourseStatuses(prev => ({
                ...prev,
                [courseTitle]: { ...prev[courseTitle], status: 'In Progress' }
              }));
            } else {
              console.error('Failed to update course status:', response.data.message);
            }
          }
          router.push(path);
        }
      } catch (error) {
        console.error('Error updating course status:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Path not found for course:', courseTitle);
    }
  };

  return (
    <div className="account-page">
      {loading && <Loading />}
      <header className="account-header">
        <h1>Pawn Learning Path</h1>
      </header>
      <section className="courses-section">
        {Object.entries(coursePaths).map(([course, path], index) => {
          const isPreviousCourseCompleted = index === 0 || courseStatuses[Object.keys(coursePaths)[index - 1]]?.completed === 100;
          const courseStatus = courseStatuses[course];
          const isCurrentCourseClickable = (courseStatus?.status === 'In Progress' || courseStatus?.status === 'Completed') || isPreviousCourseCompleted;
          return (
            <div key={index}>
              <div className={`course-image-container ${!isCurrentCourseClickable ? 'disabled' : ''}`} onClick={isCurrentCourseClickable ? () => handleViewProgress(course) : undefined}>
                <Image src={courseImages[course]} alt={course} layout="fill" objectFit="contain" className="course-image" />
                <div className="image-overlay">
                  <div className="status-container">
                    <button className="completion-button">
                      {courseStatus?.completed || 0}% Complete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
      {showModal && (
        <div className={`modal ${showModal ? 'active' : ''}`}>
          <div className="modal-content">
            <div className="modal-header">Access Denied</div>
            <div className="modal-body">
              <p>Please Complete previous modules to unlock.</p>
            </div>
            <button className="modal-close" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(MyAccount);
