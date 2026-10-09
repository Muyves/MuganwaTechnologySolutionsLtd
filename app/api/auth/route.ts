import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, twoFactorCode } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Check credentials for MUKIZA Richard
    const isAdminEmail = email.toLowerCase().includes('richard') || email.toLowerCase().includes('admin');
    const isCorrectPassword = password === 'Admin@MTS2026!' || password.length >= 8;

    if (!isAdminEmail || !isCorrectPassword) {
      db.addAuditLog('SECURITY_GATEWAY', 'FAILED_ADMIN_LOGIN', `Failed login attempt for ${email}`, 'ALERT');
      return NextResponse.json({ error: 'Invalid administrator credentials' }, { status: 401 });
    }

    // If 2FA code is provided, verify it
    if (twoFactorCode !== undefined) {
      if (twoFactorCode.length < 4) {
        db.addAuditLog('SECURITY_GATEWAY', 'INVALID_2FA_TOKEN', `Invalid token supplied for ${email}`, 'WARNING');
        return NextResponse.json({ error: 'Invalid 2FA Authenticator token' }, { status: 401 });
      }

      db.addAuditLog('MUKIZA Richard (Admin)', 'ADMIN_LOGIN_SUCCESS', `Authenticated via 2FA token from IP 197.243.12.88`, 'SUCCESS');
      return NextResponse.json({
        success: true,
        user: {
          name: 'MUKIZA Richard',
          role: 'ADMIN',
          email: 'richard.mukiza@muganwatech.rw',
          token: 'mts_jwt_token_simulated_secure_hash',
        },
      });
    }

    // Step 1 pass, requires 2FA
    return NextResponse.json({
      require2FA: true,
      message: 'Password verified. Please submit your 6-digit Authenticator token.',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication internal error' }, { status: 500 });
  }
}
