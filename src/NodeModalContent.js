import React, { useState } from 'react';

function NodeModalContent({ nodeData, selectedStatus, onStatusChange }) {

    const darkerColor =
        nodeData.color === "#c285a3" ? "#935f76" : nodeData.color === "#5b9bd5" ? "#3a6a97" : "#5c636a";

    const circleStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: nodeData.color === "#00b050" ? "#6c757d" : nodeData.color,
        marginRight: '10px',
        color: 'white',
        fontWeight: 'bold',
        marginBottom: '10px', 
    };

    const dropdownStyle = {
        marginLeft: 'auto', 
        marginBottom: '10px',
    }

    const circleStyleHover = {
        ...circleStyle,
        background: darkerColor,
    };

    const [isHovered, setHovered] = useState(false);

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                    style={isHovered ? circleStyleHover : circleStyle}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    {nodeData.credits !== "" ? nodeData.credits : "?"}
                </div>

                <select style={dropdownStyle} value={selectedStatus} onChange={(e) => onStatusChange(e.target.value)}>
                    <option value="incomplete">Incomplete</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="complete">Complete</option>
                </select>
            </div>
            <p>{nodeData.description}</p>
        </div>
    );
}

export default NodeModalContent;
