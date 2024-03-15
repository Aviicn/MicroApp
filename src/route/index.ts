import * as express from 'express'
import articleController from '../controllers/articleController'
import partaiController from '../controllers/partaiController'
import paslonController from '../controllers/paslonController'
import voteController from '../controllers/voteController'
import authController from '../controllers/authController'
import AuthMiddleware from '../middlewares/Auth'

const router = express.Router();

// Route Article
router.get('/articles', AuthMiddleware.Auth, articleController.getAll)
router.get('/article/:id', AuthMiddleware.Auth, articleController.getOne)
router.get('/article/user/:id', AuthMiddleware.Auth, articleController.getByUser)

router.post('/article', AuthMiddleware.Auth, articleController.create)
router.patch("/article/:id", AuthMiddleware.Auth,  articleController.update)
router.delete("/article/:id", AuthMiddleware.Auth, articleController.delete)

// Route Partai
router.get('/partais', AuthMiddleware.Auth, partaiController.getAll);
router.get('/partai/:id', AuthMiddleware.Auth, partaiController.getOne);
router.post('/partai', AuthMiddleware.Auth,  partaiController.create);
router.patch("/partai/:id", AuthMiddleware.Auth,  partaiController.update)
router.delete("/partai/:id", AuthMiddleware.Auth, partaiController.delete)

// Route Paslon
router.get('/paslons', AuthMiddleware.Auth, paslonController.getAll);
router.get('/paslon/:id', AuthMiddleware.Auth, paslonController.getOne);
router.post('/paslon', AuthMiddleware.Auth,  paslonController.create);
router.patch("/paslon/:id", AuthMiddleware.Auth, paslonController.update)
router.delete("/paslon/:id", AuthMiddleware.Auth, paslonController.delete)

// Route Vote
router.post('/vote', AuthMiddleware.Auth, voteController.create)
router.get('/votes', AuthMiddleware.Auth, voteController.getAll)
router.get('/vote/:id', AuthMiddleware.Auth, voteController.getOne)

// Route Auth
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.get('/auth',  authController.getAll)
router.get('/auth/:id', AuthMiddleware.Auth, authController.getOne)

export default router;