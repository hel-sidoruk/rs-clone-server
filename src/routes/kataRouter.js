const Router = require('express').Router;
const router = new Router();
const KataController = require('../controllers/KataController');
const DiscussController = require('../controllers/DiscussController');
const SolutionsController = require('../controllers/SolutionsController');
const auth = require('../middleware/authMiddleware');

router.post('/', KataController.create);
router.get('/', auth, KataController.getAll);
router.get('/random', KataController.getRandom);
router.get('/:id', KataController.getOne);
router.get('/:id/discuss', DiscussController.getComments);
router.post('/:id/discuss', DiscussController.createComment);
router.patch('/:id/discuss/:commentId', DiscussController.updateComment);
router.delete('/:id/discuss/:commentId', DiscussController.deleteComment);
router.get('/:kataId/solutions', SolutionsController.getSolutions);
router.post('/:kataId/solutions', SolutionsController.addSolution);
router.patch(
  '/:kataId/solutions/:solutionId',
  SolutionsController.updateSolution
);

module.exports = router;
