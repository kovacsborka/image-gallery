const express = require("express");
const path = require("path");

const app = express();

const pathToFrontend = path.join(`${__dirname}/../frontend`)
const port = 9000



// function getFunction(request, response){
//     response.sendFile(`${pathToFrontend}/index.html`);
// }

app.use(express.json());
app.use("/pub", express.static(`${__dirname}/../frontend/public`));


app.get("/", (req, res) => {
    res.sendFile(`${pathToFrontend}/index.html`);
});

  



const ffolder = `${__dirname}/../frontend`



app.get('/image-list', (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/data.json`));
} )


app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
})