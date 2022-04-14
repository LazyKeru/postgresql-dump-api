import express from 'express';
import backupController from './controller/backup.js'

var router = express.Router();

router.get('/backup', backupController.startBackup)
router.get('/ping', backupController.ping)

export default router 