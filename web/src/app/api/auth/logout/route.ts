import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const redirectUrl = new URL('/', request.url)

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0` // O Path=/ significa que todas as rotas da aplicação vão poder acessar o cookie
    }
  })

}