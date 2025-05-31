// ==== بداية ملف script.js ====

// الانتظار حتى يتم تحميل محتوى الصفحة بالكامل قبل تنفيذ السكريبت
document.addEventListener('DOMContentLoaded', function() {


    // (داخل document.addEventListener('DOMContentLoaded', function() { ... }); في ملف js/script.js)

// --- 12. وظائف إشعارات المستخدم (Toasts) ---
const toastContainer = document.getElementById('toastContainer');

function showToast(message, title = '', type = 'info', duration = 5000) {
    if (!toastContainer) {
        console.error('Toast container not found!');
        return;
    }

    // إنشاء عنصر الإشعار الرئيسي
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);
    toast.setAttribute('role', type === 'error' || type === 'success' ? 'alert' : 'status'); // تعديل بسيط لـ role
    toast.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
    toast.setAttribute('aria-atomic', 'true');

    // إنشاء أيقونة الإشعار
    const toastIconContainer = document.createElement('div');
    toastIconContainer.classList.add('toast-icon');
    const icon = document.createElement('i');
    icon.classList.add('fas'); // كلاس Font Awesome الأساسي
    switch (type) {
        case 'success':
            icon.classList.add('fa-check-circle');
            break;
        case 'error':
            icon.classList.add('fa-exclamation-triangle');
            break;
        case 'warning':
            icon.classList.add('fa-exclamation-circle');
            break;
        case 'info':
        default:
            icon.classList.add('fa-info-circle');
            break;
    }
    toastIconContainer.appendChild(icon);

    // إنشاء محتوى الإشعار (العنوان والرسالة)
    const toastContent = document.createElement('div');
    toastContent.classList.add('toast-content');

    if (title) {
        const toastTitle = document.createElement('strong');
        toastTitle.classList.add('toast-title');
        toastTitle.textContent = title;
        toastContent.appendChild(toastTitle);
    }

    const toastMessage = document.createElement('p');
    toastMessage.classList.add('toast-message');
    toastMessage.textContent = message;
    toastContent.appendChild(toastMessage);

    // إنشاء زر الإغلاق
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.classList.add('toast-close');
    closeButton.setAttribute('data-dismiss', 'toast');
    closeButton.setAttribute('aria-label', 'إغلاق');
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeButton.appendChild(closeIcon);

    closeButton.addEventListener('click', () => {
        removeToast(toast);
    });

    // تجميع أجزاء الإشعار
    toast.appendChild(toastIconContainer);
    toast.appendChild(toastContent);
    toast.appendChild(closeButton);

    // إضافة الإشعار إلى الحاوية
    toastContainer.appendChild(toast);

    // إظهار الإشعار (بعد تأخير بسيط للسماح بالـ transition)
    // requestAnimationFrame يضمن أن العنصر تمت إضافته للـ DOM قبل محاولة تطبيق الـ transition
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });


    // إزالة الإشعار تلقائياً بعد مدة معينة
    if (duration > 0) {
        setTimeout(() => {
            removeToast(toast);
        }, duration);
    }
}

function removeToast(toastElement) {
    if (!toastElement) return;
    toastElement.classList.remove('show'); // يبدأ تأثير الاختفاء
    toastElement.classList.add('hide'); // يمكن استخدام هذا الكلاس لتأثير إخفاء مختلف إذا أردت

    // الانتظار حتى ينتهي تأثير الاختفاء ثم إزالة العنصر من الـ DOM
    // المدة هنا يجب أن تطابق مدة الـ transition في CSS لـ .toast.hide أو .toast عند إزالة .show
    toastElement.addEventListener('transitionend', () => {
        if (toastElement.parentNode) { // التأكد أن العنصر لا يزال موجوداً
            toastElement.remove();
        }
    }, { once: true }); // ضمان أن المستمع يعمل مرة واحدة فقط

    // حل بديل إذا كان transitionend غير موثوق به أو لا يوجد تأثير hide
    // setTimeout(() => {
    //    if (toastElement.parentNode) {
    //        toastElement.remove();
    //    }
    // }, 400); // يجب أن تكون المدة متوافقة مع مدة الـ transition في CSS
}


// --- أمثلة على كيفية استخدام دالة showToast (يمكنك وضعها داخل أي حدث أو دالة أخرى) ---
// (لأغراض الاختبار الآن، يمكنك وضعها مباشرة ليتم تنفيذها عند تحميل الصفحة،
// أو ربطها بأزرار اختبار إذا أردت)

// مثال 1: إشعار نجاح
// showToast('تم تحديث ملفك الشخصي بنجاح.', 'نجاح!', 'success');

// مثال 2: إشعار خطأ مع مدة أطول
// showToast('فشل تحميل الملف، يرجى المحاولة مرة أخرى.', 'خطأ فادح', 'error', 7000);

// مثال 3: إشعار معلومات بدون عنوان
// showToast('يتوفر تحديث جديد للبرنامج.', '', 'info');

// مثال 4: إشعار تحذير لا يختفي تلقائياً (duration = 0 أو قيمة سالبة)
// showToast('سيتم تسجيل خروجك قريباً جداً.', 'تنبيه هام', 'warning', 0);


// يمكنك إضافة زر اختبار في HTML لتجربة هذه الإشعارات:
    
    const btnSuccess = document.getElementById('testSuccessToast');
    if(btnSuccess) {
        btnSuccess.addEventListener('click', () => {
            showToast('تم الإجراء بنجاح!', 'عملية ناجحة', 'success');
        });
    }
    const btnError = document.getElementById('testErrorToast');
    if(btnError) {
        btnError.addEventListener('click', () => {
            showToast('حدث خطأ ما، حاول مرة أخرى.', 'خطأ!', 'error', 6000);
        });
    }



// ... (بقية أكواد JavaScript الخاصة بك) ...

    // (داخل document.addEventListener('DOMContentLoaded', function() { ... }); في ملف js/script.js)

// --- تهيئة مكتبة AOS (Animate On Scroll) ---
AOS.init({
    duration: 800, // مدة الأنيميشن بالمللي ثانية
    easing: 'ease-in-out', // نوع التسهيل (easing) للحركة
    once: true, // هل يتم تشغيل الأنيميشن مرة واحدة فقط أم في كل مرة يظهر العنصر
    mirror: false, // هل يتم تشغيل الأنيميشن عند التمرير للأعلى أيضاً
    anchorPlacement: 'top-bottom', // يحدد متى يبدأ الأنيميشن بالنسبة لموضع العنصر
});

// ... (بقية أكواد JavaScript الخاصة بك) ...

    // --- 1. تفعيل قائمة التنقل في وضع الموبايل ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNavigation = document.querySelector('.main-navigation');

    if (mobileMenuToggle && mainNavigation) {
        mobileMenuToggle.addEventListener('click', function() {
            // تبديل كلاس 'active' لإظهار/إخفاء القائمة
            mainNavigation.classList.toggle('active');

            // (اختياري) تغيير أيقونة زر القائمة
            const icon = mobileMenuToggle.querySelector('i');
            if (mainNavigation.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // أيقونة إغلاق (X)
                mobileMenuToggle.setAttribute('aria-expanded', 'true');
                mobileMenuToggle.setAttribute('aria-label', 'إغلاق القائمة');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); // أيقونة القائمة (ثلاثة خطوط)
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.setAttribute('aria-label', 'فتح القائمة');
            }
        });
        // (داخل document.addEventListener('DOMContentLoaded', function() { ... }); في ملف js/script.js)

// --- 8. التحقق من صحة نموذج الاتصال (contact.html) ---
// (داخل document.addEventListener('DOMContentLoaded', function() { ... }); في ملف js/script.js)

