// Shared Form Utilities - Used by Login & Signup Forms
class FormUtils {
    // Email validation
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        return {
            isValid,
            message: isValid ? '' : 'Please enter a valid email address'
        };
    }

    // Password validation
    static validatePassword(password) {
        // Min 8 chars, at least one uppercase, one lowercase, one number
        const isValid = password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
        return {
            isValid,
            message: isValid ? '' : 'Password must be at least 8 characters with uppercase, lowercase, and number'
        };
    }

    // Clear error message
    static clearError(fieldName) {
        const field = document.getElementById(fieldName);
        const errorMsg = document.getElementById(`${fieldName}Error`);
        if (field) {
            field.closest('.form-group')?.classList.remove('error');
        }
        if (errorMsg) {
            errorMsg.classList.remove('show');
            errorMsg.textContent = '';
        }
    }

    // Show error message
    static showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorMsg = document.getElementById(`${fieldName}Error`);
        
        if (field) {
            field.closest('.form-group')?.classList.add('error');
        }
        if (errorMsg) {
            errorMsg.textContent = message;
            errorMsg.classList.add('show');
        }
    }

    // Setup floating labels
    static setupFloatingLabels(form) {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            // Check if input has value on load
            if (input.value) {
                input.classList.add('has-value');
            }

            input.addEventListener('input', function() {
                if (this.value) {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });

            input.addEventListener('focus', function() {
                this.classList.add('has-value');
            });

            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.classList.remove('has-value');
                }
            });
        });
    }

    // Password visibility toggle
    static setupPasswordToggle(passwordInput, toggleButton) {
        if (!passwordInput || !toggleButton) return;

        toggleButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            const eyeIcon = toggleButton.querySelector('.eye-icon');
            const isPasswordVisible = passwordInput.type === 'text';
            
            // Toggle input type
            passwordInput.type = isPasswordVisible ? 'password' : 'text';
            
            // Toggle eye icon
            if (eyeIcon) {
                eyeIcon.classList.toggle('show-password', !isPasswordVisible);
            }
            
            // Add subtle feedback
            toggleButton.style.transform = 'translateY(-50%) scale(1.1)';
            setTimeout(() => {
                toggleButton.style.transform = 'translateY(-50%) scale(1)';
            }, 200);
        });
    }

    // Show notification
    static showNotification(message, type = 'info', container = null) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Fallback container
        container = container || document.body;
        container.appendChild(notification);

        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Show success feedback on field
    static showSuccess(fieldName) {
        const field = document.getElementById(fieldName);
        if (field) {
            const wrapper = field.closest('.input-wrapper');
            if (wrapper) {
                wrapper.classList.add('success');
                setTimeout(() => wrapper.classList.remove('success'), 2000);
            }
        }
    }

    // Add entrance animation
    static addEntranceAnimation(element) {
        if (!element) return;
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }

    // Add shared animations
    static addSharedAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 24px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 9999;
                animation: slideIn 0.3s ease;
                transition: opacity 0.3s ease;
                max-width: 400px;
                word-wrap: break-word;
            }

            .notification-success {
                background: #22c55e;
            }

            .notification-error {
                background: #ef4444;
            }

            .notification-info {
                background: #3b82f6;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @media (max-width: 480px) {
                .notification {
                    left: 10px;
                    right: 10px;
                    max-width: none;
                }
            }
        `;
        if (!document.querySelector('style[data-form-utils]')) {
            style.setAttribute('data-form-utils', 'true');
            document.head.appendChild(style);
        }
    }

    // Validate form field
    static validateField(fieldName, validators) {
        const field = document.getElementById(fieldName);
        if (!field) return false;

        const value = field.value.trim();
        const validator = validators[fieldName];

        if (!value) {
            this.showError(fieldName, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
            return false;
        }

        if (validator && !validator(value)) {
            if (fieldName === 'email') {
                this.showError(fieldName, 'Please enter a valid email address');
            } else if (fieldName === 'password') {
                this.showError(fieldName, 'Password must be at least 8 characters with uppercase, lowercase, and number');
            } else {
                this.showError(fieldName, `Invalid ${fieldName}`);
            }
            return false;
        }

        this.clearError(fieldName);
        return true;
    }

    // Check if field has value
    static hasValue(fieldName) {
        const field = document.getElementById(fieldName);
        return field && field.value.trim().length > 0;
    }

    // Get all form values
    static getFormValues(form) {
        const formData = new FormData(form);
        const values = {};
        formData.forEach((value, key) => {
            values[key] = value;
        });
        return values;
    }

    // Disable button with loading state
    static setButtonLoading(button, isLoading = true) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    // Debounce function
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Make FormUtils available globally
if (typeof window !== 'undefined') {
    window.FormUtils = FormUtils;
}
