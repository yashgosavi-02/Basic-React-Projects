// App.jsx

import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa'; // Import the download icon
import { saveAs } from 'file-saver'; // Import the saveAs function
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import UploadedPhotos from './UploadedPhotos'; 

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 30;

function App() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
        setErrorMsg('');
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL}?query=${
            searchInput.current.value
          }&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
            import.meta.env.VITE_API_KEY
          }`
        );
        setImages(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg('Error fetching images. Try again later.');
      console.log(error);
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const resetSearch = () => {
    setPage(1);
    fetchImages();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    resetSearch();
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    resetSearch();
  };

  // Function to handle image download
  const handleDownload = (imageUrl, imageName) => {
    axios
      .get(imageUrl, {
        responseType: 'blob', // Set response type to blob
      })
      .then((response) => {
        saveAs(response.data, imageName); // Trigger download with saveAs function
      })
      .catch((error) => {
        console.error('Error downloading image:', error);
      });
  };

  return (
    <Router>
      <div className='container mx-auto px-4'>
        <nav className="navbar bg-primary py-4 mb-8">
          <ul className="flex items-center justify-between">
            <li>
              <h1 className='text-3xl mr-6 text-white italic'>PHOTO GALLERY</h1>
            </li>
            <li>
              <Link to="/" className="text-lg mr-6 text-white">Home</Link>
            </li>
            <li>
              <Link to="/upload" className="text-lg mr-6 text-white">Upload Photo</Link>
            </li>
            <li>
              <Link to="/uploaded-photos" className="text-lg mr-6 text-white">Uploaded Photos</Link>
            </li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/" element={
            <>
              {errorMsg && <p className='error-msg text-red-500 text-center'>{errorMsg}</p>}
              <div className='search-section mb-8'>
                <Form onSubmit={handleSearch} className="flex justify-center">
                  <Form.Control
                    type='search'
                    placeholder='Type something to search...'
                    className='search-input px-4 py-2 w-96 border border-gray-300 rounded-full'
                    ref={searchInput}
                  />
                </Form>
              </div>
              <div className='filters flex justify-center flex-wrap gap-4 mb-8'>
                <div onClick={() => handleSelection('nature')} className="text-lg text-white bg-primary px-4 py-2 rounded-full cursor-pointer">Nature</div>
                <div onClick={() => handleSelection('birds')} className="text-lg text-white bg-primary px-4 py-2 rounded-full cursor-pointer">Birds</div>
                <div onClick={() => handleSelection('cars')} className="text-lg text-white bg-primary px-4 py-2 rounded-full cursor-pointer">Cars</div>
                <div onClick={() => handleSelection('bikes')} className="text-lg text-white bg-primary px-4 py-2 rounded-full cursor-pointer">Bikes</div>
                <div onClick={() => handleSelection('technology')} className="text-lg text-white bg-primary px-4 py-2 rounded-full cursor-pointer">Technology</div>
                <div onClick={() => handleSelection('ai')} className="text-lg text-white bg-primary px-4 py-2 rounded-full cursor-pointer">AI</div>
              </div>
              {loading ? (
                <p className='loading text-center text-primary'>Loading...</p>
              ) : (
                <div className='images grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  {images.map((image) => (
                    <div key={image.id} className='image-container relative'>
                      <img
                        src={image.urls.small}
                        alt={image.alt_description}
                        className='image w-full h-auto rounded'
                      />
                      {/* Download icon */}
                      <div className="download-icon absolute top-2 right-2 bg-white rounded-full p-2 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200" onClick={() => handleDownload(image.urls.full, `${image.id}.jpg`)}>
                        <FaDownload className="text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className='buttons flex justify-center mt-8'>
                {page > 1 && (
                  <Button onClick={() => setPage(page - 1)} className="bg-primary text-white px-4 py-2 rounded-full cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600">Previous</Button>
                )}
                {page < totalPages && (
                  <Button onClick={() => setPage(page + 1)} className="bg-primary text-white px-4 py-2 rounded-full cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600">Next</Button>
                )}
              </div>
            </>
          } />
          <Route path="/upload" element={<ImageUpload />} />
          <Route path="/uploaded-photos" element={<UploadedPhotos />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
