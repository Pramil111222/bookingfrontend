import { useEffect, useState } from 'react';
import SideBar from '../../Components/Side Bar/SideBar';
import Table from '../../Components/Table_rooms';
import ConfirmModal from '../Form Models/ConfirmModal';
import RoomFormModel from '../Form Models/RoomFormModel';
import axios from 'axios'; 
import API_BASE_URL from '../../API/apiConfig'; 
import { useNavigate } from 'react-router-dom'; // Ensure this is imported

function Rooms() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState(""); 
    const [roomToEdit, setRoomToEdit] = useState(null); // New state to store room data for editing
    const navigate = useNavigate(); // Initialize navigate hook

    const columns = ["#", "Room No", "Room Description", "Booking Status", "Room Type"];
    const btnName = "Add new room";

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/'); // Redirect to login page if no token
        }
    }, [navigate]);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/'); // Redirect if no token
                return;
            }

            // Send the token in the Authorization header
            const response = await axios.get(`${API_BASE_URL}all_rooms`, {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token here
                }
            });

            setData(response.data); 
        } catch (err) {
            setError("Error fetching rooms: " + err.message);
        }
    };

    const deleteRoom = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/'); // Redirect if no token
                return;
            }

            // Send the token in the Authorization header for deleting room
            const response = await axios.delete(`${API_BASE_URL}rooms/${roomToDelete.id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token here
                }
            });

            fetchRooms();
            setRoomToDelete(null);
            setDeleteMessage("Room deleted successfully!"); // Set success message
        } catch (err) {
            setError("Error deleting room: " + err.message);
        } finally {
            setShowConfirmModal(false);
        }
    };

    const handleEdit = async (room) => {
        setRoomToEdit(room); // Set room data to be edited
        setShowEditModal(true); // Open the modal
    };

    const handleDelete = (room) => {
        setRoomToDelete(room); 
        setShowConfirmModal(true); 
    };

    const closeConfirmModal = () => {
        setShowConfirmModal(false);
        setRoomToDelete(null); 
    };

    const handleAddNewPackage = () => {
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setRoomToEdit(null); // Clear the room data after closing the modal
    };

    const closeDeleteMessage = () => {
        setDeleteMessage(""); // Close the success message manually
    };

    useEffect(() => {
        if (deleteMessage) {
            const timer = setTimeout(() => setDeleteMessage(""), 3000); // Hide message after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [deleteMessage]);

    return (
        <div className='d-flex'>
            <SideBar />
            <div className="flex-grow-1 p-5">
            <Table
                data={data}
                columns={columns}
                btnName={btnName}
                showDate={false}
                onAdd={handleAddNewPackage}
                onEdit={handleEdit} 
                onDelete={handleDelete}
            />

                {showConfirmModal && (
                    <ConfirmModal
                        onConfirm={deleteRoom}
                        onClose={closeConfirmModal}
                    />
                )}

                {/* Pass roomToEdit to RoomFormModel */}
                <RoomFormModel
                    showModal={showEditModal}
                    closeModal={handleCloseModal}
                    onSave={fetchRooms}
                    roomToEdit={roomToEdit} // Pass room data to the form for editing
                />
                
                {/* Success Message */}
                {deleteMessage && (
                    <div className="delete-message">
                        <span>{deleteMessage}</span>
                        <button onClick={closeDeleteMessage} className="close-btn">X</button>
                    </div>
                )}
            </div>

            {/* Add the CSS for styling */}
            <style jsx>{`
                .delete-message {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background-color: #4CAF50; /* Green background */
                    color: white;
                    padding: 10px;
                    border-radius: 5px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 9999;
                }

                .close-btn {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                    padding-left: 10px;
                }
            `}</style>
        </div>
    );
}

export default Rooms;