import express from "express";
import { Client } from "pg";
const app = express();
app.use(express.json());
const pgClient = new Client(
  // 'postgresql://neondb_owner:npg_qVDkHa1i3mWJ@ep-flat-mountain-aef7e8sm-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require');
  "postgresql://neondb_owner:npg_qVDkHa1i3mWJ@ep-flat-mountain-aef7e8sm-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);
async function connectToDB() {
  try {
    await pgClient.connect();
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
}
connectToDB();
app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  //addess
  const state = req.body.state;
  await pgClient.query("BEGIN;");
  const response = await pgClient.query(
    "insert into users(username, password, email) values($1,$2,$3) returning id",
    [username, password, email]
  );
  const userId = response.rows[0].id;
  const addAddress = await pgClient.query(
    "insert into addresses(state,user_id) values($1,$2)",
    [state, userId]
  );
  await pgClient.query("COMMIT;");
  console.log(response);
  res.json({
    msg: "added to db",
  });
});
app.get("/metadata/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pgClient.query(
      "select users.id, users.email,users.username, addresses.state from users left join addresses on users.id = addresses.user_id where users.id = $1",
      [id]
    );
    console.log(response.rows);

    res.json({
      data: response.rows,
      // address : addressResponse.rows,
      msg: "added to db",
    });
  } catch (error) {
    res.json({
        msg : error
    })
  }
});
app.listen(3000, () => {
  console.log("Server listening to port 3000");
});
