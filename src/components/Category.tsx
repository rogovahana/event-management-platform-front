import React from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";

type Category = {
  name: string;
  iconClass: string;
};

const categories: Category[] = [
  { name: "Technology", iconClass: "fas fa-laptop" },
  { name: "Nightlife", iconClass: "fas fa-cocktail" },
  { name: "Music", iconClass: "fas fa-music" },
  { name: "Art", iconClass: "fas fa-paint-brush" },
  { name: "Sport", iconClass: "fas fa-basketball-ball" },
];

const Category: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (category: string) => {
    // Navigate to the proper page
    navigate(`/category/${category}`);
  };

  return (
    <div className="category-container">
      {categories.map((category) => (
        <div
          key={category.name}
          className="category-item"
          onClick={() => handleClick(category.name)}
        >
          <i className={`category-icon ${category.iconClass}`}></i>
          <p className="category-name">{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Category;