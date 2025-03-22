import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Restaurant {
  name: string;
  rating: number;
  openHours: string;
  distance: string;
}

interface Category {
  name: string;
  restaurants: Restaurant[];
}

interface ResultDisplayProps {
  results: Category[];
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results, onReset }) => {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="result-container">
      <div className="result-header">
        <h2>ผลการสุ่ม</h2>
        <Button onClick={onReset}>สุ่มใหม่</Button>
      </div>
      
      <div className="category-list">
        {results.map((category, categoryIndex) => (
          <Card key={`category-${categoryIndex}`} className="category-card">
            <h3 className="category-name">{category.name}</h3>
            
            <div className="restaurant-section">
              <h4 className="restaurant-heading">ร้านอาหารที่แนะนำ:</h4>
              
              <div className="restaurant-list">
                {category.restaurants.slice(0, 2).map((restaurant, restaurantIndex) => (
                  <div key={`restaurant-${categoryIndex}-${restaurantIndex}`} className="restaurant-item">
                    <h5 className="restaurant-name">{restaurant.name}</h5>
                    
                    <div className="restaurant-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <span key={`star-${i}`} className="star">★</span>
                        ))}
                      </div>
                      <span className="rating-value">({restaurant.rating || 4.5})</span>
                    </div>
                    
                    <div className="restaurant-info">
                      <p className="opening-hours">เปิด: {restaurant.openHours || "10:00 - 22:00"}</p>
                    </div>
                    
                    <div className="restaurant-footer">
                      <span className="distance">{restaurant.distance || "ระยะทาง 2.5 กม."}</span>
                      <a href="#" className="more-info">ดูเพิ่มเติม</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResultDisplay;