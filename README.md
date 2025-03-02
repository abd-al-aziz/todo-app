# ToDo List Application

## متطلبات التشغيل

قبل تشغيل المشروع، تأكد من توفر المتطلبات التالية على جهازك:

- **PHP 8.x**
- **Composer**
- **Node.js & npm**
- **MySQL**
- **Laravel 10**
- **React.js**
- **Laragon (اختياري)**

## خطوات تشغيل المشروع

### 1. استنساخ المشروع

```sh
git clone <رابط_المستودع>
cd اسم_المشروع
```

### 2. تثبيت الحزم المطلوبة

#### Backend (Laravel):

```sh
composer install
cp .env.example .env
php artisan key:generate
```

#### Frontend (React):

```sh
cd frontend
npm install
```

### 3. إعداد قاعدة البيانات

- قم بإنشاء قاعدة بيانات جديدة في MySQL.
- عدل ملف `.env` في مجلد Laravel وأضف معلومات الاتصال بقاعدة البيانات:

```env
DB_DATABASE=todo_list_db
DB_USERNAME=root
DB_PASSWORD=
```

- قم بتشغيل المهاجرات لإنشاء الجداول:

```sh
php artisan migrate
```

### 4. تشغيل المشروع

#### Backend:

```sh
php artisan serve
```

#### Frontend:

```sh
cd frontend
npm run dev
```

### 5. فتح التطبيق

- بعد تشغيل السيرفر، يمكنك الوصول إلى التطبيق عبر المتصفح:
  - **Backend (Laravel API):** `http://127.0.0.1:8000`
  - **Frontend (React):** `http://localhost:3000`

## أوامر إضافية

- **إنشاء مستخدم إداري** (اختياري):

  ```sh
  php artisan tinker
  ```

  ثم في التيرمنال:

  ```php
  \App\Models\User::create(['name' => 'Admin', 'email' => 'admin@example.com', 'password' => bcrypt('password'), 'role' => 'admin']);
  ```

- **تشغيل المزامنة التلقائية (Watch mode) للـ React**:

  ```sh
  npm run watch
  ```

## ملاحظات

- يمكنك تشغيل Laravel و React معًا باستخدام **Laragon** لتسهيل الإدارة.
- تأكد من تشغيل MySQL قبل بدء المشروع.
- استخدم `npm run build` لإنشاء نسخة إنتاجية من الواجهة الأمامية.

---

🎯 **الآن يمكنك البدء باستخدام التطبيق!** 🚀

