import React from 'react';
import './Card.css'; // Import the CSS file for styling the card

export const Card = ({
    id,
    className,
    currentGrade,
    desc,
    difficulty,
    weeklyHours,
    onDelete
}) => {
    return (
        <div className="card">
            <h1 className="card-title">{className}</h1>
            <p className="card-desc"><span className="bolded">Current Grade</span>: {currentGrade}</p>
            <p className="card-desc"><span className="bolded">Class Difficulty</span>: {difficulty}</p>
            <p className="card-desc"><span className="bolded">Time Commitment</span>: {weeklyHours} hrs/week</p>
            <p className="card-desc"><span className="bolded">Additional Notes</span>: {desc} </p>
            <span class="button">
                <button className="delete-button" onClick={() => onDelete(id)}>Delete</button>
            </span>
        </div>
    )
}

export default Card;