const fs = require("fs")

const quote = "No beauty shines brighter than that of a good heart🥳"
// console.log(process.argv)
//single file creation
//create + write
// fs.writeFile("awesome.pdf", quote, (err) => {
//         console.log(`Completed writing awesome.pdf`)
//     })
    
//Task 1

// for(let i=1;i<=10;i++){
//     const filepath=`./backup/text-${i}.html`
//     const quote2="Live more, worry Less🥳🥳🥳"
// fs.writeFile(filepath, quote2, (err) => {
//     console.log(`Completed writing text${i}.html`)
// })
// }

//task 2
// const[,,n]=process.argv
// for(let i=1;i<=parseInt(n);i++){
//     const filepath=`./backup/note-${i}.txt`
//     const quote3="Happy day🥳🥳🥳"
// fs.writeFile(filepath, quote3, (err) => {
//     console.log(`Completed writing note-${i}.txt`)
// })
// }

// fs.readFile('./backup/note-1.txt','utf-8',(err,data)=>{
//     if(err){
//     console.log("error,err")
//     }
//     console.log(data)
// })
fs.readdir('./backup/',(err,files)=>{
    files.forEach(filename=>{
    fs.unlink(`./backup/${filename}`,(err)=>{
        console.log("deleted",filename)
    })
})
})