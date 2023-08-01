import React, { useState } from 'react';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import './nav.css';
import axios from 'axios'; // Import Axios to make API calls

const Navbar = ({ onDropdownChange }) => {
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

  const handleLoginSubmit = async () => {
    try {
      const response = await apiClient.post('/api/login', {
        username,
        password,
      });

      if (response.status === 200) {
        setLoginMessage('Login successful');
        // You can redirect or perform any actions after successful login here
      }
    } catch (error) {
      setLoginMessage('Login failed');
    }
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
      <button className="login-button" onClick={() => setShowLoginModal(true)}>
          Login
        </button>
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
        </Modal.Footer>
      </Modal>

    </nav>
  );
};

export default Navbar;