import dbConnect from "../../../../lib/mongodb";
import Profile from "../../../../lib/models/ProfileModel";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { profile } = await req.json();
    const result = await Profile.findByIdAndUpdate('Singleton_profile_text_id', { profile }, { upsert: true, new: true });
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Error saving profile' }), { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  const items = await Profile.findOne({});
  return new Response(JSON.stringify(items), { status: 200 });
}