// --- 9. التحقق من صحة نموذج تسجيل الدخول (login.html) ---
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // منع الإرسال الفعلي

        clearAllErrorMessages(this);
        const formStatusMessage = this.querySelector('#loginFormStatusMessage');
        if(formStatusMessage) formStatusMessage.textContent = '';

        let isValid = true;

        const emailOrUsernameInput = document.getElementById('loginEmailOrUsername');
        const passwordInput = document.getElementById('loginPassword');

        // 1. التحقق من حقل البريد الإلكتروني أو اسم المستخدم
        if (emailOrUsernameInput.value.trim() === '') {
            isValid = false;
            showError(emailOrUsernameInput, 'البريد الإلكتروني أو اسم المستخدم مطلوب.');
        } else {
            // يمكنك إضافة تحقق إضافي هنا إذا كنت تريد التحقق من تنسيق البريد الإلكتروني
            // إذا كان المستخدم قد أدخل بريداً إلكترونياً (مثلاً، إذا كان يحتوي على '@')
            // if (emailOrUsernameInput.value.includes('@') && !isValidEmail(emailOrUsernameInput.value.trim())) {
            //     isValid = false;
            //     showError(emailOrUsernameInput, 'الرجاء إدخال عنوان بريد إلكتروني صالح.');
            // } else {
            //     clearError(emailOrUsernameInput);
            // }
            clearError(emailOrUsernameInput); // حالياً نتحقق فقط من أنه ليس فارغاً
        }

        // 2. التحقق من كلمة المرور
        if (passwordInput.value.trim() === '') {
            isValid = false;
            showError(passwordInput, 'كلمة المرور مطلوبة.');
        } else {
            clearError(passwordInput);
        }

        if (isValid) {
            // console.log('نموذج تسجيل الدخول صالح وجاهز للإرسال!');
            // console.log({
            //     loginIdentifier: emailOrUsernameInput.value.trim(),
            //     password: passwordInput.value.trim()
            // });

            if(formStatusMessage) {
                formStatusMessage.textContent = 'جارٍ تسجيل الدخول... (هذه رسالة مؤقتة)';
                formStatusMessage.className = 'status-message success';
            }
            // loginForm.reset(); // لا تقم بمسح النموذج عادةً عند تسجيل الدخول إلا بعد نجاح فعلي من الخادم
            clearAllErrorStyles(loginForm);

            // في تطبيق حقيقي، بعد التحقق من الخادم والنجاح، ستقوم بإعادة توجيه المستخدم
            // window.location.href = 'dashboard.html'; // مثال
        } else {
            if(formStatusMessage) {
                formStatusMessage.textContent = 'الرجاء تصحيح الأخطاء الموضحة.';
                formStatusMessage.className = 'status-message error';
            }
        }
        // (داخل document.addEventListener('DOMContentLoaded', function() { ... }); في ملف js/script.js)

