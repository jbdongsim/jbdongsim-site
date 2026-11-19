import { getStore } from "@netlify/blobs";
import { createHash } from "node:crypto";

// 중부산동심 방문자 수 (한국 시간 기준)
// - 같은 IP는 하루에 한 번만 집계 (IP 원문은 저장하지 않고 해시값만 보관)
export default async (req, context) => {
  const url = new URL(req.url);
  const store = getStore({ name: "visits-v2", consistency: "strong" });
  const day = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
  const dayKey = "day-" + day;
  let today = parseInt((await store.get(dayKey)) || "0", 10) || 0;
  let total = parseInt((await store.get("total")) || "0", 10) || 0;
  if (url.searchParams.get("hit") === "1" && req.method === "POST") {
    const ip = (context && context.ip) || req.headers.get("x-nf-client-connection-ip") || (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
    const ipHash = createHash("sha256").update("jbdongsim:" + day + ":" + ip).digest("hex").slice(0, 32);
    const seenKey = "seen/" + day + "/" + ipHash;
    const seen = await store.get(seenKey);
    if (!seen) {
      await store.set(seenKey, "1");
      today += 1; total += 1;
      await store.set(dayKey, String(today));
      await store.set("total", String(total));
    }
  }
  return new Response(JSON.stringify({ date: day, today, total }), {
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
  });
};

export const config = { path: "/api/visits" };
