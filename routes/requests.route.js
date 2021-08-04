const {Router} = require('express')
const { requestsController } = require('../controllers/requests.controller')

const router = Router()


router.get('/requests', requestsController.getRequests)
router.get('client/:id/requests', requestsController.getRequestsByClient)
router.post('/client/:id/request', requestsController.createRequest)
router.patch('/client/:id/request/:id', requestsController.editRequest)
router.post('/appraisers/:id', requestsController.addAppraisers)
router.delete('/request/:id', requestsController.deleteRequest)

module.exports = router