// --- 10. التحقق من صحة نموذج التسجيل (register.html) ---
const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // منع الإرسال الفعلي

        clearAllErrorMessages(this);
        const formStatusMessage = this.querySelector('#registerFormStatusMessage');
        if(formStatusMessage) formStatusMessage.textContent = '';

        let isValid = true;

        const fullNameInput = document.getElementById('registerFullName');
        const usernameInput = document.getElementById('registerUsername'); // اختياري
        const emailInput = document.getElementById('registerEmail');
        const passwordInput = document.getElementById('registerPassword');
        const confirmPasswordInput = document.getElementById('registerConfirmPassword');
        const agreeTermsCheckbox = document.getElementById('agreeTerms');

        // 1. التحقق من الاسم الكامل
        if (fullNameInput.value.trim() === '') {
            isValid = false;
            showError(fullNameInput, 'الاسم الكامل مطلوب.');
        } else {
            clearError(fullNameInput);
        }

        // 2. التحقق من اسم المستخدم (اختياري، لكن إذا أُدخل، يمكن التحقق من طوله مثلاً)
        if (usernameInput.value.trim() !== '' && usernameInput.value.trim().length < 3) {
            isValid = false;
            showError(usernameInput, 'يجب أن يتكون اسم المستخدم من 3 أحرف على الأقل.');
        } else {
            clearError(usernameInput);
        }

        // 3. التحقق من البريد الإلكتروني
        if (emailInput.value.trim() === '') {
            isValid = false;
            showError(emailInput, 'البريد الإلكتروني مطلوب.');
        } else if (!isValidEmail(emailInput.value.trim())) {
            isValid = false;
            showError(emailInput, 'الرجاء إدخال عنوان بريد إلكتروني صالح.');
        } else {
            clearError(emailInput);
        }

        // 4. التحقق من كلمة المرور
        if (passwordInput.value.trim() === '') {
            isValid = false;
            showError(passwordInput, 'كلمة المرور مطلوبة.');
        } else if (passwordInput.value.trim().length < 8) {
            isValid = false;
            showError(passwordInput, 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.');
        }
        // يمكنك إضافة شروط أكثر تعقيداً لكلمة المرور هنا (أحرف كبيرة، صغيرة، أرقام، رموز)
        // مثال: else if (!isValidPasswordFormat(passwordInput.value.trim())) { ... }
        else {
            clearError(passwordInput);
        }

        // 5. التحقق من تأكيد كلمة المرور
        if (confirmPasswordInput.value.trim() === '') {
            isValid = false;
            showError(confirmPasswordInput, 'تأكيد كلمة المرور مطلوب.');
        } else if (confirmPasswordInput.value.trim() !== passwordInput.value.trim()) {
            isValid = false;
            showError(confirmPasswordInput, 'كلمتا المرور غير متطابقتين.');
        } else {
            clearError(confirmPasswordInput);
        }

        // 6. التحقق من الموافقة على الشروط
        if (!agreeTermsCheckbox.checked) {
            isValid = false;
            // عرض الخطأ بجانب مربع الاختيار. نحتاج لتحديد الـ span بشكل مختلف قليلاً
            const termsErrorSpan = agreeTermsCheckbox.closest('.checkbox-group').nextElementSibling;
            if (termsErrorSpan && termsErrorSpan.classList.contains('error-message')) {
                 termsErrorSpan.textContent = 'يجب الموافقة على الشروط والأحكام.';
            }
            // لا يوجد inputElement مباشر هنا لإضافة كلاس input-error، يمكن تلوين النص أو إضافة أيقونة
        } else {
            const termsErrorSpan = agreeTermsCheckbox.closest('.checkbox-group').nextElementSibling;
            if (termsErrorSpan && termsErrorSpan.classList.contains('error-message')) {
                 termsErrorSpan.textContent = '';
            }
        }


        if (isValid) {
            // console.log('نموذج التسجيل صالح وجاهز للإرسال!');
            // console.log({
            //     fullName: fullNameInput.value.trim(),
            //     username: usernameInput.value.trim(),
            //     email: emailInput.value.trim(),
            //     password: passwordInput.value.trim(),
            //     agreeTerms: agreeTermsCheckbox.checked
            // });
            if(formStatusMessage) {
                formStatusMessage.textContent = 'تم إنشاء حسابك بنجاح! (رسالة مؤقتة)';
                formStatusMessage.className = 'status-message success';
            }
            registerForm.reset();
            clearAllErrorStyles(registerForm);
            // في تطبيق حقيقي، بعد النجاح من الخادم، قد تعيد توجيه المستخدم لصفحة تسجيل الدخول أو لوحة التحكم
            // window.location.href = 'login.html';
        } else {
            if(formStatusMessage) {
                formStatusMessage.textContent = 'الرجاء تصحيح الأخطاء الموضحة.';
                formStatusMessage.className = 'status-message error';
            }
        }
    });
}
// (داخل document.addEventListener('DOMContentLoaded', function() { ... }); في ملف js/script.js)

// --- 11. التحقق من صحة نموذج استعادة كلمة المرور (forgot-password.html) ---
const forgotPasswordForm = document.getElementById('forgotPasswordForm');

