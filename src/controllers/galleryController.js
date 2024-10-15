const { Gallery } = require('../models');
const { uploadFile } = require('../utils/fileUpload');

exports.createGallery = async (req, res) => {
  try {
    let imageUrl;

    if (req.files.image) {
      imageUrl = await uploadFile(req.files.image[0], 'images');
    }

    const gallery = await Gallery.create({
      title: req.body.title,
      image: imageUrl,
      linkUrl: req.body.linkUrl,
    });

    res.status(201).json(gallery);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating gallery', error: error.message });
  }
};

exports.getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(gallery);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving all gallery', error: error.message });
  }
};

exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);
    if (gallery) {
      res.json(gallery);
    } else {
      res.status(404).json({ message: 'Gallery not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving gallery', error: error.message });
  }
};

exports.updateGallery = async (req, res) => {
  let imageUrl;

  try {
    if (req.files.image) {
      imageUrl = await uploadFile(req.files.image[0], 'images');
    }

    const [updated] = await Gallery.update(
      {
        title: req.body.title,
        image: imageUrl,
        linkUrl: req.body.linkUrl,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (updated) {
      const updatedGallery = await Gallery.findByPk(req.params.id);
      res.json(updatedGallery);
    } else {
      res.status(404).json({ message: 'Gallery not found' });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating gallery', error: error.message });
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const deleted = await Gallery.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send('Gallery deleted');
    } else {
      res.status(404).json({ message: 'Gallery not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting gallery', error: error.message });
  }
};
