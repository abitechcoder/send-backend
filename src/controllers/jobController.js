const { Job } = require('../models');
const { uploadFile } = require('../utils/fileUpload');

exports.createJob = async (req, res) => {
  try {
    let documentUrl;

    if (req.files.document) {
      documentUrl = await uploadFile(req.files.document[0], 'documents');
    }

    const job = await Job.create({
      title: req.body.title,
      link_url: documentUrl,
      description: req.body.description,
      deadline: req.body.deadline,
      classification: req.body.classification,
      region: req.body.region,
    });

    res.status(201).json(job);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating job', error: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving all jobs', error: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'job not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving job', error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    let documentUrl;

    if (req.files.document) {
      documentUrl = await uploadFile(req.files.document[0], 'documents');
    }

    const [updated] = await Job.update(
      {
        title: req.body.title,
        link_url: documentUrl,
        description: req.body.description,
        deadline: req.body.deadline,
        classification: req.body.classification,
        region: req.body.region,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (updated) {
      const updatedJob = await Job.findByPk(req.params.id);
      res.json(updatedJob);
    } else {
      res.status(404).json({ message: 'job not found' });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating job', error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const deleted = await Job.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send('job deleted');
    } else {
      res.status(404).json({ message: 'job not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting job', error: error.message });
  }
};
