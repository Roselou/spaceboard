const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const nasaController = require('../controllers/nasaController');

//Nasa Routes
router.get('/api/nasa', nasaController.index);
router.post('/api/nasa', nasaController.create);
router.get('/api/nasa/:nasa_id', nasaController.show);
router.put('/api/nasa/:nasa_id', nasaController.update);

//Comment Routes
router.get('/api/nasa/:nasa_id/comments', commentController.index);
router.get('/api/nasa/:nasa_id/comments/:comment_id', commentController.show);
router.post('/api/nasa/:nasa_id/comments', commentController.create);
router.put('/api/nasa/:nasa_id/comments/:comment_id', commentController.update);
router.delete('/api/nasa/:nasa_id/comments/:comment_id', commentController.destroy);

module.exports = router;