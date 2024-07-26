import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";

type Category = {
  name: string;
};

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://localhost:7136/api/Category");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = (category: string) => {
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
          <i className={`category-icon fas fa-tag`}></i>
          <p className="category-name">{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Category;