import {isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {MenuItem} from "@/models/MenuItem";
import mongoose from "mongoose";

async function dbConnect() {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
export async function POST(req) {
  try {
    // Parse the request body
    const data = await req.json();

    // Log the received data for debugging purposes
    console.log("Received data:", data);

    // Create a new MenuItem instance with the parsed data
    const menuItem = new MenuItem(data);

    // Save the menu item to the database
    await menuItem.save();

    // Return a successful response
    return new Response(JSON.stringify({ message: "MenuItem created successfully" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Log the validation error with detailed information
    console.error("Validation error:", error);

    // Check if it's a validation error and send a 400 Bad Request response if so
    if (error.name === 'ValidationError') {
      return new Response(JSON.stringify({ message: error.message, details: error.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return a generic 500 Internal Server Error response for other errors
    return new Response("Internal Server Error", { status: 500 });
  }
}


export async function PUT(req) {
  await dbConnect(); 
  if (await isAdmin()) {
    const {_id, ...data} = await req.json();
    await MenuItem.findByIdAndUpdate(_id, data);
  }
  return Response.json(true);
}

export async function GET() {
  await dbConnect(); 
  return Response.json(
    await MenuItem.find()
  );
}

export async function DELETE(req) {
  await dbConnect(); 
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (await isAdmin()) {
    await MenuItem.deleteOne({_id});
  }
  return Response.json(true);
}