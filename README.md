# موقع معرض الأعمال

Next.js 16 + Tailwind + Supabase، ويُنشر على Vercel.

## الصفحات
- `/` الرئيسية: العنوان الرئيسي والأعمال المميزة
- `/works` كل الأعمال مع فلترة حسب التصنيف
- `/works/[slug]` صفحة تفاصيل العمل ومعرض الصور
- `/about` صفحة "عنّي"
- `/contact` نموذج تواصل، والرسائل توصل للوحة التحكم
- `/admin` لوحة التحكم: الأعمال، الرسائل، الإعدادات

## الإعداد

### 1) Supabase
1. سوِّ مشروعاً جديداً على [supabase.com](https://supabase.com).
2. افتح **SQL Editor** والصق محتوى `supabase/schema.sql` كاملاً ثم اضغط **Run**.
3. من **Authentication → Users → Add user** أنشئ حسابك (إيميل وكلمة مرور، وفعّل Auto Confirm).
4. ارجع لـ **SQL Editor** وشغّل هذا الاستعلام بعد ما تغيّر الإيميل لإيميلك:
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'you@example.com';
   ```
5. (يُنصح به) من **Authentication → Sign In / Providers** أوقف خيار **Allow new users to sign up**.
6. من **Project Settings → API** انسخ `Project URL` و`anon public key`.

### 2) التشغيل المحلي
```bash
cp .env.example .env.local   # وحط القيم فيه
npm install
npm run dev
```

### 3) Vercel
1. ارفع المشروع على GitHub.
2. في Vercel اختر **Add New → Project** واختر المستودع.
3. في **Environment Variables** أضف:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. اضغط **Deploy**.

## ملاحظات
- الصفحات العامة تُولَّد ثابتة (Static/ISR)، لذلك التصفح سريع. أي تعديل من لوحة التحكم يحدّث الموقع فوراً، وفي كل الأحوال تتحدث الصفحات تلقائياً كل 60 ثانية.
- الصور تُرفع مباشرة إلى Supabase Storage (bucket اسمه `media`)، ويحسّنها `next/image` (AVIF/WebP).
- الوضع الليلي يتبع إعداد الجهاز، ويُحفظ اختيار الزائر بدون أي وميض عند تحميل الصفحة.
- لوحة التحكم محمية بـ Supabase Auth، وجدول `admins` مع سياسات RLS يمنع أي أحد غيرك من التعديل.
