export async function injectGimbucks(amount: number) {
  const response = await fetch('/api/inject', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount })
  });
  
  if (!response.ok) {
    throw new Error('Backend injection failed.');
  }
  
  return await response.json();
}
