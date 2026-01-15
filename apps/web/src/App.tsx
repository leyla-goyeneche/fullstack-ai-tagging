import { useEffect, useMemo, useState } from "react";

type Tag = { label: string; confidence: number };
type AnalyzeResponse = {
  tags: Tag[];
  meta?: { filename: string; size: number; mime: string };
  error?: string;
  message?: string;
};

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const fileInfo = useMemo(() => {
    if (!file) return null;
    return `${file.name} • ${(file.size / 1024).toFixed(1)} KB • ${file.type || "unknown"}`;
  }, [file]);

  async function analyze() {
    if (!file) {
      setError("Selecciona una imagen primero.");
      return;
    }

    setLoading(true);
    setError(null);
    setTags([]);

    try {
      const form = new FormData();
      form.append("image", file);

      const res = await fetch("/api/analyze", { method: "POST", body: form });
      const data: AnalyzeResponse = await res.json().catch(() => ({} as any));

      if (!res.ok) {
        setError(data?.message ?? `Error (${res.status})`);
        return;
      }

      setTags(Array.isArray(data.tags) ? data.tags : []);
    } catch (e: any) {
      setError(e?.message ?? "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  function clear() {
    setFile(null);
    setTags([]);
    setError(null);
  }

  return (
    <div style={{ maxWidth: 820, margin: "40px auto", padding: 16, fontFamily: "system-ui" }}>
      <h1 style={{ marginBottom: 8 }}>Fullstack AI Tagging</h1>
      <p style={{ opacity: 0.8, marginTop: 0 }}>
        Sube una imagen y obtén tags con <b>label</b> y <b>confidence</b>.
      </p>

      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <button onClick={analyze} disabled={!file || loading}>
          {loading ? "Analizando..." : "Analizar"}
        </button>
        <button onClick={clear} disabled={loading && !!file}>
          Limpiar
        </button>
      </div>

      {fileInfo && <p style={{ marginTop: 8, opacity: 0.8 }}>{fileInfo}</p>}

      {previewUrl && (
        <div style={{ marginTop: 16 }}>
          <img
            src={previewUrl}
            alt="preview"
            style={{ maxWidth: "100%", borderRadius: 12, border: "1px solid #333" }}
          />
        </div>
      )}

      {error && (
        <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: "#3b1c1c" }}>
          <b>Error:</b> {error}
        </div>
      )}

      <div style={{ marginTop: 18 }}>
        <h2 style={{ marginBottom: 8 }}>Resultados</h2>

        {loading && <p>Procesando…</p>}
        {!loading && tags.length === 0 && <p style={{ opacity: 0.7 }}>Aún no hay resultados.</p>}

        {tags.length > 0 && (
          <ul>
            {tags.map((t, idx) => (
              <li key={`${t.label}-${idx}`}>
                <b>{t.label}</b> <span style={{ opacity: 0.8 }}>({Math.round(t.confidence * 100)}%)</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
