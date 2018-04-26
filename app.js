const express = require('express')
const app     = express()
const hbs     = require('hbs') 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Restaurant = require("./models/Restaurant")


app.set('views',__dirname + '/views');
app.set('view engine', 'hbs');
app.set(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/foodPlaces");

app.get("/", (req, res) =>{
 Restaurant.find()
 .limit(20)
 .then(rs=>{
     res.render("home",{restaurants:rs});
 })
});

app.get("/:id",(req,res)=>{
   Restaurant.findById(req.params.id)
   .then(restaurant=>{
       res.render("detail",restaurant);
   })
})

app.listen(3000, err=>console.log('Escuchando'))