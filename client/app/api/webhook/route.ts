import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prismadb'

interface BodyData {
  id: string
  username: string | null
  image_url: string | null
}

export async function POST(request: Request) {
  const body = await request.json()

  const { id, username, image_url } = body.data as BodyData

  Object.keys(body.data).forEach((value) => {
    if (!body.data[value]) {
      NextResponse.error()
    }
  })

  const newUser = await prisma.user.create({
    data: {
      id: id,
      username: username,
      imageUrl: image_url,
    },
  })

  return NextResponse.json(newUser)
}
