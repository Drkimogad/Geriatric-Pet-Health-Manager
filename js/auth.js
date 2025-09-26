// auth.js - Authentication functionality for Geriatric Pet Health Manager

// Auth State Management
let currentUser = null;
const authSections = {
    signup: document.getElementById('signup-section'),
    signin: document.getElementById('signin-section')
};
const appSections = {
    dashboard: document.getElementById('dashboard-section'),
    profiles: document.getElementById('profiles-section'),
    medication: document.getElementById('medication-section'),
    nutrition: document.getElementById('nutrition-section'),
    exercise: document.getElementById('exercise-section'),
    reminders: document.getElementById('reminders-section')
};

// DOM Elements
const elements = {
    // Forms
    signupForm: document.getElementById('signup-form'),
    signinForm: document.getElementById('signin-form'),
    
    // Input Fields
    signupEmail: document.getElementById('signup-email'),
    signupPassword: document.getElementById('signup-password'),
    signupConfirmPassword: document.getElementById('signup-confirm-password'),
    signinEmail: document.getElementById('signin-email'),
    signinPassword: document.getElementById('signin-password'),
    
    // Links
    showSigninLink: document.getElementById('show-signin-link'),
    showSignupLink: document.getElementById('show-signup-link'),
    forgotPasswordLink: document.getElementById('forgot-password-link')
};

// Utility Functions for Auth
const authUtils = {
    // Validate email format
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Validate password strength
    isValidPassword(password) {
        return password.length >= 6;
    },
    
    // Check if passwords match
    doPasswordsMatch(password, confirmPassword) {
        return password === confirmPassword;
    },
    
    // Simple email/password validation
    validateAuthInputs(email, password, confirmPassword = null) {
        if (!this.isValidEmail(email)) {
            return { isValid: false, message: 'Please enter a valid email address' };
        }
        
        if (!this.isValidPassword(password)) {
            return { isValid: false, message: 'Password must be at least 6 characters long' };
        }
        
        if (confirmPassword && !this.doPasswordsMatch(password, confirmPassword)) {
            return { isValid: false, message: 'Passwords do not match' };
        }
        
        return { isValid: true, message: '' };
    },
    
    // Show error message
    showError(element, message) {
        // Remove existing error
        this.clearError(element);
        
        // Create error element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'var(--error)';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = message;
        
        // Insert after the input
        element.parentNode.insertBefore(errorDiv, element.nextSibling);
        
        // Add error styling to input
        element.style.borderColor = 'var(--error)';
    },
    
    // Clear error message
    clearError(element) {
        const errorDiv = element.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        element.style.borderColor = '';
    },
    
    // Show success message
    showSuccess(message) {
        // This would be implemented with a toast notification system
        console.log('Success:', message);
        alert(message); // Temporary simple alert
    }
};

