import { getHeroes, addHero } from "./hero-repo";

export async function GET(request) {
  try {
    const heroes = await getHeroes();
    return new Response(JSON.stringify(heroes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  try {
    let newHero = await request.json();
    newHero = await addHero(newHero);
    const urlOfNewHero = `/api/heroes/${newHero.id}`;
    return new Response(JSON.stringify(newHero), {
      status: 201,
      headers: {
        location: urlOfNewHero,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


/*
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const sortBy = searchParams.get('sortBy')
  const res = await fetch(`https://data.api.com/products/?sortBy=${sortBy}`)
  const products = await res.json()

  return Response.json(products)
}

import { headers } from 'next/headers'

export async function GET(request) {
  const headersList = headers()
  const referer = headersList.get('referer')

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'referer': referer }
  })
}


// app/blogs/[id]/route.js
export default function GET(request, { params }) {
  return new Response(`Blog id# ${params.id}`)
}

import { redirect } from 'next/navigation'

export async function GET(request) {
  redirect('https://nextjs.org/')
}
*/
