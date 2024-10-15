const { Project } = require('../models');
const { uploadFile } = require('../utils/fileUpload');

exports.createProject = async (req, res) => {

  try {
    let imageUrl, documentUrl;

    if (req.files.image) {
      imageUrl = await uploadFile(req.files.image[0], 'images');
    }

    if (req.files.document) {
      documentUrl = await uploadFile(req.files.document[0], 'documents');
    }

    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      donor: req.body.donor,
      status: req.body.status,
      partner: req.body.partner,
      location: req.body.location,
      duration: req.body.duration,
      budget: req.body.budget,
      program_area: req.body.program_area,
      report: documentUrl,
      problem_image: imageUrl,
      problem_desc: req.body.problem_desc,
      solution_desc: req.body.solution_desc,
      beneficiaries_desc: req.body.beneficiaries_desc
    });

    res.status(201).json(project);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating project', error: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving all projects',
      error: error.message,
    });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'project not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving project',
      error: error.message,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    let imageUrl, documentUrl;

    if (req.files.image) {
      imageUrl = await uploadFile(req.files.image[0], 'images');
    }

    if (req.files.document) {
      documentUrl = await uploadFile(req.files.document[0], 'documents');
    }
    const [updated] = await Project.update(
      {
        name: req.body.name,
        description: req.body.description,
        donor: req.body.donor,
        status: req.body.status,
        partner: req.body.partner,
        location: req.body.location,
        duration: req.body.duration,
        budget: req.body.budget,
        program_area: req.body.program_area,
        report: documentUrl,
        problem_image: imageUrl,
        problem_desc: req.body.problem_desc,
        solution_desc: req.body.solution_desc,
        beneficiaries_desc: req.body.beneficiaries_desc
      },
      {
        where: { id: req.params.id },
      }
    );
    if (updated) {
      const updatedProject = await Project.findByPk(req.params.id);
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating project', error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send('project deleted');
    } else {
      res.status(404).json({ message: 'project not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting project', error: error.message });
  }
};
