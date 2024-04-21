import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Learning() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch videos from the specified path
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/assets/videos.json'); // Assuming videos.json is in the public directory
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const videos = await response.json();
      setProducts(videos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Our Latest Collection</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <div className="card h-100">
              <video src={product.videoPath} className="card-img-top" style={{ objectFit: 'cover', height: '200px' }} controls />
              <div className="card-body">
                <h5 className="card-title">{product.description}</h5>
                <p className="card-text">By {product.author}</p>
                <p className="card-text">{product.duration}</p>
              </div>
              <div className="card-footer">
                <Link to={`/video/${product.id}`} className="btn btn-primary me-2">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Learning;
