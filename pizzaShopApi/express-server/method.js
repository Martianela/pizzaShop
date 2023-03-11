const express = require("express");
const { get } = require("lodash");
const app = express();

//middlware function func-> post,     front->req->JSON mr convert karta hai
app.use(express.json());
app.listen(3000, (req, res) => {
  console.log("listining on port 3000");
});

const users = [
  {
    id: 1,
    name: "rishabh",
  },
  {
    id: 2,
    name: "saransh",
  },
  {
    id: 1,
    name: "anand",
  },
];
const useRouter = require("./Routers/userRouter"); //global middleware
const authRouter = require("./Routers/authRouter"); //global middleware
app.use("/user", useRouter);
app.use("/auth", authRouter);
useRouter
  .route("/")
  .get(getUser) //path specific middleware
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

useRouter.route("/:id").get(getUserById);
authRouter.route("/signup").get(midleware, getSignUp).post(postSignUp);

function midleware(req, res, next) {
  console.log("middlewear called sucessfully");
  next();
}

function postUser(req, res) {
  console.log(req.body);
  res.json({
    message: "data send sucessfully",
    user: req.body.Name,
  });
}
function getUser(req, res) {
  res.send(users);
}
function updateUser(req, res) {
  console.log("req->body", req.body);
  let dataToBeUpdated = req.body;
  for (key in dataToBeUpdated) {
    users[key] = dataToBeUpdated[key];
  }
  res.json({
    message: "user updated sucessfully",
  });
}

function deleteUser(req, res) {
  user = {};
  res.send("data has been deleted successfully");
}
function getUserById(req, res) {
  console.log(req.params);
  res.json({
    message: "your id is",
    id: req.params.id,
  });
}

function getSignUp(req, res) {
  res.sendFile(__dirname + "/views/signup.html");
}
function postSignUp(req, res) {
  let data = req.body;
  console.log(data);
  res.json({
    message: "data recived done",
    data: data,
  });
}

// //update

// app.patch("/users");

// //delete

// app.delete("/users");
//get user query
// app.get("/users", (req, res) => {
//   console.log(req.query);
//   res.send(req.query);
// });
app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/views/signup.html");
});
app.post("/signup", async (req, res) => {
  let data = req.body;
  let user = await userModel.create(data);
  console.log(data);
  res.json({
    message: "getSignup called",
    data: data,
  });
});
app.patch("/user", async (req, res) => {
  console.log(req.body);
  let userToBeUpdated = req.body;
  let user = await userModel.updateOne(
    { email: "xyz@gmail.com" },
    userToBeUpdated
  );
  res.json({
    message: "user updated",
    data: user,
  });
});
app.delete("/user", async (req, res) => {
  let useToBeDeleted = req.body;
  let response = await userModel.deleteOne(useToBeDeleted);
  res.json({
    message: "user deleted successfully",
    data: response,
  });
});
app.get("/about", function (req, res) {
  res.sendFile(__dirname + "/views/about.html");
});
app.post("/user", async (req, res) => {
  let data = req.body;
  let user = await userModel.create(data);
  res.json({
    message: "user posted successfully",
    data: data,
  });
});
app.get("/user/setcookies", (req, res) => {
  // res.setHeader("set-cookie", "isLoggerIn=true");
  res.cookie("isLoggedIn", true, {
    maxAge: 1000 * 360 * 24,
    secure: true,
    httpOnly: true,
  });
  res.json({
    message: "cookies send sucessfully",
  });
});
app.get("/user/getcookies", (req, res) => {
  let cookies = req.cookies;
  console.log(cookies);
  res.json({
    message: "cookies get sucessfully",
    data: cookies,
  });
});
app.get("/", async function (req, res) {
  let allUsers = await userModel.find();
  // let allUsers = await userModel.findOne({ name: "rishabh" });
  //res.sendFile(__dirname + "/views/index.html");
  res.json({
    message: "list of all users",
    data: allUsers,
  });
});

// (async function createUser() {
//   let user = {
//     name: "rohit soni",
//     email: "abc@gmail.com",
//     password: "12345678",
//     confirmPassword: "12345678",
//   };
//   let data = await userModel.create(user);
//   console.log(data);
// })();
//redirect
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});
