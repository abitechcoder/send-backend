const { Program } = require('../models');
const { uploadFile } = require('../utils/fileUpload');

exports.createProgram = async (req, res) => {
  try {
    let imageUrl;

    if (req.files.image) {
      imageUrl = await uploadFile(req.files.image[0], 'images');
    }

    const program = await Program.create({
      title: req.body.title,
      image: imageUrl,
      overview: req.body.overview,
    });

    res.status(201).json(program);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating program', error: error.message });
  }
};

exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(programs);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving programs', error: error.message });
  }
};

exports.getProgramById = async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (program) {
      res.json(program);
    } else {
      res.status(404).json({ message: 'Program area not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving program area', error: error.message });
  }
};

exports.updateProgram = async (req, res) => {
  try {
    let imageUrl;

    if (req.files.image) {
      imageUrl = await uploadFile(req.files.image[0], 'images');
    }

    const [updated] = await Program.update(
      {
        title: req.body.title,
        image: imageUrl,
        overview: req.body.overview,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (updated) {
      const updatedProgram = await Program.findByPk(req.params.id);
      res.json(updatedProgram);
    } else {
      res.status(404).json({ message: 'Program not found' });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating program', error: error.message });
  }
};

exports.deleteProgram = async (req, res) => {
  try {
    const deleted = await Program.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send('Program area deleted');
    } else {
      res.status(404).json({ message: 'Program area not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting program area', error: error.message });
  }
};
