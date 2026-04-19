import { useState, useEffect } from "react";
import diseaseDatabase from "./diseaseDatabase";

const encyclopediaCss = `
  .enc-wrap { min-height: 100vh; background: #020818; background-image: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,100,255,0.15), transparent); font-family: 'Space Grotesk', sans-serif; color: #e2eaff; padding: 24px 16px 60px; }
  .enc-inner { max-width: 720px; margin: 0 auto; }
  .enc-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
  .enc-back { padding: 8px 16px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: #6a8aaa; cursor: pointer; font-size: 0.85rem; font-family: inherit; transition: all 0.2s; }
  .enc-back:hover { color: #8aabcf; border-color: rgba(0,150,255,0.3); }
  .enc-title { font-family: 'Outfit', sans-serif; font-size: 1.6rem; font-weight: 800; background: linear-gradient(135deg, #4d9fff, #00d4aa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .enc-subtitle { color: #5a7a9a; font-size: 0.85rem; margin-left: auto; }
  .enc-search { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 13px 18px; color: #e2eaff; font-size: 0.95rem; font-family: inherit; outline: none; margin-bottom: 16px; transition: border-color 0.2s; }
  .enc-search:focus { border-color: rgba(0,150,255,0.5); }
  .enc-search::placeholder { color: #2a3a50; }
  .enc-count { color: #3a5070; font-size: 0.8rem; margin-bottom: 14px; }
  .enc-list { display: flex; flex-direction: column; gap: 10px; }
  .enc-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 16px 18px; cursor: pointer; transition: all 0.2s; }
  .enc-card:hover { border-color: rgba(0,150,255,0.3); transform: translateX(4px); background: rgba(0,100,255,0.05); }
  .enc-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
  .enc-card-name { font-family: 'Outfit', sans-serif; font-size: 0.95rem; font-weight: 700; color: #e2eaff; }
  .enc-card-code { font-size: 0.72rem; color: #4d9fff; background: rgba(77,159,255,0.1); padding: 2px 8px; border-radius: 6px; white-space: nowrap; }
  .enc-card-symptoms { color: #5a7a9a; font-size: 0.8rem; line-height: 1.5; }
  .enc-detail { background: rgba(255,255,255,0.03); border: 1px solid rgba(0,150,255,0.2); border-radius: 16px; padding: 24px; margin-bottom: 16px; }
  .enc-detail-name { font-family: 'Outfit', sans-serif; font-size: 1.3rem; font-weight: 800; color: #e2eaff; margin-bottom: 6px; }
  .enc-detail-code { color: #4d9fff; font-size: 0.85rem; margin-bottom: 16px; }
  .enc-detail-section { margin-bottom: 14px; }
  .enc-detail-label { font-size: 0.72rem; color: #4d9fff; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
  .enc-symptom-grid { display: flex; flex-wrap: wrap; gap: 6px; }
  .enc-symptom-tag { background: rgba(0,100,255,0.08); border: 1px solid rgba(0,100,255,0.2); border-radius: 8px; padding: 3px 10px; font-size: 0.78rem; color: #8aabcf; }
  .enc-detail-text { color: #8aabcf; font-size: 0.9rem; line-height: 1.65; }
  .enc-search-btn { width: 100%; padding: 12px; background: linear-gradient(135deg, #0055dd, #0099bb); border: none; border-radius: 10px; color: #fff; font-size: 0.92rem; font-weight: 600; cursor: pointer; font-family: inherit; margin-top: 16px; transition: all 0.2s; }
  .enc-search-btn:hover { transform: translateY(-2px); }
  .enc-back-detail { display: inline-flex; align-items: center; gap: 6px; color: #4d9fff; font-size: 0.85rem; cursor: pointer; margin-bottom: 16px; background: none; border: none; font-family: inherit; }
  .enc-back-detail:hover { color: #7aabff; }
  .enc-empty { text-align: center; padding: 60px 20px; color: #3a5070; }
  .enc-empty-icon { font-size: 3rem; margin-bottom: 12px; }
  .enc-orpha-link { display: inline-block; margin-top: 12px; padding: 8px 16px; background: rgba(0,100,255,0.08); border: 1px solid rgba(0,100,255,0.2); border-radius: 8px; color: #4d9fff; font-size: 0.85rem; text-decoration: none; transition: all 0.2s; }
  .enc-orpha-link:hover { background: rgba(0,100,255,0.15); }
`;

export default function Encyclopedia({ onBack }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const total = diseaseDatabase.length;

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = encyclopediaCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    if (search.trim().length < 2) {
      setResults(diseaseDatabase.slice(0, 30));
      return;
    }
    const q = search.toLowerCase();
    const filtered = diseaseDatabase.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.orphaCode.toLowerCase().includes(q) ||
      d.symptoms.some(s => s.toLowerCase().includes(q))
    ).slice(0, 50);
    setResults(filtered);
  }, [search]);

  if (selected) {
    return (
      <div className="enc-wrap">
        <div className="enc-inner">
          <button className="enc-back-detail" onClick={() => setSelected(null)}>
            ← Back to Encyclopedia
          </button>
          <div className="enc-detail">
            <div className="enc-detail-name">{selected.name}</div>
            <div className="enc-detail-code">🔗 {selected.orphaCode}</div>
            <div className="enc-detail-section">
              <div className="enc-detail-label">📋 Clinical Symptoms ({selected.symptoms.length})</div>
              <div className="enc-symptom-grid">
                {selected.symptoms.map((s, i) => (
                  <span key={i} className="enc-symptom-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="enc-detail-section">
              <div className="enc-detail-label">✅ Recommended Next Steps</div>
              <div className="enc-detail-text">{selected.nextSteps}</div>
            </div>
            <a
              href={"https://www.orpha.net/consor/cgi-bin/OC_Exp.php?lng=en&Expert=" + selected.orphaCode.replace("ORPHA:", "")}
              target="_blank"
              rel="noreferrer"
              className="enc-orpha-link"
            >
              🌐 View full details on Orphanet →
            </a>
          </div>
          <button className="enc-search-btn" onClick={() => onBack(selected.symptoms.slice(0, 5).join(", "))}>
            🔍 Analyze these symptoms →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="enc-wrap">
      <div className="enc-inner">
        <div className="enc-header">
          <button className="enc-back" onClick={() => onBack(null)}>← Back</button>
          <div className="enc-title">📚 Disease Encyclopedia</div>
          <div className="enc-subtitle">{total.toLocaleString()} diseases</div>
        </div>
        <input
          className="enc-search"
          placeholder="🔍 Search disease name or symptom..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoFocus
        />
        <div className="enc-count">
          {search.trim().length >= 2
            ? results.length + " results for \"" + search + "\""
            : "Showing first 30 of " + total.toLocaleString() + " diseases — type to search"}
        </div>
        {results.length === 0 ? (
          <div className="enc-empty">
            <div className="enc-empty-icon">🔬</div>
            <div>No diseases found for "{search}"</div>
          </div>
        ) : (
          <div className="enc-list">
            {results.map((disease, i) => (
              <div key={i} className="enc-card" onClick={() => setSelected(disease)}>
                <div className="enc-card-header">
                  <div className="enc-card-name">{disease.name}</div>
                  <div className="enc-card-code">{disease.orphaCode}</div>
                </div>
                <div className="enc-card-symptoms">
                  {disease.symptoms.slice(0, 5).join(" · ")}
                  {disease.symptoms.length > 5 && " · +" + (disease.symptoms.length - 5) + " more"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}