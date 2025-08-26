// app/leads/browse/page.js
export const dynamic = 'force-dynamic'; // always fetch fresh data

export default async function LeadsBrowsePage() {
  const res = await fetch('http://localhost:3000/api/leads', { cache: 'no-store' });
  const leads = res.ok ? await res.json() : [];

  return (
    <main style={{ padding: 20 }}>
      <h1>Leads</h1>

      {leads.length === 0 ? (
        <p>No leads yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
          <thead>
            <tr>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Vertical</th>
              <th style={th}>State</th>
              <th style={th}>City</th>
              <th style={th}>Created</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id}>
                <td style={td}>{l.name}</td>
                <td style={td}>{l.email}</td>
                <td style={td}>{l.vertical}</td>
                <td style={td}>{l.state}</td>
                <td style={td}>{l.city ?? ''}</td>
                <td style={td}>{l.createdAt ? new Date(l.createdAt).toLocaleString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

const th = { textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 };
const td = { borderBottom: '1px solid #f0f0f0', padding: 8 };
