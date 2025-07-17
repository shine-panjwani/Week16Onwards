import express from "express";
import { Client } from "pg";
const app = express();
app.use(express.json())
const pgClient = new Client(
  "postgresql://neondb_owner:npg_gvTzyCrS52BN@ep-curly-firefly-ad77iu1q-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);
async function pgConnectDb() {
  await pgClient.connect();
  console.log("Connected to Postgress db");
}
pgConnectDb();
app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
//   address
  const city = req.body.city;
  const country = req.body.country;
  const state = req.body.state;
  const pincode = req.body.pincode;
  const street = req.body.street;
  try { 
    await pgClient.query("Begin;")
    const response = await pgClient.query(
      "Insert into customer (username,email,password) values ($1, $2,$3) returning id",
      [username, email, password]
    );
    console.log(response);
    const userId = response.rows[0].id
    const address = await pgClient.query(`Insert into address(city,country,state, pincode,street, user_id) values($1,$2,$3,$4,$5,$6)`, [city,country,state,pincode,street,userId])
    await pgClient.query("commit;")
  } catch (error) {
    console.log(error);
  }

  res.json({
    msg: "Added to Db",
  });
});
app.get("/metadata/:id", async (req,res)=> {
  const id  = req.params.id;
  const query1 = await pgClient.query('select * from customer')
  console.log("Customer" +query1.rows);
  const query2 = await pgClient.query('select * from address')
  console.log("--------------------------------------------------------");
  console.log("Address");
  console.log(query2.rows);
  res.json({
    msg :"Returned"
  })
})
app.listen(3000, () => {
  console.log("Server listening to port 3000");
});
