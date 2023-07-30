import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './nav.css';

const Navbar = ({ onDropdownChange, onYearChange, onTrackChange }) => {
  const [selectedYear, setSelectedYear] = React.useState('2022-23'); // Set default year
  const [selectedTrack, setSelectedTrack] = React.useState('Computer Science'); // Set default value 
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
    onYearChange(year); // Callback to handle year change in Flowchart
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
    onTrackChange(track); // Callback to handle track change in Flowchart
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
      </div>
    </nav>
  );
};

export default Navbar;