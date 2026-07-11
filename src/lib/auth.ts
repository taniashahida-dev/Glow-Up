import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined");
}

const client = new MongoClient(uri);
const db = client.db('growup_db');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },

 databaseHooks: {
  user: {
    create: {
      before: async (user) => {
        console.log("HOOK RUNNING", user);

        return {
          data: {
            ...user,
            role: "user",
          },
        };
      },
    },
  },
},

  user: {
    additionalFields: {
      role: {
        type: "string",
        default: "user",
      },
    },
  },
});