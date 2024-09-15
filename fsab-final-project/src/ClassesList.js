import React, { useEffect, useState } from 'react';
import { fetchClasses } from './services/firebaseServices';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Import Firestore
import Card from './components/Card';

const ClassesList = () => {
    const [classes, setClasses] = useState([]);
    const [error, setError] = useState(null); 
    const [showModal, setShowModal] = useState(false);
    const [newClass, setNewClass] = useState({
        className: '',
        currentGrade: '',
        desc: '',
        difficulty: 0,
        weeklyHours: 0,
    });

    useEffect(() => {
        const getClasses = async () => {
        try {
            const classesData = await fetchClasses();
            setClasses(classesData);
        } catch (error) {
            setError("Couldn't fetch classes.");
        }
    };

    getClasses();
    }, []);

  // Update when form is changed
    const onChange = (e) => {
        const { name, value } = e.target;
        setNewClass(prevClass => ({
            ...prevClass,
            [name]: value
        }));
    };

  // Handle submission and update
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "classes"), newClass);
            setClasses(prevClasses => [
                ...prevClasses,
                { id: Date.now().toString(), ...newClass }
            ]);
            setNewClass({
                className: '',
                currentGrade: '',
                desc: '',
                difficulty: '',
                weeklyHours: 0,
            });
            setShowModal(false); // Close the modal
        } catch (error) {
        setError("Failed to add class.");
        }
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Classes</h1>
            <button onClick={handleOpenModal}>Add a New Class</button>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Add a New Class</h2>
                        <form onSubmit={handleSubmit}>
                        <label>
                            Class Name:
                            <input
                            type="text"
                            name="className"
                            value={newClass.className}
                            onChange={onChange}
                            required
                            />
                        </label>
                        <br />
                        <label>
                            Current Grade:
                            <input
                            type="text"
                            name="currentGrade"
                            value={newClass.currentGrade}
                            onChange={onChange}
                            required
                            />
                        </label>
                        <br />
                        <label>
                            Additional Notes:
                            <textarea
                            name="additionalNotes"
                            value={newClass.additionalNotes}
                            onChange={onChange}
                            />
                        </label>
                        <br />
                        <label>
                            Time Commitment (hrs/week):
                            <input
                            type="number"
                            name="timeCommitment"
                            value={newClass.timeCommitment}
                            onChange={onChange}
                            required
                            />
                        </label>
                        <br />
                        <label>
                            Time Commitment (hrs/week):
                            <input
                            type="number"
                            name="timeCommitment"
                            value={newClass.timeCommitment}
                            onChange={onChange}
                            required
                            />
                        </label>
                        <br />
                        <button type="submit">Add Class</button>
                        </form>
                    </div>
                </div>
        
            )}
            {classes.map((classItem) => (
                <Card
                    className= {classItem.className}
                    currentGrade= {classItem.currentGrade}
                    desc= {classItem.desc}
                    difficulty= {classItem.difficulty}
                    weeklyHours= {classItem.weeklyHours}
                />
            ))}
        </div>
    );
};

export default ClassesList;