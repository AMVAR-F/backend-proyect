import React from 'react';

const CategorySelector = React.memo(({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div>
      <label>Category:</label>
      <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
});

export default CategorySelector;
