const { Homepage } = require('../models');

exports.createHomepage = async (req, res) => {
  try {

    const homepage = await Homepage.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      text: req.body.text,
    });

    res.status(201).json(homepage);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating corporate Homepage', error: error.message });
  }
};

exports.getHomepageById = async (req, res) => {
  try {
    const homepage = await Homepage.findByPk(req.params.id);
    if (homepage) {
      res.json(homepage);
    } else {
      res.status(404).json({ message: 'Homepage not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving homepage', error: error.message });
  }
};

exports.updateHomepage = async (req, res) => {
  try {
    const [updated] = await Homepage.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedHomepage = await Homepage.findByPk(req.params.id);
      res.json(updatedHomepage);
    } else {
      res.status(404).json({ message: 'Homepage not found' });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating homepage', error: error.message });
  }
};