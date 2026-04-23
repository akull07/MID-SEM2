const ItemList = ({ items, onEdit, onDelete, currentUserId }) => {
  if (!items.length) {
    return <p className="empty-state">No items found yet.</p>;
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <div className="item-card" key={item._id}>
          <div className="item-header">
            <h4>{item.itemName}</h4>
            <span className={`badge ${item.type.toLowerCase()}`}>{item.type}</span>
          </div>
          <p>{item.description}</p>
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
          <p><strong>Contact:</strong> {item.contactInfo}</p>
          <p className="item-owner"><strong>Reported by:</strong> {item.user?.name || 'Unknown'}</p>
          {item.user?._id === currentUserId && (
            <div className="item-actions">
              <button onClick={() => onEdit(item)}>Edit</button>
              <button className="danger" onClick={() => onDelete(item._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
