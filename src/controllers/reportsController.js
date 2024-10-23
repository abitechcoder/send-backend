const { Report } = require('../models');
const { uploadFile } = require('../utils/fileUpload');

exports.createReport = async (req, res) => {
  try {
    let imageUrl, documentUrl;

    if (req.files.image) {
      imageUrl = await uploadFile(req.files.image[0], 'images');
    }

    if (req.files.document) {
      documentUrl = await uploadFile(req.files.document[0], 'documents');
    }

    const report = await Report.create({
      title: req.body.title,
      image_url: imageUrl,
      report_url: documentUrl,
      report_type: req.body.report_type,
    });

    res.status(201).json(report);
  } catch (error) {
    console.error('Error:', error.message);
    res
      .status(400)
      .json({ message: 'Error creating report', error: error.message });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving all reports',
      error: error.message,
    });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (report) {
      res.json(report);
    } else {
      res.status(404).json({ message: 'report not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving report',
      error: error.message,
    });
  }
};

exports.updateReport = async (req, res) => {
  try {
    let imageUrl, documentUrl;

    if (req.files.image) {
      imageUrl = await uploadFile(req.files.image[0], 'images');
    }

    if (req.files.document) {
      documentUrl = await uploadFile(req.files.document[0], 'documents');
    }
    const [updated] = await Report.update(
      {
        title: req.body.title,
        image_url: imageUrl,
        report_url: documentUrl,
        report_type: req.body.report_type,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (updated) {
      const updatedReport = await Report.findByPk(req.params.id);
      res.json(updatedReport);
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating report', error: error.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const deleted = await Report.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send('Report deleted');
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting report', error: error.message });
  }
};
