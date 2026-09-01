// Detecta ciudad por IP usando headers de Vercel.
// VER → Veracruz · NLE/COA/TAM (noreste) → Monterrey · otro → null
export const dynamic = 'force-dynamic'

export function GET(req: Request) {
  const region = req.headers.get('x-vercel-ip-country-region') // código ISO estado, ej. "VER", "NLE"
  const country = req.headers.get('x-vercel-ip-country')
  let city: 'veracruz' | 'monterrey' | null = null
  if (country === 'MX') {
    if (region === 'VER' || region === 'PUE' || region === 'OAX' || region === 'TAB')
      city = 'veracruz'
    else if (region === 'NLE' || region === 'COA' || region === 'TAM')
      city = 'monterrey'
  }
  return Response.json({ city, region, country })
}
