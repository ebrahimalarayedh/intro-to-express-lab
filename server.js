const express = require("express")

const app = express()

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];



app.get('/greetings', (req, res) => {
    res.send('what is your name')
})

app.get('/greetings/:usernameParameter', (req, res) => {
    let name = req.params.usernameParameter
    console.log(name)

    res.send(`Hello there, ${name}`)
})

app.get('/roll', (req, res) => {
})

app.get('/roll/:dice', (req, res) => {
    let a = Number(req.params.dice)
    let message
    if (isNaN(a))
        message = `You must specify a number.`

    else
        message = `Your roll is ${Math.floor(Math.random() * (a + 1))}`

    console.log(message)
    res.send(message)

})


app.get('/collectibles/:index', (req, res) => {
    if (Number(req.params.index) >= 0 && Number(req.params.index) <= 2)
        res.send(`So, you want ${collectibles[Number(req.params.index)].name}? For ${collectibles[Number(req.params.index)].price} it can be yours!`)
        
    else if (Number(req.params.index) <0 || Number(req.params.index) >2)
        res.send("This item is not yet in stock. Check back soon!")
        
})

app.get('/hello',(req,res)=>{
    let name= req.query.name
    let age= req.query.age
    console.log(name,age)
})

// app.get('/shoes',(req,res)=>{
//     let name= req.query.name
//     let price= req.query.price
//     let type= req.query.type
//     console.log(name, price,type)
//     res.send(`your choice is ${name}, it is ${price}`)
// })

app.get('/shoes',(req,res)=>{
    
    let minPprice= req.query.minprice
    let maxPrice= req.query.maxprice
    let type= req.query.type

    if(req.query.minprice && req.query.maxprice && req.query.type){
        const inBound = shoes.filter((element)=>{
            return element.price>=req.query.minprice && element.price<=req.query.maxprice && element.type.toLocaleLowerCase()===req.query.type.toLocaleLowerCase()
        })
        res.send(inBound)
    }
    else     if(req.query.minprice && req.query.maxprice){
        const inBound = shoes.filter((element)=>{
            return element.price>=req.query.minprice && element.price<=req.query.maxprice
        })
        res.send(inBound)
    }
    else     if(req.query.minprice && req.query.type){
        const inBound = shoes.filter((element)=>{
            return element.price>=req.query.minprice && element.type.toLocaleLowerCase()===req.query.type.toLocaleLowerCase()
        })
        res.send(inBound)
    }
    else     if(req.query.maxprice && req.query.type){
        const inBound = shoes.filter((element)=>{
            return element.price<=req.query.maxprice && element.type.toLocaleLowerCase()===req.query.type.toLocaleLowerCase()
        })
        res.send(inBound)
    }
    else
    res.send(shoes)

})






app.listen(3000, () => {
    console.log("Listening on port 3000")
})