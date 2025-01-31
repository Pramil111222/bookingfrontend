import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import SideBar from "../../Components/Side Bar/SideBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./Feed.css";
import API_BASE_URL from "../../API/apiConfig";

function Feed() {
    const navigate = useNavigate();
    const [uploadedImages, setUploadedImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
  //  const API_BASE_URL = "http://localhost:8000/api/";

    const token = localStorage.getItem("token"); // Retrieve JWT token from local storage

    // Fetch submitted images from the database
    useEffect(() => {
        const fetchUserImages = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}get-user-images`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    // Convert image paths to full URLs for display
                    const fetchedImages = response.data.images.flatMap((item) =>
                        [item.image1, item.image2, item.image3, item.image4, item.image5].filter(Boolean)
                    ).map((path) => ({
                        url: `${API_BASE_URL}${path}`, // Adjust URL if using a different domain
                    }));

                    setUploadedImages(fetchedImages);
                    if (fetchedImages.length > 0) {
                        setSelectedImage(fetchedImages[0]);
                    }
                }
            } catch (error) {
                console.error("Error fetching user images:", error);
            }
        };

        fetchUserImages();
    }, []);

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
        accept: "image/*",
        multiple: true,
    });

    const [deletedImages, setDeletedImages] = useState([]);

    const removeImage = (index) => {
        const removedImage = uploadedImages[index];
    
        // If the removed image is from the server (not a newly added preview)
        if (removedImage.url) {
            setDeletedImages([...deletedImages, removedImage.url]); // Store URLs of deleted images
        }
    
        const updatedImages = uploadedImages.filter((_, i) => i !== index);
        setUploadedImages(updatedImages);
        if (selectedImage === uploadedImages[index]) {
            setSelectedImage(updatedImages[0] || null);
        }
    };
    
    const handleImageUpload = async () => {
        setIsUploading(true);
        const formData = new FormData();
    
        uploadedImages.forEach((image) => {
            if (image.file) {
                formData.append("images[]", image.file);
            }
        });
    
        // Send deleted images to the backend
        formData.append("deleted_images", JSON.stringify(deletedImages));
        formData.append("hotel_id", 1);
    
        try {
            const response = await axios.post(`${API_BASE_URL}upload-images`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
    
            Swal.fire({
                icon: "success",
                title: "Images updated successfully!",
                text: response.data.message,
            });
    
            // Reset deleted images list
            setDeletedImages([]);
    
            // Refresh the image list
            const updatedResponse = await axios.get(`${API_BASE_URL}get-user-images`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (updatedResponse.data.success) {
                const fetchedImages = updatedResponse.data.images.flatMap((item) =>
                    [item.image1, item.image2, item.image3, item.image4, item.image5].filter(Boolean)
                ).map((path) => ({
                    url: `${API_BASE_URL}${path}`,
                }));
    
                setUploadedImages(fetchedImages);
                if (fetchedImages.length > 0) {
                    setSelectedImage(fetchedImages[0]);
                }
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Something went wrong while uploading images.",
            });
        } finally {
            setIsUploading(false);
        }
    };
    

    return (
        <div className="d-flex">
            <SideBar />
            <div className="flex-grow-1 p-3 mt-3 feed-container">
                <h2 className="text-center">Feed</h2>
                <div className="dropzone-container">
                    <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
                        <input {...getInputProps()} />
                        <p>{isDragActive ? "Drop the images here..." : "Drag and drop up to 5 images, or click to browse"}</p>
                    </div>

                    {uploadedImages.length > 0 && (
                        <div className="image-preview-container">
                            <div className="thumbnails">
                                {uploadedImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`thumbnail ${selectedImage === image ? "selected" : ""}`}
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <img
                                            src={image.url || image.preview}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="thumbnail-image"
                                        />
                                        <button
                                            className="remove-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeImage(index);
                                            }}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="main-image-container">
                                {selectedImage && (
                                    <img
                                        src={selectedImage.url || selectedImage.preview}
                                        alt="Selected"
                                        className="main-image"
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <button className="upload-button" onClick={handleImageUpload} disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload Images"}
                </button>
            </div>
        </div>
    );
}

export default Feed;
