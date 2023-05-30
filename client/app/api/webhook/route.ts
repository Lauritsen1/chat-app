import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface BodyData {
  username: string | null
  image_url: string | null
}

export async function POST(request: Request) {
  const body = await request.json()

  const { username, image_url } = body.data as BodyData

  Object.keys(body.data).forEach((value) => {
    if (!body.data[value]) {
      NextResponse.error()
    }
  })

  const newUser = await prisma.user.create({
    data: {
      username: username,
      imageUrl: image_url,
    },
  })

  return NextResponse.json(newUser)
}
