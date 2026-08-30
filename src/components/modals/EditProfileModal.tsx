import { useState } from "react";

interface EditProfileModalProps {
  onClose: () => void;
  initial?: { name: string; email: string; city: string };
  onSave?: (data: { full_name: string; email: string; city: string }) => Promise<void>;
}

export default function EditProfileModal({ onClose, initial, onSave }: EditProfileModalProps) {
  const [name, setName] = useState(initial?.name ?? "مستخدم Wafir");
  const [email, setEmail] = useState(initial?.email ?? "user@wafier.sa");
  const [city, setCity] = useState(initial?.city ?? "الأحساء");
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await onSave?.({ full_name: name, email, city });
    setSaved(true);
    setTimeout(onClose, 1200);
  };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "hsl(var(--color-gray-950) / 0.45)", zIndex: 300 }} />
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 301, background: "#fff", borderRadius: "24px 24px 0 0", maxHeight: "88vh", padding: "16px 24px 36px" }}>
        <h2 style={{ textAlign: "end", fontSize: 20, fontWeight: 700 }}>تعديل الملف الشخصي</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="الاسم" style={{ padding: 12, borderRadius: 10, border: "1px solid #E5E7EB", fontFamily: "inherit" }} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="البريد" dir="ltr" style={{ padding: 12, borderRadius: 10, border: "1px solid #E5E7EB", fontFamily: "inherit" }} />
          <select value={city} onChange={(e) => setCity(e.target.value)} style={{ padding: 12, borderRadius: 10, border: "1px solid #E5E7EB", fontFamily: "inherit" }}>
            {["الرياض", "جدة", "الدمام", "الأحساء"].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={handleSave} style={{ padding: 14, borderRadius: 12, border: "none", background: "hsl(var(--color-sa-600))", color: "#fff", fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}>
            {saved ? "تم الحفظ!" : "حفظ التغييرات"}
          </button>
        </div>
      </div>
    </>
  );
}
