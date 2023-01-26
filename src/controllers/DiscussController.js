const ApiError = require('../error/ApiError');
const { Discuss } = require('../models/models');

class DiscussController {
  async getComments(req, res) {
    const { id } = req.params;
    let comments = await Discuss.findAll({
      where: {
        kataId: id,
      },
    });
    return res.json(comments);
  }

  async createComment(req, res, next) {
    try {
      const data = req.body;

      const comment = await Discuss.create({
        kataId: data.kataId,
        username: data.username,
        rank: data.rank,
        votes: 0,
        createdAt: new Date(Date.now()).toISOString(),
        spoiler: false,
        label: data.label,
      });

      return res.json(comment);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const updates = req.body;

      const comment = await Discuss.update(updates, {
        where: {
          id: commentId,
        },
      });

      return res.json(comment);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new DiscussController();