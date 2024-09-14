import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import Card from '../Card/Card';
import axios from 'axios';

function Home() {
  const [newsData, setNewsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState('');
  const [category, setCategory] = useState('');

  // Function to fetch default data from backend
  async function getdata() {
    try {
      const response = await axios.get('http://localhost:7000/api/news/try');
      setNewsData(response.data.articles); // Assuming `articles` is the key in the response
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Function to fetch search results from backend
  async function getSearchData() {
    try {
      console.log('Fetching with:', { searchQuery, region, category }); // Debug log
      const response = await axios.get('http://localhost:7000/api/news/search', {
        params: {
          query: searchQuery,
          region: region,
          category: category
        }
      });
      setNewsData(response.data.articles); // Assuming `articles` is the key in the response
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    // Fetch default data on initial load
    getdata();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='mainDIv'>
        <ul>
          <li onClick={() => setCategory('sports')}>Sports</li>
          <li onClick={() => setCategory('health')}>Health</li>
          <li onClick={() => setCategory('national')}>National</li>
          <li onClick={() => setCategory('international')}>International</li>
          <li onClick={() => setCategory('business')}>Business</li>
          <li onClick={() => setCategory('stock market')}>Stock Market</li>
          <li onClick={() => setCategory('technology')}>Technology</li>
          <li onClick={() => setCategory('entertainment')}>Entertainment</li>
          <li onClick={() => setCategory('politics')}>Politics</li>
          <li onClick={() => setCategory('weather')}>Weather</li>
          <li onClick={() => setCategory('crime')}>Crime</li>
          <li onClick={() => setCategory('fashion')}>Fashion</li>
          <li onClick={() => setCategory('consumer reports')}>Consumer Reports</li>
        </ul>
      </div>

      <div className='mainContent'>
        <div className='searchSec'>
          <input
            className='searchInput'
            type='text'
            placeholder='search here'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className='searchBtn' onClick={getSearchData}>Search</button>
        </div>
        
        <div className='filters'>
          <label>
            Region:
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="india">India</option>
              <option value="us">US</option>
              <option value="uk">UK</option>
              <option value="ca">Canada</option>
            </select>
          </label>
          <label>
            Category:
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All</option>
              <option value="sports">Sports</option>
              <option value="health">Health</option>
              <option value="business">Business</option>
              <option value="technology">Technology</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </label>
        </div>

        <div className='CardSec'>
          {newsData.map((article, index) => (
            <Card
              key={index}
              imageUrl={article.image} // Replace with actual data key for image
              title={article.title}
              description={article.description}
              date={article.publishedAt} // Replace with actual data key for date
              url={article.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
