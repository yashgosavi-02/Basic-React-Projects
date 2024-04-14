function UploadedPhotos() {
  // Dummy data for demonstration
  const photos = [
    { id: 1, url: 'https://via.placeholder.com/200', alt: 'Photo 1' },
    { id: 2, url: 'https://via.placeholder.com/200', alt: 'Photo 2' },
    { id: 3, url: 'https://via.placeholder.com/200', alt: 'Photo 3' },
    { id: 4, url: 'https://via.placeholder.com/200', alt: 'Photo 4' },
    { id: 5, url: 'https://via.placeholder.com/200', alt: 'Photo 5' },
  ];

  return (
    <div className="container mx-auto px-4">
      <h1 className="title text-center mt-8 mb-4 text-primary">Uploaded Photos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="uploaded-photo-container relative bg-gray-100 rounded overflow-hidden shadow-md">
            <img src={photo.url} alt={photo.alt} className="uploaded-photo w-full h-auto" />
            {/* Additional elements or functionality can be added here */}
            <div className="uploaded-photo-overlay absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100">
              <button className="text-white bg-primary py-1 px-3 rounded hover:bg-blue-600 transition duration-300 ease-in-out">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadedPhotos;
