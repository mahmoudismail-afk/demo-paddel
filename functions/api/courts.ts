export async function onRequestGet(context: any) {
  const { env } = context;
  try {
    if (env.DB) {
      const { results } = await env.DB.prepare('SELECT * FROM courts ORDER BY name').all();
      return Response.json(results);
    }
  } catch (error) {
    console.error('D1 Error:', error);
  }

  // Fallback
  return Response.json([
    { id: 'court-1', name: 'Indoor Court 1', type: 'indoor' },
    { id: 'court-2', name: 'Indoor Court 2', type: 'indoor' },
    { id: 'court-3', name: 'Outdoor Court 1', type: 'outdoor' },
    { id: 'court-4', name: 'Outdoor Court 2', type: 'outdoor' },
    { id: 'court-5', name: 'Basketball Court', type: 'indoor' },
    { id: 'court-6', name: 'Volleyball Court', type: 'indoor' },
  ]);
}
