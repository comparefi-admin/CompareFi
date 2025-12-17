export const runtime = "nodejs";

export async function POST(req) {
  try {
    console.log("SCRIPT URL:", process.env.GOOGLE_SCRIPT_URL);

    const data = await req.json();

    // Server-side validation
    if (!data.name || !data.mobile || !data.email || !data.product) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL) {
      console.error("❌ GOOGLE_SCRIPT_URL not set");
      return new Response(
        JSON.stringify({ error: "Server misconfiguration" }),
        { status: 500 }
      );
    }

    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const text = await res.text();

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      console.error("❌ Invalid response from Apps Script:", text);
      return new Response(
        JSON.stringify({ error: "Invalid response from server" }),
        { status: 500 }
      );
    }

    if (!res.ok || !result.success) {
      console.error("❌ Apps Script error:", result);
      return new Response(
        JSON.stringify({ error: "Failed to submit enquiry" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("❌ Contact API error:", err);
    return new Response(
      JSON.stringify({ error: "Unexpected server error" }),
      { status: 500 }
    );
  }
}
