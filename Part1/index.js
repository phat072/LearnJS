const fs = require('fs');
const http = require('http')
const url = require('url')
const replaceTemplate = require('./modules/replaceTemplate')
const slugify = require('slugify')

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

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    //overview page
    if (pathname === '/' || pathname === '/overview')
    {
        res.writeHead(200, {
            'Content-type':     'text/html' //To format data to json file
        });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        // console.log(cardsHtml)
        res.end(output);
    }
    //product page
    else if (pathname === '/product') {
        res.writeHead(200, {
            'Content-type':     'text/html' //To format data to json file
        });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }

    //api
    else if (pathname === '/api') {
            res.writeHead(200, {
                'Content-type':   'application/json' //To format data to json file
            });
            res.end(data);
    }

    //not found
    else {
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
