document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');
    const loginBtn = document.querySelector('.login-btn');
    const socialBtns = document.querySelectorAll('.social-btn');
    
    // Password toggle functionality
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
    
    // Input animation effects
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add typing animation
        input.addEventListener('input', function() {
            const wrapper = this.parentElement;
            wrapper.style.transform = 'scale(1.02)';
            setTimeout(() => {
                wrapper.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Form submission with loading animation
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate inputs
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!email || !password) {
            showError('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
            
            // Show success animation
            showSuccess('Login successful! Redirecting...');
            
            // Simulate redirect
            setTimeout(() => {
                console.log('Redirecting to dashboard...');
                // window.location.href = '/dashboard';
            }, 1500);
        }, 2000);
    });
    
    // Social login buttons
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.classList.contains('google') ? 'Google' : 
                           this.classList.contains('github') ? 'GitHub' : 'Twitter';
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            showInfo(`Redirecting to ${platform} login...`);
            
            // Simulate social login
            setTimeout(() => {
                console.log(`${platform} login initiated`);
            }, 1000);
        });
    });
    
    // Floating shapes animation
    createFloatingParticles();
    
    // Add entrance animation to form
    setTimeout(() => {
        document.querySelector('.login-form').style.opacity = '1';
        document.querySelector('.login-form').style.transform = 'translateY(0)';
    }, 100);
    
    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(message) {
        showNotification(message, 'error');
    }
    
    function showSuccess(message) {
        showNotification(message, 'success');
    }
    
    function showInfo(message) {
        showNotification(message, 'info');
    }
    
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            minWidth: '250px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        // Set background color based on type
        const colors = {
            error: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
            success: 'linear-gradient(135deg, #51cf66, #40c057)',
            info: 'linear-gradient(135deg, #339af0, #228be6)'
        };
        notification.style.background = colors[type];
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
    
    function getNotificationIcon(type) {
        const icons = {
            error: 'fa-exclamation-circle',
            success: 'fa-check-circle',
            info: 'fa-info-circle'
        };
        return icons[type];
    }
    
    function createFloatingParticles() {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                createParticle();
            }, i * 200);
        }
        
        // Continue creating particles
        setInterval(() => {
            if (document.querySelectorAll('.particle').length < particleCount) {
                createParticle();
            }
        }, 3000);
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 10 + 10;
        
        Object.assign(particle.style, {
            position: 'fixed',
            width: size + 'px',
            height: size + 'px',
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '50%',
            left: startX + 'px',
            top: '100vh',
            pointerEvents: 'none',
            zIndex: '-1',
            animation: `floatUp ${duration}s linear infinite`
        });
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, duration * 1000);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .notification {
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
            }
            to {
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to submit form
    if (e.key === 'Enter' && (e.target.tagName === 'INPUT')) {
        const form = e.target.closest('form');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape key to clear form
    if (e.key === 'Escape') {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            if (input.type !== 'checkbox') {
                input.value = '';
                input.blur();
            }
        });
    }
});