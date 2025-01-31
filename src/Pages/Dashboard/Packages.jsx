import { useEffect, useState } from 'react';
import SideBar from '../../Components/Side Bar/SideBar';
import { useNavigate } from 'react-router-dom';
import Table from '../../Components/Table/Table';
import ConfirmModal from '../Form Models/ConfirmModal';
import PackageFormModel from '../Form Models/PackageFormModel';
import API_BASE_URL from "../../API/apiConfig";


function Packages() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/');
    }, [navigate]);

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const columns = ['#', 'Package Name', 'Package Type', 'Price', 'Duration (Days)', 'No Of Guest', 'Availability' , 'Package ID']; 
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
            const response = await fetch(`${API_BASE_URL}allpackages`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch packages');
            const result = await response.json();

            const transformedData = result.map((pkg, index) => [
                index + 1,
                pkg.package_name,
                pkg.package_type,
                pkg.price,
                pkg.duration,
                pkg.number_of_guests,
                pkg.availability_status,
                pkg.id, // ID stored but not displayed
            ]);
            setData(transformedData);
        } catch (err) {
            setError(err.message || 'An unexpected error occurred');
        }
    };

    const handleEdit = async (pkg) => {
        const id = pkg[pkg.length - 1]; // Get ID from last column
        try {
            const response = await fetch(`${API_BASE_URL}packages/${id}`, {
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
        setSelectedPackage({
            id: pkg[pkg.length - 1], // Get ID from last column
            package_name: pkg[1],
            package_type: pkg[2],
        });
        setShowConfirmModal(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}packages/${selectedPackage.id}`, {
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
            ? `${API_BASE_URL}packages/${selectedPackage.id}`
            : `${API_BASE_URL}packages`;
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

                {successMessage && (
                    <div className="toast show position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
                        <div className="toast-body bg-success text-white shadow-lg rounded-3 p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <span>{successMessage}</span>
                                <button className="btn-close btn-close-white" onClick={() => setSuccessMessage('')}></button>
                            </div>
                        </div>
                    </div>
                )}

                {error && <div className="alert alert-danger">{error}</div>}
                {showConfirmModal && <ConfirmModal onConfirm={confirmDelete} onClose={() => setShowConfirmModal(false)} />}
                <PackageFormModel showModal={showEditModal} closeModal={handleCloseModal} onSave={handleSavePackage} selectedPackage={selectedPackage} />
            </div>
        </div>
    );
}

export default Packages;