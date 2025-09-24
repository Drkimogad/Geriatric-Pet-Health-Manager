// dashboard.js - Main application functionality for Geriatric Pet Health Manager

// Application State
let appState = {
    currentPet: null,
    pets: [],
    medications: [],
    reminders: [],
    activities: [],
    todayTasks: []
};

// DOM Elements for Dashboard
const dashboardElements = {
    dashboardSection: document.getElementById('dashboard-section'),
    dashboardContent: document.getElementById('dashboard-content'),
    
    // Other app sections
    profilesSection: document.getElementById('profiles-section'),
    medicationSection: document.getElementById('medication-section'),
    nutritionSection: document.getElementById('nutrition-section'),
    exerciseSection: document.getElementById('exercise-section'),
    remindersSection: document.getElementById('reminders-section')
};

// Dashboard Templates
const dashboardTemplates = {
    // Main Dashboard Layout
    mainDashboard: () => `
        <div class="dashboard-header">
            <h2>Welcome to Your Pet's Health Hub</h2>
            <div class="pet-selector">
                <label for="pet-select">Select Pet: </label>
                <select id="pet-select" class="pet-dropdown">
                    <option value="">-- Choose a Pet --</option>
                    ${appState.pets.map(pet => `
                        <option value="${pet.id}" ${pet.id === appState.currentPet?.id ? 'selected' : ''}>
                            ${pet.name}
                        </option>
                    `).join('')}
                </select>
            </div>
        </div>
        
        <div class="dashboard-grid">
            <div class="dashboard-card pet-summary">
                <h3>Pet Summary</h3>
                <div id="pet-summary-content">
                    ${appState.currentPet ? dashboardTemplates.petSummary() : '<p>Select a pet to view summary</p>'}
                </div>
            </div>
            
            <div class="dashboard-card today-tasks">
                <h3>Today's Tasks</h3>
                <div id="today-tasks-content">
                    ${dashboardTemplates.todayTasks()}
                </div>
            </div>
            
            <div class="dashboard-card alerts-notices">
                <h3>Alerts & Notices</h3>
                <div id="alerts-content">
                    ${dashboardTemplates.alerts()}
                </div>
            </div>
            
            <div class="dashboard-card quick-actions">
                <h3>Quick Actions</h3>
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="showSection('profiles')">Add New Pet</button>
                    <button class="btn btn-secondary" onclick="showSection('medication')">Add Medication</button>
                    <button class="btn btn-accent" onclick="showSection('reminders')">Set Reminder</button>
                    <button class="btn btn-primary" onclick="logActivity()">Log Activity</button>
                </div>
            </div>
        </div>
    `,

    // Pet Summary Template
    petSummary: () => {
        const pet = appState.currentPet;
        return `
            <div class="pet-info">
                <div class="pet-basic">
                    <h4>${pet.name}</h4>
                    <p><strong>Age:</strong> ${calculateAge(pet.birthDate)} years</p>
                    <p><strong>Weight:</strong> ${pet.weight || 'N/A'} kg</p>
                    <p><strong>Condition:</strong> ${pet.conditions?.join(', ') || 'None reported'}</p>
                </div>
                <div class="pet-health-metrics">
                    <div class="metric">
                        <span class="metric-label">Mobility Score</span>
                        <span class="metric-value">${pet.mobilityScore || 'Not set'}/5</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Last Vet Visit</span>
                        <span class="metric-value">${formatDate(pet.lastVetVisit) || 'Not recorded'}</span>
                    </div>
                </div>
            </div>
        `;
    },

    // Today's Tasks Template
    todayTasks: () => {
        const tasks = appState.todayTasks;
        if (tasks.length === 0) {
            return '<p>No tasks scheduled for today</p>';
        }
        
        return `
            <ul class="tasks-list">
                ${tasks.map(task => `
                    <li class="task-item ${task.completed ? 'completed' : ''}">
                        <input type="checkbox" ${task.completed ? 'checked' : ''} 
                               onchange="toggleTaskCompletion('${task.id}')">
                        <span class="task-time">${task.time}</span>
                        <span class="task-description">${task.description}</span>
                        <span class="task-type ${task.type}">${task.type}</span>
                    </li>
                `).join('')}
            </ul>
        `;
    },

    // Alerts Template
    alerts: () => {
        const alerts = generateAlerts();
        if (alerts.length === 0) {
            return '<p class="no-alerts">No alerts at this time</p>';
        }
        
        return `
            <div class="alerts-list">
                ${alerts.map(alert => `
                    <div class="alert-item ${alert.severity}">
                        <span class="alert-icon">⚠️</span>
                        <div class="alert-content">
                            <strong>${alert.title}</strong>
                            <p>${alert.message}</p>
                            <small>${alert.date}</small>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
};

// Utility Functions
const utils = {
    // Format date for display
    formatDate: (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString();
    },

    // Calculate age from birth date
    calculateAge: (birthDate) => {
        if (!birthDate) return 'Unknown';
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    },

    // Get today's date in YYYY-MM-DD format
    getTodayDate: () => {
        return new Date().toISOString().split('T')[0];
    },

    // Save data to localStorage
    saveData: (key, data) => {
        try {
            localStorage.setItem(`petHealth_${key}`, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    },

    // Load data from localStorage
    loadData: (key) => {
        try {
            const data = localStorage.getItem(`petHealth_${key}`);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading data:', error);
            return null;
        }
    }
};

// Alert Generation Logic
const generateAlerts = () => {
    const alerts = [];
    const today = new Date();
    
    if (!appState.currentPet) {
        return alerts;
    }

    const pet = appState.currentPet;

    // Medication alerts
    appState.medications.forEach(med => {
        if (med.refillDate && new Date(med.refillDate) <= today) {
            alerts.push({
                severity: 'warning',
                title: 'Medication Refill Needed',
                message: `${med.name} is due for refill`,
                date: utils.formatDate(med.refillDate)
            });
        }
    });

    // Vet appointment alerts
    appState.reminders.forEach(reminder => {
        if (reminder.type === 'vet' && new Date(reminder.date) <= today) {
            alerts.push({
                severity: 'info',
                title: 'Vet Appointment',
                message: reminder.description,
                date: utils.formatDate(reminder.date)
            });
        }
    });

    // Weight monitoring alerts
    if (pet.weightHistory && pet.weightHistory.length > 1) {
        const recentWeight = pet.weightHistory[pet.weightHistory.length - 1];
        const previousWeight = pet.weightHistory[pet.weightHistory.length - 2];
        const weightChange = ((recentWeight.weight - previousWeight.weight) / previousWeight.weight) * 100;
        
        if (Math.abs(weightChange) > 10) { // More than 10% change
            alerts.push({
                severity: 'error',
                title: 'Significant Weight Change',
                message: `Weight changed by ${weightChange.toFixed(1)}%`,
                date: `Since ${utils.formatDate(previousWeight.date)}`
            });
        }
    }

    return alerts;
};

// Task Management
const taskManager = {
    // Generate today's tasks
    generateTodayTasks: () => {
        const tasks = [];
        const today = utils.getTodayDate();
        
        // Medication tasks
        appState.medications.forEach(med => {
            if (med.schedule && med.schedule[today]) {
                med.schedule[today].forEach(time => {
                    tasks.push({
                        id: `med_${med.id}_${time}`,
                        type: 'medication',
                        description: `Give ${med.name} (${med.dosage})`,
                        time: time,
                        completed: false
                    });
                });
            }
        });

        // Reminder tasks
        appState.reminders.forEach(reminder => {
            if (reminder.date === today) {
                tasks.push({
                    id: `reminder_${reminder.id}`,
                    type: 'reminder',
                    description: reminder.description,
                    time: reminder.time || 'All day',
                    completed: false
                });
            }
        });

        return tasks;
    },

    // Toggle task completion
    toggleTaskCompletion: (taskId) => {
        const task = appState.todayTasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            utils.saveData('todayTasks', appState.todayTasks);
            renderDashboard();
        }
    }
};

// Section Navigation
const sectionManager = {
    // Show specific section
    showSection: (sectionName) => {
        // Hide all sections
        Object.values(dashboardElements).forEach(section => {
            if (section && section.classList.contains('app-section')) {
                section.style.display = 'none';
            }
        });

        // Show requested section
        const targetSection = dashboardElements[`${sectionName}Section`];
        if (targetSection) {
            targetSection.style.display = 'block';
        }

        // Initialize section if needed
        if (typeof window[`init${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}`] === 'function') {
            window[`init${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}`]();
        }
    },

    // Return to dashboard
    showDashboard: () => {
        sectionManager.showSection('dashboard');
    }
};

// Dashboard Rendering
const renderDashboard = () => {
    if (!dashboardElements.dashboardContent) return;
    
    dashboardElements.dashboardContent.innerHTML = dashboardTemplates.mainDashboard();
    
    // Set up pet selector event listener
    const petSelect = document.getElementById('pet-select');
    if (petSelect) {
        petSelect.addEventListener('change', (e) => {
            const petId = e.target.value;
            if (petId) {
                const selectedPet = appState.pets.find(pet => pet.id === petId);
                if (selectedPet) {
                    appState.currentPet = selectedPet;
                    utils.saveData('currentPet', appState.currentPet);
                    loadPetData(selectedPet.id);
                    renderDashboard();
                }
            }
        });
    }
};

// Data Management
const loadAppData = () => {
    // Load user's pets
    const user = authFunctions?.getCurrentUser();
    if (user) {
        appState.pets = utils.loadData(`pets_${user.id}`) || [];
        appState.currentPet = utils.loadData('currentPet') || null;
        
        if (appState.currentPet) {
            loadPetData(appState.currentPet.id);
        }
    }
};

const loadPetData = (petId) => {
    appState.medications = utils.loadData(`medications_${petId}`) || [];
    appState.reminders = utils.loadData(`reminders_${petId}`) || [];
    appState.activities = utils.loadData(`activities_${petId}`) || [];
    appState.todayTasks = taskManager.generateTodayTasks();
};

// Initialize Dashboard
const initDashboard = () => {
    loadAppData();
    renderDashboard();
    
    // Show dashboard section
    if (dashboardElements.dashboardSection) {
        dashboardElements.dashboardSection.style.display = 'block';
    }
};

// Global functions for HTML event handlers
window.showSection = sectionManager.showSection;
window.showDashboard = sectionManager.showDashboard;
window.toggleTaskCompletion = taskManager.toggleTaskCompletion;
window.formatDate = utils.formatDate;
window.calculateAge = utils.calculateAge;

// Activity logging function (placeholder)
window.logActivity = () => {
    alert('Activity logging will be implemented in the Exercise section');
    sectionManager.showSection('exercise');
};

// Export for testing/development
window.dashboardApp = {
    appState,
    utils,
    taskManager,
    sectionManager,
    renderDashboard
};
