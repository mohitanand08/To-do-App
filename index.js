const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Todo = require('./models/todo');
const app = express();
// middleware
app.use(express.urlencoded());
app.use(express.static('assets'));

// Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
// To-do list
var toDoList = [
    {
        description: 'get veg',
        category: 'Personal',
        date: '08/09/2019'
    },
    {
        description: 'Do english Home work',
        category: 'School',
        date: '18/09/2019'
    }
]
// Controller
app.get('/', function(req, res){
    Todo.find({}, function(err, todos){
        if(err){
            console.log('Error in fetching data from db');
            return;
        }
        return res.render('todo', {
            title: 'To-do App',
            to_do_list: todos
        });
    })
});
// Add Task to the To-do-List
app.post('/create-to-do-list',function(req, res){
    Todo.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function(err, newTodo){
        if(err){
            console.log('Error in creating a To-do Task');
            return;
        }
        res.redirect('back')     
    });
});
// Delete Task from the to-do-list
app.get('/delete-task', function(req, res){
    // get the id from the query in the ul
    let id = req.query.id;
    // find the todo in the database using id and delete it
    Todo.findByIdAndDelete(id, function(err){
        if(err){ console.log('Error in deleting an object from the database');
        return;
    }
    return res.redirect('back');
    });
});

app.listen(port, function(err){
    if (err) {console.log(`Error in running the server : ERROR = ${err}`);
    }
    console.log(`Server is running in PORT : ${port}`);
});