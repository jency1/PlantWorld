
import React from 'react';
import './Blog.css';

function Blog() {
  return (
    <div className="App">
      <header className="header">
        <h1>From Our Blog</h1>
      </header>
      
      <div className="blog-container">
        <BlogCard
          imageUrl="https://images.thdstatic.com/productImages/aeb01cb3-de79-41e0-b77c-a479f963d3d5/svn/united-nursery-house-plants-zz10hw-64_300.jpg"
          // date="06/04/2024"
          title="Plant Care Tips & Guides"
          description="Welcome to our Plant Care section, where we share expert advice and practical tips to help you keep your trees and plants healthy and thriving..."
        />
        <BlogCard
          imageUrl="https://images.thdstatic.com/productImages/aeb01cb3-de79-41e0-b77c-a479f963d3d5/svn/united-nursery-house-plants-zz10hw-64_300.jpg"
          // date="06/04/2024"
          title="Plant Care Tips & Guides"
          description="Welcome to our Plant Care section, where we share expert advice and practical tips to help you keep your trees and plants healthy and thriving..."
        />
        <BlogCard
          imageUrl="https://images.thdstatic.com/productImages/aeb01cb3-de79-41e0-b77c-a479f963d3d5/svn/united-nursery-house-plants-zz10hw-64_300.jpg"
          // date="06/04/2024"
          title="Plant Care Tips & Guides"
          description="Welcome to our Plant Care section, where we share expert advice and practical tips to help you keep your trees and plants healthy and thriving..."
        />
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="contact-info">
            <h2>Garden Care</h2>
            <p>123 Bang Street Leviko, CA 8034, USA</p>
            <p>+800776439935</p>
            <p>info@plantscare.com</p>
          </div>
          <div className="footer-links">
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Blog</li>
              <li>Team</li>
              <li>Contact</li>
              <li>Services</li>
            </ul>
          </div>
          <div className="footer-utility">
            <ul>
              <li>Style Guide</li>
              <li>Not Found</li>
              <li>Protected</li>
              <li>Licenses</li>
              <li>Changelog</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

const BlogCard = ({ imageUrl, date, title, description }) => (
  <div className="blog-card">
    <img src={imageUrl} alt={title} />
    <div className="blog-content">
      <p>{date}</p>
      <h3>{title}</h3>
      <p>{description}</p>
      <br />
      <button>Read More</button>
    </div>
  </div>
);

export default Blog;