if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', function(event) {
        event.preventDefault(); // منع الإرسال الفعلي

        clearAllErrorMessages(this);
        const formStatusMessage = this.querySelector('#forgotPasswordFormStatusMessage');
        if (formStatusMessage) formStatusMessage.textContent = '';

        let isValid = true;

        const emailInput = document.getElementById('forgotPasswordEmail');

        // 1. التحقق من البريد الإلكتروني
        if (emailInput.value.trim() === '') {
            isValid = false;
            showError(emailInput, 'البريد الإلكتروني مطلوب.');
        } else if (!isValidEmail(emailInput.value.trim())) {
            isValid = false;
            showError(emailInput, 'الرجاء إدخال عنوان بريد إلكتروني صالح.');
        } else {
            clearError(emailInput);
        }

        if (isValid) {
            // console.log('نموذج استعادة كلمة المرور صالح وجاهز للإرسال!');
            // console.log({
            //     email: emailInput.value.trim()
            // });

            if (formStatusMessage) {
                formStatusMessage.textContent = 'تم إرسال تعليمات إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. (رسالة مؤقتة)';
                formStatusMessage.className = 'status-message success';
            }
            forgotPasswordForm.reset();
            clearAllErrorStyles(forgotPasswordForm);

            // في تطبيق حقيقي، بعد النجاح من الخادم، قد تعرض رسالة أو تبقي المستخدم في نفس الصفحة
        } else {
            if (formStatusMessage) {
                formStatusMessage.textContent = 'الرجاء تصحيح الخطأ الموضح.';
                formStatusMessage.className = 'status-message error';
            }
        }
    });
}

// ... (تأكد أن دوال showError, clearError, isValidEmail, clearAllErrorMessages, clearAllErrorStyles موجودة من قبل)
// ... (تأكد أن دوال showError, clearError, isValidEmail, clearAllErrorMessages, clearAllErrorStyles موجودة من قبل)
    });
    
    // (داخل document.addEventListener('DOMContentLoaded', function() { ... }); في ملف js/script.js)

// --- 10. التحقق من صحة نموذج التسجيل (register.html) ---

const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // منع الإرسال الفعلي

        clearAllErrorMessages(this);
        const formStatusMessage = this.querySelector('#registerFormStatusMessage');
        if(formStatusMessage) formStatusMessage.textContent = '';

        let isValid = true;

        const fullNameInput = document.getElementById('registerFullName');
        const usernameInput = document.getElementById('registerUsername'); // اختياري
        const emailInput = document.getElementById('registerEmail');
        const passwordInput = document.getElementById('registerPassword');
        const confirmPasswordInput = document.getElementById('registerConfirmPassword');
        const agreeTermsCheckbox = document.getElementById('agreeTerms');

        // 1. التحقق من الاسم الكامل
        if (fullNameInput.value.trim() === '') {
            isValid = false;
            showError(fullNameInput, 'الاسم الكامل مطلوب.');
        } else {
            clearError(fullNameInput);
        }

        // 2. التحقق من اسم المستخدم (اختياري، لكن إذا أُدخل، يمكن التحقق من طوله مثلاً)
        if (usernameInput.value.trim() !== '' && usernameInput.value.trim().length < 3) {
            isValid = false;
            showError(usernameInput, 'يجب أن يتكون اسم المستخدم من 3 أحرف على الأقل.');
        } else {
            clearError(usernameInput);
        }

        // 3. التحقق من البريد الإلكتروني
        if (emailInput.value.trim() === '') {
            isValid = false;
            showError(emailInput, 'البريد الإلكتروني مطلوب.');
        } else if (!isValidEmail(emailInput.value.trim())) {
            isValid = false;
            showError(emailInput, 'الرجاء إدخال عنوان بريد إلكتروني صالح.');
        } else {
            clearError(emailInput);
        }

        // 4. التحقق من كلمة المرور
        if (passwordInput.value.trim() === '') {
            isValid = false;
            showError(passwordInput, 'كلمة المرور مطلوبة.');
        } else if (passwordInput.value.trim().length < 8) {
            isValid = false;
            showError(passwordInput, 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.');
        }
        // يمكنك إضافة شروط أكثر تعقيداً لكلمة المرور هنا (أحرف كبيرة، صغيرة، أرقام، رموز)
        // مثال: else if (!isValidPasswordFormat(passwordInput.value.trim())) { ... }
        else {
            clearError(passwordInput);
        }

        // 5. التحقق من تأكيد كلمة المرور
        if (confirmPasswordInput.value.trim() === '') {
            isValid = false;
            showError(confirmPasswordInput, 'تأكيد كلمة المرور مطلوب.');
        } else if (confirmPasswordInput.value.trim() !== passwordInput.value.trim()) {
            isValid = false;
            showError(confirmPasswordInput, 'كلمتا المرور غير متطابقتين.');
        } else {
            clearError(confirmPasswordInput);
        }

        // 6. التحقق من الموافقة على الشروط
        if (!agreeTermsCheckbox.checked) {
            isValid = false;
            // عرض الخطأ بجانب مربع الاختيار. نحتاج لتحديد الـ span بشكل مختلف قليلاً
            const termsErrorSpan = agreeTermsCheckbox.closest('.checkbox-group').nextElementSibling;
            if (termsErrorSpan && termsErrorSpan.classList.contains('error-message')) {
                 termsErrorSpan.textContent = 'يجب الموافقة على الشروط والأحكام.';
            }
            // لا يوجد inputElement مباشر هنا لإضافة كلاس input-error، يمكن تلوين النص أو إضافة أيقونة
        } else {
            const termsErrorSpan = agreeTermsCheckbox.closest('.checkbox-group').nextElementSibling;
            if (termsErrorSpan && termsErrorSpan.classList.contains('error-message')) {
                 termsErrorSpan.textContent = '';
            }
        }


        if (isValid) {
            // console.log('نموذج التسجيل صالح وجاهز للإرسال!');
            // console.log({
            //     fullName: fullNameInput.value.trim(),
            //     username: usernameInput.value.trim(),
            //     email: emailInput.value.trim(),
            //     password: passwordInput.value.trim(),
            //     agreeTerms: agreeTermsCheckbox.checked
            // });
            if(formStatusMessage) {
                formStatusMessage.textContent = 'تم إنشاء حسابك بنجاح! (رسالة مؤقتة)';
                formStatusMessage.className = 'status-message success';
            }
            registerForm.reset();
            clearAllErrorStyles(registerForm);
            // في تطبيق حقيقي، بعد النجاح من الخادم، قد تعيد توجيه المستخدم لصفحة تسجيل الدخول أو لوحة التحكم
            // window.location.href = 'login.html';
        } else {
            if(formStatusMessage) {
                formStatusMessage.textContent = 'الرجاء تصحيح الأخطاء الموضحة.';
                formStatusMessage.className = 'status-message error';
            }
        }
    });
}

