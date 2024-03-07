import * as express from 'express'

import partaiController from '../controllers/partaiController'
import paslonController from '../controllers/paslonController'
import voteController from '../controllers/voteController'



const router = express.Router();

// Route Partai
router.get('/partais', partaiController.getAll);
router.get('/partai/:id', partaiController.getOne);
router.post('/partai',  partaiController.create);
router.patch("/partai/:id",  partaiController.update)
router.delete("/partai/:id", partaiController.delete)

// Route Paslon
router.get('/paslons', paslonController.getAll);
router.get('/paslon/:id', paslonController.getOne);
router.post('/paslon',  paslonController.create);
router.patch("/paslon/:id", paslonController.update)
router.delete("/paslon/:id", paslonController.delete)

// Route Vote
router.post('/vote', voteController.create)
router.get('/votes',voteController.getAll)
router.get('/vote/:id', voteController.getOne)


export default router;