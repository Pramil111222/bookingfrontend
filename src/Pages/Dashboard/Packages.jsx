import { useEffect, useState } from 'react';
import SideBar from '../../Components/Side Bar/SideBar';
import { useNavigate } from 'react-router-dom';
import Table from '../../Components/Table';
import ConfirmModal from '../Form Models/ConfirmModal';
import PackageFormModel from '../Form Models/PackageFormModel';

function Packages() {
    const navigate = useNavigate();

    // Redirect to login if no token is found
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const columns = ['#', 'Package Name', 'Package Type', 'Price', 'Duration (Days)', 'No Of Guest', 'Availability'];
    const btnName = 'Add New Package';

    useEffect(() => {
        fetchPackages();
    }, []); 

    const fetchPackages = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/allpackages', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch packages');
            const result = await response.json();

            // Assuming the response is an array of package objects
            const transformedData = result.map((pkg, index) => [
                index + 1,
                pkg.package_name,
                pkg.package_type,
                pkg.price,
                pkg.duration,
                pkg.number_of_guests,
                pkg.availability_status,
                pkg.id,  // Ensure package ID is in the last column
            ]);
            setData(transformedData);
        } catch (err) {
            setError(err.message || 'An unexpected error occurred');
        }
    };

    const handleEdit = async (pkg) => {
        const id = pkg[7];  // Ensure we use the correct index for package ID
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/packages/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch package details');

            const packageData = await response.json();
            setSelectedPackage({
                id: packageData.id,
                package_name: packageData.package_name,
                package_type: packageData.package_type,
                price: packageData.price,
                duration: packageData.duration,
                number_of_guests: packageData.number_of_guests,
                availability_status: packageData.availability_status,
                discount: packageData.discount,
            });
            setShowEditModal(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = (pkg) => {
        const selected = {
            id: pkg[7],  // Ensure correct index for the ID
            package_name: pkg[1],
            package_type: pkg[2],
        };
        setSelectedPackage(selected);
        setShowConfirmModal(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/packages/${selectedPackage.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) throw new Error('Failed to delete package');
            setSuccessMessage('Package deleted successfully!');
            fetchPackages();
            setTimeout(() => setSuccessMessage(''), 4000);
        } catch (err) {
            setError(err.message);
        } finally {
            setShowConfirmModal(false);
        }
    };

    const handleAddNewPackage = () => {
        setSelectedPackage(null);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setSelectedPackage(null);
    };

    const handleSavePackage = async (pkgData) => {
        const method = selectedPackage ? 'PATCH' : 'POST';
        const url = selectedPackage
            ? `http://127.0.0.1:8000/api/packages/${selectedPackage.id}`
            : `http://127.0.0.1:8000/api/packages`;
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(pkgData),
            });
            if (!response.ok) throw new Error('Failed to save package');
            fetchPackages();
        } catch (err) {
            console.error('Error saving package:', err);
        } finally {
            setShowEditModal(false);
        }
    };

    return (
        <div className="d-flex">
            <SideBar />
            <div className="flex-grow-1 p-5">
                <Table
                    data={data}
                    columns={columns}
                    btnName={btnName}
                    onAdd={handleAddNewPackage}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {/* Success Message (Toast Notification) */}
                {successMessage && (
                    <div className="toast show position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
                        <div
                            className="toast-body bg-success text-white shadow-lg rounded-3 p-4"
                            style={{
                                maxWidth: '350px',
                                fontSize: '1rem',
                                border: '1px solid #28a745',
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <span>{successMessage}</span>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    aria-label="Close"
                                    onClick={() => setSuccessMessage('')}
                                ></button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Confirm Modal */}
                {showConfirmModal && (
                    <ConfirmModal onConfirm={confirmDelete} onClose={() => setShowConfirmModal(false)} />
                )}

                {/* Package Form Modal */}
                <PackageFormModel
                    showModal={showEditModal}
                    closeModal={handleCloseModal}
                    onSave={handleSavePackage}
                    selectedPackage={selectedPackage}
                />
            </div>
        </div>
    );
}

export default Packages;
