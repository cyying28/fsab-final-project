import React, { useEffect, useState } from 'react';
import { fetchClasses } from './services/firebaseServices';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
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
        difficulty: '',
        weeklyHours: '',
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
                weeklyHours: '',
            });
            setShowModal(false);
        } catch (error) {
        setError("Failed to add class.");
        }
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setNewClass({
            className: '',
            currentGrade: '',
            desc: '',
            difficulty: '',
            weeklyHours: '',
        });
        setShowModal(false);
    }

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "classes", id));
            setClasses(prevClasses => prevClasses.filter(classItem => classItem.id !== id));
        } catch (error) {
            setError("Failed to delete class.");
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <span class="center"> <button onClick={handleOpenModal}>Add a Class!</button> </span>
            {showModal && (
                <div className="modal">
                    <div className="modal-body">
                        <h2>New Class</h2>
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
                                Description:
                                <input
                                type="text"
                                name="desc"
                                value={newClass.desc}
                                onChange={onChange}
                                required
                                />
                            </label>
                            <br />
                            <label>
                                Difficulty (out of 10):
                                <input
                                type="number"
                                name="difficulty"
                                value={newClass.difficulty}
                                onChange={onChange}
                                required
                                />
                            </label>
                            <br />
                            <label>
                                Time Commitment (hrs/week):
                                <input
                                type="number"
                                name="weeklyHours"
                                value={newClass.timeCommitment}
                                onChange={onChange}
                                required
                                />
                            </label>
                            <br />
                            <button type="button" onClick={handleCloseModal}>Cancel</button>
                            <button type="submit">Add Class</button>
                        </form>
                    </div>
                </div>
        
            )}
            <div className="grid">
                {classes.map((classItem) => (
                    <div className="cell">
                        <Card
                            id={classItem.id}
                            className= {classItem.className}
                            currentGrade= {classItem.currentGrade}
                            desc= {classItem.desc}
                            difficulty= {classItem.difficulty}
                            weeklyHours= {classItem.weeklyHours}
                            onDelete={handleDelete}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassesList;