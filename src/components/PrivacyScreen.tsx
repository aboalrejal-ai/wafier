import { useNavigate } from "react-router-dom";

export default function PrivacyScreen() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100dvh", background: "hsl(var(--color-gray-25))", padding: "24px 20px 40px" }}>
      <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "hsl(var(--color-sa-600))", fontFamily: "inherit", marginBottom: 20 }}>
        ← رجوع
      </button>
      <div style={{ maxWidth: 560, margin: "0 auto", background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #E5E7EB" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 16px" }}>سياسة الخصوصية</h1>
        <div style={{ fontSize: 14, lineHeight: 1.8, color: "hsl(var(--color-gray-700))" }}>
          <p><strong>1. البيانات المجمعة:</strong> قراءات العداد، الطقس، الميزانية، ومحادثات الوكيل الذكي.</p>
          <p><strong>2. الغرض:</strong> توقع الفاتورة، التنبيهات المتدرجة، ونصائح التوفير.</p>
          <p><strong>3. PDPL:</strong> موافقة صريحة مطلوبة. حق الوصول والحذف متاح من الملف الشخصي.</p>
          <p><strong>4. الأمان:</strong> RLS على قاعدة البيانات، تشفير النقل HTTPS، إخفاء هوية عند تصدير ML.</p>
          <p><strong>5. الذكاء الاصطناعي:</strong> التوقعات تقديرية وفق مبادئ SDAIA — ليست نصيحة مالية ملزمة.</p>
        </div>
      </div>
    </div>
  );
}
