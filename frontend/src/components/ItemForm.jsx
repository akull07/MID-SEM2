import { useState, useEffect } from 'react';

const defaultForm = {
  itemName: '',
  description: '',
  type: 'Lost',
  location: '',
  date: '',
  contactInfo: '',
};

const ItemForm = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        itemName: initialData.itemName,
        description: initialData.description,
        type: initialData.type,
        location: initialData.location,
        date: initialData.date?.slice(0, 10) || '',
        contactInfo: initialData.contactInfo,
      });
    } else {
      setForm(defaultForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(defaultForm);
  };

  return (
    <div className="item-form card">
      <h3>{initialData ? 'Update item' : 'Report lost / found item'}</h3>
      <form onSubmit={handleSubmit}>
        <label>Item name</label>
        <input name="itemName" value={form.itemName} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />

        <label>Type</label>
        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>

        <label>Location</label>
        <input name="location" value={form.location} onChange={handleChange} required />

        <label>Date</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />

        <label>Contact Info</label>
        <input name="contactInfo" value={form.contactInfo} onChange={handleChange} required />

        <div className="form-actions">
          <button type="submit">{initialData ? 'Save changes' : 'Create item'}</button>
          {initialData && <button type="button" className="secondary" onClick={onCancel}>Cancel</button>}
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
