import React, { useState } from 'react';
import './Card.css';

function Card({ imageUrl, title, description, date ,url}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='card'>
      <img 
        src={imageUrl}
        alt='Card image' 
        width={280} 
        height={280}
      />
      <div className='card-content'>
        <h3>{title}</h3>
        <p>
          {isExpanded 
            ? description 
            : description.length > 100 
              ? description.substring(0, 100) + '...' 
              : description}
        </p>
        <button onClick={handleReadMore}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
      <div className='card-footer'>
        <p>Published At: {date}</p>
        
      </div>
    </div>
  );
}

export default Card;
