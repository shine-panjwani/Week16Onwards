import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
async function createUser() {
  await client.user.create({
    data: {
      username: "Shine",
      password: "12345",
      age: 21,
      city: "sagar",
    },
  });
}

createUser();