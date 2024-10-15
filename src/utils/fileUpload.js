const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../config/firebase');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB file size limit
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'application/pdf'
    ) {
      cb(null, true);
    } else {
      cb(
        new Error('Invalid file type, only JPEG, PNG and PDF is allowed!'),
        false
      );
    }
  },
});

const uploadFile = async (file, path) => {
  try {
    const dateTime = Date.now();
    const fileName = `${dateTime}-${file.originalname}`;
    const storageRef = ref(storage, `${path}/${fileName}`);

    const snapshot = await uploadBytes(storageRef, file.buffer);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading file: ', error);
    throw error;
  }
};

module.exports = { uploadFile, upload };
