// app/api/proxy/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url'); // Get the URL to fetch from the query params

  console.log("Proxy request received for URL:", url);

  if (!url) {
    console.error("URL parameter is missing");
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      redirect: 'follow', // Follow redirects
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    // Return a success message (we don't need the response body)
    return NextResponse.json({ message: 'Proxy fetch successful' }, { status: 200 });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Proxy fetch failed' }, { status: 500 });
  }
}