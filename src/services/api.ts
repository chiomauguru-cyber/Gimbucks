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

export async function fetchGameInfo(code: string) {
  const response = await fetch(`/api/gimkit/game/${code}`);
  if (!response.ok) {
    throw new Error('Failed to fetch game info');
  }
  return await response.json();
}

export async function fetchKitInfo(id: string) {
  const response = await fetch(`/api/gimkit/kit/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch kit info');
  }
  return await response.json();
}
