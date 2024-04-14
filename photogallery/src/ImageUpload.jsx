import  { useState } from 'react';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage && selectedImage.type.startsWith('image/')) {
      setImage(selectedImage);
      setErrorMessage('');
    } else {
      setImage(null);
      setErrorMessage('Please select a valid image file (e.g., JPG or PNG).');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) {
      // Implement your image upload logic here
      console.log('Image uploaded:', image);
      // Reset state
      setImage(null);
      setErrorMessage('');
    } else {
      setErrorMessage('Please select an image before submitting.');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="title text-center mt-8 mb-4 text-primary">Upload Image</h1>
      <form className="image-upload-form flex flex-col items-center" onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-lg">Select an image:</span>
          {/* Custom file input styling */}
          <label htmlFor="fileInput" className="bg-primary text-white py-2 px-4 rounded cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600">
            Choose File
          </label>
          <input type="file" id="fileInput" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <button type="submit" className="bg-primary text-white py-2 px-4 rounded cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600">
          Upload
        </button>
      </form>
    </div>
  );
}

export default ImageUpload;
