import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import { fetchItems, createItem, updateItem, deleteItem } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');
  const currentUserId = localStorage.getItem('userId');

  const loadItems = async (query = {}) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetchItems(query);
      setItems(response.data);
    } catch (err) {
      setError('Unable to load items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    loadItems();
  }, [token]);

  const handleSearch = async (e) => {
    e.preventDefault();
    await loadItems(search ? { name: search } : {});
  };

  const handleCreate = async (itemData) => {
    setError('');
    setSuccess('');
    try {
      await createItem(itemData);
      setSuccess('Item created successfully');
      setEditingItem(null);
      await loadItems(search ? { name: search } : {});
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create item');
    }
  };

  const handleUpdate = async (itemData) => {
    setError('');
    setSuccess('');
    try {
      await updateItem(editingItem._id, itemData);
      setSuccess('Item updated successfully');
      setEditingItem(null);
      await loadItems(search ? { name: search } : {});
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update item');
    }
  };

  const handleDelete = async (itemId) => {
    const confirmed = window.confirm('Delete this item?');
    if (!confirmed) return;
    setError('');
    setSuccess('');
    try {
      await deleteItem(itemId);
      setSuccess('Item deleted successfully');
      await loadItems(search ? { name: search } : {});
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete item');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="page-container">
      <div className="dashboard-header card">
        <div>
          <h2>Campus Lost & Found</h2>
          <p>Welcome, <strong>{userName || 'Student'}</strong></p>
        </div>
        <button className="secondary" onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-grid">
        <div className="search-card card">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search items by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <button className="secondary" onClick={() => loadItems({})}>Reset</button>
        </div>

        <ItemForm
          onSubmit={editingItem ? handleUpdate : handleCreate}
          initialData={editingItem}
          onCancel={() => setEditingItem(null)}
        />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <div className="items-section card">
          <h3>All Reports</h3>
          {loading ? (
            <p>Loading items...</p>
          ) : (
            <ItemList items={items} onEdit={setEditingItem} onDelete={handleDelete} currentUserId={currentUserId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
