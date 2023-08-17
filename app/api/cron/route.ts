import { getStorageHost } from '@/helpers/getHost';
import { NextResponse } from 'next/server';

export async function GET() {
    // Этот эндпоинт нужен чтобы предотвратить 'засыпание' сервера с файлами
    try {
        const res = await fetch(getStorageHost())
        const welcome = await res.text()
        return NextResponse.json({ text: welcome });
    } catch(e) {
        return NextResponse.json({ text: e });
    }
}