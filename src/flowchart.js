import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import nodesDataOriginal from './tracks/2022-23/Computer_Science.json';
import Navbar from './navbar';
import Footer from './Footer';
import DashedLine from './DashedLine';
import NodeModalContent from './NodeModalContent';

function Flowchart() {
  const columns = 6;
  const rows = 9;
  const footerHeight = 40;
  const navHeight = 60;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [showModal, setShowModal] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [nodesData, setNodesData] = useState([]);
  const [pulsatePreNodeIds, setPrePulsateNodeIds] = useState([]);
  const [pulsateCoNodeIds, setCoPulsateNodeIds] = useState([]);
  const [completionStatus, setCompletionStatus] = useState({});

  const handleYearChange = (year) => {
    setCompletionStatus({}); // Reset the completion status
  };

  const handleTrackChange = (track) => {
    setCompletionStatus({}); // Reset the completion status
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    setNodesData(nodesDataOriginal);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };


  }, []);

  const handleNodeClick = (nodeId) => {
    setSelectedNodeId(nodeId);
    setShowModal(true);
  };

  const handleNodeMouseEnter = (nodeId) => {
    let prePulsateTimeoutId;
    let coPulsateTimeoutId;

    clearTimeout(prePulsateTimeoutId);
    clearTimeout(coPulsateTimeoutId);

    prePulsateTimeoutId = setTimeout(() => {
      setPrePulsateNodeIds(findPreDependentNodes(nodeId));
    }, 50);

    coPulsateTimeoutId = setTimeout(() => {
      setCoPulsateNodeIds(findCoDependentNodes(nodeId));
    }, 50);
  };

  const handleNodeMouseLeave = () => {
    setPrePulsateNodeIds([]);
    setCoPulsateNodeIds([]);
  };

  const findPreDependentNodes = (nodeId) => {
    const node = nodesData.find((node) => node.id === nodeId);
    if (!node) return [];

    const dependentNodesIds = node.pre;
    let dependents = [];
    dependentNodesIds.forEach((dependentNodeId) => {
      dependents.push(dependentNodeId);
      dependents = dependents.concat(findPreDependentNodes(dependentNodeId));
    });

    return dependents;
  };

  const findCoDependentNodes = (nodeId) => {
    const node = nodesData.find((node) => node.id === nodeId);
    if (!node) return [];
    return node.co;
  };

  const handleDropdownChange = (selectedOption) => {
    const { year, track } = selectedOption;
    setNodesData(require(`./tracks/${year}/${track.replace(/\s+/g, '_')}.json`));
  };

  const calculatePosition = (row, column) => {
    const nodeWidth = (screenWidth / columns) - (screenWidth / columns * 0.05);
    const nodeHeight = ((screenHeight - footerHeight - navHeight) / rows) - ((screenHeight - footerHeight - navHeight) / rows * 0.1);
    const x = (column * (screenWidth / columns)) + (screenWidth / columns * 0.025);
    const y = (row * ((screenHeight - footerHeight - navHeight) / rows) + navHeight) + ((screenHeight - footerHeight - navHeight) / rows * 0.05);
    const fontSize = 10 + screenWidth / 200;

    return { x, y, nodeWidth, nodeHeight, fontSize };
  };

  return (


    <div>

      <div style={{ height: '60px', backgroundColor: '#f0f0f0', position: 'relative', top: 0, left: 0, right: 0 }}>
        <Navbar onDropdownChange={handleDropdownChange} onYearChange={handleYearChange} onTrackChange={handleTrackChange} />
      </div>
      <div className="container">
        <div className="row">
          {nodesData.map((node) => {
            const { x, y, nodeWidth, nodeHeight, fontSize } = calculatePosition(node.row, node.column);
            const isPrePulsating = pulsatePreNodeIds.includes(node.id);
            const isCoPulsating = pulsateCoNodeIds.includes(node.id);
            const selectedStatus = completionStatus[node.id] || 'incomplete';
            return (
              <div
                key={node.id}
                className={`col-md-3 mb-4 ${isPrePulsating || isCoPulsating ? 'pulsate' : ''}`}
                style={{
                  position: 'absolute',
                  whiteSpace: 'nowrap',
                  left: x,
                  top: y,
                  width: nodeWidth,
                  height: nodeHeight,
                  border: `2px ${isPrePulsating ? 'solid black' : (isCoPulsating ? 'dashed blue' : 'solid ' + node.color)}`,
                  padding: '5px',
                  borderRadius: '15px',
                  background: selectedStatus === 'complete'
                    ? 'lightgreen'
                    : selectedStatus === 'in-progress'
                      ? 'linear-gradient(to right, lightblue 50%, white 50%)'
                      : 'white',
                  color: 'black',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: fontSize + 'px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  zIndex: -1,
                }}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => handleNodeMouseEnter(node.id)}
                onMouseLeave={handleNodeMouseLeave}
              >
                {node.text}
              </div>
            );
          })}


        </div>


      </div>



      <Modal show={showModal} onHide={() => setShowModal(false)} centered >
        <Modal.Header closeButton>
          <Modal.Title><h5>{selectedNodeId ? nodesData.find((node) => node.id === selectedNodeId).title : ""}</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNodeId && (
            <NodeModalContent
              nodeData={nodesData.find((node) => node.id === selectedNodeId)} selectedStatus={completionStatus[selectedNodeId] || 'incomplete'} onStatusChange={(status) => setCompletionStatus((prevStatus) => ({
                ...prevStatus,
                [selectedNodeId]: status,
              }))}
            />
          )}
        </Modal.Body>
      </Modal>
      <DashedLine distanceFromTop={((2 * ((screenHeight - footerHeight - navHeight) / rows) + navHeight) + ((screenHeight - footerHeight - navHeight) / rows * 0.05)) - ((screenHeight - footerHeight - navHeight) / rows * 0.05) - 1} />
      <DashedLine distanceFromTop={((4 * ((screenHeight - footerHeight - navHeight) / rows) + navHeight) + ((screenHeight - footerHeight - navHeight) / rows * 0.05)) - ((screenHeight - footerHeight - navHeight) / rows * 0.05) - 1} />
      <DashedLine distanceFromTop={((6 * ((screenHeight - footerHeight - navHeight) / rows) + navHeight) + ((screenHeight - footerHeight - navHeight) / rows * 0.05)) - ((screenHeight - footerHeight - navHeight) / rows * 0.05) - 1} />
      <DashedLine distanceFromTop={((7 * ((screenHeight - footerHeight - navHeight) / rows) + navHeight) + ((screenHeight - footerHeight - navHeight) / rows * 0.05)) - ((screenHeight - footerHeight - navHeight) / rows * 0.05) - 1} />
      <Footer />
    </div>
  );
}

export default Flowchart;
