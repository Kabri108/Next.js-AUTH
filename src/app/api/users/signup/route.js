import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextResponse,NextRequest } from "next/server"
import bcryptjs from "bcryptjs"

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json()
    const { username, email, password } = reqBody
    console.log(reqBody)

    //Check user is alredy exits or not
    const user = await User.findOne({ email })
    if (user) {
      return NextResponse.json({ error: "User alredy exists" }, { status: 400 })
    }

    //hash password
    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashPassword
    })
    const savedUser = await newUser.save()
    console.log(savedUser)

    return NextResponse.json({
      message: "user created successfully",
      success: true,
      savedUser
    })
  } catch (error) {
    return NextResponse.json({ error: error.message },{ status: 500 })
  }
}
