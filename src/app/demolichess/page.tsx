'use client';

import React, { useEffect, useState } from 'react';

const Lichess = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile view if width < 768px
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openLichessStudy = (url: string) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
  
    let popupWidth, popupHeight, left, top;
  
    if (isMobile) {
      // Mobile popup size
      popupWidth = screenWidth * 0.9;
      popupHeight = screenHeight * 0.8;
      left = (screenWidth - popupWidth) / 2;
      top = (screenHeight - popupHeight) / 4;
    } else {
      // Laptop popup size
      popupWidth = screenWidth / 2;
      popupHeight = screenHeight / 1.2;
      left = screenWidth - popupWidth; // Position the popup on the right side
      top = screenHeight / 10; // Adjust the top position as needed
    }
  
    const newWindow = window.open(
      url,
      '_blank',
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes`
    );
  
    if (!newWindow) {
      alert("Popup was blocked! Please allow popups for this site.");
      return;
    }
  
    // Inject CSS into the new window to add a thick border
    newWindow.onload = () => {
      const style = document.createElement('style');
      style.textContent = `
        body {
          border: 10px solid #000; /* Thick black border */
          margin: 0; /* Remove default margin */
          height: 100vh; /* Full height */
          box-sizing: border-box; /* Include border in height calculation */
        }
      `;
      newWindow.document.head.appendChild(style);
    };
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        height: '100vh',
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: isMobile ? '100%' : '20%',
          minWidth: '200px',
          height: '100%',
          backgroundColor: 'black',
          opacity: 0.9,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        {['Lesson 1', 'Lesson 2', 'Lesson 3'].map((lesson, index) => (
          <button
            key={index}
            onClick={() => openLichessStudy('https://lichess.org/study/GzqzswtI')}
            style={{
              marginBottom: '10px',
              padding: '12px',
              fontSize: '14px',
              backgroundColor: index === 0 ? '#f39c12' : index === 1 ? '#3498db' : '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
              maxWidth: '200px',
              textAlign: 'center'
            }}
          >
            {lesson}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center'
        }}
      >
        <h2 style={{ fontSize: '18px' }}>Welcome to Chess Champs Lessons</h2>
      </div>
    </div>
  );
};

export default Lichess;
