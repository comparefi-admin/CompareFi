export async function POST(req) {
  try {
    const body = await req.json()
    const uid = body.uid

    if (!uid) {
      return new Response(
        JSON.stringify({ isAdmin: false, error: 'No UID provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const isAdmin = uid === process.env.ADMIN_UID

    return new Response(JSON.stringify({ isAdmin }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } 
  
  catch (err) {
    return new Response(
      JSON.stringify({ isAdmin: false, error: err.message || 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}