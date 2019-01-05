//Kevin Zheng
//Lab - 2

const express = require('express');
const classService = require('./classes');
const app = express();
const port = 3000;

const show = (class_name, res) => {
    let students = '';
    classService.load(class_name, listofUsers => {
        for (let user of listofUsers) {
            students += (`name: ${user.name}, age: ${user.age}, city: ${user.city}, grade: ${user.grade},`)
        }
        res.json({
            students
        });
    })
}

app.get('/', (req, res) => {
    res.send('<h1>Routes: </h1><br><h3>class/add?</h3><br><h3>Math/multiply?</h3>');
});
app.get('/class/add/', (req, res) => {
    const {
        query
    } = req;
    let myclass = query.class;
    let name = query.name;
    let age = query.age;
    let city = query.city;
    let grade = query.grade;
    let myUser = {
        name,
        age,
        city,
        grade,
    };
    if (myUser.name === 'undefined' || myUser.age === 'undefined' || myUser.city === 'undefined' || myUser.grade === 'undefined') {
        res.json({
            error: 'Please fill out all the information for the student'
        })
    }
    classService.add(myclass, myUser, (err, res) => {
        console.log("Added");
    })
    res.json({
        added: myUser,
        class: myclass,
    });
});
app.get('/class/list/', (req, res) => {
    const {
        query
    } = req;
    let myclass = query.class;
    classService.load(myclass, currentUsers => {
        if (currentUsers.length === 0) {
            res.json({
                error: `Class ${myclass} doesn't exist.`
            })
        } else {
            show(myclass, res);
        }
    })
})
app.get('/class/listfailing/', (req, res) => {
    const {
        query
    } = req;
    let myclass = query.class;
    classService.load(myclass, currentUsers => {
        if (currentUsers.length === 0) {
            res.json({
                error: `Class ${myclass} doesn't exist.`
            });
        } else {
            classService.checkfail(myclass, failingUsers => {
                res.json({
                    failingUsers
                });
            })
        }
    })
})

app.get('/class/listfromcity/', (req, res) => {
    const {
        query
    } = req;
    let myclass = query.class;
    let city = query.city;
    classService.load(myclass, currentUsers => {
        if (currentUsers.length === 0) {
            res.json({
                error: `Class ${myclass} doesn't exist.`
            });
        } else {
            classService.fromcity(myclass, city, userfrom => {
                res.json({
                    userfrom
                });
            })
        }
    })
})


app.listen(port, () => {
    console.log(`listening at port ${port}`)
});