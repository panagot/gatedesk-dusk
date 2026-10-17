import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const deskHosted = Boolean(url && key);

export const supabase = deskHosted ? createClient(url, key) : null;

const ROW_ID = "live";

export async function loadDeskPayload() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("desk_state")
    .select("payload, updated_at")
    .eq("id", ROW_ID)
    .maybeSingle();
  if (error) throw error;
  if (!data?.payload || Object.keys(data.payload).length === 0) return null;
  return { payload: data.payload, updatedAt: data.updated_at };
}

export async function saveDeskPayload(payload) {
  if (!supabase) return { ok: false, reason: "offline" };
  const { error } = await supabase.from("desk_state").upsert({
    id: ROW_ID,
    payload,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
  return { ok: true };
}

export function subscribeDesk(onChange) {
  if (!supabase) return () => {};
  const channel = supabase
    .channel("desk_live")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "desk_state", filter: `id=eq.${ROW_ID}` },
      (row) => {
        const payload = row.new?.payload;
        if (payload) onChange(payload, row.new?.updated_at);
      }
    )
    .subscribe();
  return () => {
    supabase.removeChannel(channel);
  };
}
