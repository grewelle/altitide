// Vercel serverless function.
// Set RESEND_API_KEY and FROM_EMAIL in your deployment environment.
// FROM_EMAIL must be a verified sending address/domain in Resend.
//
// This endpoint sends an automated confirmation email to the submitted address.
// For production use, add a database/CRM integration if you also want a persistent
// subscriber list.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body || {};
  const normalized = String(email || "").trim().toLowerCase();

  if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL;

  if (!apiKey || !from) {
    return res.status(500).json({ error: "Email service is not configured yet." });
  }

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [normalized],
      subject: "You're on the Altitide Moon Jelly waitlist",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#101820">
          <div style="padding:34px 0;border-bottom:1px solid #dce8ed">
            <strong style="letter-spacing:.12em">ALTITIDE</strong>
          </div>
          <div style="padding:42px 0">
            <p style="font-size:13px;font-weight:700;letter-spacing:.12em;color:#147ca9">MOON JELLY</p>
            <h1 style="font-size:42px;line-height:1.05;margin:8px 0 18px">You're on the list.</h1>
            <p style="font-size:18px;line-height:1.6;color:#56636f">
              Thanks for your interest in Altitide Moon Jelly — a simple genomic DNA
              extraction kit designed for educators and scientists without access to
              traditional laboratory equipment.
            </p>
            <p style="font-size:16px;line-height:1.6;color:#56636f">
              We'll keep you posted as we move toward launch.
            </p>
          </div>
          <div style="padding:24px 0;border-top:1px solid #dce8ed;color:#7a8790;font-size:12px">
            © 2026 Altitide
          </div>
        </div>
      `
    })
  });

  if (!emailResponse.ok) {
    const detail = await emailResponse.text();
    console.error("Resend error:", detail);
    return res.status(502).json({ error: "We couldn't send the confirmation email. Please try again." });
  }

  return res.status(200).json({ ok: true });
}