// ... (تأكد أن دوال showError, clearError, isValidEmail, clearAllErrorMessages, clearAllErrorStyles موجودة من قبل)
}

// ... (تأكد أن دوال showError, clearError, isValidEmail, clearAllErrorMessages, clearAllErrorStyles موجودة من قبل)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // منع الإرسال الفعلي للنموذج

        // مسح رسائل الخطأ وحالات النجاح السابقة
        clearAllErrorMessages(this);
        const formStatusMessage = this.querySelector('#formStatusMessage');
        if(formStatusMessage) formStatusMessage.textContent = '';


        let isValid = true;

        // الحصول على عناصر النموذج
        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const subjectInput = document.getElementById('contactSubject'); // اختياري
        const messageInput = document.getElementById('contactMessage');

        // 1. التحقق من الاسم الكامل
        if (nameInput.value.trim() === '') {
            isValid = false;
            showError(nameInput, 'الاسم الكامل مطلوب.');
        } else {
            clearError(nameInput);
        }

        // 2. التحقق من البريد الإلكتروني
        if (emailInput.value.trim() === '') {
            isValid = false;
            showError(emailInput, 'البريد الإلكتروني مطلوب.');
        } else if (!isValidEmail(emailInput.value.trim())) {
            isValid = false;
            showError(emailInput, 'الرجاء إدخال عنوان بريد إلكتروني صالح.');
        } else {
            clearError(emailInput);
        }

        // 3. التحقق من الرسالة
        if (messageInput.value.trim() === '') {
            isValid = false;
            showError(messageInput, 'الرسالة مطلوبة.');
        } else if (messageInput.value.trim().length < 10) {
            isValid = false;
            showError(messageInput, 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل.');
        }
        else {
            clearError(messageInput);
        }

        // (اختياري) التحقق من الموضوع - يمكن إضافة شروط إذا أردت
        // if (subjectInput.value.trim() === '') {
        //     isValid = false;
        //     showError(subjectInput, 'الموضوع مطلوب.');
        // } else {
        //     clearError(subjectInput);
        // }


        // إذا كانت جميع الحقول صالحة
        if (isValid) {
            // هنا، في تطبيق حقيقي، ستقوم بإرسال البيانات إلى الخادم
            // console.log('النموذج صالح وجاهز للإرسال!');
            // console.log({
            //     name: nameInput.value.trim(),
            //     email: emailInput.value.trim(),
            //     subject: subjectInput.value.trim(),
            //     message: messageInput.value.trim()
            // });

            // عرض رسالة نجاح (مؤقتة من جانب العميل)
            if(formStatusMessage) {
                formStatusMessage.textContent = 'تم إرسال رسالتك بنجاح! شكراً لك.';
                formStatusMessage.className = 'status-message success'; // لتغيير لونها إلى أخضر
            }
            contactForm.reset(); // مسح حقول النموذج بعد الإرسال الناجح
            clearAllErrorStyles(contactForm); // مسح أي تنسيقات خطأ متبقية على الحقول

        } else {
            // عرض رسالة خطأ عامة (اختياري)
             if(formStatusMessage) {
                formStatusMessage.textContent = 'الرجاء تصحيح الأخطاء الموضحة أعلاه.';
                formStatusMessage.className = 'status-message error'; // لتغيير لونها إلى أحمر
            }
        }
    });
}

