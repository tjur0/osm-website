export async function getTag(key: string, value?: string | null) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!base) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
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
