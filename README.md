# Syriatel TMS — بوابة الموارد البشرية

React + Vite، تنسيق بـ CSS Modules، وترجمة عربي/إنجليزي (RTL/LTR) عبر i18next.

## التشغيل
```bash
npm install
npm run dev      # التطوير
npm run build    # الإنتاج
```
بيانات الدخول التجريبية معبّأة مسبقاً (دور HR).

## هيكل المشروع
```
src/
├── assets/            الشعار
├── components/
│   ├── ui/            مكوّنات عامة: Button, Modal, Table, Badge, Card, Field ...
│   └── layout/        AppShell (شريط جانبي + علوي), Logo, LanguageSwitcher
├── context/           AuthContext, ToastContext
├── data/              mockData.js + DataContext (كل العمليات async جاهزة لاستبدالها بـ API)
├── features/auth/     صفحة تسجيل الدخول
├── hooks/             useBusy (حالة تحميل الأزرار)
├── i18n/              index.js + locales/{ar,en}/{common,auth,hr}.json
├── roles/
│   ├── index.js       سجلّ الأدوار (roleRegistry)
│   └── hr/            وحدة الموارد البشرية: index.jsx + pages/ + components/
├── routes/            AppRouter + حماية الأدوار
└── styles/global.css  الألوان والمتغيرات (الأحمر #E60000)
```

## إضافة دور جديد (مثلاً المشرف)
1. أنشئ `src/roles/supervisor/index.jsx` بنفس شكل `hrModule`
   (`role: 'SUPERVISOR'`, `basePath: '/supervisor'`, و`nav` فيها path/icon/labelKey/Component).
2. أضف `src/i18n/locales/ar/supervisor.json` و`en/supervisor.json`
   (تُحمَّل تلقائياً، واستخدم المفاتيح كـ `supervisor:nav.dashboard`).
3. سجّله في `src/roles/index.js`:
   ```js
   [ROLES.SUPERVISOR]: supervisorModule,
   ```
لا حاجة لتعديل الراوتر أو الشريط الجانبي أو صفحة الدخول.

## ربط الـ Backend لاحقاً
كل دوال `DataContext` و`AuthContext.login` تحاكي طلب API بتأخير بسيط؛
استبدل جسم الدالة بطلب حقيقي وستبقى الصفحات كما هي.
