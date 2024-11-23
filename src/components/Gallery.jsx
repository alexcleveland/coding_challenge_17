
import React, { useState, useEffect } from "react";

const Gallery = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://www.course-api.com/react-tours-project", {
          method: "GET",
          redirect: "manual", 
        });

        if (response.status === 301 || response.status === 302) {
          throw new Error("Redirect detected. Check the API endpoint.");
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTours(data);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  const toggleDescription = (id) => {
    setTours((prevTours) =>
      prevTours.map((tour) =>
        tour.id === id
          ? { ...tour, showFullDescription: !tour.showFullDescription }
          : tour
      )
    );
  };

  if (loading) return <p>Loading tours...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="gallery">
      {tours.map((tour) => (
        <div key={tour.id} className="tour-card">
          <img src={tour.image} alt={tour.name} className="tour-image" />
          <h2>{tour.name}</h2>
          <p className="price">${tour.price}</p>
          <p className="description">
            {tour.showFullDescription
              ? tour.info
              : `${tour.info.substring(0, 100)}...`}
          </p>
          <button onClick={() => toggleDescription(tour.id)}>
            {tour.showFullDescription ? "Show Less" : "Read More"}
          </button>
          <button onClick={() => removeTour(tour.id)}>Not Interested</button>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
