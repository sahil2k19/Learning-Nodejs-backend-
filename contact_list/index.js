const express = require('express'); //importing express here


const path = require('path'); // importing path



const port = 8000;  // having port



const db = require('./config/mongoose'); // connecting to mongoose (db);




// we export Contact from models/contact now we import here
const Contact = require('./models/contact');//we will use this contact to use Contact in models


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







// here '/' this is router and the arrow function is controller function ;
app.get('/', (req, res) => {

    //fetching contacts
    //in below code find({}) = finding all contacts
    //we can specify here to find specific contacts(like = find({name:sahil}, ) which can find all the contacts having name sahil;
    Contact.find({}, (err, contacts) => {
        if (err) {
            console.log('error in fetching contacts from db');
            return;
        }
        return res.render('home', {
            title: 'My Contacts list',
            contact_list: contacts,
        })
    })

    // return res.render('home', { // render home template which we created in views named home.ejs
    // // we now nomore use below code as now we have our own database 
    //     title: 'My Contacts List', // we pass title which we use in template to pass js to make dynamic content
    //     contact_list: contact_list, // we pass whole list of contact here which we created above ;
    // });
})







app.get('/practice', (req, res) => { //same as above ;
    return res.render('practice', {
        title: 'Let us Play',

    });
})
// in below comented code here number act as variable like (number = 'whatever we pass on html or ejs ')
// if i change number to something else then like (address = 'whatever we pass on html or ejs')






// app.get('/delete-contact/:number', (req, res) => { // we have to remove (:number) for query part
app.get('/delete-contact/', (req, res) => { //we will not pass (;number) 
    //this is first part 

    // console.log(req.params);
    // let phone = req.params.number;


    //second part using local variable contact_list

    // console.log(req.query.number);
    // console.log(req.query.name);
    // let number = req.query.number;


    // //in below code we find index in contact_list that matches query ;

    // // in findIndex() we pass function inside that, if that function is true then it will return index (in contactIndex here)
    // let contactIndex = contact_list.findIndex((x) => { return x.number == number });

    // // console.log(contactIndex);
    // if (contactIndex != -1) {
    //     contact_list.splice(contactIndex, 1); // array.splice(index,howmany, item1.....itemx);
    //     //splice() help in add, remove or overwrite
    // }



    //third part
    // get id from query in the ul
    let id = req.query.id; //req.query.fetch(shortcut to memorize);

    //find the contact in the database using id and delete 
    Contact.findByIdAndDelete(id, (err) => {
        if (err) {
            console.log('error in deleting an object ');
            return;
        }
    })


    return res.redirect('back'); //redirect to the homepage(where we currently are);
})





// here we used post as we send data to server but here we store data to local RAM ( and also '/created-contact' is the place where action will happen)
// this is the controller which create (CONTACTS);
app.post('/create-contact', (req, res) => {


    // contact_list.push({
    // req.body.name = inputed name in template home.ejs
    //     name: req.body.name,
    //req.body.number = inputed number in template home.ejs
    //     number: req.body.number, 
    // })


    //here req.body object allow us to access data in a string or json object from the client side
    //so after creating our own database we dont need (contact_list variables to push to our contacts)
    // contact_list.push(req.body);


    //now we create using our MONGOdb database 
    // we use Contact model below;
    Contact.create({
        name: req.body.name, //req.body will insert (shortcut to memorize)
        number: req.body.number,
    }, (err, newContact) => { //if there is an error
        if (err) {
            console.log('error in creating contact!');
            return;
        }
        // if no error
        console.log("**********", newContact);
        return res.redirect('back');
    })


    // redirect to home after all the  store data in RAM;
    // return res.redirect('/');
})






app.listen(port, (err) => { // this is listen which is must. it will go on the port:8000(mention above) if error then if(err) will execute ;
    if (err) {// if we somehow go on wrong url than this error massage encounter
        console.log('error in the server', err);
        return;
    }
    console.log('yup my express is running on port ', port);
})

