import mongoose from "mongoose";


// Schema Creaction

const userSchema = new mongoose.Schema(
    {
        empID: { type: String, },
        role: { type: String, required: true, },
        name: { type: String, required: true },
        pNumber: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        companyCode: { type: String, }
    }, {
    timestamps: true
})

// model creation
export const Users = mongoose.model("user", userSchema);


//To handle user sign up
export const createNewUser = async (req, res) => {
    const { role, name, pNumber, email, password, companyCode, empID } = req.body;
    //  console.log({role, name, pNumber, email, password, companyCode, empID })
    if (role == "Admin" || role == "user")
        var user = await Users.findOne({ email: email.trim() });
    else {
        var user = await Users.findOne({
            $and: [
                { empID: { $eq: empID.trim() } },
                { companyCode: { $eq: companyCode.trim() } }
            ]
        })
    }
    // console.log("user : ",user)
    if (user == null) {
        await Users.insertOne({ empID: empID?.trim(), role: role.trim(), name: name.trim(), pNumber: pNumber.trim(), email: email.trim(), password: password.trim(), companyCode: companyCode?.trim() });
        res.json({ message: `Log created successfully`, success: true });

    }

    else {
        res.json({ message: `User already exist.`, success: false });
    }
}

// To handle user login or verify user authentication
export const verifyUser = async (req, res) => {
    let { role, companyCode, empID, email, password } = req.body;
    email = email.trim();
    // console.log(email);
    if (role == "Admin")
        var user = await Users.findOne({
            $and: [
                { role: { $eq: role } },
                { email: { $eq: email } },
                { companyCode: { $eq: companyCode } }
            ]
        });
    else if (role == "user")
        var user = await Users.findOne({
            $and: [
                { role: { $eq: role } },
                { email: { $eq: email } },
            ]
        });
    else
        var user = await Users.findOne({
            $and: [
                { role: { $eq: role } },
                { companyCode: { $eq: companyCode } },
                { empID: { $eq: empID } }
            ]
        });
    //    console.log(user);
    if (user === null) {
        res.json({
            message: `Warning : User not exist or you are doing any mistake!`,
            authenticate: false
        });
    } else if (password == user.password) {
        res.cookie("DevColab", JSON.stringify(user));
        res.json({
            message: `Login success`,
            authenticate: true
        });
    }
    else {
        res.json({
            message: `Warning : Wrong Password!`,
            authenticate: false
        });
    }
}

// to welcome on dashboard page
export const welcome = async (req, res) => {
    const userDetails = JSON.parse(req.cookies.DevColab);

    if (userDetails?.role != "user" || userDetails?.role != "Admin")
        var user = await Users.findOne({ email: userDetails?.email })
    else
        var user = await Users.findOne({
            $and: [
                { companyCode: { $eq: userDetails?.companyCode?.trim() } },
                { empID: { $eq: userDetails?.empID?.trim() } }
            ]
        })

    res.json(user);
}

// show all users on admin dashboard
export const getAllUsers = async (req, res) => {

    const userDetails = JSON.parse(req.cookies.DevColab);
    //   console.log(userDetails)

    const users = await Users.find({ companyCode: { $eq: userDetails.companyCode } })
    //   console.log(users)
    res.json({ users });

}

//retrive all employees
export const getAllEmployees = async (req, res) => {

    const userDetails = JSON.parse(req.cookies.DevColab);
    const employees = await Users.find({
        $and: [
            { companyCode: { $eq: userDetails.companyCode } },
            { role: { $eq: "Employee" } }
        ]
    })
    // console.log(employees);
    res.json({ employees })
}

// Update password
export const changePassword = async (req, res) => {

    const { role, companyCode, empID, email, password } = JSON.parse(req.cookies.DevColab);
    const { newPassword } = req.body;
    // console.log(newPassword);
    // console.log({role,companyCode, empID, email, password });
    if (role == "Admin")
        var user = await Users.findOneAndUpdate({
            $and: [
                { role: { $eq: role } },
                { email: { $eq: email } },
                { companyCode: { $eq: companyCode } }
            ]
        }, { $set: { password: newPassword} });
    else if (role == "user")
        var user = await Users.findOneAndUpdate({
            $and: [
                { role: { $eq: role } },
                { email: { $eq: email } },
            ]
        }, { $set: { password: newPassword} });
    else
        var user = await Users.findOneAndUpdate({
            $and: [
                { role: { $eq: role } },
                { companyCode: { $eq: companyCode } },
                { empID: { $eq: empID } }
            ]
        }, { $set: { password: newPassword} });
        console.log(user)
        res.json({success : true})
}

// Make sure indexes (like unique) are applied
await Users.init();