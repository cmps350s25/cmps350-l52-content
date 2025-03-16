import { getHero, updateHero, deleteHero } from "../hero-repo";

export async function GET(request, { params }) {
  try {
    const heroId = (await params).id;
    console.log("getHero.params.id", heroId);
    const hero = await getHero(parseInt(heroId));
    console.log(JSON.stringify(hero, null, 2));

    if (hero) {
      return new Response(JSON.stringify(hero), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(
        JSON.stringify({ error: `Hero with id ${heroId} not found` }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const heroId = (await params).id;
    await deleteHero(heroId);
    // 204 No Content
    return new Response(null, { status: 204 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request) {
  try {
    const hero = await request.json();
    await updateHero(hero);
    // 204 No Content
    return new Response(null, { status: 204 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
