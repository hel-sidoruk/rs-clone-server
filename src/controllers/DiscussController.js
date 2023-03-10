const ApiError = require('../error/ApiError');
const { Discuss } = require('../models/models');

class DiscussController {
  async getComments(req, res) {
    const { id } = req.params;
    const { label } = req.query;
    const options = { kataId: id };
    if (label) options.label = label;
    let comments = await Discuss.findAndCountAll({
      where: options,
      order: [['createdAt', 'DESC']],
    });

    return comments
      ? res.json(comments)
      : res.status(404).json({ message: 'Comments not found' });
  }
  async getUserComments(req, res) {
    const { id } = req.params;
    let comments = await Discuss.findAndCountAll({
      where: { username: id },
      order: [['createdAt', 'DESC']],
    });
    return comments
      ? res.json(comments)
      : res.status(404).json({ message: 'Comments not found' });
  }

  async createComment(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;

      const comment = await Discuss.create({
        kataId: id,
        username: data.username,
        rank: data.rank,
        votes: 0,
        createdAt: new Date(Date.now()).toISOString(),
        spoiler: false,
        text: data.text,
        label: data.label,
        avatar: data.avatar,
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

      if (!Object.keys(updates).length) return res.json('No params to update');

      await Discuss.update(updates, {
        where: {
          id: commentId,
        },
      });

      return res.json({ status: 'ok' });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async deleteComment(req, res, next) {
    try {
      const { commentId } = req.params;

      await Discuss.destroy({ where: { id: commentId } });

      return res.json({ status: 'ok' });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new DiscussController();
