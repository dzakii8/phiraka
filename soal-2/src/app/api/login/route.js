import { NextResponse } from "next/server";
import { User } from "../../../db/models/users";

export async function POST(request) {
  try {
    let req = await request.json();

    let response = await User.login(req);

    return NextResponse.json({ message: response });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: response });
  }
}