// --- دوال مساعدة للتحقق من الصحة ---

// دالة لعرض رسالة الخطأ وإضافة كلاس الخطأ
function showError(inputElement, message) {
    const errorSpan = inputElement.nextElementSibling; // يفترض أن span الخطأ هو التالي مباشرة
    if (errorSpan && errorSpan.classList.contains('error-message')) {
        errorSpan.textContent = message;
    }
    inputElement.classList.add('input-error'); // كلاس لتغيير حدود الحقل
    inputElement.classList.remove('input-success');
}

// دالة لمسح رسالة الخطأ وإزالة كلاس الخطأ (وإضافة كلاس نجاح اختياري)
function clearError(inputElement) {
    const errorSpan = inputElement.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains('error-message')) {
        errorSpan.textContent = '';
    }
    inputElement.classList.remove('input-error');
    // inputElement.classList.add('input-success'); // يمكن إضافة هذا إذا أردت حدود خضراء للحقل الصحيح
}

// دالة لمسح جميع رسائل الخطأ من النموذج
function clearAllErrorMessages(formElement) {
    const errorMessages = formElement.querySelectorAll('.error-message');
    errorMessages.forEach(span => span.textContent = '');
}
// دالة لمسح جميع تنسيقات الخطأ من حقول النموذج
function clearAllErrorStyles(formElement) {
    const inputsWithErrors = formElement.querySelectorAll('.input-error');
    inputsWithErrors.forEach(input => input.classList.remove('input-error'));
    const inputsWithSuccess = formElement.querySelectorAll('.input-success'); // إذا كنت تستخدمه
    inputsWithSuccess.forEach(input => input.classList.remove('input-success'));
}


// دالة للتحقق من صحة تنسيق البريد الإلكتروني
function isValidEmail(email) {
    // تعبير نمطي (Regular Expression) بسيط للتحقق من البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ... (بقية أكواد JavaScript الخاصة بك) ...
    }

    // --- 2. تحديث سنة حقوق النشر تلقائياً ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- 3. (اختياري) تأثير بسيط عند التمرير على بطاقات الخدمات ---
    // هذا مجرد مثال، التأثيرات المعقدة يفضل أن تكون بـ CSS
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // يمكن إضافة كلاس هنا للتحكم به من CSS
            // مثال: card.classList.add('card-hover-effect');
        });
        card.addEventListener('mouseleave', function() {
            // card.classList.remove('card-hover-effect');
        });
    });

    // --- 4. (اختياري) إغلاق قائمة الموبايل عند النقر على أحد روابطها ---
    // مفيد إذا كانت القائمة تغطي كامل الشاشة
    if (mainNavigation) {
        const navLinks = mainNavigation.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (mainNavigation.classList.contains('active')) {
                    mainNavigation.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    mobileMenuToggle.setAttribute('aria-label', 'فتح القائمة');
                }
            });
        });
    }


    // --- 5. (اختياري) جعل الهيدر يتغير شكله عند التمرير لأسفل ---
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) { // إذا تم التمرير لأكثر من 50 بكسل
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        });
    }

}); // نهاية document.addEventListener('DOMContentLoaded')

