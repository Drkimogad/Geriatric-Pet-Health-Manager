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

//====================================
// Pet Profiles Section Functionality
//=======================================
const petProfilesManager = {
    // DOM Elements for Pet Profiles
    elements: {
        profilesSection: document.getElementById('profiles-section'),
        profilesContent: document.getElementById('profiles-content')
    },

    // Templates for Pet Profiles
    templates: {
        // Main Profiles View
        mainView: () => `
            <div class="profiles-header">
                <h2>Manage Your Pet Profiles</h2>
                <button class="btn btn-primary" onclick="petProfilesManager.showAddForm()">
                    + Add New Pet
                </button>
            </div>
            
            <div class="pets-list" id="pets-list">
                ${petProfilesManager.templates.petsList()}
            </div>
        `,

        // Pets List Template
        petsList: () => {
            if (appState.pets.length === 0) {
                return `
                    <div class="no-pets">
                        <p>No pets added yet. Add your first pet to get started!</p>
                    </div>
                `;
            }

            return `
                <div class="pets-grid">
                    ${appState.pets.map(pet => `
                        <div class="pet-card" data-pet-id="${pet.id}">
                            <div class="pet-card-header">
                                <h3>${pet.name}</h3>
                                <div class="pet-actions">
                                    <button class="btn-icon" onclick="petProfilesManager.editPet('${pet.id}')" title="Edit">
                                        ✏️
                                    </button>
                                    <button class="btn-icon" onclick="petProfilesManager.viewPet('${pet.id}')" title="View Details">
                                        👁️
                                    </button>
                                    <button class="btn-icon delete" onclick="petProfilesManager.deletePet('${pet.id}')" title="Delete">
                                        🗑️
                                    </button>
                                </div>
                            </div>
                            <div class="pet-card-body">
                                <div class="pet-info-row">
                                    <span class="label">Species:</span>
                                    <span class="value">${pet.species || 'Not set'}</span>
                                </div>
                                <div class="pet-info-row">
                                    <span class="label">Breed:</span>
                                    <span class="value">${pet.breed || 'Not set'}</span>
                                </div>
                                <div class="pet-info-row">
                                    <span class="label">Age:</span>
                                    <span class="value">${calculateAge(pet.birthDate) || 'Unknown'} years</span>
                                </div>
                                <div class="pet-info-row">
                                    <span class="label">Weight:</span>
                                    <span class="value">${pet.weight ? pet.weight + ' kg' : 'Not set'}</span>
                                </div>
                                <div class="pet-info-row">
                                    <span class="label">Conditions:</span>
                                    <span class="value">${pet.conditions?.length > 0 ? pet.conditions.join(', ') : 'None'}</span>
                                </div>
                            </div>
                            <div class="pet-card-footer">
                                <button class="btn btn-secondary btn-sm" onclick="petProfilesManager.setCurrentPet('${pet.id}')">
                                    Set as Active
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        },

        // Add/Edit Pet Form
        petForm: (pet = null) => {
            const isEdit = !!pet;
            return `
                <div class="pet-form-container">
                    <div class="form-header">
                        <h2>${isEdit ? 'Edit' : 'Add'} Pet Profile</h2>
                        <button class="btn btn-secondary" onclick="petProfilesManager.showMainView()">
                            ← Back to List
                        </button>
                    </div>
                    
                    <form id="pet-form" onsubmit="petProfilesManager.handleSubmit(event)">
                        <input type="hidden" id="pet-id" value="${pet?.id || ''}">
                        
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="pet-name">Pet Name *</label>
                                <input type="text" id="pet-name" value="${pet?.name || ''}" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="pet-species">Species *</label>
                                <select id="pet-species" required>
                                    <option value="">Select Species</option>
                                    <option value="dog" ${pet?.species === 'dog' ? 'selected' : ''}>Dog</option>
                                    <option value="cat" ${pet?.species === 'cat' ? 'selected' : ''}>Cat</option>
                                    <option value="other" ${pet?.species === 'other' ? 'selected' : ''}>Other</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="pet-breed">Breed</label>
                                <input type="text" id="pet-breed" value="${pet?.breed || ''}" 
                                       placeholder="e.g., Labrador, Siamese">
                            </div>
                            
                            <div class="form-group">
                                <label for="pet-birthdate">Birth Date *</label>
                                <input type="date" id="pet-birthdate" value="${pet?.birthDate || ''}" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="pet-weight">Weight (kg)</label>
                                <input type="number" id="pet-weight" value="${pet?.weight || ''}" 
                                       step="0.1" min="0" placeholder="Current weight">
                            </div>
                            
                            <div class="form-group">
                                <label for="pet-body-condition">Body Condition Score (1-9)</label>
                                <select id="pet-body-condition">
                                    <option value="">Select BCS</option>
                                    ${[1,2,3,4,5,6,7,8,9].map(score => `
                                        <option value="${score}" ${pet?.bodyConditionScore === score ? 'selected' : ''}>
                                            ${score} - ${score <= 3 ? 'Underweight' : score <= 6 ? 'Ideal' : 'Overweight'}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Health Conditions</label>
                            <div class="conditions-checklist">
                                ${['Diabetes', 'Epilepsy', 'Arthritis', 'Kidney Disease', 'Heart Disease', 'Thyroid', 'Dental Disease', 'Cancer', 'Allergies', 'None'].map(condition => `
                                    <label class="checkbox-label">
                                        <input type="checkbox" value="${condition}" 
                                            ${pet?.conditions?.includes(condition) ? 'checked' : ''}>
                                        ${condition}
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="pet-mobility">Mobility Score (1-5)</label>
                            <select id="pet-mobility">
                                <option value="">Select Mobility Score</option>
                                <option value="1" ${pet?.mobilityScore === 1 ? 'selected' : ''}>1 - Severely Limited</option>
                                <option value="2" ${pet?.mobilityScore === 2 ? 'selected' : ''}>2 - Significant Difficulty</option>
                                <option value="3" ${pet?.mobilityScore === 3 ? 'selected' : ''}>3 - Moderate Limitations</option>
                                <option value="4" ${pet?.mobilityScore === 4 ? 'selected' : ''}>4 - Mild Stiffness</option>
                                <option value="5" ${pet?.mobilityScore === 5 ? 'selected' : ''}>5 - Very Mobile</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="pet-vet">Primary Veterinarian</label>
                            <input type="text" id="pet-vet" value="${pet?.vetInfo?.name || ''}" 
                                   placeholder="Vet name or clinic">
                        </div>
                        
                        <div class="form-group">
                            <label for="pet-notes">Additional Notes</label>
                            <textarea id="pet-notes" rows="3" placeholder="Any additional health notes...">${pet?.notes || ''}</textarea>
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">
                                ${isEdit ? 'Update' : 'Add'} Pet Profile
                            </button>
                            <button type="button" class="btn btn-secondary" onclick="petProfilesManager.showMainView()">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            `;
        },

        // Pet Detail View
        petDetail: (pet) => `
            <div class="pet-detail-container">
                <div class="detail-header">
                    <h2>${pet.name}'s Profile</h2>
                    <button class="btn btn-secondary" onclick="petProfilesManager.showMainView()">
                        ← Back to List
                    </button>
                </div>
                
                <div class="pet-detail-grid">
                    <div class="detail-section">
                        <h3>Basic Information</h3>
                        <div class="detail-info">
                            <div class="info-row">
                                <span class="label">Species:</span>
                                <span class="value">${pet.species ? pet.species.charAt(0).toUpperCase() + pet.species.slice(1) : 'Not set'}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Breed:</span>
                                <span class="value">${pet.breed || 'Not set'}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Age:</span>
                                <span class="value">${calculateAge(pet.birthDate)} years</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Birth Date:</span>
                                <span class="value">${formatDate(pet.birthDate) || 'Unknown'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Health Information</h3>
                        <div class="detail-info">
                            <div class="info-row">
                                <span class="label">Weight:</span>
                                <span class="value">${pet.weight ? pet.weight + ' kg' : 'Not set'}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Body Condition:</span>
                                <span class="value">${pet.bodyConditionScore ? pet.bodyConditionScore + '/9' : 'Not set'}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Mobility Score:</span>
                                <span class="value">${pet.mobilityScore ? pet.mobilityScore + '/5' : 'Not set'}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Conditions:</span>
                                <span class="value">${pet.conditions?.length > 0 ? pet.conditions.join(', ') : 'None reported'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detail-section full-width">
                        <h3>Care Team</h3>
                        <div class="detail-info">
                            <div class="info-row">
                                <span class="label">Primary Vet:</span>
                                <span class="value">${pet.vetInfo?.name || 'Not specified'}</span>
                            </div>
                        </div>
                    </div>
                    
                    ${pet.notes ? `
                    <div class="detail-section full-width">
                        <h3>Additional Notes</h3>
                        <div class="notes-content">
                            <p>${pet.notes}</p>
                        </div>
                    </div>
                    ` : ''}
                </div>
                
                <div class="detail-actions">
                    <button class="btn btn-primary" onclick="petProfilesManager.editPet('${pet.id}')">
                        Edit Profile
                    </button>
                    <button class="btn btn-secondary" onclick="petProfilesManager.setCurrentPet('${pet.id}')">
                        Set as Active Pet
                    </button>
                </div>
            </div>
        `
    },

    // View Management
    showMainView: function() {
        this.elements.profilesContent.innerHTML = this.templates.mainView();
    },

    showAddForm: function() {
        this.elements.profilesContent.innerHTML = this.templates.petForm();
    },

    showEditForm: function(petId) {
        const pet = appState.pets.find(p => p.id === petId);
        if (pet) {
            this.elements.profilesContent.innerHTML = this.templates.petForm(pet);
        }
    },

    showPetDetail: function(petId) {
        const pet = appState.pets.find(p => p.id === petId);
        if (pet) {
            this.elements.profilesContent.innerHTML = this.templates.petDetail(pet);
        }
    },

    // CRUD Operations
    handleSubmit: function(event) {
        event.preventDefault();
        
        const formData = this.getFormData();
        if (!this.validateForm(formData)) {
            return;
        }

        const petId = document.getElementById('pet-id').value;
        if (petId) {
            this.updatePet(petId, formData);
        } else {
            this.addPet(formData);
        }
    },

    getFormData: function() {
        const conditions = [];
        document.querySelectorAll('.conditions-checklist input:checked').forEach(checkbox => {
            if (checkbox.value !== 'None') {
                conditions.push(checkbox.value);
            }
        });

        return {
            name: document.getElementById('pet-name').value.trim(),
            species: document.getElementById('pet-species').value,
            breed: document.getElementById('pet-breed').value.trim(),
            birthDate: document.getElementById('pet-birthdate').value,
            weight: document.getElementById('pet-weight').value ? parseFloat(document.getElementById('pet-weight').value) : null,
            bodyConditionScore: document.getElementById('pet-body-condition').value ? parseInt(document.getElementById('pet-body-condition').value) : null,
            mobilityScore: document.getElementById('pet-mobility').value ? parseInt(document.getElementById('pet-mobility').value) : null,
            conditions: conditions.length > 0 ? conditions : ['None'],
            vetInfo: {
                name: document.getElementById('pet-vet').value.trim()
            },
            notes: document.getElementById('pet-notes').value.trim(),
            createdAt: new Date().toISOString()
        };
    },

    validateForm: function(formData) {
        if (!formData.name) {
            alert('Please enter a pet name');
            return false;
        }
        if (!formData.species) {
            alert('Please select a species');
            return false;
        }
        if (!formData.birthDate) {
            alert('Please enter a birth date');
            return false;
        }
        return true;
    },

    addPet: function(petData) {
        const newPet = {
            id: 'pet_' + Date.now(),
            ...petData
        };

        appState.pets.push(newPet);
        this.savePets();
        this.showMainView();
        alert(`${newPet.name} has been added successfully!`);
    },

    updatePet: function(petId, petData) {
        const petIndex = appState.pets.findIndex(p => p.id === petId);
        if (petIndex !== -1) {
            appState.pets[petIndex] = {
                ...appState.pets[petIndex],
                ...petData,
                updatedAt: new Date().toISOString()
            };
            
            this.savePets();
            this.showMainView();
            alert('Pet profile updated successfully!');
        }
    },

    deletePet: function(petId) {
        if (confirm('Are you sure you want to delete this pet profile? This action cannot be undone.')) {
            appState.pets = appState.pets.filter(p => p.id !== petId);
            this.savePets();
            
            if (appState.currentPet?.id === petId) {
                appState.currentPet = null;
                utils.saveData('currentPet', null);
            }
            
            this.showMainView();
            alert('Pet profile deleted successfully');
        }
    },

    viewPet: function(petId) {
        this.showPetDetail(petId);
    },

    editPet: function(petId) {
        this.showEditForm(petId);
    },

    setCurrentPet: function(petId) {
        const pet = appState.pets.find(p => p.id === petId);
        if (pet) {
            appState.currentPet = pet;
            utils.saveData('currentPet', pet);
            alert(`${pet.name} is now your active pet!`);
            showDashboard(); // Return to dashboard with new active pet
        }
    },

    // Data Persistence
    savePets: function() {
        const user = authFunctions?.getCurrentUser();
        if (user) {
            utils.saveData(`pets_${user.id}`, appState.pets);
        }
    },

    // Initialize Profiles Section
    init: function() {
        this.showMainView();
    }
};

// Add to global window object for HTML event handlers
window.petProfilesManager = petProfilesManager;

// Initialize function for profiles section
window.initProfiles = function() {
    petProfilesManager.init();
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

