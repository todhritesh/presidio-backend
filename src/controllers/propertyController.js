const Property = require('../models/Property')

module.exports = class PropertyController {
  static async addProperty(req, res, next) {
    try {
      const data = {
        ...req.body,
        user: req.user.userId
      }
      console.log(data)
      const property = new Property(data);
      await property.save();
      res.status(201).send(property);
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  }



  static async getProperties(req, res, next) {
    const { page = 1, limit = 10, sortBy = 'propertyTitle', order = 'asc' } = req.query;
  
    const sortOptions = {
      propertyTitle: 'propertyTitle',
      price: 'price',
      area: 'area',
    };
  
    const sortField = sortOptions[sortBy] || 'propertyTitle';
    const sortOrder = order === 'desc' ? -1 : 1;
  
    try {
      const properties = await Property.find()
        .sort({ [sortField]: sortOrder })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      const count = await Property.countDocuments();
  
      res.status(200).send({
        properties,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page)
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
  


  static async getMyProperties(req, res, next) {

    const { page = 1, limit = 10 } = req.query;

    try {
      const properties = await Property.find({user: req.user.userId})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await Property.countDocuments();

      res.status(200).send({
        properties,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page)
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async editProperty(req, res, next) {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'propertyTitle', 'description', 'price', 'fullAddress',
      'noOfBedroom', 'noOfBathroom', 'area',
      'contactName', 'contactPhoneNo', 'contactEmail'
    ];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
      const property = await Property.findById(req.params.id);

      if (!property) {
        return res.status(404).send();
      }

      updates.forEach(update => property[update] = req.body[update]);
      await property.save();

      res.send(property);
    } catch (error) {
      res.status(400).send(error);
    }

  }
}