// ==== نهاية ملف script.js ====
// في ملف frontend/js/script.js
// تأكد من أن هذا الكود موجود داخل:
// document.addEventListener('DOMContentLoaded', function() { ... });
// إذا لم يكن كذلك، أضف هذا السطر في بداية الملف واجعل كل الأكواد بداخله.

// --- وظيفة إظهار/إخفاء كلمة المرور ---
const passwordToggles = document.querySelectorAll('.toggle-password');

passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
        // الحصول على حقل كلمة المرور المرتبط بهذا الزر
        // نفترض أن حقل الإدخال هو العنصر الشقيق السابق لزر التبديل داخل نفس الحاوية
        const passwordInput = this.previousElementSibling; // هذا يفترض أن الإدخال يسبق الزر مباشرة
        // أو بطريقة أكثر دقة إذا كان هيكل HTML معقداً:
        // const passwordInput = this.closest('.input-with-icon').querySelector('input[type="password"], input[type="text"]');


        if (passwordInput) {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // تغيير أيقونة الزر
            const icon = this.querySelector('i');
            if (type === 'password') {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
                this.setAttribute('aria-label', 'إظهار كلمة المرور');
            } else {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
                this.setAttribute('aria-label', 'إخفاء كلمة المرور');
            }
        }
    });
});

// تأكد أن باقي أكواد JavaScript التي أضفناها سابقاً (مثل قائمة الموبايل وتحديث السنة)
// لا تزال موجودة في نفس الملف.
// في ملف frontend/js/script.js
// داخل document.addEventListener('DOMContentLoaded', function() { ... });

// --- 6. تفعيل وظيفة التبويبات (Tabs) في صفحة تفاصيل الدورة ---
const tabLinks = document.querySelectorAll('.tabs-nav .tab-link');
const tabPanes = document.querySelectorAll('.tabs-content .tab-pane');

tabLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // منع السلوك الافتراضي للزر إذا كان داخل نموذج أو رابط

        const tabId = this.getAttribute('data-tab');

        // إزالة كلاس 'active' من جميع أزرار التبويبات ومحتويات التبويبات
        tabLinks.forEach(item => item.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // إضافة كلاس 'active' للزر المضغوط ومحتوى التبويب الموافق له
        this.classList.add('active');
        const correspondingTabPane = document.getElementById(tabId);
        if (correspondingTabPane) {
            correspondingTabPane.classList.add('active');
        }
    });
});

// --- 7. تفعيل وظيفة الأكورديون (Accordion) في منهج الدورة ---
// (داخل document.addEventListener('DOMContentLoaded', function() { ... }); في ملف js/script.js)

// --- 7. تفعيل وظيفة الأكورديون (Accordion) بشكل عام ---
const accordionHeaders = document.querySelectorAll('.accordion-header'); // السطر المعدل هنا

accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
        this.classList.toggle('active');
        const accordionContent = this.nextElementSibling;

        if (accordionContent && accordionContent.classList.contains('accordion-content')) {
            accordionContent.classList.toggle('active');
            // إذا كنت تستخدم التحكم بالارتفاع للانيميشن:
            /*
            if (accordionContent.style.maxHeight) {
                accordionContent.style.maxHeight = null;
            } else {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            }
            */
        }

        // (اختياري) إغلاق عناصر الأكورديون الأخرى عند فتح عنصر واحد:
        
        if (this.classList.contains('active')) {
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    const otherContent = otherHeader.nextElementSibling;
                    if (otherContent && otherContent.classList.contains('accordion-content')) {
                        otherContent.classList.remove('active');
                        // otherContent.style.maxHeight = null; // إذا كنت تستخدم التحكم بالارتفاع
                    }
                }
            });
        }
        
    });
});