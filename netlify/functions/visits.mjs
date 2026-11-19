import { getStore } from "@netlify/blobs";

// 중부산동심 방문자 수: 하루 1회(브라우저 기준) 집계, 한국 시간 기준 날짜
export default async (req) => {
  const url = new URL(req.url);
  const store = getStore({ name: "visits", consistency: "strong" });
  const day = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
  const dayKey = "day-" + day;
  let today = parseInt((await store.get(dayKey)) || "0", 10) || 0;
  let total = parseInt((await store.get("total")) || "0", 10) || 0;
  if (url.searchParams.get("hit") === "1" && req.method === "POST") {
    today += 1; total += 1;
    await store.set(dayKey, String(today));
    await store.set("total", String(total));
  }
  return new Response(JSON.stringify({ date: day, today, total }), {
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
  });
};

export const config = { path: "/api/visits" };
