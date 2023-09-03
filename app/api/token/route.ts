import { sign, verify } from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams
    const sid = params.get('sid')
    if (process.env.NEXT_PUBLIC_JWT_SECRET && sid) {
        const token = sign({ sid: sid }, process.env.NEXT_PUBLIC_JWT_SECRET, { algorithm: 'HS256' })
        return new NextResponse(token)
    } else {
        return new NextResponse('null')
    }
}
export async function POST(request: NextRequest) {
    const params = request.nextUrl.searchParams
    const sidToken = params.get('sid')
    if (process.env.NEXT_PUBLIC_JWT_SECRET && sidToken) {
        const token = verify(sidToken, process.env.NEXT_PUBLIC_JWT_SECRET) as { sid: string }
        return new NextResponse(token.sid)
    } else {
        return new NextResponse('null')
    }
}