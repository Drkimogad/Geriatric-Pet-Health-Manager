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

// Nutrition & Diet Planner Section Functionality
const nutritionManager = {
    // DOM Elements
    elements: {
        nutritionSection: document.getElementById('nutrition-section'),
        nutritionContent: document.getElementById('nutrition-content')
    },

    // Pre-loaded food database
    foodDatabase: {
        diabetic: [
            { id: 'hill_diabetic', name: 'Hill\'s Prescription Diet w/d', kcalPerCup: 259, type: 'dry' },
            { id: 'royal_diabetic', name: 'Royal Canin Diabetic', kcalPerCup: 287, type: 'dry' },
            { id: 'purina_diabetic', name: 'Purina Pro Plan DM', kcalPerCup: 272, type: 'dry' }
        ],
        kidney: [
            { id: 'hill_kd', name: 'Hill\'s Prescription Diet k/d', kcalPerCup: 349, type: 'dry' },
            { id: 'royal_renal', name: 'Royal Canin Renal', kcalPerCup: 318, type: 'dry' }
        ],
        arthritis: [
            { id: 'hill_jd', name: 'Hill\'s Prescription Diet j/d', kcalPerCup: 346, type: 'dry' },
            { id: 'purina_joint', name: 'Purina Pro Plan JM', kcalPerCup: 365, type: 'dry' }
        ],
        general: [
            { id: 'hill_senior', name: 'Hill\'s Science Diet Senior', kcalPerCup: 378, type: 'dry' },
            { id: 'royal_senior', name: 'Royal Canin Senior', kcalPerCup: 342, type: 'dry' },
            { id: 'purina_senior', name: 'Purina Pro Plan Senior', kcalPerCup: 395, type: 'dry' }
        ]
    },

    // Activity level factors
    activityFactors: {
        sedentary: 1.2,      // Mostly resting, limited movement
        low: 1.4,           // Short, gentle walks
        moderate: 1.6,      // Regular daily exercise
        active: 1.8         // Still active despite age
    },

    // Templates
    templates: {
        // Main Nutrition View
        mainView: () => `
            <div class="nutrition-header">
                <h2>Nutrition & Diet Planning</h2>
                ${appState.currentPet ? `
                    <div class="current-pet-banner">
                        Planning for: <strong>${appState.currentPet.name}</strong>
                        ${appState.currentPet.weight ? `(${appState.currentPet.weight} kg)` : ''}
                    </div>
                ` : '<p class="warning">Please select a pet first</p>'}
            </div>

            ${appState.currentPet ? nutritionManager.templates.calculatorView() : nutritionManager.templates.noPetView()}
        `,

        // View when no pet is selected
        noPetView: () => `
            <div class="no-pet-selected">
                <div class="empty-state">
                    <h3>No Active Pet Selected</h3>
                    <p>Please select or add a pet to start nutrition planning.</p>
                    <button class="btn btn-primary" onclick="showSection('profiles')">
                        Manage Pet Profiles
                    </button>
                </div>
            </div>
        `,

        // Calculator and Planning View
        calculatorView: () => {
            const pet = appState.currentPet;
            const nutritionData = nutritionManager.calculateNutritionNeeds(pet);
            
            return `
                <div class="nutrition-grid">
                    <div class="nutrition-card calculator">
                        <h3>Daily Calorie Calculator</h3>
                        <div class="calculator-results">
                            <div class="result-item">
                                <span class="result-label">Resting Energy (RER):</span>
                                <span class="result-value">${nutritionData.rer} kcal/day</span>
                            </div>
                            <div class="result-item">
                                <span class="result-label">Daily Needs (DER):</span>
                                <span class="result-value">${nutritionData.der} kcal/day</span>
                            </div>
                            <div class="result-item highlight">
                                <span class="result-label">Recommended Intake:</span>
                                <span class="result-value">${nutritionData.recommended} kcal/day</span>
                            </div>
                        </div>

                        <form id="nutrition-form" class="nutrition-form">
                            <div class="form-group">
                                <label for="activity-level">Activity Level</label>
                                <select id="activity-level" onchange="nutritionManager.updateCalculation()">
                                    <option value="sedentary" ${pet.activityLevel === 'sedentary' ? 'selected' : ''}>
                                        Sedentary (Mostly resting)
                                    </option>
                                    <option value="low" ${pet.activityLevel === 'low' ? 'selected' : ''}>
                                        Low (Short gentle walks)
                                    </option>
                                    <option value="moderate" ${pet.activityLevel === 'moderate' ? 'selected' : ''}>
                                        Moderate (Regular exercise)
                                    </option>
                                    <option value="active" ${pet.activityLevel === 'active' ? 'selected' : ''}>
                                        Active (Still very active)
                                    </option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="weight-goal">Weight Goal</label>
                                <select id="weight-goal" onchange="nutritionManager.updateCalculation()">
                                    <option value="maintain">Maintain Current Weight</option>
                                    <option value="loss">Weight Loss</option>
                                    <option value="gain">Weight Gain</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="food-type">Select Food Type</label>
                                <select id="food-type" onchange="nutritionManager.updateFoodSelection()">
                                    <option value="">Choose a food type</option>
                                    <option value="diabetic">Diabetic Formula</option>
                                    <option value="kidney">Kidney Support</option>
                                    <option value="arthritis">Joint Support</option>
                                    <option value="general">General Senior</option>
                                    <option value="custom">Custom Food</option>
                                </select>
                            </div>

                            <div id="food-selection-container" style="display: none;">
                                <!-- Dynamic food selection will go here -->
                            </div>

                            <div id="custom-food-container" style="display: none;">
                                <div class="form-group">
                                    <label for="custom-food-name">Food Name</label>
                                    <input type="text" id="custom-food-name" placeholder="Enter food brand and name">
                                </div>
                                <div class="form-group">
                                    <label for="custom-food-kcal">Calories per Cup (kcal)</label>
                                    <input type="number" id="custom-food-kcal" placeholder="e.g., 350">
                                </div>
                            </div>

                            <div class="form-actions">
                                <button type="button" class="btn btn-primary" onclick="nutritionManager.saveNutritionPlan()">
                                    Save Nutrition Plan
                                </button>
                            </div>
                        </form>
                    </div>

                    <div class="nutrition-card feeding-schedule">
                        <h3>Feeding Schedule</h3>
                        ${nutritionManager.templates.feedingSchedule(nutritionData)}
                    </div>

                    <div class="nutrition-card water-tracker">
                        <h3>Water Intake Tracker</h3>
                        ${nutritionManager.templates.waterTracker()}
                    </div>

                    <div class="nutrition-card food-history">
                        <h3>Food History</h3>
                        ${nutritionManager.templates.foodHistory()}
                    </div>
                </div>
            `;
        },

        // Feeding Schedule Template
        feedingSchedule: (nutritionData) => {
            const schedule = nutritionData.feedingSchedule || {};
            return `
                <div class="feeding-plan">
                    <div class="feeding-time">
                        <h4>Morning</h4>
                        <div class="feeding-amount">
                            <span class="amount">${schedule.morning || '0'}</span>
                            <span class="unit">cups</span>
                        </div>
                        <span class="feeding-time">8:00 AM</span>
                    </div>
                    <div class="feeding-time">
                        <h4>Evening</h4>
                        <div class="feeding-amount">
                            <span class="amount">${schedule.evening || '0'}</span>
                            <span class="unit">cups</span>
                        </div>
                        <span class="feeding-time">6:00 PM</span>
                    </div>
                </div>
                <div class="feeding-notes">
                    <p><strong>Total Daily:</strong> ${schedule.total || '0'} cups</p>
                    <p><strong>Food:</strong> ${nutritionData.selectedFood?.name || 'Not selected'}</p>
                </div>
            `;
        },

        // Water Tracker Template
        waterTracker: () => {
            const today = utils.getTodayDate();
            const todayWater = nutritionManager.getTodayWaterIntake();
            
            return `
                <div class="water-tracker-container">
                    <div class="water-progress">
                        <div class="water-goal">
                            <span class="label">Today's Intake:</span>
                            <span class="value">${todayWater} ml / ${nutritionManager.waterGoal} ml</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(todayWater / nutritionManager.waterGoal) * 100}%"></div>
                        </div>
                    </div>
                    
                    <div class="water-buttons">
                        <button class="btn btn-secondary btn-sm" onclick="nutritionManager.logWater(100)">
                            +100 ml
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="nutritionManager.logWater(250)">
                            +250 ml
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="nutritionManager.logWater(500)">
                            +500 ml
                        </button>
                        <button class="btn btn-accent btn-sm" onclick="nutritionManager.showWaterLog()">
                            View Log
                        </button>
                    </div>
                    
                    <div class="water-history">
                        <h4>Recent Intake</h4>
                        <div id="water-log-list">
                            ${nutritionManager.templates.waterLogList()}
                        </div>
                    </div>
                </div>
            `;
        },

        // Water Log List Template
        waterLogList: () => {
            const waterLog = nutritionManager.getWaterLog().slice(0, 5);
            if (waterLog.length === 0) {
                return '<p class="no-data">No water intake logged today</p>';
            }
            
            return `
                <ul class="water-log-list">
                    ${waterLog.map(entry => `
                        <li class="water-log-entry">
                            <span class="time">${new Date(entry.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            <span class="amount">+${entry.amount} ml</span>
                        </li>
                    `).join('')}
                </ul>
            `;
        },

        // Food History Template
        foodHistory: () => {
            const foodHistory = nutritionManager.getFoodHistory().slice(0, 5);
            if (foodHistory.length === 0) {
                return '<p class="no-data">No food history recorded</p>';
            }
            
            return `
                <div class="food-history-list">
                    ${foodHistory.map(entry => `
                        <div class="food-history-entry">
                            <div class="food-date">${formatDate(entry.date)}</div>
                            <div class="food-details">
                                <strong>${entry.foodName}</strong>
                                <span>${entry.amount} cups • ${entry.calories} kcal</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="btn btn-secondary btn-sm" onclick="nutritionManager.showFullFoodHistory()">
                    View Full History
                </button>
            `;
        }
    },

    // Water goal based on weight (ml per day)
    get waterGoal() {
        if (!appState.currentPet?.weight) return 1000;
        return Math.round(appState.currentPet.weight * 50); // 50ml per kg
    },

    // Calculation Functions
    calculateNutritionNeeds: function(pet) {
        if (!pet?.weight) {
            return { rer: 0, der: 0, recommended: 0 };
        }

        // Resting Energy Requirement (RER) = 70 × (body weight in kg)^0.75
        const rer = Math.round(70 * Math.pow(pet.weight, 0.75));
        
        // Daily Energy Requirement (DER) = RER × activity factor
        const activityLevel = pet.activityLevel || 'sedentary';
        const activityFactor = this.activityFactors[activityLevel] || 1.2;
        let der = Math.round(rer * activityFactor);

        // Adjust for geriatric pets (slightly lower metabolism)
        der = Math.round(der * 0.9);

        // Adjust for weight goals
        const weightGoal = document.getElementById('weight-goal')?.value || 'maintain';
        if (weightGoal === 'loss') der = Math.round(der * 0.8);
        if (weightGoal === 'gain') der = Math.round(der * 1.2);

        // Adjust for conditions
        if (pet.conditions?.includes('Diabetes')) der = Math.round(der * 0.9);
        if (pet.conditions?.includes('Kidney Disease')) der = Math.round(der * 0.85);

        return {
            rer,
            der,
            recommended: der,
            feedingSchedule: this.calculateFeedingSchedule(der)
        };
    },

    calculateFeedingSchedule: function(dailyCalories) {
        const selectedFood = this.getSelectedFood();
        if (!selectedFood || !selectedFood.kcalPerCup) {
            return { morning: 0, evening: 0, total: 0 };
        }

        const cupsPerDay = dailyCalories / selectedFood.kcalPerCup;
        const morningCups = (cupsPerDay * 0.4).toFixed(1);
        const eveningCups = (cupsPerDay * 0.6).toFixed(1);

        return {
            morning: morningCups,
            evening: eveningCups,
            total: cupsPerDay.toFixed(1)
        };
    },

    // Food Selection Functions
    updateFoodSelection: function() {
        const foodType = document.getElementById('food-type').value;
        const foodContainer = document.getElementById('food-selection-container');
        const customContainer = document.getElementById('custom-food-container');

        if (foodType === 'custom') {
            foodContainer.style.display = 'none';
            customContainer.style.display = 'block';
        } else if (foodType && foodType !== 'custom') {
            customContainer.style.display = 'none';
            foodContainer.style.display = 'block';
            this.renderFoodOptions(foodType);
        } else {
            foodContainer.style.display = 'none';
            customContainer.style.display = 'none';
        }
        
        this.updateCalculation();
    },

    renderFoodOptions: function(foodType) {
        const foods = this.foodDatabase[foodType] || [];
        const container = document.getElementById('food-selection-container');
        
        container.innerHTML = `
            <div class="form-group">
                <label for="food-selection">Select Food</label>
                <select id="food-selection" onchange="nutritionManager.updateCalculation()">
                    <option value="">Choose a food</option>
                    ${foods.map(food => `
                        <option value="${food.id}" data-kcal="${food.kcalPerCup}">
                            ${food.name} (${food.kcalPerCup} kcal/cup)
                        </option>
                    `).join('')}
                </select>
            </div>
        `;
    },

    getSelectedFood: function() {
        const foodSelection = document.getElementById('food-selection');
        if (foodSelection && foodSelection.value) {
            const selectedOption = foodSelection.options[foodSelection.selectedIndex];
            return {
                id: foodSelection.value,
                name: selectedOption.text,
                kcalPerCup: parseInt(selectedOption.dataset.kcal)
            };
        }
        
        // Check for custom food
        const customName = document.getElementById('custom-food-name')?.value;
        const customKcal = document.getElementById('custom-food-kcal')?.value;
        if (customName && customKcal) {
            return {
                id: 'custom',
                name: customName,
                kcalPerCup: parseInt(customKcal)
            };
        }

        return null;
    },

    // Water Tracking Functions
    logWater: function(amount) {
        if (!appState.currentPet) return;

        const waterEntry = {
            id: 'water_' + Date.now(),
            petId: appState.currentPet.id,
            amount: amount,
            timestamp: new Date().toISOString(),
            date: utils.getTodayDate()
        };

        let waterLog = this.getWaterLog();
        waterLog.push(waterEntry);
        this.saveWaterLog(waterLog);
        
        this.renderWaterTracker();
    },

    getWaterLog: function() {
        if (!appState.currentPet) return [];
        const log = utils.loadData(`waterLog_${appState.currentPet.id}`) || [];
        return log.filter(entry => entry.date === utils.getTodayDate());
    },

    getTodayWaterIntake: function() {
        return this.getWaterLog().reduce((total, entry) => total + entry.amount, 0);
    },

    saveWaterLog: function(waterLog) {
        if (appState.currentPet) {
            utils.saveData(`waterLog_${appState.currentPet.id}`, waterLog);
        }
    },

    // Food History Functions
    logFood: function(foodData) {
        if (!appState.currentPet) return;

        const foodEntry = {
            id: 'food_' + Date.now(),
            petId: appState.currentPet.id,
            ...foodData,
            date: utils.getTodayDate(),
            timestamp: new Date().toISOString()
        };

        let foodHistory = this.getFoodHistory();
        foodHistory.unshift(foodEntry); // Add to beginning
        this.saveFoodHistory(foodHistory);
    },

    getFoodHistory: function() {
        if (!appState.currentPet) return [];
        return utils.loadData(`foodHistory_${appState.currentPet.id}`) || [];
    },

    saveFoodHistory: function(foodHistory) {
        if (appState.currentPet) {
            utils.saveData(`foodHistory_${appState.currentPet.id}`, foodHistory);
        }
    },

    // Update Functions
    updateCalculation: function() {
        if (!appState.currentPet) return;
        
        // Save activity level to pet profile
        const activityLevel = document.getElementById('activity-level').value;
        if (appState.currentPet.activityLevel !== activityLevel) {
            appState.currentPet.activityLevel = activityLevel;
            petProfilesManager.savePets();
        }

        this.renderNutritionView();
    },

    // Rendering Functions
    renderNutritionView: function() {
        if (this.elements.nutritionContent) {
            this.elements.nutritionContent.innerHTML = this.templates.mainView();
        }
    },

    renderWaterTracker: function() {
        const waterTrackerElement = document.querySelector('.water-tracker');
        if (waterTrackerElement) {
            waterTrackerElement.innerHTML = this.templates.waterTracker();
        }
    },

    // Save Nutrition Plan
    saveNutritionPlan: function() {
        if (!appState.currentPet) return;

        const nutritionPlan = {
            calculatedOn: new Date().toISOString(),
            needs: this.calculateNutritionNeeds(appState.currentPet),
            selectedFood: this.getSelectedFood(),
            activityLevel: document.getElementById('activity-level').value,
            weightGoal: document.getElementById('weight-goal').value
        };

        utils.saveData(`nutritionPlan_${appState.currentPet.id}`, nutritionPlan);
        alert('Nutrition plan saved successfully!');
    },

    // View Management
    showWaterLog: function() {
        const waterLog = this.getWaterLog();
        alert('Full water log view will be implemented in next version');
    },

    showFullFoodHistory: function() {
        alert('Full food history view will be implemented in next version');
    },

    // Initialize Nutrition Section
    init: function() {
        this.renderNutritionView();
    }
};

// Add to global window object
window.nutritionManager = nutritionManager;

// Initialize function for nutrition section
window.initNutrition = function() {
    nutritionManager.init();
};
// Medication Manager Section Functionality
const medicationManager = {
    // DOM Elements
    elements: {
        medicationSection: document.getElementById('medication-section'),
        medicationContent: document.getElementById('medication-content')
    },

    // Medication Database with Standard Dosages
    medicationDatabase: {
        diabetes: [
            { 
                id: 'insulin_glargine', 
                name: 'Insulin Glargine (Lantus)', 
                type: 'injection',
                standardDosage: '0.25-0.5 IU/kg twice daily',
                maxDosage: '1 IU/kg per dose',
                instructions: 'Give with meals, monitor glucose levels'
            },
            { 
                id: 'insulin_vetsulin', 
                name: 'Vetsulin (Porcine Insulin Zinc)', 
                type: 'injection',
                standardDosage: '0.5 IU/kg twice daily',
                maxDosage: '1.5 IU/kg per dose',
                instructions: 'Shake well before use, give with meals'
            }
        ],
        epilepsy: [
            { 
                id: 'phenobarbital', 
                name: 'Phenobarbital', 
                type: 'tablet',
                standardDosage: '2-3 mg/kg twice daily',
                maxDosage: '6 mg/kg per day',
                instructions: 'Monitor liver enzymes regularly'
            },
            { 
                id: 'potassium_bromide', 
                name: 'Potassium Bromide', 
                type: 'liquid',
                standardDosage: '30-40 mg/kg once daily',
                maxDosage: '60 mg/kg per day',
                instructions: 'Give with food, maintain consistent salt intake'
            },
            { 
                id: 'levetiracetam', 
                name: 'Levetiracetam (Keppra)', 
                type: 'tablet',
                standardDosage: '20 mg/kg three times daily',
                maxDosage: '60 mg/kg per day',
                instructions: 'May cause drowsiness initially'
            }
        ],
        arthritis: [
            { 
                id: 'carprofen', 
                name: 'Carprofen (Rimadyl)', 
                type: 'tablet',
                standardDosage: '2 mg/kg twice daily',
                maxDosage: '4 mg/kg per day',
                instructions: 'Give with food, monitor kidney function'
            },
            { 
                id: 'meloxicam', 
                name: 'Meloxicam (Metacam)', 
                type: 'liquid',
                standardDosage: '0.1 mg/kg first dose, then 0.05 mg/kg daily',
                maxDosage: '0.1 mg/kg per day',
                instructions: 'Initial loading dose, then maintenance'
            },
            { 
                id: 'gabapentin', 
                name: 'Gabapentin', 
                type: 'capsule',
                standardDosage: '5-10 mg/kg twice daily',
                maxDosage: '20 mg/kg per day',
                instructions: 'May cause sedation, adjust gradually'
            }
        ],
        thyroid: [
            { 
                id: 'levothyroxine', 
                name: 'Levothyroxine', 
                type: 'tablet',
                standardDosage: '0.02 mg/kg twice daily',
                maxDosage: '0.8 mg per day',
                instructions: 'Give on empty stomach, monitor T4 levels'
            }
        ],
        heart: [
            { 
                id: 'enalapril', 
                name: 'Enalapril', 
                type: 'tablet',
                standardDosage: '0.5 mg/kg once daily',
                maxDosage: '1 mg/kg per day',
                instructions: 'Monitor kidney function, blood pressure'
            },
            { 
                id: 'furosemide', 
                name: 'Furosemide (Lasix)', 
                type: 'tablet',
                standardDosage: '1-2 mg/kg twice daily',
                maxDosage: '6 mg/kg per day',
                instructions: 'Ensure adequate water intake, monitor electrolytes'
            }
        ]
    },

    // Frequency Options
    frequencyOptions: {
        'once_daily': { label: 'Once Daily', times: ['08:00'] },
        'twice_daily': { label: 'Twice Daily', times: ['08:00', '20:00'] },
        'three_times': { label: 'Three Times Daily', times: ['08:00', '14:00', '20:00'] },
        'every_other_day': { label: 'Every Other Day', times: ['08:00'] },
        'weekly': { label: 'Once Weekly', times: ['08:00'] },
        'as_needed': { label: 'As Needed', times: [] }
    },

    // Templates
    templates: {
        // Main Medication View
        mainView: () => `
            <div class="medication-header">
                <h2>Medication Management</h2>
                ${appState.currentPet ? `
                    <div class="current-pet-banner">
                        Managing medications for: <strong>${appState.currentPet.name}</strong>
                    </div>
                ` : '<p class="warning">Please select a pet first</p>'}
            </div>

            ${appState.currentPet ? medicationManager.templates.medicationDashboard() : medicationManager.templates.noPetView()}
        `,

        // View when no pet is selected
        noPetView: () => `
            <div class="no-pet-selected">
                <div class="empty-state">
                    <h3>No Active Pet Selected</h3>
                    <p>Please select or add a pet to manage medications.</p>
                    <button class="btn btn-primary" onclick="showSection('profiles')">
                        Manage Pet Profiles
                    </button>
                </div>
            </div>
        `,

        // Medication Dashboard
        medicationDashboard: () => {
            const pet = appState.currentPet;
            const todayMeds = medicationManager.getTodayMedications();
            const upcomingRefills = medicationManager.getUpcomingRefills();
            
            return `
                <div class="medication-grid">
                    <div class="medication-card today-schedule">
                        <div class="card-header">
                            <h3>Today's Medication Schedule</h3>
                            <span class="date">${new Date().toLocaleDateString()}</span>
                        </div>
                        <div class="schedule-content">
                            ${medicationManager.templates.todaySchedule(todayMeds)}
                        </div>
                    </div>

                    <div class="medication-card medication-list">
                        <div class="card-header">
                            <h3>Current Medications</h3>
                            <button class="btn btn-primary btn-sm" onclick="medicationManager.showAddForm()">
                                + Add Medication
                            </button>
                        </div>
                        <div class="medications-content">
                            ${medicationManager.templates.medicationList()}
                        </div>
                    </div>

                    <div class="medication-card refill-alerts">
                        <div class="card-header">
                            <h3>Refill Reminders</h3>
                        </div>
                        <div class="refills-content">
                            ${medicationManager.templates.refillAlerts(upcomingRefills)}
                        </div>
                    </div>

                    <div class="medication-card dosage-calculator">
                        <div class="card-header">
                            <h3>Dosage Calculator</h3>
                        </div>
                        <div class="calculator-content">
                            ${medicationManager.templates.dosageCalculator()}
                        </div>
                    </div>
                </div>
            `;
        },

        // Today's Schedule Template
        todaySchedule: (medications) => {
            if (medications.length === 0) {
                return '<p class="no-data">No medications scheduled for today</p>';
            }

            // Group by time
            const scheduleByTime = {};
            medications.forEach(med => {
                med.schedule.forEach(time => {
                    if (!scheduleByTime[time]) {
                        scheduleByTime[time] = [];
                    }
                    scheduleByTime[time].push(med);
                });
            });

            return `
                <div class="time-slots">
                    ${Object.keys(scheduleByTime).sort().map(time => `
                        <div class="time-slot">
                            <div class="time-header">
                                <span class="time">${time}</span>
                                <span class="status">Pending</span>
                            </div>
                            <div class="medications-at-time">
                                ${scheduleByTime[time].map(med => `
                                    <div class="medication-item" data-med-id="${med.id}">
                                        <div class="med-info">
                                            <strong>${med.name}</strong>
                                            <span>${med.dosage}</span>
                                        </div>
                                        <div class="med-actions">
                                            <button class="btn btn-success btn-xs" onclick="medicationManager.logDose('${med.id}', '${time}')">
                                                ✅ Given
                                            </button>
                                            <button class="btn btn-warning btn-xs" onclick="medicationManager.skipDose('${med.id}', '${time}')">
                                                ⏭️ Skip
                                            </button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        },

        // Medication List Template
        medicationList: () => {
            const medications = medicationManager.getMedications();
            if (medications.length === 0) {
                return `
                    <div class="empty-state">
                        <p>No medications added yet.</p>
                        <button class="btn btn-primary" onclick="medicationManager.showAddForm()">
                            Add First Medication
                        </button>
                    </div>
                `;
            }

            return `
                <div class="medications-list">
                    ${medications.map(med => `
                        <div class="medication-list-item" data-med-id="${med.id}">
                            <div class="med-header">
                                <h4>${med.name}</h4>
                                <div class="med-actions">
                                    <button class="btn-icon" onclick="medicationManager.editMedication('${med.id}')" title="Edit">
                                        ✏️
                                    </button>
                                    <button class="btn-icon delete" onclick="medicationManager.deleteMedication('${med.id}')" title="Delete">
                                        🗑️
                                    </button>
                                </div>
                            </div>
                            <div class="med-details">
                                <div class="detail-row">
                                    <span class="label">Dosage:</span>
                                    <span class="value">${med.dosage}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="label">Frequency:</span>
                                    <span class="value">${medicationManager.frequencyOptions[med.frequency]?.label || med.frequency}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="label">Next Dose:</span>
                                    <span class="value">${medicationManager.getNextDoseTime(med)}</span>
                                </div>
                                ${med.refillDate ? `
                                    <div class="detail-row">
                                        <span class="label">Refill Due:</span>
                                        <span class="value ${new Date(med.refillDate) <= new Date() ? 'warning' : ''}">
                                            ${formatDate(med.refillDate)}
                                        </span>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        },

        // Refill Alerts Template
        refillAlerts: (refills) => {
            if (refills.length === 0) {
                return '<p class="no-alerts">No refills needed soon</p>';
            }

            return `
                <div class="refill-list">
                    ${refills.map(med => `
                        <div class="refill-item ${med.daysUntilRefill <= 0 ? 'urgent' : med.daysUntilRefill <= 7 ? 'warning' : 'info'}">
                            <div class="refill-med">${med.name}</div>
                            <div class="refill-date">
                                Due: ${formatDate(med.refillDate)}
                                ${med.daysUntilRefill <= 0 ? ' (OVERDUE)' : med.daysUntilRefill <= 7 ? ` (in ${med.daysUntilRefill} days)` : ''}
                            </div>
                            <button class="btn btn-primary btn-xs" onclick="medicationManager.logRefill('${med.id}')">
                                Mark Refilled
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
        },

        // Dosage Calculator Template
        dosageCalculator: () => {
            return `
                <div class="calculator-form">
                    <div class="form-group">
                        <label for="calc-condition">Condition</label>
                        <select id="calc-condition" onchange="medicationManager.updateMedicationOptions()">
                            <option value="">Select Condition</option>
                            <option value="diabetes">Diabetes</option>
                            <option value="epilepsy">Epilepsy</option>
                            <option value="arthritis">Arthritis</option>
                            <option value="thyroid">Thyroid</option>
                            <option value="heart">Heart Disease</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="calc-medication">Medication</label>
                        <select id="calc-medication" onchange="medicationManager.calculateDosage()">
                            <option value="">Select Medication</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="calc-weight">Pet Weight (kg)</label>
                        <input type="number" id="calc-weight" value="${appState.currentPet?.weight || ''}" 
                               step="0.1" min="0" onchange="medicationManager.calculateDosage()">
                    </div>

                    <div id="dosage-result" class="dosage-result" style="display: none;">
                        <h4>Recommended Dosage</h4>
                        <div class="result-content">
                            <!-- Dynamic content will be inserted here -->
                        </div>
                    </div>
                </div>
            `;
        },

        // Add/Edit Medication Form
        medicationForm: (medication = null) => {
            const isEdit = !!medication;
            const petWeight = appState.currentPet?.weight || 0;
            
            return `
                <div class="medication-form-container">
                    <div class="form-header">
                        <h2>${isEdit ? 'Edit' : 'Add'} Medication</h2>
                        <button class="btn btn-secondary" onclick="medicationManager.showMainView()">
                            ← Back to Medications
                        </button>
                    </div>

                    <form id="medication-form" onsubmit="medicationManager.handleSubmit(event)">
                        <input type="hidden" id="medication-id" value="${medication?.id || ''}">

                        <div class="form-grid">
                            <div class="form-group">
                                <label for="med-name">Medication Name *</label>
                                <input type="text" id="med-name" value="${medication?.name || ''}" required>
                            </div>

                            <div class="form-group">
                                <label for="med-condition">Condition *</label>
                                <select id="med-condition" required>
                                    <option value="">Select Condition</option>
                                    <option value="diabetes" ${medication?.condition === 'diabetes' ? 'selected' : ''}>Diabetes</option>
                                    <option value="epilepsy" ${medication?.condition === 'epilepsy' ? 'selected' : ''}>Epilepsy</option>
                                    <option value="arthritis" ${medication?.condition === 'arthritis' ? 'selected' : ''}>Arthritis</option>
                                    <option value="thyroid" ${medication?.condition === 'thyroid' ? 'selected' : ''}>Thyroid</option>
                                    <option value="heart" ${medication?.condition === 'heart' ? 'selected' : ''}>Heart Disease</option>
                                    <option value="other" ${medication?.condition === 'other' ? 'selected' : ''}>Other</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="med-dosage">Dosage *</label>
                                <input type="text" id="med-dosage" value="${medication?.dosage || ''}" 
                                       placeholder="e.g., 10 mg" required>
                            </div>

                            <div class="form-group">
                                <label for="med-frequency">Frequency *</label>
                                <select id="med-frequency" required>
                                    <option value="">Select Frequency</option>
                                    ${Object.entries(medicationManager.frequencyOptions).map(([key, freq]) => `
                                        <option value="${key}" ${medication?.frequency === key ? 'selected' : ''}>
                                            ${freq.label}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="med-start-date">Start Date</label>
                                <input type="date" id="med-start-date" value="${medication?.startDate || ''}">
                            </div>

                            <div class="form-group">
                                <label for="med-refill-date">Refill Due Date</label>
                                <input type="date" id="med-refill-date" value="${medication?.refillDate || ''}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="med-instructions">Special Instructions</label>
                            <textarea id="med-instructions" rows="3" placeholder="Any special instructions...">${medication?.instructions || ''}</textarea>
                        </div>

                        ${petWeight > 0 ? `
                            <div class="dosage-check">
                                <h4>Dosage Safety Check</h4>
                                <p>Based on ${petWeight} kg weight:</p>
                                <div id="dosage-safety-result">
                                    <!-- Safety check results will appear here -->
                                </div>
                            </div>
                        ` : ''}

                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">
                                ${isEdit ? 'Update' : 'Add'} Medication
                            </button>
                            <button type="button" class="btn btn-secondary" onclick="medicationManager.showMainView()">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            `;
        }
    },

    // Data Management Functions
    getMedications: function() {
        if (!appState.currentPet) return [];
        return utils.loadData(`medications_${appState.currentPet.id}`) || [];
    },

    saveMedications: function(medications) {
        if (appState.currentPet) {
            utils.saveData(`medications_${appState.currentPet.id}`, medications);
        }
    },

    getTodayMedications: function() {
        const medications = this.getMedications();
        const today = utils.getTodayDate();
        
        return medications.filter(med => {
            if (!med.startDate || med.startDate <= today) {
                // Check if medication is scheduled for today based on frequency
                return this.isMedicationScheduledToday(med);
            }
            return false;
        });
    },

    isMedicationScheduledToday: function(medication) {
        const today = new Date();
        const startDate = new Date(medication.startDate || today);
        
        if (today < startDate) return false;

        switch (medication.frequency) {
            case 'once_daily':
                return true;
            case 'twice_daily':
                return true;
            case 'three_times':
                return true;
            case 'every_other_day':
                const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
                return daysDiff % 2 === 0;
            case 'weekly':
                return today.getDay() === startDate.getDay();
            case 'as_needed':
                return false; // PRN medications don't have scheduled doses
            default:
                return true;
        }
    },

    getUpcomingRefills: function() {
        const medications = this.getMedications().filter(med => med.refillDate);
        const today = new Date();
        
        return medications.map(med => {
            const refillDate = new Date(med.refillDate);
            const daysUntilRefill = Math.ceil((refillDate - today) / (1000 * 60 * 60 * 24));
            
            return {
                ...med,
                daysUntilRefill: daysUntilRefill
            };
        }).filter(med => med.daysUntilRefill <= 30) // Only show refills due in next 30 days
          .sort((a, b) => a.daysUntilRefill - b.daysUntilRefill);
    },

    // Dosage Calculation Functions
    updateMedicationOptions: function() {
        const condition = document.getElementById('calc-condition').value;
        const medicationSelect = document.getElementById('calc-medication');
        
        medicationSelect.innerHTML = '<option value="">Select Medication</option>';
        
        if (condition && this.medicationDatabase[condition]) {
            this.medicationDatabase[condition].forEach(med => {
                const option = document.createElement('option');
                option.value = med.id;
                option.textContent = med.name;
                option.dataset.dosage = med.standardDosage;
                option.dataset.maxDosage = med.maxDosage;
                medicationSelect.appendChild(option);
            });
        }
    },

    calculateDosage: function() {
        const medicationSelect = document.getElementById('calc-medication');
        const weightInput = document.getElementById('calc-weight');
        const resultDiv = document.getElementById('dosage-result');
        
        if (!medicationSelect.value || !weightInput.value) {
            resultDiv.style.display = 'none';
            return;
        }

        const selectedOption = medicationSelect.options[medicationSelect.selectedIndex];
        const weight = parseFloat(weightInput.value);
        const dosageRange = selectedOption.dataset.dosage;
        const maxDosage = selectedOption.dataset.maxDosage;

        // Extract numeric values from dosage range (e.g., "2-3 mg/kg" -> [2, 3])
        const dosageMatch = dosageRange.match(/(\d+\.?\d*)-(\d+\.?\d*)/);
        if (!dosageMatch) return;

        const minDosePerKg = parseFloat(dosageMatch[1]);
        const maxDosePerKg = parseFloat(dosageMatch[2]);

        const calculatedMin = (minDosePerKg * weight).toFixed(2);
        const calculatedMax = (maxDosePerKg * weight).toFixed(2);

        resultDiv.style.display = 'block';
        resultDiv.querySelector('.result-content').innerHTML = `
            <div class="dosage-range">
                <strong>${calculatedMin} - ${calculatedMax} mg per dose</strong>
            </div>
            <div class="dosage-info">
                <p>Based on: ${dosageRange}</p>
                <p>Maximum: ${maxDosage}</p>
                <p class="warning">Always consult your veterinarian before administering medication</p>
            </div>
        `;
    },

    // Medication Logging Functions
    logDose: function(medicationId, time) {
        const logEntry = {
            medicationId: medicationId,
            time: time,
            date: utils.getTodayDate(),
            timestamp: new Date().toISOString(),
            status: 'given'
        };

        let medicationLog = utils.loadData(`medicationLog_${appState.currentPet.id}`) || [];
        medicationLog.push(logEntry);
        utils.saveData(`medicationLog_${appState.currentPet.id}`, medicationLog);

        alert('Dose logged as given');
        this.renderMedicationView();
    },

    skipDose: function(medicationId, time) {
        if (confirm('Are you sure you want to skip this dose?')) {
            const logEntry = {
                medicationId: medicationId,
                time: time,
                date: utils.getTodayDate(),
                timestamp: new Date().toISOString(),
                status: 'skipped',
                reason: prompt('Reason for skipping (optional):') || 'Not specified'
            };

            let medicationLog = utils.loadData(`medicationLog_${appState.currentPet.id}`) || [];
            medicationLog.push(logEntry);
            utils.saveData(`medicationLog_${appState.currentPet.id}`, medicationLog);

            alert('Dose logged as skipped');
            this.renderMedicationView();
        }
    },

    logRefill: function(medicationId) {
        const medications = this.getMedications();
        const medication = medications.find(med => med.id === medicationId);
        
        if (medication) {
            medication.refillDate = null; // Clear refill date
            this.saveMedications(medications);
            alert('Refill logged successfully');
            this.renderMedicationView();
        }
    },

    // View Management
    showMainView: function() {
        this.elements.medicationContent.innerHTML = this.templates.mainView();
    },

    showAddForm: function() {
        this.elements.medicationContent.innerHTML = this.templates.medicationForm();
    },

    showEditForm: function(medicationId) {
        const medications = this.getMedications();
        const medication = medications.find(med => med.id === medicationId);
        if (medication) {
            this.elements.medicationContent.innerHTML = this.templates.medicationForm(medication);
        }
    },

    // CRUD Operations
    handleSubmit: function(event) {
        event.preventDefault();
        const formData = this.getFormData();
        
        if (this.validateForm(formData)) {
            const medicationId = document.getElementById('medication-id').value;
            if (medicationId) {
                this.updateMedication(medicationId, formData);
            } else {
                this.addMedication(formData);
            }
        }
    },

    getFormData: function() {
        return {
            name: document.getElementById('med-name').value.trim(),
            condition: document.getElementById('med-condition').value,
            dosage: document.getElementById('med-dosage').value.trim(),
            frequency: document.getElementById('med-frequency').value,
            startDate: document.getElementById('med-start-date').value || new Date().toISOString().split('T')[0],
            refillDate: document.getElementById('med-refill-date').value || null,
            instructions: document.getElementById('med-instructions').value.trim(),
            createdAt: new Date().toISOString()
        };
    },

    validateForm: function(formData) {
        if (!formData.name) {
            alert('Please enter medication name');
            return false;
        }
        if (!formData.condition) {
            alert('Please select a condition');
            return false;
        }
        if (!formData.dosage) {
            alert('Please enter dosage');
            return false;
        }
        if (!formData.frequency) {
            alert('Please select frequency');
            return false;
        }
        return true;
    },

    addMedication: function(medicationData) {
        const newMedication = {
            id: 'med_' + Date.now(),
            ...medicationData
        };

        const medications = this.getMedications();
        medications.push(newMedication);
        this.saveMedications(medications);

        alert('Medication added successfully!');
        this.showMainView();
    },

    updateMedication: function(medicationId, medicationData) {
        const medications = this.getMedications();
        const medicationIndex = medications.findIndex(med => med.id === medicationId);
        
        if (medicationIndex !== -1) {
            medications[medicationIndex] = {
                ...medications[medicationIndex],
                ...medicationData,
                updatedAt: new Date().toISOString()
            };
            
            this.saveMedications(medications);
            alert('Medication updated successfully!');
            this.showMainView();
        }
    },

    deleteMedication: function(medicationId) {
        if (confirm('Are you sure you want to delete this medication?')) {
            const medications = this.getMedications().filter(med => med.id !== medicationId);
            this.saveMedications(medications);
            alert('Medication deleted successfully');
            this.showMainView();
        }
    },

    editMedication: function(medicationId) {
        this.showEditForm(medicationId);
    },

    // Utility Functions
    getNextDoseTime: function(medication) {
        const times = this.frequencyOptions[medication.frequency]?.times || [];
        const now = new Date();
        const currentTime = now.getHours() * 100 + now.getMinutes();
        
        for (let time of times) {
            const [hours, minutes] = time.split(':').map(Number);
            const timeValue = hours * 100 + minutes;
            
            if (timeValue > currentTime) {
                return time;
            }
        }
        
        return times.length > 0 ? `Tomorrow ${times[0]}` : 'As needed';
    },

    // Rendering
    renderMedicationView: function() {
        if (this.elements.medicationContent) {
            this.elements.medicationContent.innerHTML = this.templates.mainView();
        }
    },

    // Initialize Medication Section
    init: function() {
        this.renderMedicationView();
    }
};

// Add to global window object
window.medicationManager = medicationManager;

// Initialize function for medication section
window.initMedication = function() {
    medicationManager.init();
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

