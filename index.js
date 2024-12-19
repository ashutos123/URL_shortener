const express=require("express");
const path=require("path");

const {connectToMongoDB} =require("./connect");
const urlRoute=require("./routes/url");
const URL=require('./models/url');


const app=express();
const PORT=6000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(
console.log("Mongodb connected")
);


app.set("view engine","ejs");//this means we r using ejs engine.
app.set("views",path.resolve("./views"));//all ejs files are in views folder.


app.use(express.json());
app.get("/test",async(req,res)=>{
    const allurls=await URL.find({});
    return res.render("home");

});

// app.get("/test",async(req,res)=>{
//    const allurls=await URL.find({});//({})->iska matlab sare objects.
  
//    return res.end(`
//     <html>
//     <head> </head>
//     <body>
//     <ol>
//     ${allurls.map(url=>`<li>${url.shortId}-${url.redirectURL}-${url.visitHistory.length}</li>`).join("")};

//     </ol>
//     </body>
//     </html>

   
//    `);//server side rendering of html.

// });//this is ruckus to do whole of html here.nice ui cant be made like this. for this some engines like EJS(embedded javascript templating engine.), pug etc are used.




app.use("/url",urlRoute);

app.get("/url/:shortId",async(req,res)=>{//shortid is variable.
    const shortId=req.params.shortId;//querying for the specific shortid.
   const entry= await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push:{
                visitHistory:{
                    timestamp:Date.now(),
                },

            },

        }
    );
    res.redirect(entry.redirectURL);

});


app.listen(PORT,()=>console.log(`server started at port ${6000}`));
 

 


