import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import SideBar from '../../Components/Side Bar/SideBar';

function Feed() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const API_BASE_URL = "http://localhost:8000/api/";

    // Check authentication
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/"); // Redirect to login if token is missing
        }
    }, [navigate]);

    // Fetch user data
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get(`${API_BASE_URL}user`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    const { user } = response.data;
                    setUserData(user);
                })
                .catch((error) => {
                    console.error("Error fetching user data", error);
                });
        }
    }, []);

    // Handle file drop
    const onDrop = (acceptedFiles) => {
        const newFiles = acceptedFiles.slice(0, 5 - uploadedImages.length);
        const previewFiles = newFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        const updatedImages = [...uploadedImages, ...previewFiles].slice(0, 5);
        setUploadedImages(updatedImages);
        if (!selectedImage && updatedImages.length > 0) {
            setSelectedImage(updatedImages[0]);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: true,
    });

    // Remove image
    const removeImage = (index) => {
        const updatedImages = uploadedImages.filter((_, i) => i !== index);
        setUploadedImages(updatedImages);
        if (selectedImage === uploadedImages[index]) {
            setSelectedImage(updatedImages[0] || null);
        }
    };

    // Handle image upload
    const handleUpload = async () => {
        if (!userData) {
            Swal.fire({
                icon: 'error',
                title: 'User not found',
                text: 'Please log in again.',
            });
            return;
        }

        const formData = new FormData();
        uploadedImages.forEach((image) => {
            formData.append('images[]', image.file);
        });
        formData.append('user_id', userData.id); 

        try {
            setIsUploading(true);
            const response = await axios.post(`${API_BASE_URL}upload-images`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Images uploaded successfully!',
            });
            setUploadedImages([]);
        } catch (error) {
            console.error('Error uploading images:', error);
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: 'Failed to upload images. Please try again.',
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="d-flex">
            <SideBar />
            <div className="flex-grow-1 p-3 mt-3">
                <h2 className="text-center">Feed</h2>
                <div className="p-4" style={{ paddingLeft: '50px', marginLeft: '20px' }}>
                    <div
                        {...getRootProps()}
                        style={{
                            border: '2px dashed #007bff',
                            borderRadius: '10px',
                            padding: '20px',
                            backgroundColor: isDragActive ? '#f1faff' : '#f8f9fa',
                            cursor: 'pointer',
                            margin: '20px auto',
                            textAlign: 'center',
                            width: '500px',
                        }}
                    >
                        <input {...getInputProps()} />
                        <p>
                            {isDragActive
                                ? 'Drop the images here...'
                                : 'Drag and drop up to 5 images, or click to browse'}
                        </p>
                    </div>

                    {uploadedImages.length > 0 && (
                        <div className="d-flex" style={{ marginTop: '20px', gap: '10px' }}>
                            <div
                                style={{
                                    width: '100px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    overflowY: 'auto',
                                }}
                            >
                                {uploadedImages.map((image, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedImage(image)}
                                        style={{
                                            border: selectedImage === image ? '2px solid #007bff' : '1px solid #ddd',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <img
                                            src={image.preview}
                                            alt={`Thumbnail ${index + 1}`}
                                            style={{
                                                width: '100%',
                                                height: '80px',
                                                objectFit: 'cover',
                                                borderRadius: '5px',
                                            }}
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeImage(index);
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: '245px',
                                                right: '50px',
                                                background: 'red',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Main image display */}
                            <div style={{ flexGrow: 1, textAlign: 'center' }}>
                                {selectedImage && (
                                    <img
                                        src={selectedImage.preview}
                                        alt="Selected"
                                        style={{
                                            width: '100%',
                                            height: '500px',
                                            objectFit: 'contain',
                                            borderRadius: '10px',
                                            border: '1px solid #ddd',
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    <button onClick={handleUpload} disabled={isUploading}>
                        {isUploading ? 'Uploading...' : 'Upload Images'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Feed;
