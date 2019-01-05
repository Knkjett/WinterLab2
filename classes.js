const fs = require('fs');

const save = (class_name, userList, cb) => {
    console.log('Save')
    const userRows = [];
    for (let user of userList) {
        userRows.push(user.name +','+ user.age+','+user.city+',' + user.grade)
    }
    const fileblob = userRows.join('\n');
    fs.writeFile(`classes/${class_name}`, fileblob, (err, res) => {
        cb(err, res)
    })
};

const load = (class_name, cb) => {
    console.log('Load')
    fs.readFile(`classes/${class_name}`, 'utf8', (err, data) => {
        if (!data) {
            cb([])
            console.log("Empty");
            return;
        }
        const rows = data.split('\n')
        const users = [];
        for (let row of rows) {
            const bits = row.split(',');
            users.push({name: bits[0], age: parseInt(bits[1]), city: bits[2], grade: bits[3]});
        }
        cb(users);
    })
}

const add = (class_name, user, cb) => {
    console.log('Add')
    let checked = false;
    load(class_name, currentUsers => {
        for(let i = 0; i < currentUsers.length; i++){
            if(currentUsers[i].name === user.name){
                currentUsers[i].name = user.name;
                currentUsers[i].age = user.age;
                currentUsers[i].city = user.city;
                currentUsers[i].grade = user.grade;
                checked = true;
                console.log("CHECKED");
            }
        }
        if(checked === false){
            currentUsers.push(user);
        }

        save(class_name, currentUsers, (err, res) => {
            cb(err, res)
        });
    })
}

const checkfail = (class_name, cb) => {
    console.log('Checkfail')
    fs.readFile(`classes/${class_name}`, 'utf8', (err, data) => {
        if (!data) {
            cb([])
            console.log("Empty");
            return;
        }
        const rows = data.split('\n')
        //USER LIST IS CALLED BACK;
        const failusers = [];
        for (let row of rows) {
            const bits = row.split(',');
            if(bits[3] < 50){
                failusers.push({name: bits[0], age: parseInt(bits[1]), city: bits[2], grade: bits[3]})
            }
        }
        cb(failusers);
    })
}

const fromcity = (class_name, mycity, cb) => {
    console.log('fromcity')
    fs.readFile(`classes/${class_name}`, 'utf8', (err, data) => {
        if (!data) {
            cb([])
            console.log("Empty");
            return;
        }
        const rows = data.split('\n')
        //USER LIST IS CALLED BACK;
        const userfrom = [];
        for (let row of rows) {
            const bits = row.split(',');
            if(bits[2].toLowerCase() === mycity.toLowerCase()){
                userfrom.push({name: bits[0], age: parseInt(bits[1]), city: bits[2], grade: bits[3]})
            }
        }
        cb(userfrom);
    })
}


module.exports = {
    save,
    load,
    add,
    checkfail,
    fromcity,
}