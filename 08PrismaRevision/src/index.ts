import express from "express";
const app = express();
app.use(express.json());
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    res.json({
      msg: "User signed up",
    });
  } catch (error) {
    res.status(500).json({
      msg: "error while signing up",
    });
  }
});
app.get("/users", async (req, res) => {
  try {
    const response = await client.user.findMany();
    console.log(response);
    res.json({
      msg: "Users found",
      users: response,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
    });
  }
});

app.get("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const response = await client.todos.findMany({
      where: {
        user_id: id,
      },
      select :{
        user : true,
        title : true,
        description : true,
        done:true
      }
    });
    console.log(response);
    res.json({
        msg : "Todos",
        todos : response
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
        msg : "server error"
    })
  }
});

// async function createUser() {
//   try {
//     const response = await client.user.findMany({
//       where: {
//         id: 2,
//       },
//       include: {
//         todos: true,
//       },
//     });
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// }
// createUser();
app.listen(3000, function () {
  console.log("server listening to port 3000");
});
