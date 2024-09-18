'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import withAuth from '../withAuth';
import './Afterschool.scss';
import axios from 'axios';

interface CoursePaths {
  [key: string]: string;
}

const coursePaths: CoursePaths = {
  'Basic Checkmates - 2': '/basic-checkmates-2/modules/m1',
  'Basics of Chess': '/modules/m1',
  'Good Bishop Bad Bishop': '/good-bishop-bad-bishop/modules/m1',
  'Basic Checkmates': '/basic-checkmates/modules/m1',
  'Basic Checkmates - 3': '/basic-checkmates-2/modules/m1',
  'Basics of Chess 1': '/modules/m1?afterschool=true',
  'Basic Checkmates - 4': '/basic-checkmates-2/modules/m1',
  'Basics of Chess 2': '/modules/m1?afterschool=true',
  'Good Bishop Bad Bishop 1': '/good-bishop-bad-bishop/modules/m1'
};

const courseImages: CoursePaths = {
  'Basic Checkmates - 2': '/images/1.png',
  'Basics of Chess': '/images/2.png',
  'Good Bishop Bad Bishop': '/images/3.png',
  'Basic Checkmates': '/images/4.png',
  'Basic Checkmates - 3': '/images/5.png',
  'Basics of Chess 1': '/images/6.png',
  'Basic Checkmates - 4': '/images/7.png',
  'Basics of Chess 2': '/images/8.png',
  'Good Bishop Bad Bishop 1': '/images/9.png'
};

const courseStyles: CoursePaths = {
  'Basic Checkmates - 2': 'recently-used',
  'Basics of Chess': 'shapes',
  'Good Bishop Bad Bishop': 'graphics',
  'Basic Checkmates': 'stickers'
};

const MyAccount = () => {
  const router = useRouter();
  const [courseStatuses, setCourseStatuses] = useState<CoursePaths>({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetailsString = localStorage.getItem('userDetails');
      const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;

      if (storedUserDetails && storedUserDetails.email) {
        try {
          const response = await axios.get('http://127.0.0.1:80/getinschooldetails', {
            params: { email: storedUserDetails.email }
          });

          if (response.data.success) {
            const registeredCourses = response.data.data.registered_inschool_courses;
            const statuses = registeredCourses.reduce((acc: CoursePaths, course: { course_title: string, status: string }) => {
              acc[course.course_title] = course.status;
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
        const userDetailsString = localStorage.getItem('userDetails');
        const storedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  
        if (storedUserDetails && storedUserDetails.email) {
          // Call API to update status to "In Progress"
          const response = await axios.post('http://127.0.0.1:80/update_registered_courses_inschool', {
            email: storedUserDetails.email,
            course_title: courseTitle,
            status: 'In Progress',
          });
  
          if (response.data.success) {
            console.log('Course status updated successfully');
            
            // Update local status
            setCourseStatuses(prev => ({
              ...prev,
              [courseTitle]: 'In Progress',
            }));
  
            // Navigate to the course path
            router.push(path);  // Always navigate regardless of status
          } else {
            console.error('Failed to update course status:', response.data.message);
          }
        }
      } catch (error) {
        console.error('Error updating course status:', error);
      }
    } else {
      console.error('Path not found for course:', courseTitle);
    }
  };
  

  return (
    <div className="account-page">
      <header className="account-header">
        <h1>Knight Learning Path</h1>
      </header>

      <section className="courses-section">
        {Object.entries(coursePaths).map(([course, path], index) => (
          <div key={index} className={`course-card ${courseStyles[course]}`}>
            <div className="course-image-container">
              <Image
                src={courseImages[course]}
                alt={course}
                layout="fill"
                objectFit="contain"
                className="course-image"
              />
              <div className="image-overlay">
              <button
                className={`status-button ${courseStatuses[course]?.replace(' ', '-') || 'Not-Started'}`}
                onClick={() => handleViewProgress(course)}
              >
                {courseStatuses[course] === 'In Progress' ? 'In Progress' : courseStatuses[course] === 'Completed' ? 'Completed' : 'Not Started'}
              </button>


              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default withAuth(MyAccount);
