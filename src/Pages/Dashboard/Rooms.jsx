import { useEffect, useState } from 'react';
import SideBar from '../../Components/Side Bar/SideBar';
import Table from '../../Components/Table/Table_rooms';
import ConfirmModal from '../Form Models/ConfirmModal';
import RoomFormModel from '../Form Models/RoomFormModel';
import axios from 'axios'; 
import API_BASE_URL from '../../API/apiConfig'; 
import { useNavigate } from 'react-router-dom';

function Rooms() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState(""); 
    const [roomToEdit, setRoomToEdit] = useState(null);
    const navigate = useNavigate();  
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
    
            const response = await axios.delete(`${API_BASE_URL}rooms/${roomToDelete.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the token here
                }
            });
    
            fetchRooms();
            setRoomToDelete(null);
            setDeleteMessage("Room deleted successfully!");
    
            // Show success message
            showPopupMessage("Room deleted successfully!");
    
        } catch (err) {
            setError("Error deleting room: " + err.message);
    
            // Show error message
            showPopupMessage("Error deleting room: " + err.message, true);
        } finally {
            setShowConfirmModal(false);
        }
    };
    
    // Function to display the message
    const showPopupMessage = (message, isError = false) => {
        const popup = document.createElement('div');
        popup.classList.add('popup-message');
        if (isError) popup.classList.add('error');
        popup.textContent = message;
        
        // Append to the body
        document.body.appendChild(popup);
    
        // Display the message
        popup.style.display = 'block';
    
        // Hide the message after 5 seconds
        setTimeout(() => {
            popup.style.display = 'none';
            document.body.removeChild(popup);
        }, 5000); // 5 seconds duration
    };
    

    const handleEdit = async (room) => {
        setRoomToEdit(room);
        setShowEditModal(true);
    };

    const handleDelete = (room) => {
        setRoomToDelete(room);
        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false); // Close the confirm modal
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/'); // Redirect to login page if no token
                return;
            }

            if (roomToEdit) {
                await axios.put(`${API_BASE_URL}rooms/${roomToEdit.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                await axios.post(`${API_BASE_URL}rooms`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            fetchRooms();
            closeModal();
        } catch (err) {
            setError("Error saving room data: " + err.message);
        }
    };

    const handleAddNewPackage = () => {
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setRoomToEdit(null); // Clear room data
    };

    const closeDeleteMessage = () => {
        setDeleteMessage(""); // Close the success message manually
    };

    useEffect(() => {
        if (deleteMessage) {
            const timer = setTimeout(() => setDeleteMessage(""), 3000);
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
                        onClose={handleCloseConfirmModal} // Use the defined function here
                    />
                )}
    
                <RoomFormModel
                    showModal={showEditModal}
                    closeModal={handleCloseModal}
                    onSave={fetchRooms}
                    roomToEdit={roomToEdit}
                />
    
                {/* Success Message */}
                {deleteMessage && (
                    <div className="delete-message">
                        <span>{deleteMessage}</span>
                        <button onClick={closeDeleteMessage} className="close-btn">X</button>
                    </div>
                )}
            </div>
    
            {/* Add the CSS directly in the JSX file */}
            <style>
                {`
                    .delete-message {
                        position: fixed;
                        top: 10px;
                        right: 10px;
                        background-color: #28a745;
                        color: white;
                        padding: 10px;
                        border-radius: 5px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        z-index: 9999;
                        font-size: 16px;
                        max-width: 300px;
                        word-wrap: break-word;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
    
                    .delete-message .close-btn {
                        background: none;
                        border: none;
                        color: white;
                        font-size: 16px;
                        cursor: pointer;
                        margin-left: 10px;
                    }
    
                    .delete-message.error {
                        background-color: #dc3545; /* Red background for errors */
                    }
                `}
            </style>
        </div>
    );
    
}

export default Rooms;
