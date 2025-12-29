export async function getTag(key: string, value?: string | null) {
  const base = process.env.API_BASE_URL;

  if (!base) {
    return null;
  }

  const params = new URLSearchParams({ key });
  if (value) {
    params.append("value", value);
  }

  try {
    return await fetch(`${base}/tag/?${params.toString()}`).then((res) =>
      res.json()
    );
  } catch (e) {
    return null;
  }
}
