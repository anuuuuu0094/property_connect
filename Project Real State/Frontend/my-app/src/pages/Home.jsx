// src/Home/Home.jsx
// src/Home/Home.jsx
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Properties from "./Properties";
import Featured from "../components/Featured";
import Footer from "../components/Footer";
import Offer from "../components/Offer";
import Inquiry from "../components/Inquiry";

function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/api/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error("Error fetching properties:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    fade: true,
  };

  return (
    <div>
      {/* Slider Section */}
      <div className="home-slider" style={{ width: "100%", margin: "auto" }}>
        <Slider {...settings}>
          {properties.map((property) =>
            property.images?.map((img, index) => (
              <div key={`${property._id}-${index}`}>
                <img
                  src={img}
                  alt={property.title}
                  style={{
                    width: "100%",
                    height: "500px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h3 style={{ textAlign: "center" }}>{property.title}</h3>
              </div>
            ))
          )}
        </Slider>
      </div>

      {/* Featured Properties Section */}
      
      <Featured />
          <Offer/>
           <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Inquiry/>
    </div>
          <Footer/>


    </div>
  );
}

export default Home;
