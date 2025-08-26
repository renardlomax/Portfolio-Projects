// app/api/leads/route.js
import prisma from '@/lib/prisma';
export const runtime = 'nodejs';

// POST /api/leads -> create
export async function POST(req) {
  try {
    const body = await req.json();
    let {
      vertical, name, email, phone, state, city, zip,
      company, website, service, budget, message,
      source, utmMedium, utmSource, utmCampaign,
      company_hp,
    } = body;

    // 1) Honeypot: if bots fill this hidden field, pretend success and bail out
    if (company_hp) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // 2) Required fields
    if (!vertical || !name || !email || !state) {
      return new Response(
        JSON.stringify({ error: 'vertical, name, email, and state are required' }),
        { status: 400 }
      );
    }

    // 3) Normalize + validate enum
    const allowedVertical = new Set(['NEW_BUSINESS', 'NEW_HOMEOWNER']);
    const normalizedVertical = String(vertical).toUpperCase().replace(/\s+/g, '_');

    if (!allowedVertical.has(normalizedVertical)) {
      return new Response(
        JSON.stringify({ error: 'vertical must be NEW_BUSINESS or NEW_HOMEOWNER' }),
        { status: 400 }
      );
    }

    // (Optional) If your schema expects a number for budget, uncomment next line:
    // if (budget != null && budget !== '') budget = Number(budget);

    // 4) Create record using the *normalized* enum value
    const lead = await prisma.lead.create({
      data: {
        vertical: normalizedVertical,
        name, email, phone, state, city, zip,
        company, website, service, budget, message,
        source, utmMedium, utmSource, utmCampaign,
      },
    });

    return new Response(JSON.stringify(lead), { status: 201 });
  } catch (err) {
    console.error('POST /api/leads error:', err);
    return new Response(JSON.stringify({ error: 'Failed to create lead' }), { status: 500 });
  }
}

// GET /api/leads?state=FL&city=Miami&vertical=NEW_BUSINESS -> list (newest first)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const where = {
      state: searchParams.get('state') || undefined,
      city: searchParams.get('city') || undefined,
      vertical: searchParams.get('vertical') || undefined,
    };
    Object.keys(where).forEach((k) => where[k] === undefined && delete where[k]);

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return new Response(JSON.stringify(leads), { status: 200 });
  } catch (err) {
    console.error('GET /api/leads error:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch leads' }), { status: 500 });
  }
}
