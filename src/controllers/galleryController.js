const { Gallery } = require('../models');
const { uploadFile } = require('../utils/fileUpload');

exports.createGallery = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.title || !req.body.type) {
      return res.status(400).json({
        message: 'Title and gallery type are required',
      });
    }

    // Validate file uploads
    if (!req.files?.image || !req.files.image[0]) {
      return res.status(400).json({
        message: 'Cover image is required',
      });
    }

    let imageUrl;
    let photoUrls = '';

    // Upload cover image
    try {
      imageUrl = await uploadFile(req.files.image[0], 'images');
    } catch (error) {
      return res.status(400).json({
        message: 'Error uploading cover image',
        error: error.message,
      });
    }

    // Handle photos for event type galleries
    if (req.body.type === 'event' && req.files?.photos) {
      try {
        const imageUrls = await Promise.all(
          req.files.photos.map((photo) => uploadFile(photo, 'photos'))
        );
        photoUrls = JSON.stringify(imageUrls);
      } catch (error) {
        return res.status(400).json({
          message: 'Error uploading gallery photos',
          error: error.message,
        });
      }
    }

    // Validate album URL for album type
    if (req.body.type === 'album' && !req.body.linkUrl) {
      return res.status(400).json({
        message: 'Link URL is required for album type galleries',
      });
    }

    // Create gallery record
    const gallery = await Gallery.create({
      title: req.body.title.trim(),
      image: imageUrl,
      linkUrl: req.body.linkUrl || '',
      type: req.body.type,
      photos: photoUrls,
    });

    // Return success response
    return res.status(201).json({
      message: 'Gallery created successfully',
      data: gallery,
    });
  } catch (error) {
    console.error('Gallery creation error:', error);
    return res.status(500).json({
      message: 'Error creating gallery',
      error: error.message,
    });
  }
};

// exports.createGallery = async (req, res) => {
//   try {
//     console.log('Body:', req.body);
//     console.log('Files', req.files);

//     let imageUrl;
//     const photos = req.files.photos;
//     let photoUrls;

//     if (req.files.image) {
//       imageUrl = await uploadFile(req.files.image[0], 'images');
//     }

//     if (photos) {
//       const imageUrls = [];
//       console.log('Photos:', photosArray);
//       let photoUrl;
//       for (let i = 0; i < photos.length; i++) {
//         console.log('Photo:', photos[i]);
//         photoUrl = await uploadFile(photos[i], 'photos');
//         imageUrls.push(photoUrl);
//       }
//       photoUrls = JSON.stringify(imageUrls);
//     } else {
//       photoUrls = '';
//     }

//     const gallery = await Gallery.create({
//       title: req.body.title,
//       image: imageUrl,
//       linkUrl: req.body.linkUrl,
//       type: req.body.type,
//       photos: photoUrls,
//     });

//     res.status(201).json(gallery);
//   } catch (error) {
//     res
//       .status(400)
//       .json({ message: 'Error creating gallery', error: error.message });
//   }
// };

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
