import express from 'express';
import backupController from './controller/backup.js'

import bodyParser from 'body-parser';

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })

var router = express.Router();

router.get('/backup', backupController.startBackupGet)
router.post('/backup', jsonParser, backupController.startBackupPost)
router.post('/backupadv', jsonParser, backupController.startBackupPostAdv)
router.get('/ping', backupController.ping)

export default router 