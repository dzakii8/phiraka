import { NextResponse } from "next/server";
import { User } from "../../../db/models/users";

export async function GET() {
  try {
    let users = await User.getAll();
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request) {
  try {
    let req = await request.json();

    let response = await User.create(req);
    if (response === 1) {
      return NextResponse.json({ message: response });
    } else {
      return NextResponse.json({ message: response });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: response });
  }
}

export async function PUT(request) {
  try {
    let req = await request.json();
    let id = req.id

    delete req.id

    let response = await User.edit(id, req);
    if (response === 1) {
      return NextResponse.json({ message: response });
    } else {
      return NextResponse.json({ message: response });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: response });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    console.log(id);
    let response = await User.delete(id);
    if (response === 1) {
      return NextResponse.json({ message: response });
    } else {
      return NextResponse.json({ message: response });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: response });
  }
}
