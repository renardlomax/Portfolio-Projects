'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewLeadPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formEl = e.currentTarget; // capture the element for a safe reset
    const form = new FormData(formEl);
    const body = Object.fromEntries(form.entries());

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      // reset BEFORE navigating (component may unmount on route change)
      formEl.reset();
      router.replace('/leads/browse');
      router.refresh();

      // hard fallback (rare)
      setTimeout(() => {
        if (location.pathname !== '/leads/browse') {
          window.location.href = '/leads/browse';
        }
      }, 50);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="wrap">
      <div className="card">
        <h1 className="title">New Lead</h1>

        {error && <p className="alert" role="alert">Error: {error}</p>}

        <form onSubmit={onSubmit} className="form">
          {/* Required */}
          <label className="field">
            <span>Vertical*</span>
            <select name="vertical" required defaultValue="" disabled={submitting}>
              <option value="" disabled>Select…</option>
              <option value="NEW_BUSINESS">New Business</option>
              <option value="NEW_HOMEOWNER">New Homeowner</option>
            </select>
          </label>

          <label className="field">
            <span>Name*</span>
            <input name="name" placeholder="Jane Doe" required disabled={submitting} />
          </label>

          <label className="field">
            <span>Email*</span>
            <input name="email" type="email" placeholder="jane@example.com" required disabled={submitting} />
          </label>

          <label className="field">
            <span>State*</span>
            <input name="state" placeholder="FL" required disabled={submitting} />
          </label>

          {/* Optional */}
          <label className="field">
            <span>Phone</span>
            <input name="phone" placeholder="(555) 123-4567" disabled={submitting} />
          </label>

          <label className="field">
            <span>City</span>
            <input name="city" placeholder="Miami" disabled={submitting} />
          </label>

          <label className="field">
            <span>ZIP</span>
            <input name="zip" placeholder="33101" disabled={submitting} />
          </label>

          <label className="field">
            <span>Company</span>
            <input name="company" placeholder="Acme Inc." disabled={submitting} />
          </label>

          <label className="field">
            <span>Website</span>
            <input name="website" type="url" placeholder="https://example.com" disabled={submitting} />
          </label>

          <label className="field">
            <span>Service</span>
            <input name="service" placeholder="Website, SEO, etc." disabled={submitting} />
          </label>

          <label className="field">
            <span>Budget</span>
            <input name="budget" placeholder="$2,000" disabled={submitting} />
          </label>

          <label className="field col-span-2">
            <span>Message</span>
            <textarea name="message" rows={3} placeholder="Tell us more…" disabled={submitting} />
          </label>

          {/* Attribution */}
          <label className="field">
            <span>Source</span>
            <input name="source" placeholder="Google Ads, Referral…" disabled={submitting} />
          </label>

          <label className="field">
            <span>utmMedium</span>
            <input name="utmMedium" placeholder="cpc, email…" disabled={submitting} />
          </label>

          <label className="field">
            <span>utmSource</span>
            <input name="utmSource" placeholder="google, newsletter…" disabled={submitting} />
          </label>

          <label className="field">
            <span>utmCampaign</span>
            <input name="utmCampaign" placeholder="spring_launch" disabled={submitting} />
          </label>

          {/* Honeypot (hidden) */}
          <input
            name="company_hp"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="honeypot"
          />

          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? 'Saving…' : 'Save Lead'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .wrap {
          min-height: 100svh;
          display: grid;
          place-items: center;
          padding: 24px;
          background: #f7f7f8;
        }
        .card {
          width: 100%;
          max-width: 720px;
          background: #fff;
          border: 1px solid #ececec;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.06);
        }
        .title {
          margin: 0 0 12px 0;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.2px;
        }
        .alert {
          margin: 0 0 12px 0;
          padding: 10px 12px;
          border-radius: 10px;
          background: #ffe9ea;
          color: #7a1220;
          border: 1px solid #ffd0d4;
        }
        .form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .field {
          display: grid;
          gap: 6px;
        }
        .field span {
          font-size: 12px;
          color: #555;
        }
        .field input,
        .field textarea,
        .field select {
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid #ddd;
          background: #fff;
          outline: none;
          font-size: 14px;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .field input:focus,
        .field textarea:focus,
        .field select:focus {
          border-color: #5b7cff;
          box-shadow: 0 0 0 3px rgba(91, 124, 255, 0.15);
        }
        .col-span-2 {
          grid-column: 1 / -1;
        }
        .btn {
          grid-column: 1 / -1;
          margin-top: 6px;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid #2f57eb;
          background: linear-gradient(180deg, #5570ff, #2f57eb);
          color: white;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: transform 0.05s ease, filter 0.15s ease, opacity 0.2s;
        }
        .btn:hover { filter: brightness(1.05); }
        .btn:active { transform: translateY(1px); }
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .honeypot {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          opacity: 0;
        }
        @media (max-width: 640px) {
          .form { grid-template-columns: 1fr; }
          .btn { grid-column: auto; }
          .col-span-2 { grid-column: auto; }
        }
      `}</style>
    </main>
  );
}
