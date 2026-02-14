export async function linkBank(accountNumber: string) {
  const res = await fetch("/api/user/wallet/linkbank", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accountNumber }),
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to link bank");
  return data;
}
