const fs = require('fs');
const http = require('http')
const url = require('url')

// ---------------------------------FILE---------------------------------
// // blocking
// // const texIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// // console.log(texIn);
//
// const currentDate = new Date();
// const year = currentDate.getFullYear();
// const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
// const day = String(currentDate.getDate()).padStart(2, '0');
// const formattedDate = `${year}/${month}/${day}`;
//
// // const textOut = `This is what we know about the avocado: ${texIn}.\nCreated on ${formattedDate}`;
// // fs.writeFileSync('./txt/output.txt', textOut);
//
// console.log("Reading file....");
//
// //None blocking
// // fs.readFile('./txt/input.txt', 'utf-8',(err, data) => {
// //     console.log(data);
// // })
//
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//     if (err) return console.log('Error!!!')
//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3)
//
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err =>{
//                 console.log('Your file has been written')
//             })
//         })
//     })
// });
// console.log('Will read file !')

// ---------------------------------SERVER---------------------------------
const server = http.createServer((req, res) =>{
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview')
    {
        res.end('This is the OVERVIEW');
    }else if (pathName === '/product') {
        res.end('This is the PRODUCT');
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }

});


server.listen(8000, 'localhost', () => {
    console.log('Listening to requests on port 8000');
});
