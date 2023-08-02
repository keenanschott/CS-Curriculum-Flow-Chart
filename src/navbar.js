import React, { useState, useEffect, useCallback } from 'react';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import './nav.css';
import axios from 'axios'; // Import Axios to make API calls

const Navbar = ({ onDropdownChange, completionStatus }) => {
  const [selectedYear, setSelectedYear] = React.useState('2022-23'); // Set default year
  const [selectedTrack, setSelectedTrack] = React.useState('Computer Science'); // Set default value 

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const backendURL = 'http://localhost:3001'; // Update this with the correct backend URL
  const apiClient = axios.create({
    baseURL: backendURL,
  });

  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupMessage, setSignupMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status

  const handleSignupSubmit = async () => {
    try {
      const response = await apiClient.post('/api/signup', {
        username: signupUsername,
        password: signupPassword,
      });

      if (response.status === 200) {
        setSignupMessage('Sign up successful');
        setIsAuthenticated(true); // Set isAuthenticated to true after successful sign up
        setShowSignupModal(false); // Close the signup modal
        // You can perform any actions after successful sign up here
      }
    } catch (error) {
      setSignupMessage('Sign up failed');
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  const updateUserStatus = useCallback(async () => {
    try {
      if (isAuthenticated) {
        await apiClient.post('/api/updateUserStatus', {
          completionStatus,
          username,
          signupUsername,
        });
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }, [completionStatus]);
  
  useEffect(() => {
    updateUserStatus();
  }, [completionStatus]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const handleShowSignupModal = () => {
    setShowLoginModal(false); // Close the login modal
    setShowSignupModal(true); // Show the sign-up modal
  };

  const handleLoginSubmit = async () => {
    try {
      const response = await apiClient.post('/api/login', {
        username,
        password,
      });

      if (response.status === 200) {
        setLoginMessage('Login successful');
        setIsAuthenticated(true); // Set isAuthenticated to true after successful login
        setShowLoginModal(false); // Close the login modal
        // You can redirect or perform any actions after successful login here
      }
    } catch (error) {
      setLoginMessage('Login failed');
    }
  };

  const handleLogout = () => {
    // Perform any actions you want to perform during logout here

    setUsername('');
    setPassword('');
    setSignupUsername('');
    setSignupPassword('');
    setIsAuthenticated(false); // Set isAuthenticated to false to log out the user
  };

  const [trackOptions, setTrackOptions] = React.useState([
    'Computer Science',
    'CS + Business',
    'CS + Computer Engineering',
    'CS + Data Science',
    'CS + Robotics & Intelligent Systems',
    'CS + Space',
    'CS + Research Honors',
  ]); 

  const handleYearChange = (year) => {
    setSelectedYear(year);
    if (year === '2022-23') {
      setTrackOptions([
        'Computer Science',
        'CS + Business',
        'CS + Computer Engineering',
        'CS + Data Science',
        'CS + Robotics & Intelligent Systems',
        'CS + Space',
        'CS + Research Honors',
      ]);
    } else if (year === '2021-22') {
      setTrackOptions([
        'Computer Science',
        'CS + Business',
        'CS + Computer Engineering',
        'CS + Data Science',
        'CS + Robotics & Intelligent Systems',
        'CS + Space',
        'CS + Research Honors',
      ]);
    } else if (year === '2020-21') {
      setTrackOptions([
        'Computer Science',
        'CS + Business',
        'CS + Computer Engineering',
        'CS + Data Science',
        'CS + Robotics & Intelligent Systems',
      ]);
    } else if (year === '2019-20') {
      setTrackOptions([
        'Computer Science',
        'CS + Business',
        'CS + Computer Engineering',
        'CS + Data Science',
        'CS + Robotics & Intelligent Systems',
      ]);
    } else if (year === '2018-19') {
      setTrackOptions([
        'Computer Science',
        'CS + Business',
        'CS + Computer Engineering',
        'CS + Data Science',
        'CS + Robotics & Intelligent Systems',
      ]);
    }
    setSelectedTrack('Track'); 
  };

  const handleTrackChange = (track) => {
    const selectedOption = {
      year: selectedYear,
      track: track,
    };
    setSelectedTrack(track);
    onDropdownChange(selectedOption);
  };

  return (
    <nav className="navbar">
      <span className="navbar-brand">CS Curriculum Flow Chart</span>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Dropdown style={{ marginRight: '10px' }}>
        <Dropdown.Toggle variant="secondary" id="yearDropdown">
          {selectedYear}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item className={selectedYear === '2022-23' ? 'selected' : ''} onClick={() => handleYearChange('2022-23')}>2022-23</Dropdown.Item>
          <Dropdown.Item className={selectedYear === '2021-22' ? 'selected' : ''} onClick={() => handleYearChange('2021-22')}>2021-22</Dropdown.Item>
          <Dropdown.Item className={selectedYear === '2020-21' ? 'selected' : ''} onClick={() => handleYearChange('2020-21')}>2020-21</Dropdown.Item>
          <Dropdown.Item className={selectedYear === '2019-20' ? 'selected' : ''} onClick={() => handleYearChange('2019-20')}>2019-20</Dropdown.Item>
          <Dropdown.Item className={selectedYear === '2018-19' ? 'selected' : ''} onClick={() => handleYearChange('2018-19')}>2018-19</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="trackDropdown">
          {selectedTrack}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {trackOptions.map((track) => (
            <Dropdown.Item key={track} onClick={() => handleTrackChange(track)}
            className={selectedTrack === track ? 'selected' : ''}>
              {track}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {isAuthenticated ? (
          // If authenticated, show the "Save" button
          <>
          <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        </>
        ) : (
          // If not authenticated, show the "Login" and "Sign Up" buttons
          <>
            <button className="login-button" onClick={() => setShowLoginModal(true)}>
              Login
            </button>
          </>
        )}
      </div>

            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {loginMessage && <p>{loginMessage}</p>}
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLoginSubmit}>
            Login
          </Button>
          <Button variant="secondary" onClick={handleShowSignupModal}>
              Sign Up
            </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={showSignupModal} onHide={() => setShowSignupModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {signupMessage && <p>{signupMessage}</p>}
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSignupModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSignupSubmit}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default Navbar;