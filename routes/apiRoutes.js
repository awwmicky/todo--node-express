const router = require('express').Router();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const db = low( new FileSync('../db.json') );

if ( !db.get('todo_list').value() ) {
    db.defaults({ todo_list : [] }).write()
}


router.get('/view-all-tasks', (req,res) => {
    
    const data = db.get('todo_list').value();
    // console.table( data )
    res.send( data )
})

router.get('/view-one-task/:id', (req,res) => {
    
    const data = db.get('todo_list')
    .find({ id : +(req.params.id) }).value();
    
    // console.log( data )
    res.send( data )
})

router.post('/create-task', (req,res) => {
    
    const info = {
        id: Date.now(), 
        task: req.body.task,
        notes: "",
        completed: false
    };
    
    db.get('todo_list')
    .push(info)
    .write()
    
    // console.log( info )
    res.send( info )
})

router.put('/update-task/:id', (req,res) => {
    
    db.get('todo_list')
    .find({ id : +(req.params.id) })
    .assign( req.body )
    .write()

    const data = db.get('todo_list').value();
    // .find({ id : +(req.params.id) }).value();

    // console.log(data)
    res.send(data)
})

router.patch('/adjust-task/:id', (req,res) => {
    
    db.get('todo_list')
    .find({ id : +(req.params.id) })
    .assign({ completed : !req.body.completed })
    .write()

    const data = db.get('todo_list')
    .find( {id : +(req.params.id)} ).value();

    // console.log( data )
    res.send( data )
})

router.delete('/remove-task/:id', (req,res) => {
    
    // const data = db.get('todo_list')
    // .find({ id : +(req.params.id) }).value();
    
    db.get('todo_list')
    .remove({ id : +(req.params.id) })
    .write()
    
    const data = db.get('todo_list').value();

    // console.log( data )
    res.send( data )
})

module.exports = router;