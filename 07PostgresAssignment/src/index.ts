import { Client } from "pg";
import express from "express"
const app =express();
const pgClient = new Client('postgresql://neondb_owner:npg_U3pGvBWA5kcE@ep-small-wind-aehpsvrz-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require');
async function pgConnectDB() {
    try {
    await pgClient.connect();
    console.log("Db connected");
    } catch (error) {
     console.log("error " ,error);
        
    }
}
pgConnectDB();
interface createInterface{
    user_id : number,
    title : string,
    destination_city : string,
     destination_country : string,
     start_date : Date,
      end_date : Date,
    budget : number
}
interface userInterface{
    username : string,
    name : string,
    password : string
}
interface updateInterface{
    id : number,
    title ?: string,
    budget ?: number
}
async function createUsers({username,name,password} : userInterface) {
    const response = await pgClient.query("insert into users(username, name,password) values($1,$2,$3) returning *", [username,name,password]);
    return response.rows;
}
async function createTravelPlan({user_id, title, destination_city, destination_country, start_date, end_date, budget} : createInterface){
    const response = await pgClient.query("Insert into travels_plans(user_id,title, destination_city, destination_country, start_date, end_date, budget) values($1,$2,$3,$4,$5,$6,$7); returning *",[user_id,title,destination_city,destination_country, start_date, end_date, budget])
    return response.rows;
}
async function updateTravelPlan({id, title, budget} : updateInterface) {
    const response = await pgClient.query("update travels_plans set title = $1, budget = $2 where travels_plan.id = $3" ,[title,budget,id])
    return response.rows;
}
async function getTravelPlans(userId : number) {
    const response =await pgClient.query("select * from travels_plans where user_id = $1", [userId])
    return response;
}
app.listen(3000,()=>{
    console.log("Server listening to port 3000");
})