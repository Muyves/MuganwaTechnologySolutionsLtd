import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const quotes = db.getQuotes();
    return NextResponse.json({ quotes, count: quotes.length });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.fullName || !body.email || !body.phone || !body.propertyAddress) {
      return NextResponse.json({ error: 'Full name, email, phone, and address are required' }, { status: 400 });
    }

    const quote = db.createQuote(body);
    return NextResponse.json({ quote, success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { quoteId, status } = body;

    if (!quoteId || !status) {
      return NextResponse.json({ error: 'quoteId and status are required' }, { status: 400 });
    }

    const updated = db.updateQuoteStatus(quoteId, status);
    if (!updated) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    return NextResponse.json({ quote: updated, success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update quote' }, { status: 500 });
  }
}
