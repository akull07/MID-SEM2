const Item = require('../models/Item');

exports.createItem = async (req, res, next) => {
  try {
    const { itemName, description, type, location, date, contactInfo } = req.body;
    if (!itemName || !description || !type || !location || !date || !contactInfo) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newItem = await Item.create({
      user: req.user._id,
      itemName,
      description,
      type,
      location,
      date,
      contactInfo,
    });

    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

exports.getItems = async (req, res, next) => {
  try {
    const { name } = req.query;
    const filter = {};
    if (name) {
      filter.itemName = { $regex: name, $options: 'i' };
    }

    const items = await Item.find(filter).populate('user', 'name email');
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id).populate('user', 'name email');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden: not the item owner' });
    }

    const { itemName, description, type, location, date, contactInfo } = req.body;
    item.itemName = itemName || item.itemName;
    item.description = description || item.description;
    item.type = type || item.type;
    item.location = location || item.location;
    item.date = date || item.date;
    item.contactInfo = contactInfo || item.contactInfo;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden: not the item owner' });
    }

    await item.deleteOne();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    next(error);
  }
};
