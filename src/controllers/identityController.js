const { Identity } = require('../models');

exports.createIdentity = async (req, res) => {
  try {

    const identity = await Identity.create({
      text: req.body.text,
      mission: req.body.mission,
      vision: req.body.vision,
      value: req.body.value,
      principle: req.body.principle,
    });

    res.status(201).json(identity);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating corporate identity', error: error.message });
  }
};

exports.getIdentityById = async (req, res) => {
  try {
    const identity = await Identity.findByPk(req.params.id);
    if (identity) {
      res.json(identity);
    } else {
      res.status(404).json({ message: 'Identity not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving identity', error: error.message });
  }
};

exports.updateIdentity = async (req, res) => {
  try {
    const [updated] = await Identity.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedIdentity = await Identity.findByPk(req.params.id);
      res.json(updatedIdentity);
    } else {
      res.status(404).json({ message: 'Identity not found' });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating corporate identity', error: error.message });
  }
};