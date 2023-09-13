// const express = require('express') //3rd party package
// const {MangoClient}=require('mongodb')
import express from 'express';
import { MongoClient } from "mongodb";
import 'dotenv/config'
const app = express()

//Interceptor => converting body to json
app.use(express.json()) //Inbuilt middleware => to say data is in JSON

const mongo_url = process.env.mongo_url
//"mongodb://127.0.0.1:27017"
async function createconnection(){
    const client =new MongoClient(mongo_url)
    await client.connect();
    console.log("mongodb connected successfully")
    return client
}
const client= await createconnection();
// const products = [
//     {
//         id: 1,
//         name: "Iphone 14",
//         price: "1,27,999",
//         poster: "https://m.media-amazon.com/images/I/71T5NVOgbpL._SX679_.jpg",
//         category: "Electronics",
//         rating: 8,
//         description:
//             "17.00 cm (6.7-inch) Super Retina XDR display featuring Always-On and ProMotion,48MP Main camera for up to 4x greater resolution",
//     },
//     {
//         id: 2,
//         name: "Lenovo Tab M10 HD 2nd Gen",
//         price: "9,199",
//         poster: "https://m.media-amazon.com/images/I/71UXXKK2gSL._SX679_.jpg",
//         category: "Electronics",
//         rating: 8.7,
//         description:
//             "10.1 HD (1280x800) display with TDDI technology and 400 nits brightness and TUV Rhienland certified eye protection",
//         trailer: "https://www.youtube.com/embed/bbcpBC9Mbuk",
//     },
//     {
//         id: 3,
//         name: "U.S. POLO ASSN. Men T-Shirt",
//         price: "803",
//         poster: "https://m.media-amazon.com/images/I/819biZOXNrL._UX569_.jpg",
//         category: "Clothing",
//         rating: 7,
//         description: "Fit Type: Regular Fit, HALF SLEEVE POLO",
//     },
// ];
app.get('/', (req, res) => {
    res.send('Hello Everyone🥳🥳🥳')
});

// to get all products, query by category & rating 
app.get('/products',async (req, res) => {
    const { category,rating } = req.query
    console.log(req.query, category,rating)
    // let filteredproducts = products//copy by reference
    // if(category){
    //     filteredproducts = filteredproducts.filter((pd) => pd.category == category)
    // }
    // if(rating){
    //     filteredproducts = filteredproducts.filter((pd) => pd.rating == rating)
    // }
    if (req.query.rating) {
        req.query.rating = +req.query.rating
    }
    const product = await client.db("test").collection("products").find(req.query).toArray()

    res.send(product)
   
})


//products by id
app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params, id)
    const product = await client.db("test").collection("products").findOne({id:id})
    // const product = products.find((pd) => pd.id == id)
    console.log(product)
    res.send(product)
})

//add products
app.post('/products', async (req, res) => {
    const newProduct = req.body
    console.log(newProduct)
    const result = await client.db("test").collection("products").insertMany(newProduct)
    res.send(result)
})

//delete product by id
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params, id)
    //db.products.deleteOne({id:"1"})
    const product = await client.db("test").collection("products").deleteOne({ id: id })
    console.log(product)
    // const product = products.find((pd) => pd.id == id)
    res.send(product)
})

app.listen(3000, () => console.log("The server started on the port 3000"))