// Authentication Functions
const authFunctions = {
    // Sign Up Function
    async signUp(email, password) {
        try {
            // Simulate API call - replace with actual authentication service
            const validation = authUtils.validateAuthInputs(email, password, elements.signupConfirmPassword.value);
            if (!validation.isValid) {
                authUtils.showError(elements.signupEmail, validation.message);
                return false;
            }
            
            // Check if user already exists (simulated)
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const userExists = existingUsers.find(user => user.email === email);
            
            if (userExists) {
                authUtils.showError(elements.signupEmail, 'An account with this email already exists');
                return false;
            }
            
            // Create new user (in real app, this would be a secure API call)
            const newUser = {
                id: Date.now().toString(),
                email: email,
                password: btoa(password), // Basic encoding - NOT secure for production
                createdAt: new Date().toISOString(),
                pets: []
            };
            
            existingUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(existingUsers));
            
            // Set current user
            currentUser = { id: newUser.id, email: newUser.email };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            authUtils.showSuccess('Account created successfully!');
            this.showAppSections();
            return true;
            
        } catch (error) {
            console.error('Sign up error:', error);
            authUtils.showError(elements.signupEmail, 'An error occurred during sign up');
            return false;
        }
    },
    
    // Sign In Function
    async signIn(email, password) {
        try {
            const validation = authUtils.validateAuthInputs(email, password);
            if (!validation.isValid) {
                authUtils.showError(elements.signinEmail, validation.message);
                return false;
            }
            
            // Check user credentials (simulated)
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const user = existingUsers.find(u => u.email === email && atob(u.password) === password);
            
            if (!user) {
                authUtils.showError(elements.signinEmail, 'Invalid email or password');
                return false;
            }
            
            // Set current user
            currentUser = { id: user.id, email: user.email };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            authUtils.showSuccess(`Welcome back, ${email}!`);
            this.showAppSections();
            return true;
            
        } catch (error) {
            console.error('Sign in error:', error);
            authUtils.showError(elements.signinEmail, 'An error occurred during sign in');
            return false;
        }
    },
    
    // Sign Out Function
    signOut() {
        currentUser = null;
        localStorage.removeItem('currentUser');
        this.showAuthSections();
    },
    
    // Forgot Password Function
    async forgotPassword(email) {
        try {
            if (!authUtils.isValidEmail(email)) {
                authUtils.showError(elements.signinEmail, 'Please enter a valid email address');
                return false;
            }
            
            // Simulate password reset process
            authUtils.showSuccess(`Password reset instructions sent to ${email}`);
            return true;
            
        } catch (error) {
            console.error('Forgot password error:', error);
            authUtils.showError(elements.signinEmail, 'An error occurred');
            return false;
        }
    },
    
    // Show Authentication Sections
    showAuthSections() {
        // Hide all app sections
        Object.values(appSections).forEach(section => {
            if (section) section.style.display = 'none';
        });
        
        // Show auth sections based on which one should be visible
        this.showSignupSection();
    },
    
    // Show Application Sections
    showAppSections() {
        // Hide all auth sections
        Object.values(authSections).forEach(section => {
            if (section) section.style.display = 'none';
        });
        
        // Show app sections starting with dashboard
        if (appSections.dashboard) {
            appSections.dashboard.style.display = 'block';
        }
        
        // Initialize dashboard when shown
        if (typeof initDashboard === 'function') {
            initDashboard();
        }
    },
    
    // Show Signup Section
    showSignupSection() {
        if (authSections.signin) authSections.signin.style.display = 'none';
        if (authSections.signup) authSections.signup.style.display = 'block';
        this.clearAllErrors();
    },
    
    // Show Signin Section
    showSigninSection() {
        if (authSections.signup) authSections.signup.style.display = 'none';
        if (authSections.signin) authSections.signin.style.display = 'block';
        this.clearAllErrors();
    },
    
    // Clear all error messages
    clearAllErrors() {
        const inputs = [
            elements.signupEmail, 
            elements.signupPassword, 
            elements.signupConfirmPassword,
            elements.signinEmail, 
            elements.signinPassword
        ];
        
        inputs.forEach(input => {
            if (input) authUtils.clearError(input);
        });
    },
    
    // Check if user is authenticated
    isAuthenticated() {
        return currentUser !== null;
    },
    
    // Get current user
    getCurrentUser() {
        return currentUser;
    }
};

// Event Handlers
const setupEventListeners = () => {
    // Sign Up Form Submission
    if (elements.signupForm) {
        elements.signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await authFunctions.signUp(elements.signupEmail.value, elements.signupPassword.value);
        });
    }
    
    // Sign In Form Submission
    if (elements.signinForm) {
        elements.signinForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await authFunctions.signIn(elements.signinEmail.value, elements.signinPassword.value);
        });
    }
    
    // Toggle between Sign Up and Sign In
    if (elements.showSigninLink) {
        elements.showSigninLink.addEventListener('click', (e) => {
            e.preventDefault();
            authFunctions.showSigninSection();
        });
    }
    
    if (elements.showSignupLink) {
        elements.showSignupLink.addEventListener('click', (e) => {
            e.preventDefault();
            authFunctions.showSignupSection();
        });
    }
    
    // Forgot Password
    if (elements.forgotPasswordLink) {
        elements.forgotPasswordLink.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = prompt('Please enter your email address to reset your password:');
            if (email) {
                await authFunctions.forgotPassword(email);
            }
        });
    }
};

// Initialize Authentication
const initAuth = () => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            authFunctions.showAppSections();
            return;
        } catch (error) {
            console.error('Error parsing saved user:', error);
            localStorage.removeItem('currentUser');
        }
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Show authentication sections
    authFunctions.showAuthSections();
};

// Export for use in other files
window.authFunctions = authFunctions;
window.authUtils = authUtils;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initAuth);
