import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import { useEffect, useState } from "react";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || '/pizza.png'); // Default to pizza.png
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || '');
  const [categories, setCategories] = useState([]);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const categories = await res.json();
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error); // Error handling
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault(); // Prevent the default form submission
    try {
      onSubmit(ev, {
        image, name, description, basePrice, sizes, extraIngredientPrices, category,
      });
    } catch (error) {
      console.error('Error submitting form:', error); // Error handling
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto">
      <div
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: '.3fr .7fr' }}
      >
        <div>
          <img src={image} alt="Menu Item" className="rounded-lg max-w-full" />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <select value={category} onChange={ev => setCategory(ev.target.value)}>
            {categories?.length > 0 && categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={ev => setBasePrice(ev.target.value)}
          />
          <MenuItemPriceProps 
            name={'Sizes'}
            addLabel={'Add item size'}
            props={sizes}
            setProps={setSizes} 
          />
          <MenuItemPriceProps 
            name={'Extra ingredients'}
            addLabel={'Add ingredients prices'}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
