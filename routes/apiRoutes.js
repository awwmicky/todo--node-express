const router = require('express').Router();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const db = low( new FileSync('../db.json') );

if ( !db.get('todo_list').value() ) {
    db.defaults({ todo_list : [] }).write()
}


router.get('/view-all-tasks', (req,res) => {
    const data = db.get('todo_list').value();
    // console.table(data)
    res.send(data)
})

router.post('/create-task', (req,res) => {
    console.log('post request')
    const info = {
        id: Date.now(), 
        task: req.body.task,
        completed: false
    };
    const data = db.get('todo_list').push(info).write();
    // console.table(data)
    res.send(info)
})

router.put('/update-task/:id', (req,res) => {
    console.log('update request')
    res.send('update response')
})

router.delete('/remove-task/:id', (req,res) => {
    console.log('delete request')
    res.send('delete response')
})

module.exports = router;