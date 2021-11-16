var express = require('express')
var mongoose= require('mongoose')
var app=express()
var bodyParser=require('body-parser')
var i1=[]

app.set('view engine', 'ejs')


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb://localhost/Todo",{useNewUrlParser:true,useUnifiedTopology:true})
const itemSchema={
  name:{
    type:String,
    required:"Name of the task is required!"
  }
}
const Item=mongoose.model('Item', itemSchema)

const item1=new Item({
  name:"...",
})
const item2=new Item({
  name:"@Aderline",
})
const item3=new Item({
  name:"...",
})
const d=[item1,item2,item3]



app.get("/", (req,res)=>{
  
  Item.find({},(err,f)=>{
    if(f.length===0){
       Item.insertMany(d,(err)=>{
         if(err){
          console.log(err);
        }
         else{
          console.log("successfully saved item to DB!")
             }
               })
            res.redirect('/')   
     } 
    else{
      console.log(f)
      res.render('list',{newListItems:f})
    }
    
  })
})
app.post("/",(req,res)=>{
  //  i = req.body.n
  // console.log(i)
  // i1.push(req.body.n)
  // res.render('list',{newListItem:i})
  const item= new Item({
    name: req.body.n,
  })
  item.save()
  res.redirect("/")
})
app.post("/delete",(req,res)=>{
  console.log(req.body.checkbox)
  const check=req.body.checkbox
  Item.findByIdAndRemove(check,function(err){
    if(!err){
      console.log("Successfully deleted!")
    }
  })
})
const port= process.env.PORT||3000
app.listen(3000,function(){
  console.log(`Listening to port ${port}...`)
})