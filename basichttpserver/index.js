const express = require('express');

const port = 8000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

var contact_list = [
    {
        name: 'sahil',
        phone: '989898',
    },
    {
        name: 'sahil',
        phone: '212212121',
    }
]

app.get('/practice', (req, res) => {
    return res.render('practice', {
        title: 'lets us play',
    })
})

app.get('/', (req, res) => {
    return res.render('home', {
        title: 'my contact list',
        contact_list: contact_list,
    })
})

app.post('/created-contact', (req, res) => {
    contact_list.push({
        name: req.body.name,
        phone: req.body.name,
    })
    return res.redirect('/');
})





app.listen(port, (err) => {
    if (err) {
        console.log('error in the server');
        return;
    }
    console.log('yup my express is running on port ', port);
})






// const express = require('express');
// const app = express();

// const path = require('path');
// const port = 8000;

// app.set('views engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));


// app.get('/', (req, res) => {
//     console.log(__dirname);
//     return res.render('home');
// })



// app.listen(port, (err) => {
//     if (err) {
//         console.log('error');
//         return;
//     }
//     console.log('succesfully return');
// })


