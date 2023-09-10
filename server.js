const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

const baseUrl = '/calculator'

app.use(express.json());

const baseRouter = express.Router();

let students = [{
    id:1,
    name:"madhu",
},{
id:2,
    name:"kamali",
},{
    id:3,
    name:"db"
}]

baseRouter.get('/greeting', (req, res) => {
    return res.json.stringify("Hello world!");
});
// baseRouter.get('/greeting/:id', (req, res) => {
//     let id = parseInt(req.params.id);
//     let curstudent = students.filter(student => student.id === id)[0];
//     console.log(curstudent);
//     if(curstudent)
//         return res.json(curstudent);
//     else
//         return res.sendStatus(404);
//     });

// ValidateStudent = (student) =>{
//     let msg="";
//     if(student.id==""){
//         msg = "err";
//     }
//     if(student.name==""){
//         msg="err";
//     }
//     return msg;
// }
baseRouter.post('/add', (req, res) => {
    // let student = req.body;
    // let isValid = ValidateStudent(student);
    // if(isValid == "")
    // {
    //     students.push(student);
    //     console.log(students);
    //     res.status(200).send(students);
    // }
    // else
    // return res.sendStatus(404);
    let f= req.body.first;
    let s= req.body.second;
    res.json({"result":f+s});
    
});
baseRouter.put('/update/:id', (req, res) => {
    let studentid = req.params.id;
    let student = req.body;
    let curstudent = students.filter(student => student.id == studentid)[0];
    let isValid = ValidateStudent(student);
    if(isValid == "")
    {
        curstudent.id = student.id;
        curstudent.name = student.name;
        console.log(students);
        res.status(200).send(students);
    }
    else
        res.sendStatus(404);
});
baseRouter.put('/del/:id', (req, res) => {
    let studentid = req.params.id;
    let curstudent = students.filter(student => student.id == studentid)[0];
    if(curstudent)
    {
        students = students.filter(student => studentid != student.id);
        res.sendStatus(200);
    }
    else
        res.sendStatus(404);
});


baseRouter.post('/subtract', (req, res) => {
      var n1 = req.body.first;
    var n2 = req.body.second;
    var ans = n1-n2;
    res.json({ "result": ans });
});

app.use(baseUrl, baseRouter);
app.listen(PORT, () => {
    console.log("Server running at PORT", PORT);
});