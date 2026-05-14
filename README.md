# EduPilot · محرك الذكاء الاصطناعي الاستباقي للطالب

> AR: مشروع تخرّج — طبقة ذكاء اصطناعي تعتمد على شروط منطقية (IF-conditions)
> فوق نظام جامعة الباحة. تحلّل سجل الطالبة والخطة الدراسية لتقديم:
>
> - **رادار التنبيه الاستباقي** للمواد السنوية الحرجة
> - **جسور المعرفة** (Micro-learning) قبل المواد الصعبة
> - **مؤشر ثقل دراسي** للترم القادم
>
> EN: Senior-project proactive academic AI on top of Baha University's
> system. Pure rule-based engine + **vanilla HTML/CSS/JS frontend** +
> Python REST API.

## Architecture

```
المشروع/
├── Data/                         ← ملفات الـ PDF + كاش الاستخراج
│   ├── transcript.pdf            · السجل الأكاديمي
│   ├── curriculum.pdf            · الخطة الدراسية
│   └── extracted.json            · cache (auto-generated)
│
├── backend/                      ← Python · FastAPI + IF-Conditions engine
│   ├── pdf_extractor.py          · pdfplumber/PyPDF2 PDF readers
│   ├── engine.py                 · 3 rule modules
│   ├── fallback_data.py          · curated dataset (Noura · 445004397)
│   ├── app.py                    · FastAPI server (REST + static frontend)
│   └── requirements.txt
│
└── frontend/                     ← HTML + CSS + JS (لا إطار عمل)
    ├── index.html                · تسجيل الدخول
    ├── dashboard.html            · اللوحة
    ├── prerequisites.html        · رادار المتطلبات
    ├── knowledge-bridge.html     · جسور المعرفة
    ├── partnerships.html         · الشراكات
    ├── css/styles.css            · هوية EduPilot كاملة
    ├── js/
    │   ├── api.js                · REST client + offline JS engine
    │   ├── shell.js              · sidebar + header + AI advisor
    │   ├── icons.js              · inline SVG library
    │   ├── login.js
    │   ├── dashboard.js
    │   ├── prerequisites.js
    │   ├── knowledge-bridge.js
    │   └── partnerships.js
    └── data/extracted.json       · نسخة من الكاش
```

> ✓ لا React، لا Vue، لا Angular، ولا Vite/Webpack — الـ Frontend عبارة
> عن ملفات HTML / CSS / JS عادية فقط.

## كيف تُشغّل المشروع

### الطريقة المُوصى بها (خادم واحد فقط)

شغّل خادم Python، وسيقوم تلقائياً بتقديم الـ HTML/JS من المتصفح:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

افتح المتصفح على: **`http://127.0.0.1:8000/`**

### الطريقة الثانية (Frontend فقط — وضع Offline)

إذا لم تكن Python مثبتة، يمكن تشغيل الـ Frontend وحده بأي خادم ثابت:

```powershell
cd frontend
python -m http.server 5500     # أو أي خادم محلي آخر
```

ثم افتح: **`http://127.0.0.1:5500/`**

في هذه الحالة يستخدم `js/api.js` المحرّك المرآة المكتوب بـ JavaScript،
ويقرأ `data/extracted.json` فيُولّد التنبيهات والجسور والثقل **بنفس
منطق محرّك Python بالضبط**.

## الـ API (Python · FastAPI)

| المسار                       | الوصف                                       |
| ---------------------------- | ------------------------------------------- |
| `GET  /api/student`          | هوية الطالبة + المواد المجتازة              |
| `GET  /api/plan`             | الخطة الدراسية + شجرة المتطلبات             |
| `GET  /api/alerts`           | تنبيهات الرادار الاستباقي                   |
| `GET  /api/knowledge-bridges`| جسور المعرفة                                |
| `GET  /api/study-load`       | ثقل الترم القادم                            |
| `GET  /api/dashboard`        | كل ما سبق في طلب واحد                       |
| `POST /api/login`            | تسجيل دخول تجريبي (أي كلمة مرور)            |

## الوحدات المنطقية الثلاث (IF-conditions)

### 1) رادار التنبيه الاستباقي

```
IF course.is_prerequisite_for(N >= 1)
   AND course.yearly_only == True
   AND not student.has_taken(course)
   AND student.is_eligible(course)
THEN emit CRITICAL alert (prevents +1 graduation year delay).
```

### 2) جسور المعرفة

```
IF upcoming_course.difficulty >= 75
   AND student.grade(prerequisite) < 80
THEN suggest YouTube micro-learning modules.
```

### 3) تحليل ثقل الدراسة

```
total_hours = sum(c.hours for c in upcoming_term)
weighted    = sum(c.hours * c.difficulty) / total_hours

IF total_hours > 15 AND (weighted >= 70 OR avg_difficulty >= 70)
THEN status = "Stressful"  (مرهق)
ELSE status = "Balanced"   (متوازن)
```

## تدفق الهوية (Login → Dashboard)

1. صفحة Login تستدعي `getDashboard()` من `frontend/js/api.js`.
2. الرقم الجامعي يُملأ تلقائياً بـ `445004397` ويُغلق `read-only`.
3. أي كلمة مرور تُقبل في النموذج الأولي.
4. يتم حفظ جلسة بسيطة في `localStorage` وكاش البيانات لخمس دقائق.
5. باقي الصفحات تشارك نفس الكاش (Sidebar/Header/Pages).

## الهوية البصرية

- **Navy** `#122a5a` · العنوان والسايدبار
- **Royal Blue** `#2f6cf0` · الأكشن والمؤشرات
- **Success Green** `#1aa777` · الحالات الإيجابية
- **Warning Amber** `#e8a23a` · التحذيرات
- **Destructive Red** `#d54848` · التنبيهات الحرجة
- **خط** IBM Plex Sans Arabic (Google Fonts)
- اتجاه RTL كامل
