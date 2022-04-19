import { execute } from '@getvim/execute'

const backupController = {}

backupController.startBackupPost = async(req, res) => {
    const date = new Date();
    const currentDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
    console.log('Got body:', req.body);
    const db_username = req.body.username;
    const db_name = req.body.name;
    if(db_username == undefined && db_name == undefined){
        res.send(`Request received is invalid, must be of format ./backup?username=\${Username}&name=\${Name}`)
        return;
    }
    if(db_name == undefined){
        res.send(`Request received is invalid, missing name, must be of format ./backup?username=\${Username}&name=\${Name}`)
        return;
    }
    if(db_username == undefined){
        res.send(`Request received is invalid, missing username, must be of format ./backup?username=\${Username}&name=\${Name}`)
        return;
    }
    if(db_username != undefined && db_name != undefined){
        const fileName = `${db_name}-backup-${currentDate}.tar`;
        backup(db_username, db_name, fileName)
        res.send(`Request received: backup launched for ${db_name} of the user ${db_username}`)
    }
}

backupController.startBackupGet = async(req, res) => {
    const date = new Date();
    const currentDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
    const db_username = req.query.username
    const db_name = req.query.name
    if(db_username == undefined && db_name == undefined){
        res.send(`Request received is invalid, must be of format ./backup?username=\${Username}&name=\${Name}`)
        return;
    }
    if(db_name == undefined){
        res.send(`Request received is invalid, missing name, must be of format ./backup?username=\${Username}&name=\${Name}`)
        return;
    }
    if(db_username == undefined){
        res.send(`Request received is invalid, missing username, must be of format ./backup?username=\${Username}&name=\${Name}`)
        return;
    }
    if(db_username != undefined && db_name != undefined){
        const fileName = `${db_name}-backup-${currentDate}.tar`;
        backup(db_username, db_name, fileName)
        res.send(`Request received: backup launched for ${db_name} of the user ${db_username}`)
    }
}

const backup = async(db_username, db_name, fileName) => {
    execute(`pg_dump -U ${db_username} -d ${db_name} -f ${fileName} -F t`,).then(async () => {
        console.log("Back up complete");
    }).catch(err => {
        console.log(err);
    })
}

const backupadv = async(db_username, db_name, db_host, db_port, fileName) => {
    execute(`pg_dump -U ${db_username} -d ${db_name} -h ${db_host} -p ${db_port} -W -f ${fileName} -F t`,).then(async () => {
        console.log("Back up complete");
    }).catch(err => {
        console.log(err);
    })
}

backupController.ping = async(req, res) => {
    res.send(`pong`)
}

backupController.startBackupPostAdv = async(req, res) => {
    const date = new Date();
    const currentDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
    console.log('Got body:', req.body);
    const db_username = req.body.username;
    const db_name = req.body.name;
    const db_host = req.body.host;
    const db_port = req.body.port;
    if(db_username == undefined || db_name ==  undefined || db_host == undefined || db_port == undefined){
        res.send(`Missing arg in post : required`)
        return;
    }
    if(db_username != undefined && db_name != undefined){
        const fileName = `${db_name}-backup-${currentDate}.tar`;
        backupadv(db_username, db_name, db_host, db_port, fileName)
        res.send(`Request received: backup launched for ${db_name} of the user ${db_username}`)
    }
}

export default backupController