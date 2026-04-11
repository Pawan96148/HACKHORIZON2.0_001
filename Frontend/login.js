// Login Form 1 - Glassmorphism Style JavaScript
// Production Ready Version (Render + OAuth safe)

class LoginForm1 {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.submitBtn = this.form.querySelector('.login-btn');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.passwordInput = document.getElementById('password');
        this.successMessage = document.getElementById('successMessage');
        this.isSubmitting = false;

        this.validators = {
            email: FormUtils.validateEmail,
            password: FormUtils.validatePassword
        };

        this.init();
    }

    init() {
        this.addEventListeners();
        FormUtils.setupFloatingLabels(this.form);
        this.addInputAnimations();
        FormUtils.setupPasswordToggle(this.passwordInput, this.passwordToggle);
        this.setupSocialButtons();
        FormUtils.addSharedAnimations();
    }

    addEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        Object.keys(this.validators).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                field.addEventListener('blur', () => this.validateField(fieldName));
                field.addEventListener('input', () => FormUtils.clearError(fieldName));
            }
        });

        const inputs = this.form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => this.handleFocus(e));
            input.addEventListener('blur', (e) => this.handleBlur(e));
        });

        const checkbox = document.getElementById('remember');
        if (checkbox) {
            checkbox.addEventListener('change', () => this.animateCheckbox());
        }

        const forgotLink = document.querySelector('.forgot-password');
        if (forgotLink) {
            forgotLink.addEventListener('click', (e) => this.handleForgotPassword(e));
        }

        const signupLink = document.querySelector('.signup-link a');
        if (signupLink) {
            signupLink.addEventListener('click', (e) => this.handleSignupLink(e));
        }

        this.setupKeyboardShortcuts();
    }

    addInputAnimations() {
        const inputs = this.form.querySelectorAll('input');
        inputs.forEach((input, index) => {
            setTimeout(() => {
                input.style.opacity = '1';
                input.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    setupSocialButtons() {
        document.querySelectorAll('.social-btn')
            .forEach(btn => btn.addEventListener('click', (e) => this.handleSocialLogin(e)));
    }

    handleFocus(e) {
        e.target.closest('.input-wrapper')?.classList.add('focused');
    }

    handleBlur(e) {
        e.target.closest('.input-wrapper')?.classList.remove('focused');
    }

    animateCheckbox() {
        const checkmark = document.querySelector('.checkmark');
        if (!checkmark) return;

        checkmark.style.transform = 'scale(0.8)';
        setTimeout(() => checkmark.style.transform = 'scale(1)', 150);
    }

    handleForgotPassword(e) {
        e.preventDefault();
        FormUtils.showNotification('Password reset link sent (demo)', 'info', this.form);
    }

    handleSignupLink(e) {
        e.preventDefault();
        FormUtils.showNotification('Redirecting...', 'info', this.form);
        setTimeout(() => window.location.href = 'signup.html', 250);
    }

    handleSocialLogin(e) {
        const btn = e.currentTarget;
        const provider = btn.classList.contains('google-btn') ? 'Google' : 'GitHub';

        btn.style.transform = 'scale(0.95)';
        btn.style.opacity = '0.8';

        setTimeout(() => {
            btn.style.transform = 'scale(1)';
            btn.style.opacity = '1';
        }, 200);

        FormUtils.showNotification(`Connecting to ${provider}...`, 'info', this.form);

        setTimeout(() => {
            const backendBase = (window.BACKEND_BASE || '').replace(/\/$/, '');
            const path = provider === 'Google'
                ? '/v1/auth/google'
                : '/v1/auth/github';

            window.location.href = backendBase + path;
        }, 300);
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.isSubmitting) return;

        if (this.validateForm()) {
            await this.submitForm();
        } else {
            this.shakeForm();
        }
    }

    validateForm() {
        return Object.keys(this.validators)
            .every(field => this.validateField(field));
    }

    validateField(fieldName) {
        const field = document.getElementById(fieldName);
        const validator = this.validators[fieldName];

        if (!field || !validator) return true;

        const result = validator(field.value.trim(), field);

        if (result.isValid) {
            FormUtils.clearError(fieldName);
            FormUtils.showSuccess(fieldName);
        } else {
            FormUtils.showError(fieldName, result.message);
        }

        return result.isValid;
    }

    shakeForm() {
        this.form.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => this.form.style.animation = '', 500);
    }

    async submitForm() {
        this.isSubmitting = true;
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;

        try {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // 🔥 FINAL SAFE BASE URL (Render + Local)
            const BASE_URL =
                window.BACKEND_BASE ||
                "https://your-render-url.onrender.com";

            const response = await fetch(`${BASE_URL}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            let data;
            try {
                data = await response.json();
            } catch {
                throw new Error("Invalid server response");
            }

            if (!response.ok) {
                throw new Error(data.msg || "Login failed");
            }

            localStorage.setItem("accessToken", data.token);

            this.showSuccessMessage();

        } catch (error) {
            console.error('Login error:', error);
            this.showLoginError(error.message);
        } finally {
            this.isSubmitting = false;
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    showSuccessMessage() {
        this.form.style.opacity = '0';
        this.form.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            this.form.style.display = 'none';
            this.successMessage.classList.add('show');

            setTimeout(() => {
                window.location.href = "/dashboard.html";
            }, 2000);
        }, 300);
    }

    showLoginError(message) {
        FormUtils.showNotification(message, 'error', this.form);

        const card = document.querySelector('.login-card');
        if (card) {
            card.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => card.style.animation = '', 500);
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.closest('#loginForm')) {
                e.preventDefault();
                this.handleSubmit(e);
            }

            if (e.key === 'Escape') {
                Object.keys(this.validators)
                    .forEach(field => FormUtils.clearError(field));
            }
        });
    }

    validate() {
        return this.validateForm();
    }

    getFormData() {
        return Object.fromEntries(new FormData(this.form));
    }
}

// 🚀 INIT
document.addEventListener('DOMContentLoaded', () => {
    const loginCard = document.querySelector('.login-card');
    FormUtils.addEntranceAnimation(loginCard);

    new LoginForm1();
});