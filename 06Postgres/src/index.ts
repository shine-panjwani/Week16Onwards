import { Client } from "pg";
const pgClient = new Client('postgresql://neondb_owner:npg_gvTzyCrS52BN@ep-curly-firefly-ad77iu1q-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');
async function connectToDB(){
    await pgClient.connect()
    const response = await pgClient.query("SELECT * FROM Users")
    console.log(response);
    
}
connectToDB()