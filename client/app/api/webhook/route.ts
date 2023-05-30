import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const res = await request.json()
  console.log(request.body)

  return NextResponse.json({ body: res })
}
