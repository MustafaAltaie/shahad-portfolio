import dbConnect from "../../../../lib/mongodb";
import Education from "../../../../lib/models/EducationModel";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const newItem = new Education(data);
  await newItem.save();
  return new Response(JSON.stringify(newItem), { status: 201 });
}

export async function GET() {
  await dbConnect();
  const items = await Education.find({});
  return new Response(JSON.stringify(items), { status: 200 });
}