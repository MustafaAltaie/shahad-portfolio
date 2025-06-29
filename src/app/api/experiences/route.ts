import dbConnect from "../../../../lib/mongodb";
import Experience from "../../../../lib/models/ExperienceModel";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const newItem = new Experience(data);
  await newItem.save();
  return new Response(JSON.stringify(newItem), { status: 201 });
}

export async function GET() {
  await dbConnect();
  const items = await Experience.find({});
  return new Response(JSON.stringify(items), { status: 200 });
}