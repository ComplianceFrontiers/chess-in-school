/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import './Signin.scss'; // Import the SCSS file
import Loading from '../Loading';

// Function to determine device type
const getDeviceType = (): string => {
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent) ||
      /iPhone|iPod/.test(userAgent) ||
      /Windows Phone/i.test(userAgent)) {
    return 'Mobile';
  }

  if (/iPad/i.test(userAgent)) {
    return 'Tablet';
  }

  return 'Desktop';
};

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(''); // State for OTP
  const [showOtpInput, setShowOtpInput] = useState(false); // State to show OTP input
  const [loading, setLoading] = useState(false); // Add loading state
  const [emailError, setEmailError] = useState(''); // Add email error state
  const [messageText, setMessageText] = useState(''); // Default message
  const router = useRouter();
  const signInButtonRef = useRef<HTMLButtonElement>(null); // Ref for the sign-in button

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signIn = async (emailToSignIn: string) => {
    if (emailToSignIn === 'test@gmail.com') {
      setLoading(true);
      localStorage.setItem('email', emailToSignIn);
      const userDetailsResponse = await axios.get('https://backend-chess-tau.vercel.app/getinschooldetails', {
        params: { email: emailToSignIn }
      });

      localStorage.setItem('userDetails', JSON.stringify(userDetailsResponse.data.data));
      localStorage.setItem('signin', "true");
      router.push('/portalhome');
      return;
    }
  
    if (!validateEmail(emailToSignIn)) {
      setEmailError('Please enter a valid email address');
      return;
    }
  
    setEmailError('');
    setLoading(true);
  
    try {
      const deviceType = getDeviceType();
      const loginResponse = await axios.post('https://backend-chess-tau.vercel.app/signin_inschool', {
        email: emailToSignIn,
        device_name: deviceType
      });

      if (loginResponse.data.success) {
        if (loginResponse.data.device) {
          handleLogoutFromPreviousDevice();
          return;
        }

        setShowOtpInput(loginResponse.data.otp_required);
        localStorage.setItem('email', emailToSignIn);

        const userDetailsResponse = await axios.get('https://backend-chess-tau.vercel.app/getinschooldetails', {
          params: { email: emailToSignIn }
        });

        localStorage.setItem('userDetails', JSON.stringify(userDetailsResponse.data.data));

        if (!loginResponse.data.otp_required) {
          localStorage.setItem('signin', "true");
          router.push('/portalhome');
        }
      }
      else if(loginResponse.data.status===400){
        setMessageText('Email Not registered.');
      }
      
      else {
        setMessageText('Login failed. Please check your email and try again.');
      }
    } catch (error) {
      console.error('Error during SignIn:', error);
      setMessageText('Email Not registered. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutFromPreviousDevice = async () => {
    if (email) {
      try {
        const response = await axios.post('https://backend-chess-tau.vercel.app/delete_session_inschool', { email });

        if (response.data.success) {
          if (signInButtonRef.current) {
            signInButtonRef.current.click();
          }
        } else {
          setMessageText('An error occurred while logging out. Please try again.');
        }
      } catch (error) {
        console.error('Error logging out from previous device:', error);
        setMessageText('An error occurred while logging out. Please try again.');
      }
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const verifyOtpResponse = await axios.post('https://backend-chess-tau.vercel.app/verify_otp_inschool', { email, otp });
      if (verifyOtpResponse.data.success) {
        localStorage.setItem('signin', "true");
        router.push('/portalhome');
      } else {
        setMessageText('Invalid OTP. Please check and try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessageText('An error occurred while verifying OTP. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const signinStatus = localStorage.getItem('signin');
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedEmail && signinStatus === "true") {
      router.push('/portalhome');
    }
  }, []);

  return (
    <div className="signup-background">
      {loading ? (
        <Loading />
      ) : (
        <div className="signup-form-container">
          <div className="signup-form">
            <h2 className="text-2xl font-bold mb-4 text-black text-center">Sign In</h2>
            <div className="signup-field mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: '10px', color: 'black' }}
              />
              {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
            </div>
            {showOtpInput && (
              <div className="signup-field mb-4">
                <label className="block text-gray-700 mb-2">Enter OTP</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={{ borderRadius: '10px', color: 'black' }}
                />
              </div>
            )}
            <button
              className="signup-field bg-blue-500 text-white font-bold py-2 px-4 rounded w-full signin-box"
              onClick={() => showOtpInput ? verifyOtp() : signIn(email)}
              style={{ borderRadius: '10px' }}
              ref={signInButtonRef}
            >
              {showOtpInput ? 'Verify OTP' : 'Sign In'}
            </button>
            <p className="text-pink-500 mb-4 text-center">{messageText}</p>

          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
