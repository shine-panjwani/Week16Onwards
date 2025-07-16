import express from "express";
import { Client } from "pg";
const app = express();
const pgClient = new Client('postgresql://neondb_owner:npg_gvTzyCrS52BN@ep-curly-firefly-ad77iu1q-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');
async function dbConnect() {
  await pgClient.connect();
  console.log("Connected to the DB");
}
dbConnect();
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    await pgClient.query(
      `insert into users(username, password, email) values ($1, $2,$3)`,[username,password,email]
    );
    res.json({
      msg: "DB updated",
    });
  } catch (error) {
    console.log(error);
  }
});
app.listen(3000, () => {
  console.log("Server connected to port 3000");
});
