const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./models/Employee')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require("multer")

const app = express()
app.use(express.json())
app.use(cors({
    origin: true
}))

app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb+srv://abhinavkaranath12:XPeWbHleJ1xAx46T@cluster0.ctodf2l.mongodb.net/").then(() => {
    console.log("Server connected Successfully");
}).catch((err) => {
    console.log("Server connection is failed");
});

// Middleware to verify user
const verifyUser = (req, res, next) => {
    // const token=req.cookies.token;
    console.log(req.cookies);
}

app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name })
})
// File uploading using multer
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + "-" + Date.now() + file.originalname);
        }
    })
})

// Login endpoint
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    console.log(response);
                    if (response) {
                        const token = jwt.sign({ email: user.email }, "hgghfdgfdgf")
                        res.json({ msg: "Success", token: token ,role:user.role})
                    } else {
                        res.json("The password is incorrect")
                    }
                })
            } else {
                res.json("No record existed")
            }
        })
})

// Register section
app.post('/register', upload.single("file"), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const employee = new EmployeeModel({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                mobile: req.body.mobile,
                img: req.file ? req.file.path : ""
            })
            employee.save().then(() => {
                res.send("success")
            }).catch((err) => {
                res.send("fail")
            })
        })
})
// Profile section

   
app.post("/start", (req, res) => {
    const token = req.body.token;

    // Check if token exists
    if (!token) {
        return res.status(401).send("Token not provided");
    }

    // Verify the token
    jwt.verify(token, "hgghfdgfdgf", (err, decoded) => {
        if (err) {
            return res.status(401).send("JWT verification failed");
        }

        const userEmail = decoded.email;

        // Find employee by email
        EmployeeModel.findOne({ email: userEmail })
            .then(employee => {
                if (!employee) {
                    return res.status(404).send("Employee not found");
                }
                // Employee found, send details
                return res.status(200).json(employee);
            })
            .catch(error => {
                console.error("Error finding employee:", error);
                return res.status(500).send("Internal Server Error");
            });
    });
});



  


// Rider schema
const riderSchema = new mongoose.Schema({
    ridename: String,
    image: String,
    description: String
})

const Rider = mongoose.model("Ride", riderSchema)
module.exports = Rider



// Add rider endpoint
app.post("/addrider", upload.single("file"), (req, res) => {
    const { ridename, description } = req.body;
    console.log(req.body);
    console.log(req.file);
    const riders = new Rider({
        ridename: req.body.ridename,
        image: req.file.path,
        description: req.body.description
    })
    riders.save().then(() => {
        res.send("success")
    }).catch((err) => {
        res.send("fail ")
    })
})

// Role changing endpoint
app.post('/change_role/:userid/:role', (req, res) => {
    const userid = req.params.userid
    const role = req.params.role
    console.log("cant");

    EmployeeModel.findByIdAndUpdate({ _id: userid }, {
        role: role
    }).then(() => {
        res.send("updated success")
    }).catch(err => {
        res.send("cannot update")
    })
})

// Issues schema
const issuesSchema = new mongoose.Schema({
    ride_id: String,
    ridename: String,
    title: String,
    description: String,
    verified:{
        type:Boolean,
        default:false
    },
    date: {
        type:String,
         // Set default value to current date/time
    },
})

const Issues = mongoose.model("issue", issuesSchema)

// Issues adding section
app.post('/issues/:idride', (req, res) => {
    console.log(req.body);
    const issues = new Issues({
        ride_id: req.params.idride,
        ridename: req.body.ridename,
        title: req.body.title,
        description: req.body.description,
        date:req.body.date
    })
    issues.save().then(() => {
        res.send("success")
    }).catch((err) => {
        res.send("fail")
    })
})





// Update Verification Status Endpoint
app.post('/issues/:id/verify', async (req, res) => {
    const { id } = req.params;
    console.log(req.body.verified);
  
    try {
      const issue = await Issues.findByIdAndUpdate(id, { verified: req.body.verified }, { new: true });
  
      console.log(issue);

      if (!issue) {
        return res.status(404).json({ error: 'Issue not found' });
      }
  
      return res.json(issue);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user section
app.post("/getuser", (req, res) => {
    EmployeeModel.find().then((emp) => {
        res.send(emp)
    }).catch((err) => {
        res.send(err)
    })
})

// Get ride section
app.post("/getride", (req, res) => {
    Rider.find().then((rid) => {
        res.send(rid)
    }).catch((err) => {
        res.send(err)
    })
})

// Get issues endpoint
app.post('/getissues', (req, res) => {
    Issues.find().then((iss) => {
        res.send(iss)
    }).catch((err) => {
        res.send("error")
    })
})

// Delete rider
app.post("/delete/:id", (req, res) => {
    Rider.findByIdAndDelete(req.params.id).then((del) => {
        res.send(del)
    }).catch((err) => {
        res.send((err))
    })
})

// Delete user
app.post("/deleteuser/:id", (req, res) => {
    console.log(req.params.id);
    EmployeeModel.findByIdAndDelete(req.params.id).then((del) => {
        res.send(del)
    }).catch((err) => {
        res.send((err))
    })
})

app.use("/files", express.static("uploads"))

app.post("/uploadfile", upload.single("file"), (req, res) => {
    res.send("file upload succeess")
})



// Delete issue
app.post("/deleteissue/:id",(req,res)=>{
    console.log(req.params.id);
    Issues.findByIdAndDelete(req.params.id).then((delet)=>{
      res.send(delet)
    }).catch((err)=>{
        res.send(err)
    })
})

app.listen(3001, () => {
    console.log("server running at 3001");
})
