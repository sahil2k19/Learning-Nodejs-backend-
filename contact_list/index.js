const express = require('express'); //importing express here
const path = require('path'); // importing path

const port = 8000;  // having port

const app = express();  //creating app here app is created

app.set('view engine', 'ejs');   // setting our template engine (ejs here)

app.set('views', path.join(__dirname, 'views')); // this makes views available for us to use. which contains template init;

app.use(express.urlencoded());// this is middleware// this read input data of form and provide in form of key value pair for us

app.use(express.static('assets')); // this is also a middleware .. here we load a ASSETS here (so whenever the sites look for css and js or any images located here )
//in our template whenever we write any css and js or paste any images it always look for assests/css/home.css in our case



var contact_list = [ // we created list of contacts
    {
        name: 'sahil',
        number: '1234456',
    },
    {
        name: 'ritik',
        number: '1234455667',
    }
]

app.get('/', (req, res) => {  // here '/' this is router and the arrow function is controller function ;

    return res.render('home', { // render home template which we created in views named home.ejs
        title: 'My Contacts List', // we pass title which we use in template to pass js to make dynamic content
        contact_list: contact_list, // we pass whole list of contact here which we created above ;
    });
})

app.get('/practice', (req, res) => { //same as above ;
    return res.render('practice', {
        title: 'Let us Play',

    });
})

app.post('/create-contact', (req, res) => {  // here we used post as we send data to server but here we store data to local RAM ( and also '/created-contact' is the place where action will happen)


    // contact_list.push({
    //     name: req.body.name, // req.body.name = inputed name in template home.ejs
    //     number: req.body.number, req.body.number = inputed number in template home.ejs
    // })


    contact_list.push(req.body);// here we push the input in contact_list list and req.body = shortform of aboue commented method ;
    return res.redirect('/');// redirect to home after all the  store data in RAM;
})



app.listen(port, (err) => { // this is listen which is must. it will go on the port:8000(mention above) if error then if(err) will execute ;
    if (err) {// if we somehow go on wrong url than this error massage encounter
        console.log('error in the server', err);
        return;
    }
    console.log('yup my express is running on port ', port);
})

