import { NextRequest, NextResponse } from "next/server";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const backendResponse = await fetch(
    baseURL+"/auth/login",
    {
      method: "POST",
      
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: 'include',
    }
  );

  const data = await backendResponse.json();
  //console.log("[login route] backend response:", backendResponse.status, data);

  if (!backendResponse.ok) {
    return NextResponse.json(data, { status: 401 });
  }

  if (!data.access_token) {
    return NextResponse.json(
      { message: "access_token missing from backend response" },
      { status: 500 },
    );
  }

  const response = NextResponse.json({
    token: data.access_token,
  });

  if (data.refresh_token) {
    response.cookies.set("refreshToken", data.refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
  }

  return response;
}