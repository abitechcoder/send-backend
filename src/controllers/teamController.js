const { Team } = require('../models');
const { uploadFile } = require('../utils/fileUpload');

exports.createTeamMember = async (req, res) => {
  try {
    let imageUrl;

    if (req.files.image) {
      imageUrl = await uploadFile(req.files.image[0], 'images');
    }

    const team = await Team.create({
      role: req.body.role,
      image: imageUrl,
      name: req.body.name,
      board_member: req.body.board_member,
      facebook_profile: req.body.facebook_profile,
      instagram_profile: req.body.instagram_profile,
    });

    res.status(201).json(team);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating team member', error: error.message });
  }
};

exports.getAllTeamMembers = async (req, res) => {
  try {
    const team = await Team.findAll();
    res.json(team);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving all team members',
      error: error.message,
    });
  }
};

exports.getTeamMemberById = async (req, res) => {
  try {
    const team_member = await Team.findByPk(req.params.id);
    if (team_member) {
      res.json(team_member);
    } else {
      res.status(404).json({ message: 'team member not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving team_member',
      error: error.message,
    });
  }
};

exports.updateTeamMemberInfo = async (req, res) => {
  let imageUrl;

  try {
    if (req.files.image) {
      imageUrl = await uploadFile(req.files.image[0], 'images');
    }

    const [updated] = await Team.update(
      {
        role: req.body.role,
        image: imageUrl,
        name: req.body.name,
        board_member: req.body.board_member,
        facebook_profile: req.body.facebook_profile,
        instagram_profile: req.body.instagram_profile,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (updated) {
      const updatedTeamMember = await Team.findByPk(req.params.id);
      res.json(updatedTeamMember);
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res
      .status(400)
      .json({
        message: 'Error updating team member information',
        error: error.message,
      });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    const deleted = await Team.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send('Team member deleted');
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting team member', error: error.message });
  }
};
