import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const body = await request.json();
    const { password } = body;

    // Simple hardcoded password for demonstration
    if (password === 'admin123') {
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'true', { httpOnly: true });
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}
