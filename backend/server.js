const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const fs = require("fs");

const app = express();

const pathToFrontend = path.join(`${__dirname}/../frontend`)
const port = 9000

const dataLocation = path.join(`${__dirname}/../frontend/`);


// function getFunction(request, response){
//     response.sendFile(`${pathToFrontend}/index.html`);
// }
app.use(fileUpload());
app.use("/upload", express.static(`${__dirname}/../frontend/upload`));
app.use(express.json());
app.use("/pub", express.static(`${__dirname}/../frontend/public`));


app.get("/", (req, res) => {
    res.sendFile(`${pathToFrontend}/index.html`);
});

  

let jsonData = [];
try {
    let data = fs.readFileSync(`${dataLocation}data.json`, error => {
        if (error) {
            console.log(error);
        }
    });
    jsonData = JSON.parse(data);
} catch (error) {
    fs.writeFile(`${dataLocation}data.json`, JSON.stringify(jsonData), (error) => {
        if (error) {
            console.log(error);
        }
    });
}

const uploads = path.join(`${__dirname}/../frontend/public/images/`);

app.post("/", (req, res) => {
    // Upload image
    const picture = req.files.filename
    const answer = {};

    if (picture) {
        picture.mv(uploads + picture.name, error => {
            return res.status(500).send(error);
        });
    }
    answer.pictureName = picture.name;

    // Upload data from form
    const formData = req.body;
    formData.filename = picture.name;
    jsonData.push(formData);

    fs.writeFile(`${dataLocation}data.json`, JSON.stringify(jsonData), (error) => {
        if (error) {
            console.log(error);
        }
    });
    res.send(answer);
});



const ffolder = `${__dirname}/../frontend`



app.get('/image-list', (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/data.json`));
} )


app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
})