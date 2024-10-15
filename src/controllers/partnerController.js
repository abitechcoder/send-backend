const { Partner } = require('../models');
const { uploadFile } = require('../utils/fileUpload');

exports.createPartner = async (req, res) => {
  try {
    let imageUrl;

    if (req.files.logo) {
      imageUrl = await uploadFile(req.files.logo[0], 'images');
    }

    const partner = await Partner.create({
      name: req.body.name,
      logo: imageUrl,
    });

    res.status(201).json(partner);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating partner', error: error.message });
  }
};

exports.getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(partners);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving partners', error: error.message });
  }
};

exports.getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findByPk(req.params.id);
    if (partner) {
      res.json(partner);
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving partner', error: error.message });
  }
};

exports.updatePartner = async (req, res) => {
  let imageUrl;
  const partnerId = req.params.id;

  try {
    if (req.files.logo) {
      imageUrl = await uploadFile(req.files.logo[0], 'images');
    }

    const [updated] = await Partner.update(
      {
        name: req.body.name,
        logo: imageUrl,
      },
      {
        where: { id: partnerId },
      }
    );
    if (updated) {
      const updatedPartner = await Partner.findByPk(req.params.id);
      res.json(updatedPartner);
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating newsletter', error: error.message });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const deleted = await Partner.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send('Partner deleted');
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting partner', error: error.message });
  }
};
