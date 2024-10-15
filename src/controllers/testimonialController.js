const { Testimonial } = require('../models');
const { uploadFile } = require('../utils/fileUpload');

exports.createTestimonial = async (req, res) => {
  try {
    let imageUrl, documentUrl;

    if (req.files.image) {
      imageUrl = await uploadFile(req.files.image[0], 'images');
    }

    if (req.files.document) {
      documentUrl = await uploadFile(req.files.document[0], 'documents');
    }

    const testimonial = await Testimonial.create({
      name: req.body.name,
      title: req.body.title,
      text: req.body.text,
      image: imageUrl,
      link_url: documentUrl,
    });

    res.status(201).json(testimonial);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating testimonial', error: error.message });
  }
};

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving all testimonials',
      error: error.message,
    });
  }
};

exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (testimonial) {
      res.json(testimonial);
    } else {
      res.status(404).json({ message: 'testimonial not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving testimonial',
      error: error.message,
    });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    let imageUrl, documentUrl;

    if (req.files.image) {
      imageUrl = await uploadFile(req.files.image[0], 'images');
    }

    if (req.files.document) {
      documentUrl = await uploadFile(req.files.document[0], 'documents');
    }

    const [updated] = await Testimonial.update(
      {
        name: req.body.name,
        title: req.body.title,
        text: req.body.text,
        image: imageUrl,
        link_url: documentUrl,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (updated) {
      const updatedTestimonial = await Testimonial.findByPk(req.params.id);
      res.json(updatedTestimonial);
    } else {
      res.status(404).json({ message: 'testimonial not found' });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating testimonial', error: error.message });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const deleted = await Testimonial.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send('testimonial deleted');
    } else {
      res.status(404).json({ message: 'testimonial not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting testimonial', error: error.message });
  }
};
