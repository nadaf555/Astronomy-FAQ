const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8887;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const collectionSchema = new mongoose.Schema({
  question: String,
  answer: String
});
let model;
app.post('/dbCreate', (req, res) => {
  const { dbName, collectionName } = req.body;

  

  const DataBase = 'mongodb://localhost:27017';
  const newDataBase = `${DataBase}/${dbName}`;
  
  mongoose.set('strictQuery', true);
  model = mongoose.models[collectionName] || mongoose.model(collectionName, collectionSchema, collectionName);
  mongoose.connect(newDataBase)
    .then(() => {
      
      res.send({ "Message": `Database with the name: ${dbName} and collection with the name: ${collectionName} created` });
    })
    .catch((err) => {
      res.send({ "Error":"Please disconnect mongo db connection before creating new database" });
    });
});

app.post('/loadItems', (req, res) => {
  const {  items } = req.body;


  

  model.create(items)
    .then((result) => {
      res.send({ "Message": 'Items Added', "Data": result });
    })
    .catch((err) => {
      res.status(500).send({ "Error": err.message });
    });
});

app.delete('/deleteAll',(req,res)=>{
  
  model.deleteMany({})
  .then((result) => {
    res.send({ "Message": 'All items deleted', "Data": result });
  })
  .catch((err) => {
    res.status(500).send({ "Error": err.message });
  });

})
app.get('/retrieve', (req, res) => {
  if(!model){
    console.log("Please insert the database and collection.")
  }else{
    model.find()
    .then(
    result => {
    res.send(result);
    },
    err => { res.send("Internal Server Error"); } )
    .catch( err => { console.log("Internal Server Error"); } );
  };

});
  
  
  
app.delete('/deleteOne', (req, res) => {
    const itemToDelete = JSON.parse(req.query.items);
  
    model.deleteOne(itemToDelete)
    .then((result) => {
      res.send({ "Message": 'Item has been deleted', "Data": result });
    })
    .catch((err) => {
      res.status(500).send({ "Error": err.message });
    });
});

app.put('/update', (req, res) => {
  const input = req.body; // Assuming the input is sent as JSON in the request body
  const key = { _id: input.id }; // Replace 'id' with the actual key you are using to identify the document
  const updateFields = input.fields; // Assuming fields is an object containing the fields to update

  model.updateOne(key, { $set: updateFields })
      .then(result => {
          res.send({ "message": "Document updated successfully", "data": result });
      })
      .catch(err => {
          console.error(err);
          res.status(500).send({ "error": err.message });
      });
});


app.post('/insertOne', (req, res) => {
  let item= req.body;
  model.create(item)
    .then((result) => {
      res.send({ "Message": 'Item Added', "Data": result });
    })
    .catch((err) => {
      res.status(500).send({ "Error": err.message });
    });
});
app.listen(port, () => console.log(`Server running at http://localhost:${port}!`));
