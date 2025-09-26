import React, { useState } from 'react';
import { menuItems } from '../../data/menuItems';
import menuImage from '../../assets/images/menu-photo.png';
import './Menu.css';

// Import your filter icon images
import allIcon from '../../assets/images/all-icon.jpg';
import drinksIcon from '../../assets/images/drinks-icon.jpg';
import dessertsIcon from '../../assets/images/desserts-icon.jpg';
import healthyIcon from '../../assets/images/healthy-icon.jpg';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter categories with photo icons
  const filterCategories = {
    all: { 
      name: 'All', 
      icon: allIcon 
    },
    drinks: { 
      name: 'Drinks', 
      icon: drinksIcon,
      includes: [
        'Cocktails', 
        'Mojito', 
        'Hot Drinks', 
        'Ice Drinks', 
        'Frappuccino', 
        'Bubbles', 
        'Milkshake', 
        'Blacktop', 
        'Filter Coffee'
      ]
    },
    desserts: {
      name: 'Desserts',
      icon: dessertsIcon,
      includes: [
        'Crêpes', 
        'Mighty Crêpe', 
        'Fettuccine Crêpe', 
        'Gaufre', 
        'Pancake', 
        'Donuts'
      ]
    },
    healthy: {
      name: 'Healthy',
      icon: healthyIcon,
      includes: ['Detox']
    }
  };

  // Filter menu items based on active category
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(category => 
        filterCategories[activeCategory].includes.includes(category.category)
      );

  return (
    <section id="menu" className="menu-section">
      <div className="menu-header">
        <h1 className="menu-title">Menu</h1>
        <p className="menu-subtitle">Discover our delicious offerings</p>
      </div>

      {/* Category Filter Buttons with Photo Icons */}
      <div className="filter-container">
        {Object.entries(filterCategories).map(([key, filter]) => (
          <button
            key={key}
            className={`filter-btn ${activeCategory === key ? 'active' : ''}`}
            onClick={() => setActiveCategory(key)}
          >
            <img src={filter.icon} alt={`${filter.name} icon`} className="filter-icon-img" />
            {filter.name}
          </button>
        ))}
      </div>

      {/* Two-Column Layout */}
      <div className="menu-container">
        <div className="menu-photo-column">
          <div className="photo-sticky">
            <img src={menuImage} alt="Coffee and food presentation" className="menu-image" />
          </div>
        </div>

        <div className="menu-items-column">
          {filteredItems.length > 0 ? (
            filteredItems.map((category) => (
              <div key={category.id} className="menu-category">
                <h2 className="category-title">{category.category}</h2>
                <div className="category-items">
                  {category.items.map((item, index) => (
                    <div key={index} className="menu-item">
                      <div className="item-info">
                        <h3 className="item-name">{item.name}</h3>
                        {item.description && (
                          <p className="item-description">{item.description}</p>
                        )}
                      </div>
                      <span className="item-price">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-items-message">
              <p>No items found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;