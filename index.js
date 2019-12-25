const express = require('express');
const path = require('path');
const port = 8000;
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
    return res.render('todo', {
        title: 'To-do App',
        to_do_list: toDoList
    });
});

app.post('/create-to-do-list',function(req, res){
    toDoList.push({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    })
    return res.redirect('back');
});
app.listen(port, function(err){
    if (err) {console.log(`Error in running the server : ERROR = ${err}`);
    }
    console.log(`Server is running in PORT : ${port}`);
});