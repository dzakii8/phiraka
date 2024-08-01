import { NextResponse } from "next/server";
import { User } from "../../../../db/models/users";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    let user = await User.getById(id);
    console.log(user);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
