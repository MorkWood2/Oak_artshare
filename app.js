const express     = require('express'),

      app         = express(),

      bodyParser  = require('body-parser'),

      mongoose    = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp",  {useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine' , 'ejs');


//schema setup

let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

let Campground = mongoose.model("Campground", campgroundSchema );

// Campground.create(
//   {
// name:'Huns Nest',
// image: 'https://www.peekskillartsalliance.org/wp-content/uploads/2019/03/FE71D398-47F0-41FA-8C50-758CFF254C5C-400x400.jpeg',
// description: 'Loose abstract post impressionist color piece'
// },(err, campground) =>{
//   if(err){
//     console.log(err)
//   }else{
//     console.log('newly created campground');
//     console.log(campground)
//   }
// })
// let campgrounds = [
//   {name:'Salmon Creek', image: 'https://www.nassaumuseum.org/img/Clough-05Now-Then-400x400.jpg'},
//   {name:'Huns Nest', image: 'https://www.peekskillartsalliance.org/wp-content/uploads/2019/03/FE71D398-47F0-41FA-8C50-758CFF254C5C-400x400.jpeg'},
//   {name:'Pipper Stree', image: 'https://www.koningenart.com/wp-content/uploads/2017/12/therocks-400x400.jpg'},
//   {name:'Nundoo Fort', image: 'https://www.absolutearts.com/portfolio3/o/ogleron/foto.jpg'},
//   {name:'Lumn River', image: 'https://www.galleryantonia.com/uploads/1/2/9/5/12951327/sovek-beach-day.jpg'},
//   {name:'J reee', image: 'https://guyhepner.com/wp-content/uploads/2015/04/JeanMichelBasquiatErnokEstatePrint-400x400.png'}
// ];

app.get('/', (req, res) =>{
  res.render('landing')
});

//INDEX Route, show all campgrounds

app.get('/campgrounds', (req, res) =>{
//get all campground from database
Campground.find({}, (err, allCampgrounds) =>{
  if(err){
    console.log(err)
  } else {
   res.render('campgrounds', {campgrounds:allCampgrounds});
  }
})

});
// CREATE Route, add new campground to DB
app.post('/campgrounds', (req, res) =>{
  // res.send('you hit the right route')
//get data from form and add to campground array
let name = req.body.name;
let image = req.body.image;
let description = req.body.description;
let newCampground = {name:name , image:image , description:description}
//create new campgroundand save to DB
Campground.create(newCampground, (err, newlyCreated) => {
  if(err){
    console.log(err)
  } else {
    // redirect back to campground page
    res.redirect('/campgrounds');
  }
})

});
//NEW Route - Show form to create new background
app.get('/campgrounds/new', (req, res) =>{
  res.render('new.ejs');
});
//SHOW Route - shows more info about more than 1 campground
app.get('/campgrounds/:id', (req, res) =>{
  //find campground with provided id
  Campground.findById(req.params.id, (err, foundCampground)=>{
    if(err){
      console.log(err)
    } else {
        //render show template with provided id
      res.render('show', {campground: foundCampground});
    }
  });


});

app.listen(3000, () =>{
  console.log('Yelpcamp server has started')
});
