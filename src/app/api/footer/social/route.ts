import dbConnect from "../../../../../lib/mongodb";
import Social from "../../../../../lib/models/SocialFooterModel";

export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const updatedRecord = await Social.findOneAndUpdate({ id: 'singleton_footer_social_media' }, { $set: body },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return new Response(JSON.stringify(updatedRecord), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Error saving social media' }), { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  const items = await Social.findOne({});
  return new Response(JSON.stringify(items), { status: 200 });
}