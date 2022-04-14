import { execute } from '@getvim/execute'

const backupController = {}

backupController.startBackup = async(req, res) => {
    const date = new Date();
    const currentDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
    const db_username = req.query.username
    const db_name = req.query.name
    if(db_username == undefined && db_name == undefined)
        res.send(`Request received is invalid, must be of format ./backup?username=\${Username}&name=\${Name}`)
    if(req.query.name == undefined)
        res.send(`Request received is invalid, missing name, must be of format ./backup?username=\${Username}&name=\${Name}`)
    if(req.query.username == undefined)
    res.send(`Request received is invalid, missing username, must be of format ./backup?username=\${Username}&name=\${Name}`)
    if(db_username != null && db_name != null){
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

backupController.ping = async(req, res) => {
    res.send(`pong`)
}

export default backupController