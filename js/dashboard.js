// CENTRAL EVENT DELEGATION - Put this at the top of your file
const setupEventDelegation = () => {
    document.addEventListener('click', (event) => {
        const target = event.target;
        console.log('Click event on:', target.tagName, target.className, target.attributes);

        // 1. QUICK ACTIONS & NAVIGATION (using data attributes)
        if (target.matches('[data-section]')) {
            event.preventDefault();
            const section = target.getAttribute('data-section');
            sectionManager.showSection(section);
        }
        else if (target.matches('[data-action="logActivity"]')) {
            event.preventDefault();
            window.logActivity();
        }
        
        // 2. PET PROFILES (using data attributes)
        else if (target.matches('[data-action="showAddForm"]')) {
            event.preventDefault();
            petProfilesManager.showAddForm();
        }
        else if (target.matches('[data-action="editPet"]')) {
            event.preventDefault();
            const petId = target.getAttribute('data-pet-id');
            petProfilesManager.editPet(petId);
        }
        else if (target.matches('[data-action="deletePet"]')) {
            event.preventDefault();
            const petId = target.getAttribute('data-pet-id');
            if (confirm('Are you sure you want to delete this pet profile?')) {
                petProfilesManager.deletePet(petId);
            }
        }
        else if (target.matches('[data-action="viewPet"]')) {
            event.preventDefault();
            const petId = target.getAttribute('data-pet-id');
            petProfilesManager.viewPet(petId);
        }
        else if (target.matches('[data-action="setCurrentPet"]')) {
            event.preventDefault();
            const petId = target.getAttribute('data-pet-id');
            petProfilesManager.setCurrentPet(petId);
        }
      // for entire mainview buttons across all managers      
     // for entire mainview buttons across all managers      
else if (target.matches('[data-action="showMainView"]')) {
    console.log('🔄 CENTRAL_DELEGATION: showMainView caught');
    event.preventDefault();
    const manager = target.getAttribute('data-manager');
    console.log('📋 CENTRAL_DELEGATION: Manager:', manager);
    
    if (manager === 'petProfiles') {
        console.log('🐕 CENTRAL_DELEGATION: Showing pet profiles main view');
        petProfilesManager.showMainView();
    }
    else if (manager === 'medication') {
        console.log('💊 CENTRAL_DELEGATION: Showing medication main view');
        medicationManager.showMainView();
    }
    else if (manager === 'exercise') {
        console.log('🏃 CENTRAL_DELEGATION: Showing exercise main view');
        exerciseManager.showMainView();
    }
    else if (manager === 'reminders') {
        console.log('📅 CENTRAL_DELEGATION: Showing reminders main view');
        remindersManager.showMainView();
    }
    else {
        console.error('❌ CENTRAL_DELEGATION: Unknown manager:', manager);
    }
}
        
        // 3. TASK MANAGEMENT
      //  else if (target.matches('input[type="checkbox"][data-task-id]')) {
      //      event.preventDefault();
     //       const taskId = target.getAttribute('data-task-id');
     //       taskManager.toggleTaskCompletion(taskId);
    //    }
        // In task toggle section, add:
else if (target.matches('input[type="checkbox"][data-task-id]')) {
    event.preventDefault();
    const taskId = target.getAttribute('data-task-id');
    
    if (taskId.startsWith('exercise_')) {
        const activityId = taskId.replace('exercise_', '');
        exerciseManager.completeExercise(activityId);
    } else {
        taskManager.toggleTaskCompletion(taskId);
    }
}
            
        
        // 4. NUTRITION SECTION
        else if (target.matches('[data-action="logWater"]')) {
            event.preventDefault();
            const amount = parseInt(target.getAttribute('data-amount'));
            nutritionManager.logWater(amount);
        }
        else if (target.matches('[data-action="showWaterLog"]')) {
            event.preventDefault();
            nutritionManager.showWaterLog();
        }
        else if (target.matches('[data-action="showFullFoodHistory"]')) {
            event.preventDefault();
            nutritionManager.showFullFoodHistory();
        }
        else if (target.matches('[data-action="saveNutritionPlan"]')) {
            event.preventDefault();
            nutritionManager.saveNutritionPlan();
        }
            // In setupEventDelegation, add this to the click handler
else if (target.matches('[data-action="showFullFoodHistory"]')) {
    event.preventDefault();
    nutritionManager.showFullFoodHistory();
}

               // In setupEventDelegation - add these to the click handler (around line 80-120)
else if (target.matches('[data-action="showFoodLogForm"]')) {
    event.preventDefault();
    nutritionManager.showFoodLogForm();
}
else if (target.matches('[data-action="hideFoodLogForm"]')) {
    event.preventDefault();
    nutritionManager.hideFoodLogForm();
}
else if (target.matches('[data-action="saveFoodLog"]')) {
    event.preventDefault();
    nutritionManager.handleFoodLogSubmit();
}
else if (target.matches('[data-action="showFoodInventoryForm"]')) {
    event.preventDefault();
    nutritionManager.showFoodInventoryForm();
}
else if (target.matches('[data-action="hideFoodInventoryForm"]')) {
    event.preventDefault();
    nutritionManager.hideFoodInventoryForm();
}
else if (target.matches('[data-action="saveFoodInventory"]')) {
    event.preventDefault();
    nutritionManager.handleInventorySubmit();
}      
        
            else if (target.matches('[data-action="editFoodInventory"]')) {
    event.preventDefault();
    const itemId = target.getAttribute('data-item-id');
    nutritionManager.editFoodInventory(itemId);
}
else if (target.matches('[data-action="markInventoryFinished"]')) {
    event.preventDefault();
    const itemId = target.getAttribute('data-item-id');
    nutritionManager.markInventoryFinished(itemId);
}   
       else if (target.matches('[data-action="clearAllAlerts"]')) {
    event.preventDefault();
    nutritionManager.clearDismissedAlerts();
    nutritionManager.renderSmartAlerts();
}   
       else if (target.matches('[data-action="dismissAlert"]')) {
    event.preventDefault();
    const alertId = target.getAttribute('data-alert-id');
    nutritionManager.dismissAlert(alertId);
    nutritionManager.renderSmartAlerts();
}
        
        // 5. MEDICATION SECTION
        else if (target.matches('[data-action="showAddMedication"]')) {
            event.preventDefault();
            medicationManager.showAddForm();
        }
        else if (target.matches('[data-action="editMedication"]')) {
            event.preventDefault();
            const medId = target.getAttribute('data-med-id');
            medicationManager.editMedication(medId);
        }
        else if (target.matches('[data-action="deleteMedication"]')) {
            event.preventDefault();
            const medId = target.getAttribute('data-med-id');
            medicationManager.deleteMedication(medId);
        }
        else if (target.matches('[data-action="logDose"]')) {
            event.preventDefault();
            const medId = target.getAttribute('data-med-id');
            const time = target.getAttribute('data-time');
            medicationManager.logDose(medId, time);
        }
        else if (target.matches('[data-action="skipDose"]')) {
            event.preventDefault();
            const medId = target.getAttribute('data-med-id');
            const time = target.getAttribute('data-time');
            medicationManager.skipDose(medId, time);
        }
        else if (target.matches('[data-action="logRefill"]')) {
            event.preventDefault();
            const medId = target.getAttribute('data-med-id');
            medicationManager.logRefill(medId);
        }
        
        //    else if (target.matches('[data-action="showMainView"]')) {
 //   event.preventDefault();
//    const manager = target.getAttribute('data-manager');
//    if (manager === 'petProfiles') {
//        petProfilesManager.showMainView();
//    }
//    if (manager === 'medication') {
 //       medicationManager.showMainView();
//    }
//            }

        
        // 6. EXERCISE SECTION
        else if (target.matches('[data-action="showMobilityForm"]')) {
            event.preventDefault();
            exerciseManager.showMobilityForm();
        }
        else if (target.matches('[data-action="showActivityForm"]')) {
            event.preventDefault();
            exerciseManager.showActivityForm();
        }
        else if (target.matches('[data-action="showActivityHistory"]')) {
            event.preventDefault();
            exerciseManager.showActivityHistory();
        }
        else if (target.matches('[data-action="logSuggestedExercise"]')) {
            event.preventDefault();
            const exerciseId = target.getAttribute('data-exercise-id');
            exerciseManager.logSuggestedExercise(exerciseId);
        }
            // for complete activity 
        else if (target.matches('[data-action="completeActivity"]')) {
    event.preventDefault();
    const activityId = target.getAttribute('data-activity-id');
    exerciseManager.completeActivity(activityId);
            }
            // PRINT BUTTON LISTENER
else if (target.matches('[data-action="printActivityHistory"]')) {
    console.log('🖨️ CENTRAL_DELEGATION: Print activity history clicked');
    event.preventDefault();
    exerciseManager.printActivityHistory();
}
        
        // 7. REMINDERS SECTION
        else if (target.matches('[data-action="previousMonth"]')) {
            event.preventDefault();
            remindersManager.previousMonth();
        }
        else if (target.matches('[data-action="nextMonth"]')) {
            event.preventDefault();
            remindersManager.nextMonth();
        }
        else if (target.matches('[data-action="showAddReminder"]')) {
            event.preventDefault();
            remindersManager.showAddForm();
        }
        else if (target.matches('[data-action="toggleView"]')) {
            event.preventDefault();
            const viewType = target.getAttribute('data-view-type');
            remindersManager.toggleView(viewType);
        }
        else if (target.matches('[data-action="completeReminder"]')) {
            event.preventDefault();
            const reminderId = target.getAttribute('data-reminder-id');
            remindersManager.completeReminder(reminderId);
        }
        else if (target.matches('[data-action="editReminder"]')) {
            event.preventDefault();
            const reminderId = target.getAttribute('data-reminder-id');
            remindersManager.editReminder(reminderId);
        }
        else if (target.matches('[data-action="deleteReminder"]')) {
            event.preventDefault();
            const reminderId = target.getAttribute('data-reminder-id');
            remindersManager.deleteReminder(reminderId);
        }
        else if (target.matches('[data-action="rescheduleReminder"]')) {
            event.preventDefault();
            const reminderId = target.getAttribute('data-reminder-id');
            remindersManager.rescheduleReminder(reminderId);
        }
        else if (target.matches('[data-action="showDayReminders"]')) {
            event.preventDefault();
            const date = target.getAttribute('data-date');
            remindersManager.showDayReminders(date);
        }
        else if (target.matches('[data-action="hideDayReminders"]')) {
            event.preventDefault();
            remindersManager.hideDayReminders();
        }
               // In REMINDERS SECTION of setupEventDelegation, ADD THESE:
else if (target.matches('[data-action="hideDayReminders"]')) {
    console.log('❌ REMINDERS_DELEGATION: Hide day reminders clicked');
    event.preventDefault();
    remindersManager.hideDayReminders();
}
else if (target.matches('[data-action="showAddFormWithDate"]')) {
    console.log('📅 REMINDERS_DELEGATION: Show add form with date clicked');
    event.preventDefault();
    const date = target.getAttribute('data-date');
    remindersManager.showAddFormWithDate(date);
}
        
        // 8. FORM SUBMISSIONS
        else if (target.matches('button[type="submit"], input[type="submit"]')) {
            const form = target.closest('form');
            if (form) {
                event.preventDefault();
                handleFormSubmission(form.id);
            }
        }
        
        // 9. DROPDOWN CHANGES (nutrition & medication calculators)
        else if (target.matches('#activity-level, #weight-goal, #food-type, #food-selection')) {
            // Let these handle their own onchange events naturally
            // Don't prevent default so the dropdown works normally
        }
        else if (target.matches('#calc-condition, #calc-weight, #calc-medication')) {
            // Let these handle their own onchange events naturally
        }
    });

    // Handle dropdown changes separately
    document.addEventListener('change', (event) => {
        const target = event.target;
        
        if (target.matches('#activity-level, #weight-goal, #food-type')) {
            nutritionManager.updateCalculation();
        }
        else if (target.matches('#food-selection')) {
            nutritionManager.updateCalculation();
        }
        else if (target.matches('#calc-condition')) {
            medicationManager.updateMedicationOptions();
            medicationManager.calculateDosage();
        }
        else if (target.matches('#calc-weight, #calc-medication')) {
            medicationManager.calculateDosage();
        }
    });
};

// Form submission handler (you'll need to implement this)
const handleFormSubmission = (formId) => {
    console.log('Form submission detected - Form ID:', formId, 'Event:', event);
    switch (formId) {
        case 'pet-form':
            petProfilesManager.handleSubmit(event);
            break;
        case 'medication-form':
            medicationManager.handleSubmit(event);
            break;
        case 'mobility-form':
            exerciseManager.handleMobilitySubmit(event);
            break;
        case 'activity-form':
            exerciseManager.handleActivitySubmit(event);
            break;
        case 'reminder-form':
            remindersManager.handleSubmit(event);
            break;
    }
};
    





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


//==============================================
         // DASHBOARD SECTION
//=============================================
// Dashboard Templates
//===========================
const dashboardTemplates = {
    // Main Dashboard Layout
 mainDashboard: () => `
    <div class="dashboard-header">
        <h2>Welcome to Your Pet's Health Hub</h2>
        <div class="header-nav">
            
            <div class="nav-actions">
                <button class="btn btn-primary" data-section="profiles">Pet Profiles</button>
                <button class="btn btn-secondary" data-section="medication">Medication</button>
                <button class="btn btn-secondary" data-section="nutrition">Nutrition</button> 
                <button class="btn btn-primary" data-action="logActivity">Log Activity</button>
                <button class="btn btn-accent" data-section="reminders">Reminders</button>

            </div>   
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
              
        </div>
    `,

// Pet Summary Template - ENHANCED VERSION
petSummary: () => {
    const pet = appState.currentPet;
    return `
        <div class="pet-summary-enhanced">
            <!-- QUICK PET HEADER -->
            <div class="pet-summary-header">
                ${pet.photo ? `
                    <div class="pet-summary-photo">
                        <img src="${pet.photo}" alt="${pet.name}">
                        ${pet.mood?.emoji ? `<span class="summary-mood">${pet.mood.emoji}</span>` : ''}
                    </div>
                ` : `
                    <div class="pet-summary-placeholder">
                        🐾
                        ${pet.mood?.emoji ? `<span class="summary-mood">${pet.mood.emoji}</span>` : ''}
                    </div>
                `}
                <div class="pet-summary-basic">
                    <h4>${pet.name}</h4>
                    <div class="pet-meta">
                        <span class="species-badge">${pet.species ? pet.species.charAt(0).toUpperCase() + pet.species.slice(1) : 'Pet'}</span>
                        ${pet.temperament ? `<span class="temperament-badge">${pet.temperament}</span>` : ''}
                    </div>
                </div>
            </div>
            
            <!-- HEALTH METRICS GRID -->
            <div class="pet-metrics-grid">
                <div class="metric-card">
                    <div class="metric-icon">🎂</div>
                    <div class="metric-info">
                        <span class="metric-value">${calculateAge(pet.birthDate)}</span>
                        <span class="metric-label">Years Old</span>
                    </div>
                </div>
                
                <div class="metric-card">
                    <div class="metric-icon">⚖️</div>
                    <div class="metric-info">
                        <span class="metric-value">${pet.weight || '?'}</span>
                        <span class="metric-label">kg</span>
                    </div>
                </div>
                
                ${pet.mobilityScore ? `
                <div class="metric-card">
                    <div class="metric-icon">🚶</div>
                    <div class="metric-info">
                        <span class="metric-value">${pet.mobilityScore}</span>
                        <span class="metric-label">/5 Mobility</span>
                    </div>
                </div>
                ` : ''}
                
                ${pet.bodyConditionScore ? `
                <div class="metric-card">
                    <div class="metric-icon">💪</div>
                    <div class="metric-info">
                        <span class="metric-value">${pet.bodyConditionScore}</span>
                        <span class="metric-label">/9 Body Score</span>
                    </div>
                </div>
                ` : ''}
            </div>
            
            <!-- QUICK STATUS -->
            <div class="pet-status-overview">
                ${pet.conditions && pet.conditions.length > 0 && pet.conditions[0] !== 'None' ? `
                    <div class="status-item conditions">
                        <span class="status-label">Conditions:</span>
                        <span class="status-value">${pet.conditions.slice(0, 2).join(', ')}${pet.conditions.length > 2 ? '...' : ''}</span>
                    </div>
                ` : ''}
                
                ${pet.vetInfo?.lastVisit ? `
                    <div class="status-item last-visit">
                        <span class="status-label">Last Vet:</span>
                        <span class="status-value">${formatDate(pet.vetInfo.lastVisit)}</span>
                    </div>
                ` : ''}
                
                ${pet.microchip ? `
                    <div class="status-item microchip">
                        <span class="status-label">Microchip:</span>
                        <span class="status-value">${pet.microchip}</span>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
},

    // Today's Tasks Template - FIXED VERSION
todayTasks: () => {
    const tasks = appState.todayTasks;
    console.log('📋 TASK_MANAGER: Generating today tasks view -', tasks.length, 'tasks');
    
    if (tasks.length === 0) {
        return '<p>No tasks scheduled for today</p>';
    }
    
    // Log for debugging
    tasks.forEach(task => {
        console.log('📝 TASK_MANAGER: Task', task.id, '- completed:', task.completed, '- type:', task.type);
    });
    
    return `
        <ul class="tasks-list">
            ${tasks.map(task => `
                <li class="task-item ${task.completed ? 'completed' : 'pending'}">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} 
                           data-task-id="${task.id}"
                           onchange="taskManager.toggleTaskCompletion('${task.id}')">
                    <span class="task-time">${task.time}</span>
                    <span class="task-description">${task.description}</span>
                    <span class="task-type ${task.type}">${task.type}</span>
                    ${task.completed ? '<span class="completed-badge">✅ Done</span>' : ''}
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

// Utility Functions FOR ENTIRE DASHBOARD 
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
    // Generate today's tasks - FIXED VERSION
generateTodayTasks: () => {
    console.log('🔄 TASK_MANAGER: Generating today tasks...');
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
        // In taskManager.generateTodayTasks(), add:
         // EXERCISE TASKS - RESTORE THIS CRITICAL LINE
    const exerciseTasks = window.exerciseManager ? exerciseManager.generateScheduledExercises() : [];
    console.log('🏃 TASK_MANAGER: Found exercise tasks:', exerciseTasks.length);
    tasks.push(...exerciseTasks);

    console.log('✅ TASK_MANAGER: Total tasks generated:', tasks.length);
    return tasks;
},


    // Toggle task completion - FIXED VERSION
toggleTaskCompletion: (taskId) => {
    console.log('🔄 TASK_MANAGER: Toggling task completion for:', taskId);
    const task = appState.todayTasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        console.log('✅ TASK_MANAGER: Task', taskId, 'now completed:', task.completed);
        utils.saveData('todayTasks', appState.todayTasks);
        
        // Force refresh of both dashboard and exercise views if needed
        renderDashboard();
        
        // If it's an exercise task, also update the exercise manager
        if (taskId.startsWith('exercise_')) {
            const activityId = taskId.replace('exercise_', '');
            console.log('🏃 TASK_MANAGER: Also updating exercise activity:', activityId);
            // This will be handled by the central event delegation
        }
    } else {
        console.error('❌ TASK_MANAGER: Task not found:', taskId);
    }
}
};  // end of dashboard manager section


//=================================
// Navigation Section
//===========================
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


//=================================
// Dashboard Rendering
//===============================
const renderDashboard = () => {
    if (!dashboardElements.dashboardContent) return;

        // REGENERATE TASKS WITH LATEST DATA
    appState.todayTasks = taskManager.generateTodayTasks();
    console.log('📊 DASHBOARD: Re-rendering with', appState.todayTasks.length, 'tasks');
    
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
// SECTION MANAGER FUNCTIONS:
// showDashboard() - Switches visible section to dashboard (changes display: none/block)
// showSection(sectionName) - Shows specific section, hides others

// PET PROFILES MANAGER FUNCTIONS:  
// showMainView() - Updates profiles section content to show pets list (replaces innerHTML)
// renderDashboard() - Re-renders entire dashboard content with current data (replaces innerHTML)
//showDashboard() - Just changes which section is visible
//showMainView() - Updates profiles section content only
//renderDashboard() - Refreshes ALL dashboard data and display
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
        <div class="profiles-header-buttons">
            <button class="btn btn-primary" data-action="showAddForm" data-manager="petProfiles">+ Add New Pet</button>
            <button class="btn btn-secondary" data-section="dashboard">← Back to Dashboard</button>
        </div>
    </div>
            
            <div class="pets-list" id="pets-list">
                ${petProfilesManager.templates.petsList()}
            </div>
        `,

// Pets List Template - ENHANCED VERSION display saved profiles
petsList: () => {
    if (appState.pets.length === 0) {
        return `
            <div class="no-pets">
                <div class="empty-state">
                    <h3>No Pets Added Yet</h3>
                    <p>Add your first pet to get started with health tracking!</p>
                    <button class="btn btn-primary" data-action="showAddForm" data-manager="petProfiles">
                        + Add Your First Pet
                    </button>
                </div>
            </div>
        `;
    }

    return `
        <div class="pets-grid">
            ${appState.pets.map(pet => `
                <div class="pet-card ${pet.id === appState.currentPet?.id ? 'active-pet' : ''}" data-pet-id="${pet.id}">
                    <!-- PET PHOTO HEADER -->
                    <div class="pet-card-header">
                        ${pet.photo ? `
                            <div class="pet-photo-thumbnail">
                                <img src="${pet.photo}" alt="${pet.name}">
                                ${pet.mood?.emoji ? `
                                    <div class="mood-badge">${pet.mood.emoji}</div>
                                ` : ''}
                            </div>
                        ` : `
                            <div class="pet-photo-placeholder">
                                🐾
                                ${pet.mood?.emoji ? `
                                    <div class="mood-badge">${pet.mood.emoji}</div>
                                ` : ''}
                            </div>
                        `}
                        <div class="pet-card-actions">
                            <button class="btn-icon" data-action="editPet" data-pet-id="${pet.id}" title="Edit">✏️</button>
                            <button class="btn-icon" data-action="viewPet" data-pet-id="${pet.id}" title="View Details">👁️</button>
                            <button class="btn-icon delete" data-action="deletePet" data-pet-id="${pet.id}" title="Delete">🗑️</button>
                        </div>
                    </div>
                    
                    <!-- PET BASIC INFO -->
                    <div class="pet-card-body">
                        <div class="pet-name-section">
                            <h3>${pet.name}</h3>
                            ${pet.id === appState.currentPet?.id ? '<span class="active-badge">Active</span>' : ''}
                        </div>
                        
                        <div class="pet-quick-info">
                            <div class="info-item">
                                <span class="label">Species:</span>
                                <span class="value">${pet.species ? pet.species.charAt(0).toUpperCase() + pet.species.slice(1) : '—'}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Breed:</span>
                                <span class="value">${pet.breed || '—'}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Age:</span>
                                <span class="value">${calculateAge(pet.birthDate) || '?'} years</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Weight:</span>
                                <span class="value">${pet.weight ? pet.weight + ' kg' : '—'}</span>
                            </div>
                        </div>
                        
                        <!-- BEHAVIOR & TEMPERAMENT -->
                        <div class="pet-behavior-info">
                            ${pet.temperament ? `
                                <div class="temperament-tag ${pet.temperament}">
                                    ${pet.temperament.charAt(0).toUpperCase() + pet.temperament.slice(1)}
                                </div>
                            ` : ''}
                            
                            ${pet.mood ? `
                                <div class="mood-info">
                                    <span class="mood-emoji">${pet.mood.emoji || ''}</span>
                                    ${pet.mood.scale ? `<span class="mood-scale">${pet.mood.scale}/5</span>` : ''}
                                </div>
                            ` : ''}
                        </div>
                        
                        <!-- HEALTH SUMMARY -->
                        <div class="pet-health-summary">
                            ${pet.conditions && pet.conditions.length > 0 && pet.conditions[0] !== 'None' ? `
                                <div class="conditions-preview">
                                    <strong>Conditions:</strong> 
                                    ${pet.conditions.slice(0, 2).join(', ')}
                                    ${pet.conditions.length > 2 ? ` +${pet.conditions.length - 2} more` : ''}
                                </div>
                            ` : ''}
                            
                            <div class="health-scores">
                                ${pet.mobilityScore ? `
                                    <div class="score-item">
                                        <span class="score-label">Mobility:</span>
                                        <span class="score-value">${pet.mobilityScore}/5</span>
                                    </div>
                                ` : ''}
                                
                                ${pet.bodyConditionScore ? `
                                    <div class="score-item">
                                        <span class="score-label">Body Score:</span>
                                        <span class="score-value">${pet.bodyConditionScore}/9</span>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    
                    <!-- CARD FOOTER -->
                    <div class="pet-card-footer">
                        ${pet.id !== appState.currentPet?.id ? `
                            <button class="btn btn-primary btn-sm" data-action="setCurrentPet" data-pet-id="${pet.id}">
                                Set Active
                            </button>
                        ` : `
                            <button class="btn btn-secondary btn-sm" data-section="dashboard">
                                View Dashboard
                            </button>
                        `}
                        <button class="btn btn-outline btn-sm" data-action="viewPet" data-pet-id="${pet.id}">
                            Full Profile
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
},
            

        // Add/Edit Pet Form
        // PROFILE CREATION FORM 
        // Add/Edit Pet Form - ENHANCED VERSION
petForm: (pet = null) => {
    const isEdit = !!pet;
    return `
        <div class="pet-form-container">
            <div class="form-header">
                <h2>${isEdit ? 'Edit' : 'Add'} Pet Profile</h2>
            </div>
            
            <form id="pet-form">
                <input type="hidden" id="pet-id" value="${pet?.id || ''}">
                
                <!-- BASIC INFORMATION SECTION -->
                <div class="form-section">
                    <h3>🐾 Basic Information</h3>
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
                            <label for="pet-microchip">Microchip Number</label>
                            <input type="text" id="pet-microchip" value="${pet?.microchip || ''}" 
                                   placeholder="15-digit microchip">
                        </div>
                    </div>
                </div>

                <!-- PET PHOTO SECTION -->
                <div class="form-section">
                    <h3>📸 Pet Photo</h3>
                    <div class="form-group">
                        <label for="pet-photo">Upload Photo</label>
                        <input type="file" id="pet-photo" accept="image/*" 
                               onchange="petProfilesManager.handleImageUpload(event)">
                        <div id="photo-preview" class="photo-preview">
                            ${pet?.photo ? `<img src="${pet.photo}" alt="${pet.name}">` : 'No photo selected'}
                        </div>
                    </div>
                </div>

                <!-- HEALTH INFORMATION SECTION -->
                <div class="form-section">
                    <h3>❤️ Health Information</h3>
                    <div class="form-grid">
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
                </div>

                <!-- BEHAVIOR & MOOD SECTION -->
                <div class="form-section">
                    <h3>😊 Behavior & Mood</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="pet-temperament">Temperament</label>
                            <select id="pet-temperament">
                                <option value="">Select Temperament</option>
                                <option value="friendly" ${pet?.temperament === 'friendly' ? 'selected' : ''}>😊 Friendly</option>
                                <option value="protective" ${pet?.temperament === 'protective' ? 'selected' : ''}>🛡️ Protective</option>
                                <option value="aggressive" ${pet?.temperament === 'aggressive' ? 'selected' : ''}>😠 Aggressive</option>
                                <option value="shy" ${pet?.temperament === 'shy' ? 'selected' : ''}>😌 Shy</option>
                                <option value="energetic" ${pet?.temperament === 'energetic' ? 'selected' : ''}>⚡ Energetic</option>
                                <option value="calm" ${pet?.temperament === 'calm' ? 'selected' : ''}>😌 Calm</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Current Mood</label>
                            <div class="mood-selection">
                                <div class="mood-emoji-buttons">
                                    ${['😊 Happy', '😴 Tired', '😠 Grumpy', '🐾 Playful', '😰 Anxious', '🤒 Sick', '😍 Affectionate', '😑 Neutral'].map(mood => {
                                        const [emoji, label] = mood.split(' ');
                                        return `
                                            <button type="button" class="mood-emoji ${pet?.mood?.emoji === emoji ? 'selected' : ''}" 
                                                    data-mood="${emoji}" data-label="${label}">
                                                ${emoji}
                                            </button>
                                        `;
                                    }).join('')}
                                </div>
                                <div class="mood-scale">
                                    <label for="pet-mood-scale">Mood Scale (1-5):</label>
                                    <select id="pet-mood-scale">
                                        <option value="">Select Scale</option>
                                        ${[1,2,3,4,5].map(scale => `
                                            <option value="${scale}" ${pet?.mood?.scale === scale ? 'selected' : ''}>
                                                ${scale} - ${scale === 1 ? 'Very Poor' : scale === 2 ? 'Poor' : scale === 3 ? 'Average' : scale === 4 ? 'Good' : 'Excellent'}
                                            </option>
                                        `).join('')}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- VETERINARY & CARE TEAM SECTION -->
                <div class="form-section">
                    <h3>🏥 Veterinary & Care Team</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="pet-vet-name">Primary Veterinarian</label>
                            <input type="text" id="pet-vet-name" value="${pet?.vetInfo?.name || ''}" 
                                   placeholder="Vet name or clinic">
                        </div>
                        
                        <div class="form-group">
                            <label for="pet-last-visit">Last Vet Visit</label>
                            <input type="date" id="pet-last-visit" value="${pet?.vetInfo?.lastVisit || ''}">
                        </div>
                        
                        <div class="form-group">
                            <label for="pet-insurance-provider">Insurance Provider</label>
                            <input type="text" id="pet-insurance-provider" value="${pet?.insurance?.provider || ''}" 
                                   placeholder="Insurance company">
                        </div>
                        
                        <div class="form-group">
                            <label for="pet-policy-number">Policy Number</label>
                            <input type="text" id="pet-policy-number" value="${pet?.insurance?.policyNumber || ''}" 
                                   placeholder="Insurance policy number">
                        </div>
                    </div>
                </div>

                <!-- OWNER & EMERGENCY INFO -->
                <div class="form-section">
                    <h3>👤 Owner & Emergency Info</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="pet-owner-name">Owner's Name</label>
                            <input type="text" id="pet-owner-name" value="${pet?.ownerInfo?.name || ''}" 
                                   placeholder="Your name">
                        </div>
                        
                        <div class="form-group">
                            <label for="pet-emergency-contact">Emergency Contact Name</label>
                            <input type="text" id="pet-emergency-contact" value="${pet?.emergencyContact?.name || ''}" 
                                   placeholder="Contact person">
                        </div>
                        
                        <div class="form-group">
                            <label for="pet-emergency-phone">Emergency Phone</label>
                            <input type="tel" id="pet-emergency-phone" value="${pet?.emergencyContact?.phone || ''}" 
                                   placeholder="Phone number">
                        </div>
                    </div>
                </div>

                <!-- ADDITIONAL NOTES -->
                <div class="form-section">
                    <h3>📝 Additional Information</h3>
                    <div class="form-group">
                        <label for="pet-dietary-restrictions">Dietary Restrictions</label>
                        <textarea id="pet-dietary-restrictions" rows="2" placeholder="Any food allergies or dietary needs...">${pet?.dietaryRestrictions || ''}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="pet-notes">Additional Notes</label>
                        <textarea id="pet-notes" rows="3" placeholder="Any other important information...">${pet?.notes || ''}</textarea>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">
                       ${isEdit ? 'Update' : 'Add'} Pet Profile
                   </button>
                  <button type="button" class="btn btn-secondary" data-action="showMainView" data-manager="petProfiles">Cancel</button>
                </div>
            </form>
        </div>
    `;
},

        

        // Pet Detail View
        //DISPLAYED PET PROFILES IN PROFILE SECTION TO BE SET AS ACTIVE AS NEEDED
// Pet Detail View - ENHANCED VERSION
petDetail: (pet) => `
    <div class="pet-detail-container">
        <div class="detail-header">
            <h2>${pet.name}'s Profile</h2>
            <button class="btn btn-secondary" data-action="showMainView" data-manager="petProfiles">
                ← Back to List
            </button>
        </div>
        
        <!-- PET PHOTO & QUICK INFO -->
        ${pet.photo ? `
        <div class="pet-detail-photo-section">
            <div class="pet-photo-main">
                <img src="${pet.photo}" alt="${pet.name}">
            </div>
        </div>
        ` : ''}
        
        <div class="pet-detail-grid">
            <!-- BASIC INFORMATION -->
            <div class="detail-section">
                <h3>🐾 Basic Information</h3>
                <div class="detail-info">
                    <div class="info-row">
                        <span class="label">Name:</span>
                        <span class="value">${pet.name}</span>
                    </div>
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
                    <div class="info-row">
                        <span class="label">Microchip:</span>
                        <span class="value">${pet.microchip || 'Not set'}</span>
                    </div>
                </div>
            </div>
            
            <!-- HEALTH INFORMATION -->
            <div class="detail-section">
                <h3>❤️ Health Information</h3>
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
                    ${pet.dietaryRestrictions ? `
                    <div class="info-row">
                        <span class="label">Dietary Restrictions:</span>
                        <span class="value">${pet.dietaryRestrictions}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
            
            <!-- BEHAVIOR & MOOD -->
            <div class="detail-section">
                <h3>😊 Behavior & Mood</h3>
                <div class="detail-info">
                    <div class="info-row">
                        <span class="label">Temperament:</span>
                        <span class="value">${pet.temperament ? 
                            pet.temperament.charAt(0).toUpperCase() + pet.temperament.slice(1) : 'Not set'}</span>
                    </div>
                    ${pet.mood ? `
                    <div class="info-row">
                        <span class="label">Current Mood:</span>
                        <span class="value mood-display">
                            ${pet.mood.emoji || ''} ${pet.mood.label || ''} 
                            ${pet.mood.scale ? `(Scale: ${pet.mood.scale}/5)` : ''}
                        </span>
                    </div>
                    ` : ''}
                </div>
            </div>
            
            <!-- VETERINARY & CARE TEAM -->
            <div class="detail-section">
                <h3>🏥 Veterinary & Care</h3>
                <div class="detail-info">
                    <div class="info-row">
                        <span class="label">Primary Vet:</span>
                        <span class="value">${pet.vetInfo?.name || 'Not specified'}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Last Visit:</span>
                        <span class="value">${formatDate(pet.vetInfo?.lastVisit) || 'Not recorded'}</span>
                    </div>
                    ${pet.insurance?.provider ? `
                    <div class="info-row">
                        <span class="label">Insurance:</span>
                        <span class="value">${pet.insurance.provider} ${pet.insurance.policyNumber ? `(${pet.insurance.policyNumber})` : ''}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
            
            <!-- OWNER & EMERGENCY INFO -->
            <div class="detail-section">
                <h3>👤 Owner & Emergency</h3>
                <div class="detail-info">
                    ${pet.ownerInfo?.name ? `
                    <div class="info-row">
                        <span class="label">Owner:</span>
                        <span class="value">${pet.ownerInfo.name}</span>
                    </div>
                    ` : ''}
                    ${pet.emergencyContact?.name ? `
                    <div class="info-row">
                        <span class="label">Emergency Contact:</span>
                        <span class="value">${pet.emergencyContact.name} ${pet.emergencyContact.phone ? `- ${pet.emergencyContact.phone}` : ''}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
            
            <!-- ADDITIONAL NOTES -->
            ${pet.notes ? `
            <div class="detail-section full-width">
                <h3>📝 Additional Notes</h3>
                <div class="notes-content">
                    <p>${pet.notes}</p>
                </div>
            </div>
            ` : ''}
        </div>
        
        <div class="detail-actions">
            <button class="btn btn-primary" data-action="editPet" data-pet-id="${pet.id}">
                Edit Profile
            </button>
            <button class="btn btn-secondary" data-action="setCurrentPet" data-pet-id="${pet.id}">
                Set as Active Pet
            </button>
        </div>
    </div>
`
    },

//==========================================================
// THIS IS A VERY CRUCIAL AREA  THAT UPDATES EVERYTHING 
//=============================================================
    // View Management
    showMainView: function() {
        this.elements.profilesContent.innerHTML = this.templates.mainView();
    },

      // Update showEditForm to setup mood selection
showEditForm: function(petId) {
    console.log('📝 PET_MANAGER: Showing enhanced edit form for pet:', petId);
    const pet = appState.pets.find(p => p.id === petId);
    if (pet) {
        this.elements.profilesContent.innerHTML = this.templates.petForm(pet);
        
        // Setup mood selection after form is rendered
        setTimeout(() => {
            this.setupMoodSelection();
        }, 100);
    }
},

// Update showAddForm to setup mood selection
showAddForm: function() {
    console.log('📝 PET_MANAGER: Showing enhanced add form');
    this.elements.profilesContent.innerHTML = this.templates.petForm();
    
    // Setup mood selection after form is rendered
    setTimeout(() => {
        this.setupMoodSelection();
    }, 100);
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


validateForm: function(formData) {
    console.log('✅ PET_MANAGER: Validating form data...');
    
    // Required field validation
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

    // Weight validation
    if (formData.weight && (formData.weight < 0 || formData.weight > 200)) {
        alert('Please enter a valid weight between 0 and 200 kg');
        return false;
    }

    // Microchip validation (basic format check)
    if (formData.microchip && !/^[0-9A-Za-z]{10,15}$/.test(formData.microchip)) {
        alert('Microchip number should be 10-15 alphanumeric characters');
        return false;
    }

    // Emergency phone validation (basic format)
    if (formData.emergencyContact?.phone && !/^[\d\s\-\+\(\)]{10,20}$/.test(formData.emergencyContact.phone)) {
        alert('Please enter a valid phone number');
        return false;
    }

    console.log('✅ PET_MANAGER: Form validation passed');
    return true;
},


// newly added section
// Image Handling Functions enhanced
handleImageUpload: function(event) {
    console.log('📸 PET_MANAGER: Image upload triggered');
    const file = event.target.files[0];
    const preview = document.getElementById('photo-preview');
    
    if (file) {
        // File size validation (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('Image size must be less than 2MB');
            event.target.value = ''; // Clear the file input
            preview.innerHTML = 'No photo selected';
            return;
        }

        // File type validation
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file');
            event.target.value = '';
            preview.innerHTML = 'No photo selected';
            return;
        }

        console.log('📸 PET_MANAGER: Processing file:', file.name, file.type, Math.round(file.size/1024) + 'KB');
        const reader = new FileReader();
        
        reader.onload = function(e) {
            console.log('📸 PET_MANAGER: Image loaded successfully');
            preview.innerHTML = `<img src="${e.target.result}" alt="Pet photo preview">`;
        };
        
        reader.onerror = function() {
            console.error('❌ PET_MANAGER: Failed to load image');
            alert('Error loading image. Please try another file.');
        };
        
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = 'No photo selected';
    }
},

// Mood Selection Handler
setupMoodSelection: function() {
    console.log('😊 PET_MANAGER: Setting up mood selection');
    const moodButtons = document.querySelectorAll('.mood-emoji');
    
    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('😊 PET_MANAGER: Mood selected:', this.dataset.mood, this.dataset.label);
            
            // Remove selected class from all buttons
            moodButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
        });
    });
},

// Enhanced Form Data Collection
getFormData: function() {
    console.log('📋 PET_MANAGER: Collecting enhanced form data');
    
    const conditions = [];
    document.querySelectorAll('.conditions-checklist input:checked').forEach(checkbox => {
        if (checkbox.value !== 'None') {
            conditions.push(checkbox.value);
        }
    });

    // Get selected mood
    const selectedMoodButton = document.querySelector('.mood-emoji.selected');
    const moodEmoji = selectedMoodButton ? selectedMoodButton.dataset.mood : null;
    const moodLabel = selectedMoodButton ? selectedMoodButton.dataset.label : null;
    const moodScale = document.getElementById('pet-mood-scale').value;

    // Get photo data
    const photoPreview = document.querySelector('#photo-preview img');
    const photoData = photoPreview ? photoPreview.src : null;

    return {
        // Basic Info
        name: document.getElementById('pet-name').value.trim(),
        species: document.getElementById('pet-species').value,
        breed: document.getElementById('pet-breed').value.trim(),
        birthDate: document.getElementById('pet-birthdate').value,
        weight: document.getElementById('pet-weight').value ? parseFloat(document.getElementById('pet-weight').value) : null,
        microchip: document.getElementById('pet-microchip').value.trim(),
        
        // Health Info
        bodyConditionScore: document.getElementById('pet-body-condition').value ? parseInt(document.getElementById('pet-body-condition').value) : null,
        mobilityScore: document.getElementById('pet-mobility').value ? parseInt(document.getElementById('pet-mobility').value) : null,
        conditions: conditions.length > 0 ? conditions : ['None'],
        
        // Behavior & Mood
        temperament: document.getElementById('pet-temperament').value,
        mood: {
            emoji: moodEmoji,
            label: moodLabel,
            scale: moodScale ? parseInt(moodScale) : null
        },
        
        // Veterinary Info
        vetInfo: {
            name: document.getElementById('pet-vet-name').value.trim(),
            lastVisit: document.getElementById('pet-last-visit').value
        },
        
        // Insurance
        insurance: {
            provider: document.getElementById('pet-insurance-provider').value.trim(),
            policyNumber: document.getElementById('pet-policy-number').value.trim()
        },
        
        // Owner & Emergency
        ownerInfo: {
            name: document.getElementById('pet-owner-name').value.trim()
        },
        emergencyContact: {
            name: document.getElementById('pet-emergency-contact').value.trim(),
            phone: document.getElementById('pet-emergency-phone').value.trim()
        },
        
        // Additional Info
        dietaryRestrictions: document.getElementById('pet-dietary-restrictions').value.trim(),
        notes: document.getElementById('pet-notes').value.trim(),
        
        // Photo
        photo: photoData,
        
        // Metadata
        createdAt: new Date().toISOString()
    };
},





    // IT ADDS PET PROFILE TO PROFILE SECTION PAGE 
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

    //===UPDATES UI WHEN A PROFILE IS SET TO ACTIVE IT REDIRECTS TO DASHBOARD AND 
    // QUEUE IT IN PROFILE SELECTOR  
    updatePet: function(petId, petData) {
        const petIndex = appState.pets.findIndex(p => p.id === petId);
        if (petIndex !== -1) {
            appState.pets[petIndex] = {
                ...appState.pets[petIndex],
                ...petData,
                updatedAt: new Date().toISOString()
            };
    //update UI then        
            this.savePets();
            this.showMainView();
            sectionManager.showSection('dashboard'); // Add this line
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
    
// setting current ACTIVE PET TO DISPLAY ITS SUMMARY 
    setCurrentPet: function(petId) {
        const pet = appState.pets.find(p => p.id === petId);
        if (pet) {
            appState.currentPet = pet;
            utils.saveData('currentPet', pet);
            alert(`${pet.name} is now your active pet!`);
            showDashboard(); // Return to dashboard with new active pet
            renderDashboard(); // This actually re-renders the content with new data
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






//================================================
// Nutrition & Diet Planner Section Functionality
//=================================================
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
        <div class="nutrition-header-top">
            <h2>Nutrition & Diet Planner</h2>
            <button class="btn btn-secondary" data-section="dashboard">← Back to Dashboard</button>
        </div>
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
                    <button class="btn btn-primary" data-section="profiles">
                       Manage Pet Profiles
                    </button>
                </div>
            </div>
        `,


        // Add to nutritionManager.templates - around line 1200
foodLogForm: () => `
    <div class="food-form-container">
        <div class="form-header">
            <h3>Log Daily Food Intake</h3>
        </div>
        <form id="food-log-form">
            <div class="form-grid">
                <div class="form-group">
                    <label for="log-food-date">Date</label>
                    <input type="date" id="log-food-date" value="${utils.getTodayDate()}">
                </div>
                <div class="form-group">
                    <label for="log-food-type">Meal Type</label>
                    <select id="log-food-type">
                        <option value="breakfast">Breakfast</option>
                        <option value="dinner">Dinner</option>
                        <option value="treats">Treats/Snacks</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="log-food-offered">Amount Offered (cups)</label>
                    <input type="number" id="log-food-offered" step="0.1" min="0" placeholder="e.g., 1.5">
                </div>
                <div class="form-group">
                    <label for="log-food-consumed">Amount Consumed (cups)</label>
                    <input type="number" id="log-food-consumed" step="0.1" min="0" placeholder="e.g., 1.2">
                </div>
                <div class="form-group">
                    <label for="log-food-name">Food Name</label>
                    <input type="text" id="log-food-name" placeholder="e.g., Hill's k/d">
                </div>
            </div>
            <div class="form-group">
                <label for="log-food-notes">Notes</label>
                <textarea id="log-food-notes" rows="2" placeholder="Appetite, behavior, any concerns..."></textarea>
            </div>
               <div class="form-actions">
                    <button type="submit" class="btn btn-primary" data-action="saveFoodLog">Save Food Log</button>
                   <button type="button" class="btn btn-secondary" data-action="hideFoodLogForm">Cancel</button>
            </div>
        </form>
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
                                <select id="weight-goal">
                                    <option value="maintain">Maintain Current Weight</option>
                                    <option value="loss">Weight Loss</option>
                                    <option value="gain">Weight Gain</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="food-type">Select Food Type</label>
                                <select id="food-type">
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
                                <button type="button" class="btn btn-primary" data-action="saveNutritionPlan">
                                 Save Nutrition Plan
                                </button>
                            </div>
                        </form>
                    </div>

                         <!-- ADD THIS NEW ALERTS CARD -->
            <div class="nutrition-card smart-alerts">
                <h3>Health Alerts</h3>
                ${nutritionManager.templates.smartAlerts()}
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
                         <!-- ADD THIS NEW CARD -->
            <div class="nutrition-card food-inventory">
                <h3>Food Inventory</h3>
                ${nutritionManager.templates.foodInventory()}
            </div>
                </div>
            `;
        },

// Feeding Schedule Template
//This checks both the current nutrition data AND the saved nutrition plan for the selected food name, ensuring it displays correctly after saving.
feedingSchedule: (nutritionData) => {
    // Get the saved nutrition plan to access selectedFood
    const savedPlan = utils.loadData(`nutritionPlan_${appState.currentPet.id}`) || {};
    const selectedFood = savedPlan.selectedFood || nutritionData.selectedFood;
    
    // Calculate feeding schedule ONLY when we have selected food
    const schedule = nutritionManager.calculateFeedingSchedule(nutritionData.recommended) || {};
    
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
            <p><strong>Food:</strong> ${selectedFood?.name || 'Not selected'}</p>
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
                    <button class="btn btn-secondary btn-sm" data-action="logWater" data-amount="100">+100 ml</button>
<button class="btn btn-secondary btn-sm" data-action="logWater" data-amount="250">+250 ml</button>
<button class="btn btn-secondary btn-sm" data-action="logWater" data-amount="500">+500 ml</button>
<button class="btn btn-accent btn-sm" data-action="showWaterLog">View Log</button>

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
        // Replace the existing foodHistory template - around line 1250
foodHistory: () => {
    const foodHistory = nutritionManager.getFoodHistory().slice(0, 5);
    
    return `
        <div class="food-history-section">
            <div class="section-header">
                <h4>Recent Food Intake</h4>
                <button class="btn btn-primary btn-sm" data-action="showFoodLogForm">+ Log Food</button>
            </div>
            <div class="food-history-list">
                ${foodHistory.length === 0 ? `
                    <p class="no-data">No food intake logged yet</p>
                ` : `
                    ${foodHistory.map(entry => `
                        <div class="food-history-entry">
                            <div class="food-date">${formatDate(entry.date)} - ${entry.mealType}</div>
                            <div class="food-details">
                                <strong>${entry.foodName}</strong>
                                <span>Offered: ${entry.amountOffered}c • Ate: ${entry.amountConsumed}c</span>
                            </div>
                            ${entry.notes ? `<div class="food-notes">${entry.notes}</div>` : ''}
                        </div>
                    `).join('')}
                `}
            </div>
            ${foodHistory.length > 0 ? `
                <button class="btn btn-secondary btn-sm" data-action="showFullFoodHistory">View Full History</button>
            ` : ''}
        </div>
    `;
},
        
// Add to nutritionManager.templates - around line 1300
foodInventory: () => {
    const inventory = nutritionManager.foodInventory.filter(item => item.isActive);
    const activeItem = inventory[0]; // Currently active food
    
    return `
        <div class="food-inventory-section">
            <div class="section-header">
                <h4>Food Inventory</h4>
                <button class="btn btn-primary btn-sm" data-action="showFoodInventoryForm">+ Add Food</button>
            </div>
            
            ${activeItem ? nutritionManager.templates.activeFoodInventory(activeItem) : `
                <div class="no-inventory">
                    <p>No active food inventory</p>
                    <button class="btn btn-secondary btn-sm" data-action="showFoodInventoryForm">
               </div>
            `}
            
            ${inventory.length > 1 ? `
                <div class="inventory-history">
                    <h5>Previous Food Items</h5>
                    ${inventory.slice(1).map(item => `
                        <div class="inventory-item inactive">
                            <span class="food-name">${item.name}</span>
                            <span class="food-status">Finished</span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
},

activeFoodInventory: (item) => {
    const daysRemaining = nutritionManager.calculateDaysRemaining(item);
    const usagePerDay = item.dailyUsage || 0;
    const costPerDay = item.cost ? (item.cost / item.bagSize * usagePerDay).toFixed(2) : 0;
    
    return `
        <div class="active-inventory-item">
            <div class="inventory-header">
                <h5>${item.name}</h5>
                <span class="inventory-status ${daysRemaining <= 7 ? 'warning' : 'normal'}">
                    ${daysRemaining <= 7 ? '🔄 Refill Soon' : '✅ Good'}
                </span>
            </div>
            
            <div class="inventory-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${((item.initialAmount - item.currentAmount) / item.initialAmount) * 100}%"></div>
                </div>
                <div class="progress-labels">
                    <span>Used: ${(item.initialAmount - item.currentAmount).toFixed(1)}${item.bagSizeUnit}</span>
                    <span>Left: ${item.currentAmount.toFixed(1)}${item.bagSizeUnit}</span>
                </div>
            </div>
            
            <div class="inventory-stats">
                <div class="stat-item">
                    <span class="stat-label">Daily Usage:</span>
                    <span class="stat-value">${usagePerDay.toFixed(2)} cups/day</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Days Remaining:</span>
                    <span class="stat-value ${daysRemaining <= 7 ? 'warning' : ''}">${daysRemaining} days</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Est. Finish:</span>
                    <span class="stat-value">${formatDate(item.estimatedFinish)}</span>
                </div>
                ${item.cost > 0 ? `
                    <div class="stat-item">
                        <span class="stat-label">Cost per Day:</span>
                        <span class="stat-value">$${costPerDay}</span>
                    </div>
                ` : ''}
            </div>
            
            ${daysRemaining <= 7 ? `
                <div class="refill-alert">
                    ⚠️ Food will run out in ${daysRemaining} days. Consider reordering soon.
                </div>
            ` : ''}
            
             <div class="inventory-actions">
                <button class="btn btn-secondary btn-xs" data-action="editFoodInventory" data-item-id="${item.id}">Edit</button>
                 <button class="btn btn-warning btn-xs" data-action="markInventoryFinished" data-item-id="${item.id}">Mark Finished</button>
             </div>
        </div>
    `;
},

// Food Inventory Form Template
foodInventoryForm: (item = null) => {
    const isEdit = !!item;
    
    return `
        <div class="inventory-form-container">
            <div class="form-header">
                <h4>${isEdit ? 'Edit' : 'Add'} Food Inventory</h4>
            </div>
            <form id="food-inventory-form">
                <input type="hidden" id="inventory-id" value="${item?.id || ''}">
                
                <div class="form-grid">
                    <div class="form-group">
                        <label for="inv-food-name">Food Name *</label>
                        <input type="text" id="inv-food-name" value="${item?.name || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="inv-food-brand">Brand</label>
                        <input type="text" id="inv-food-brand" value="${item?.brand || ''}">
                    </div>
                    <div class="form-group">
                        <label for="inv-bag-size">Bag Size *</label>
                        <input type="number" id="inv-bag-size" step="0.1" min="0.1" value="${item?.bagSize || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="inv-bag-unit">Unit</label>
                        <select id="inv-bag-unit">
                            <option value="kg" ${item?.bagSizeUnit === 'kg' ? 'selected' : ''}>kg</option>
                            <option value="lbs" ${item?.bagSizeUnit === 'lbs' ? 'selected' : ''}>lbs</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="inv-cost">Cost ($)</label>
                        <input type="number" id="inv-cost" step="0.01" min="0" value="${item?.cost || ''}">
                    </div>
                    <div class="form-group">
                        <label for="inv-start-date">Start Date</label>
                        <input type="date" id="inv-start-date" value="${item?.startDate || utils.getTodayDate()}">
                    </div>
                </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary" data-action="saveFoodInventory">${isEdit ? 'Update' : 'Add'} Food</button>
                <button type="button" class="btn btn-secondary" data-action="hideFoodInventoryForm">Cancel</button>
            </div>
                    
            </form>
        </div>
    `;
},
        // Add to nutritionManager.templates - around line 1350
smartAlerts: () => {
    const alerts = nutritionManager.generateAlerts();
    
    return `
        <div class="smart-alerts-section">
            <div class="section-header">
                <h4>Health Alerts</h4>
                <div class="alert-controls">
                    <span class="alert-count ${alerts.length > 0 ? 'has-alerts' : ''}">
                        ${alerts.length} alert${alerts.length !== 1 ? 's' : ''}
                    </span>
                    ${alerts.length > 0 ? `
                <button class="btn-icon" data-action="clearAllAlerts" title="Clear all">🔄</button>
                    ` : ''}
                </div>
            </div>
            
            <div class="alerts-container">
                ${alerts.length === 0 ? `
                    <div class="no-alerts">
                        <p>No alerts at this time</p>
                        <small>All nutrition metrics are within normal ranges</small>
                    </div>
                ` : `
                    <div class="alerts-list">
                        ${alerts.map(alert => `
                            <div class="alert-item ${alert.severity}">
                                <div class="alert-icon">
                                    ${alert.severity === 'high' ? '⚠️' : 
                                      alert.severity === 'medium' ? '🔔' : 
                                      alert.severity === 'info' ? 'ℹ️' : '💡'}
                                </div>
                                <div class="alert-content">
                                    <div class="alert-header">
                                        <strong>${alert.title}</strong>
                                        <span class="alert-type">${alert.type}</span>
                                    </div>
                                    <p class="alert-message">${alert.message}</p>
                                    <div class="alert-condition">${alert.condition}</div>
                                    <small class="alert-time">${new Date(alert.timestamp).toLocaleTimeString()}</small>
                                </div>
                        <button class="alert-dismiss" data-action="dismissAlert" data-alert-id="${alert.id}" title="Dismiss">×</button>                                    ×
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
        </div>
    `;
}       
    }, // closes templates brace
    
        // ADD foodInventory property RIGHT HERE:
    foodInventory: [],
    // Add these methods to nutritionManager - around line 1800
// UI Management for Inventory
    showFoodInventoryForm: function(item = null) {
    const inventorySection = document.querySelector('.food-inventory-section');
    if (inventorySection) {
        inventorySection.innerHTML = this.templates.foodInventoryForm(item);
        this.setupInventoryForm();
    }
},

hideFoodInventoryForm: function() {
    this.renderFoodInventory();
},


handleInventorySubmit: function() {
        if (event) event.preventDefault(); // Add this line
    const formData = {
        name: document.getElementById('inv-food-name').value.trim(),
        brand: document.getElementById('inv-food-brand').value.trim(),
        bagSize: parseFloat(document.getElementById('inv-bag-size').value),
        bagSizeUnit: document.getElementById('inv-bag-unit').value,
        cost: parseFloat(document.getElementById('inv-cost').value) || 0,
        startDate: document.getElementById('inv-start-date').value
    };

    if (!this.validateInventoryForm(formData)) {
        return;
    }

    const itemId = document.getElementById('inventory-id').value;
    if (itemId) {
        this.updateFoodInventory(itemId, formData);
    } else {
        this.addFoodToInventory(formData);
    }
},

validateInventoryForm: function(formData) {
    if (!formData.name) {
        alert('Please enter food name');
        return false;
    }
    if (!formData.bagSize || formData.bagSize <= 0) {
        alert('Please enter valid bag size');
        return false;
    }
    return true;
},

updateFoodInventory: function(itemId, formData) {
    const itemIndex = this.foodInventory.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        this.foodInventory[itemIndex] = {
            ...this.foodInventory[itemIndex],
            ...formData
        };
        this.updateFoodInventoryCalculations();
        this.saveFoodInventory();
        alert('Food inventory updated!');
        this.hideFoodInventoryForm();
    }
},

markInventoryFinished: function(itemId) {
    if (confirm('Mark this food as finished?')) {
        const itemIndex = this.foodInventory.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            this.foodInventory[itemIndex].isActive = false;
            this.saveFoodInventory();
            this.renderFoodInventory();
        }
    }
},

editFoodInventory: function(itemId) {
    const item = this.foodInventory.find(item => item.id === itemId);
    if (item) {
        this.showFoodInventoryForm(item);
    }
},

calculateDaysRemaining: function(inventoryItem) {
    if (!inventoryItem.dailyUsage || inventoryItem.dailyUsage <= 0) return 0;
    return Math.floor(inventoryItem.currentAmount / inventoryItem.dailyUsage);
},

renderFoodInventory: function() {
    const inventoryElement = document.querySelector('.food-inventory-section');
    if (inventoryElement) {
        inventoryElement.innerHTML = this.templates.foodInventory();
    }
},
// Add these methods to nutritionManager - around line 1600
// Food Inventory Management
initializeFoodInventory: function() {
    if (appState.currentPet) {
        this.foodInventory = utils.loadData(`foodInventory_${appState.currentPet.id}`) || [];
    }
},

saveFoodInventory: function() {
    if (appState.currentPet) {
        utils.saveData(`foodInventory_${appState.currentPet.id}`, this.foodInventory);
    }
    this.renderSmartAlerts(); // Refresh alerts
},

// Add food to inventory
addFoodToInventory: function(foodData) {
    const inventoryItem = {
        id: 'food_inv_' + Date.now(),
        name: foodData.name,
        brand: foodData.brand || '',
        bagSize: foodData.bagSize, // in kg or lbs
        bagSizeUnit: foodData.bagSizeUnit || 'kg',
        cost: foodData.cost || 0,
        startDate: foodData.startDate || utils.getTodayDate(),
        initialAmount: foodData.bagSize,
        currentAmount: foodData.bagSize,
        dailyUsage: 0,
        estimatedFinish: null,
        isActive: true
    };

    this.foodInventory.push(inventoryItem);
    this.saveFoodInventory();
    this.updateFoodInventoryCalculations();
    return inventoryItem;
},

// Update inventory calculations based on feeding history
updateFoodInventoryCalculations: function() {
    const feedingHistory = this.getFoodHistory();
    const recentUsage = this.calculateDailyFoodUsage(feedingHistory);
    
    this.foodInventory.forEach(item => {
        if (item.isActive) {
            item.dailyUsage = recentUsage;
            item.estimatedFinish = this.calculateFinishDate(item);
        }
    });
    
    this.saveFoodInventory();
},

// Calculate daily food usage from history
calculateDailyFoodUsage: function(feedingHistory) {
    const last7Days = feedingHistory.filter(entry => {
        const entryDate = new Date(entry.date);
        const today = new Date();
        const diffTime = Math.abs(today - entryDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    });

    if (last7Days.length === 0) return 0;

    const totalConsumed = last7Days.reduce((sum, entry) => {
        return sum + (entry.amountConsumed || 0);
    }, 0);

    return totalConsumed / 7; // Average daily consumption
},

// Calculate when food will run out
calculateFinishDate: function(inventoryItem) {
    if (!inventoryItem.dailyUsage || inventoryItem.dailyUsage <= 0) return null;
    
    const daysRemaining = inventoryItem.currentAmount / inventoryItem.dailyUsage;
    const finishDate = new Date();
    finishDate.setDate(finishDate.getDate() + Math.floor(daysRemaining));
    
    return finishDate.toISOString().split('T')[0];
},

// Update inventory when food is logged
updateInventoryOnFoodLog: function(foodLog) {
    if (!this.foodInventory.length) return;
    
    const activeItem = this.foodInventory.find(item => item.isActive);
    if (activeItem && foodLog.amountConsumed > 0) {
        // Convert cups to kg (approximate conversion - adjust based on food density)
        const conversionRate = 0.12; // 1 cup ≈ 0.12kg for dry food
        const consumedKg = foodLog.amountConsumed * conversionRate;
        
        activeItem.currentAmount = Math.max(0, activeItem.currentAmount - consumedKg);
        this.updateFoodInventoryCalculations();
        this.saveFoodInventory();
    }
},

    

    // Add to nutritionManager properties - around line 1110 (after foodInventory)
alertSystem: {
    enabled: true,
    lastCheck: null,
    dismissedAlerts: []
},

// Add these methods to nutritionManager - around line 1900
// Smart Alert System
initializeAlertSystem: function() {
    if (appState.currentPet) {
        this.alertSystem = utils.loadData(`alertSystem_${appState.currentPet.id}`) || {
            enabled: true,
            lastCheck: null,
            dismissedAlerts: []
        };
    }
},

saveAlertSystem: function() {
    if (appState.currentPet) {
        utils.saveData(`alertSystem_${appState.currentPet.id}`, this.alertSystem);
    }
},

// Generate all alerts based on current data
generateAlerts: function() {
    if (!this.alertSystem.enabled || !appState.currentPet) return [];
    
    const alerts = [];
    
    // Add each type of alert
    alerts.push(...this.generateAppetiteAlerts());
    alerts.push(...this.generateWaterAlerts());
    alerts.push(...this.generateInventoryAlerts());
    alerts.push(...this.generateConditionAlerts());
    
    // Filter out dismissed alerts
    return alerts.filter(alert => 
        !this.alertSystem.dismissedAlerts.includes(alert.id)
    );
},

// Appetite-based alerts
generateAppetiteAlerts: function() {
    const alerts = [];
    const foodHistory = this.getFoodHistory();
    const recentHistory = this.getRecentFoodHistory(3); // Last 3 days
    
    if (recentHistory.length === 0) return alerts;
    
    // Check for recent food refusal
    const todayHistory = foodHistory.filter(entry => entry.date === utils.getTodayDate());
    const totalConsumedToday = todayHistory.reduce((sum, entry) => sum + (entry.amountConsumed || 0), 0);
    
    if (totalConsumedToday === 0 && todayHistory.length > 0) {
        alerts.push({
            id: 'appetite_refusal_today',
            type: 'appetite',
            severity: 'high',
            title: 'Food Refusal Today',
            message: 'Your pet has not consumed any food today.',
            condition: 'Monitor closely and contact vet if this continues',
            timestamp: new Date().toISOString()
        });
    }
    
    // Check for consistently low intake
    const avgDailyIntake = recentHistory.reduce((sum, entry) => sum + (entry.amountConsumed || 0), 0) / recentHistory.length;
    const nutritionPlan = utils.loadData(`nutritionPlan_${appState.currentPet.id}`);
    
    if (nutritionPlan && avgDailyIntake < (nutritionPlan.needs.recommended * 0.3)) {
        alerts.push({
            id: 'appetite_low_consistent',
            type: 'appetite',
            severity: 'medium',
            title: 'Consistently Low Food Intake',
            message: `Average intake is ${avgDailyIntake.toFixed(1)} cups/day (less than 30% of recommended)`,
            condition: 'Consider appetite stimulants or diet change',
            timestamp: new Date().toISOString()
        });
    }
    
    return alerts;
},

// Water intake alerts
generateWaterAlerts: function() {
    const alerts = [];
    const waterLog = this.getWaterLog();
    const todayWater = this.getTodayWaterIntake();
    
    // Basic water requirement calculation
    const expectedWater = this.calculateExpectedWaterIntake();
    
    if (todayWater > 0 && todayWater < (expectedWater * 0.5)) {
        alerts.push({
            id: 'water_intake_low',
            type: 'water',
            severity: 'medium',
            title: 'Low Water Intake',
            message: `Today's water intake (${todayWater}ml) is less than 50% of expected (${expectedWater}ml)`,
            condition: 'Encourage drinking or consider wet food',
            timestamp: new Date().toISOString()
        });
    }
    
    // Check for kidney disease specific alerts
    if (appState.currentPet.conditions?.some(cond => cond.toLowerCase().includes('kidney'))) {
        if (todayWater < (expectedWater * 0.7)) {
            alerts.push({
                id: 'water_kidney_concern',
                type: 'water',
                severity: 'high',
                title: 'Kidney Health Concern',
                message: 'Water intake is low for a pet with kidney condition',
                condition: 'Increased hydration is crucial for kidney support',
                timestamp: new Date().toISOString()
            });
        }
    }
    
    return alerts;
},

// Inventory alerts
generateInventoryAlerts: function() {
    const alerts = [];
    const activeInventory = this.foodInventory.filter(item => item.isActive);
    
    activeInventory.forEach(item => {
        const daysRemaining = this.calculateDaysRemaining(item);
        
        if (daysRemaining <= 3) {
            alerts.push({
                id: `inventory_low_${item.id}`,
                type: 'inventory',
                severity: 'high',
                title: 'Food Running Out Soon',
                message: `${item.name} will run out in ${daysRemaining} days`,
                condition: 'Order refill immediately',
                timestamp: new Date().toISOString()
            });
        } else if (daysRemaining <= 7) {
            alerts.push({
                id: `inventory_warning_${item.id}`,
                type: 'inventory',
                severity: 'medium',
                title: 'Food Supply Low',
                message: `${item.name} will run out in ${daysRemaining} days`,
                condition: 'Consider ordering refill',
                timestamp: new Date().toISOString()
            });
        }
        
        // Prescription food alert
        if (item.name.toLowerCase().includes('prescription') && daysRemaining <= 14) {
            alerts.push({
                id: `inventory_prescription_${item.id}`,
                type: 'inventory',
                severity: 'medium',
                title: 'Prescription Food Refill',
                message: 'Prescription food requires advance ordering',
                condition: 'Contact your veterinarian for refill',
                timestamp: new Date().toISOString()
            });
        }
    });
    
    return alerts;
},

// Condition-specific alerts
generateConditionAlerts: function() {
    const alerts = [];
    const conditions = appState.currentPet.conditions || [];
    
    conditions.forEach(condition => {
        const conditionLower = condition.toLowerCase();
        
        if (conditionLower.includes('kidney')) {
            alerts.push({
                id: 'condition_kidney_reminder',
                type: 'condition',
                severity: 'info',
                title: 'Kidney Health Reminder',
                message: 'Monitor water intake and appetite closely',
                condition: 'Regular vet checks recommended for kidney conditions',
                timestamp: new Date().toISOString()
            });
        }
        
        if (conditionLower.includes('diabetes')) {
            alerts.push({
                id: 'condition_diabetes_reminder',
                type: 'condition',
                severity: 'info',
                title: 'Diabetes Management',
                message: 'Consistent feeding schedule is important',
                condition: 'Monitor for changes in water consumption',
                timestamp: new Date().toISOString()
            });
        }
        
        if (conditionLower.includes('arthritis')) {
            alerts.push({
                id: 'condition_arthritis_reminder',
                type: 'condition',
                severity: 'info',
                title: 'Weight Management',
                message: 'Maintain healthy weight for joint support',
                condition: 'Excess weight can worsen arthritis symptoms',
                timestamp: new Date().toISOString()
            });
        }
    });
    
    return alerts;
},

// Utility methods for alerts
getRecentFoodHistory: function(days = 3) {
    const foodHistory = this.getFoodHistory();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return foodHistory.filter(entry => new Date(entry.date) >= cutoffDate);
},

calculateExpectedWaterIntake: function() {
    if (!appState.currentPet?.weight) return 1000;
    
    // Basic formula: 50ml per kg for dogs, 40ml per kg for cats
    const baseRequirement = appState.currentPet.species === 'cat' ? 40 : 50;
    let expected = Math.round(appState.currentPet.weight * baseRequirement);
    
    // Adjust for dry food (increases water needs)
    const nutritionPlan = utils.loadData(`nutritionPlan_${appState.currentPet.id}`);
    if (nutritionPlan?.selectedFood?.type === 'dry') {
        expected = Math.round(expected * 1.2);
    }
    
    return expected;
},

// Alert management
dismissAlert: function(alertId) {
    if (!this.alertSystem.dismissedAlerts.includes(alertId)) {
        this.alertSystem.dismissedAlerts.push(alertId);
        this.saveAlertSystem();
    }
},

clearDismissedAlerts: function() {
    this.alertSystem.dismissedAlerts = [];
    this.saveAlertSystem();
},

// Alert rendering
renderSmartAlerts: function() {
    const alertsElement = document.querySelector('.smart-alerts-section');
    if (alertsElement) {
        alertsElement.innerHTML = this.templates.smartAlerts();
    }
},

// Add these methods to nutritionManager - around line 1500
// Show/hide food log form
showFoodLogForm: function() {
    const foodHistoryCard = document.querySelector('.food-history');
    if (foodHistoryCard) {
        foodHistoryCard.innerHTML = this.templates.foodLogForm();
        this.setupFoodLogForm();
    }
},

hideFoodLogForm: function() {
    this.renderFoodHistory();
},

// Handle food log submission
// In handleFoodLogSubmit - make sure it gets the event parameter
handleFoodLogSubmit: function(event) {
    if (event) event.preventDefault(); // Add this line
    
    const formData = {
        date: document.getElementById('log-food-date').value,
        mealType: document.getElementById('log-food-type').value,
        amountOffered: parseFloat(document.getElementById('log-food-offered').value) || 0,
        amountConsumed: parseFloat(document.getElementById('log-food-consumed').value) || 0,
        foodName: document.getElementById('log-food-name').value.trim(),
        notes: document.getElementById('log-food-notes').value.trim(),
        timestamp: new Date().toISOString()
    };

    if (!this.validateFoodLog(formData)) {
        return;
    }

    this.logFood(formData);
},

// Validate food log data
validateFoodLog: function(formData) {
    if (!formData.date) {
        alert('Please select a date');
        return false;
    }
    if (!formData.foodName) {
        alert('Please enter food name');
        return false;
    }
    if (formData.amountOffered <= 0) {
        alert('Please enter amount offered');
        return false;
    }
    return true;
},

// Enhanced logFood method to handle detailed logging
// Update the logFood method - around line 1550
logFood: function(foodData) {
    if (!appState.currentPet) return;

    const foodEntry = {
        id: 'food_' + Date.now(),
        petId: appState.currentPet.id,
        ...foodData,
        calories: this.calculateFoodCalories(foodData),
        date: foodData.date,
        timestamp: new Date().toISOString()
    };

    let foodHistory = this.getFoodHistory();
    foodHistory.unshift(foodEntry);
    this.saveFoodHistory(foodHistory);

    // ADD THIS: Update inventory tracking
    this.updateInventoryOnFoodLog(foodEntry);
    this.updateFoodInventoryCalculations();

    alert('Food intake logged successfully!');
    this.renderFoodHistory();
    this.renderFoodInventory(); // Refresh inventory display
},

// Calculate calories based on food type and amount
calculateFoodCalories: function(foodData) {
    // Simple calculation - you can enhance this with your food database
    const selectedFood = this.getSelectedFood();
    if (selectedFood && selectedFood.kcalPerCup) {
        return Math.round(foodData.amountConsumed * selectedFood.kcalPerCup);
    }
    return 0;
},

// Enhanced getFoodHistory to include new fields
getFoodHistory: function() {
    if (!appState.currentPet) return [];
    const history = utils.loadData(`foodHistory_${appState.currentPet.id}`) || [];
    
    // Convert old format to new format if needed
    return history.map(entry => {
        if (!entry.mealType) {
            return {
                ...entry,
                mealType: 'general',
                amountOffered: entry.amount || 0,
                amountConsumed: entry.amount || 0
            };
        }
        return entry;
    });
},

// Render just the food history section
renderFoodHistory: function() {
    const foodHistoryElement = document.querySelector('.food-history');
    if (foodHistoryElement) {
        foodHistoryElement.innerHTML = this.templates.foodHistory();
    }
},
    // Placeholder for full history view
showFullFoodHistory: function() {
    const foodHistory = this.getFoodHistory();
    
    let historyHTML = `
        <div class="full-history-container">
            <div class="history-header">
                <h3>Complete Food History</h3>
                <button class="btn btn-secondary" onclick="nutritionManager.renderNutritionView()">← Back</button>
            </div>
            <div class="history-stats">
                <p>Total entries: ${foodHistory.length}</p>
            </div>
            <div class="full-history-list">
    `;
    
    if (foodHistory.length === 0) {
        historyHTML += `<p class="no-data">No food history recorded</p>`;
    } else {
        foodHistory.forEach(entry => {
            historyHTML += `
                <div class="history-entry">
                    <div class="entry-header">
                        <strong>${formatDate(entry.date)} - ${entry.mealType}</strong>
                        <span class="food-name">${entry.foodName}</span>
                    </div>
                    <div class="entry-details">
                        <span>Offered: ${entry.amountOffered}c</span>
                        <span>Consumed: ${entry.amountConsumed}c</span>
                        ${entry.calories ? `<span>Calories: ${entry.calories}</span>` : ''}
                    </div>
                    ${entry.notes ? `<div class="entry-notes">${entry.notes}</div>` : ''}
                </div>
            `;
        });
    }
    
    historyHTML += `</div></div>`;
    
    this.elements.nutritionContent.innerHTML = historyHTML;
},

     
    // ✍️Calculation Functions
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
       //   feedingSchedule: this.calculateFeedingSchedule(der)
           feedingSchedule: null // CHANGE THIS - don't calculate feeding schedule here
        };
    },

    calculateFeedingSchedule: function(dailyCalories) {
        const selectedFood = this.getSelectedFood();
            console.log('calculateFeedingSchedule - selectedFood:', selectedFood); // ADD THIS
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
                <select id="food-selection">
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
            console.log('getSelectedFood - foodSelection:', foodSelection?.value); // ADD THIS
        if (foodSelection && foodSelection.value) {
            const selectedOption = foodSelection.options[foodSelection.selectedIndex];
            console.log('Selected food:', selectedOption.text); // ADD THIS
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



        // Water goal based on weight (ml per day)
    get waterGoal() {
        if (!appState.currentPet?.weight) return 1000;
        return Math.round(appState.currentPet.weight * 50); // 50ml per kg
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
        this.renderSmartAlerts(); // Refresh alerts
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
        this.renderSmartAlerts(); // Refresh alerts
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

      //  this.renderNutritionView();
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

    const selectedFood = this.getSelectedFood(); // Get current food selection
    
    const nutritionPlan = {
        calculatedOn: new Date().toISOString(),
        needs: this.calculateNutritionNeeds(appState.currentPet),
        selectedFood: selectedFood, // Include the selected food
        activityLevel: document.getElementById('activity-level').value,
        weightGoal: document.getElementById('weight-goal').value
    };

    utils.saveData(`nutritionPlan_${appState.currentPet.id}`, nutritionPlan);
    
    // Update the display with current food data
    this.renderNutritionView(); 
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

    // Add this method inside nutrition manager object.
       handleFoodDropdown: function(event) {
    if (event.target.matches('#food-type')) {
        this.updateFoodSelection();
    }
     // ADD THIS:
    if (event.target.matches('#food-selection')) {
        this.updateCalculation();
    }
    },
    
    // Initialize Nutrition Section
// Update the init method - around line 1450
// Update initialization
init: function() {
    this.initializeFoodInventory();
    this.initializeAlertSystem(); // ADD THIS
    this.renderNutritionView();
    document.addEventListener('change', this.handleFoodDropdown.bind(this));
}
    
};

// Add to global window object
window.nutritionManager = nutritionManager;

// Initialize function for nutrition section
window.initNutrition = function() {
    nutritionManager.init();
};




//===========================================
// Medication Manager Section Functionality
//============================================
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
        <div class="medication-header-top">
            <h2>Medication Manager</h2>
            <button class="btn btn-secondary" data-section="dashboard">← Back to Dashboard</button>
        </div>
        ${appState.currentPet ? `
            <div class="current-pet-banner">
                Manage medications for: <strong>${appState.currentPet.name}</strong>
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
                    <button class="btn btn-primary" data-section="profiles"> Manage Pet Profiles</button>
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
                    <!-- Row 1: Full width cards -->
                    <div class="medication-card today-schedule">
                        <div class="card-header">
                            <h3>Today's Medication Schedule</h3>
                            <span class="date">${new Date().toLocaleDateString()}</span>
                        </div>
                        <div class="schedule-content">
                            ${medicationManager.templates.todaySchedule(todayMeds)}
                        </div>
                    </div>
                        <!-- Row 2: Two equal cards -->
                    <div class="medication-card medication-list">
                        <div class="card-header">
                            <h3>Current Medications</h3>
                            <button class="btn btn-primary btn-sm" data-action="showAddMedication">+ Add Medication</button>
                        </div>
                        <div class="medications-content">
                            ${medicationManager.templates.medicationList()}
                        </div>
                    </div>
                    
                    <div class="medication-card medication-log">
                      <div class="card-header">
                          <h3>Medication Log</h3>
                           </div>
                              <div class="log-content">
                             ${medicationManager.templates.medicationLogHistory()}
                             </div>
                      </div>
                    
                    <!-- Row 3: Three smaller cards -->
                    <div class="medication-card refill-alerts">
                        <div class="card-header">
                            <h3>Refill Reminders</h3>
                        </div>
                        <div class="refills-content">
                            ${medicationManager.templates.refillAlerts(upcomingRefills)}
                        </div>
                    </div> 
                    
                    <div class="medication-card refill-history">
                          <div class="card-header">
                            <h3>Refill History</h3>
                         </div>
                         <div class="refill-history-content">
                            ${medicationManager.templates.refillHistory()}
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
                 const times = medicationManager.frequencyOptions[med.frequency]?.times || [];
                times.forEach(time => {
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
                                            <button class="btn btn-success btn-xs" data-action="logDose" data-med-id="${med.id}" data-time="${time}">✅ Given</button>
                                            <button class="btn btn-warning btn-xs" data-action="skipDose" data-med-id="${med.id}" data-time="${time}">⏭️ Skip</button>

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
                       <button class="btn btn-primary" data-action="showAddMedication">Add First Medication</button>
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
                               <button class="btn-icon" data-action="editMedication" data-med-id="${med.id}" title="Edit">✏️</button>             
                               <button class="btn-icon delete" data-action="deleteMedication" data-med-id="${med.id}" title="Delete">🗑️</button>
                                
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
                            <button class="btn btn-primary btn-xs" data-action="logRefill" data-med-id="${med.id}">Mark Refilled</button>
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
                        <button class="btn btn-secondary" data-action="showMainView" data-manager="medication">← Back to Medications</button>
                    </div>

                    <form id="medication-form">
                        <input type="hidden" id="medication-id" value="${medication?.id || ''}">

                        <div class="form-grid">
                            <div class="form-group">
                                <label for="med-name">Medication Name *</label>
                                <input type="text" id="med-name" value="${medication?.name || ''}" required oninput="medicationManager.updateDosageSafetyCheck()">
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
                                <input type="text" id="med-dosage" value="${medication?.dosage || ''}" placeholder="e.g., 10 mg" required oninput="medicationManager.updateDosageSafetyCheck()">
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
                           <button type="submit" class="btn btn-primary">${isEdit ? 'Update' : 'Add'} Medication</button>
                           <button type="button" class="btn btn-secondary" data-action="showMainView" data-manager="medication">Cancel</button>
                        </div>
                    </form>
                </div>
            `;
        },
        // Medication Log History Template
medicationLogHistory: () => {
    const logEntries = medicationManager.getMedicationLog().slice(0, 10); // Last 10 entries
    if (logEntries.length === 0) {
        return '<p class="no-data">No medication log entries</p>';
    }
    
    return `
        <div class="log-entries">
            ${logEntries.map(entry => `
                <div class="log-entry ${entry.status}">
                    <div class="log-header">
                        <strong>${medicationManager.getMedicationName(entry.medicationId)}</strong>
                        <span class="log-status ${entry.status}">${entry.status}</span>
                    </div>
                    <div class="log-details">
                        <span class="log-time">${new Date(entry.timestamp).toLocaleString()}</span>
                        ${entry.reason ? `<span class="log-reason">Reason: ${entry.reason}</span>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
        <button class="btn btn-secondary btn-sm" onclick="medicationManager.showFullMedicationLog()">View Full Log</button>
    `;
},

// Refill History Template  
refillHistory: () => {
    const refillEntries = medicationManager.getRefillHistory().slice(0, 10);
    if (refillEntries.length === 0) {
        return '<p class="no-data">No refill history</p>';
    }
    
    return `
        <div class="refill-entries">
            ${refillEntries.map(entry => `
                <div class="refill-entry">
                    <div class="refill-header">
                        <strong>${entry.medicationName}</strong>
                        <span class="refill-date">${formatDate(entry.date)}</span>
                    </div>
                    <div class="refill-notes">${entry.notes || ''}</div>
                </div>
            `).join('')}
        </div>
        <button class="btn btn-secondary btn-sm" onclick="medicationManager.showFullRefillHistory()">View Full History</button>
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
    
    getMedicationName: function(medicationId) {
    const medications = this.getMedications();
    const medication = medications.find(med => med.id === medicationId);
    return medication ? medication.name : 'Unknown Medication';
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
    console.log('calculateDosage called');

        const medicationSelect = document.getElementById('calc-medication');
        const weightInput = document.getElementById('calc-weight');
        const resultDiv = document.getElementById('dosage-result');
    console.log('medicationSelect value:', medicationSelect?.value);
    console.log('weightInput value:', weightInput?.value);
    console.log('resultDiv found:', !!resultDiv);
        
        if (!medicationSelect.value || !weightInput.value) {
            resultDiv.style.display = 'none';
            return;
        }

        const selectedOption = medicationSelect.options[medicationSelect.selectedIndex];
        
       console.log('selectedOption:', selectedOption);
       console.log('dosage data:', selectedOption?.dataset.dosage);
       console.log('maxDosage data:', selectedOption?.dataset.maxDosage);
        
        const weight = parseFloat(weightInput.value);
        const dosageRange = selectedOption.dataset.dosage;
        const maxDosage = selectedOption.dataset.maxDosage;

        // Extract numeric values from dosage range (e.g., "2-3 mg/kg" -> [2, 3])
       const dosageMatch = dosageRange.match(/(\d+\.?\d*)\s*mg\/kg/);
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
    
// Create updateDosageSafetyCheck Function and its helper functions
    updateDosageSafetyCheck: function() {
    const medicationName = document.getElementById('med-name')?.value;
    const enteredDosage = document.getElementById('med-dosage')?.value;
    const petWeight = appState.currentPet?.weight;
    const resultDiv = document.getElementById('dosage-safety-result');
    
    if (!resultDiv || !medicationName || !petWeight) return;
    
    // Find medication in database
    const med = this.findMedicationInDatabase(medicationName);
    if (!med) {
        resultDiv.innerHTML = '<p class="warning">Medication not in database</p>';
        return;
    }
    
    // Calculate safe range
    const safeRange = this.calculateSafeDosageRange(med, petWeight);
    const isSafe = this.checkDosageSafety(enteredDosage, safeRange);
    
    // Update display
    resultDiv.innerHTML = this.getSafetyCheckHTML(safeRange, isSafe, enteredDosage);
},
    // add these helper functions for it
    findMedicationInDatabase: function(medName) {
    // Search all medication categories for matching name
    for (const category in this.medicationDatabase) {
        const found = this.medicationDatabase[category].find(med => 
            med.name.toLowerCase().includes(medName.toLowerCase())
        );
        if (found) return found;
    }
    return null;
},

calculateSafeDosageRange: function(med, weight) {
    const dosageMatch = med.standardDosage.match(/(\d+\.?\d*)\s*mg\/kg/);
    if (!dosageMatch) return null;
    
    const baseDose = parseFloat(dosageMatch[1]);
    return {
        min: (baseDose * weight * 0.8).toFixed(1), // 20% lower bound
        max: (baseDose * weight * 1.2).toFixed(1), // 20% upper bound
        unit: 'mg'
    };
},

checkDosageSafety: function(enteredDosage, safeRange) {
    if (!enteredDosage || !safeRange) return true;
    const entered = parseFloat(enteredDosage);
    return entered >= safeRange.min && entered <= safeRange.max;
},

getSafetyCheckHTML: function(safeRange, isSafe, enteredDosage) {
    if (!safeRange) return '<p>Cannot calculate safety range</p>';
    
    return `
        <div class="safety-check ${isSafe ? 'safe' : 'unsafe'}">
            <p><strong>Safe range:</strong> ${safeRange.min}-${safeRange.max} ${safeRange.unit}</p>
            ${enteredDosage ? `
                <p><strong>Entered dosage:</strong> ${enteredDosage}</p>
                <p class="safety-status">${isSafe ? '✅ Within safe range' : '⚠️ Outside safe range'}</p>
            ` : '<p>Enter dosage to check safety</p>'}
        </div>
    `;
},


    
    //==========================================
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
        // Save to refill history
        const refillEntry = {
            medicationId: medicationId,
            medicationName: medication.name,
            date: new Date().toISOString().split('T')[0],
            timestamp: new Date().toISOString(),
            notes: 'Refill marked as completed'
        };
        
        let refillHistory = this.getRefillHistory();
        refillHistory.unshift(refillEntry);
        utils.saveData(`refillHistory_${appState.currentPet.id}`, refillHistory);
        
        // Clear refill date from medication
        medication.refillDate = null;
        this.saveMedications(medications);
        
        alert('Refill logged successfully');
        this.showMainView();
    }
},
    
    // Add Data Retrieval Functions
   getMedicationLog: function() {
    if (!appState.currentPet) return [];
    return utils.loadData(`medicationLog_${appState.currentPet.id}`) || [];
    },

    getRefillHistory: function() {
    if (!appState.currentPet) return [];
    return utils.loadData(`refillHistory_${appState.currentPet.id}`) || [];
    },
     

    
    // View Management
       showMainView: function() {
    console.log('medicationManager.showMainView called');
    try {
        const templateHTML = this.templates.mainView();
        console.log('Template HTML length:', templateHTML.length);
        console.log('Template HTML:', templateHTML);
        
        if (this.elements.medicationContent) {
            this.elements.medicationContent.innerHTML = templateHTML;
            console.log('UI updated with template');
        }
    } catch (error) {
        console.error('Error in showMainView:', error);
        console.error('Error stack:', error.stack);
    }
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
        console.log('medicationManager.handleSubmit called');
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





//===================================================================
// Exercise & Mobility Section Functionality
//======================================================
const exerciseManager = {
    // DOM Elements
    elements: {
        exerciseSection: document.getElementById('exercise-section'),
        exerciseContent: document.getElementById('exercise-content')
    },

    // Exercise Database by Condition and Mobility Level
    exerciseDatabase: {
        arthritis: {
            limited: [
                {
                    id: 'gentle_stretching',
                    name: 'Gentle Range of Motion',
                    description: 'Slow, controlled leg stretches while pet is lying down',
                    duration: '5-10 minutes',
                    frequency: '2-3 times daily',
                    benefits: 'Maintains joint flexibility, reduces stiffness',
                    precautions: 'Stop if pet shows signs of pain'
                },
                {
                    id: 'short_walks',
                    name: 'Short Leisurely Walks',
                    description: 'Brief walks on flat, soft surfaces',
                    duration: '5-15 minutes',
                    frequency: '1-2 times daily',
                    benefits: 'Maintains muscle mass, mental stimulation',
                    precautions: 'Avoid slippery surfaces, watch for limping'
                }
            ],
            moderate: [
                {
                    id: 'hydrotherapy',
                    name: 'Water Therapy (if available)',
                    description: 'Walking in shallow water or swimming',
                    duration: '10-20 minutes',
                    frequency: '2-3 times weekly',
                    benefits: 'Low-impact exercise, builds strength',
                    precautions: 'Supervision required, proper exit strategy'
                },
                {
                    id: 'figure_eights',
                    name: 'Gentle Figure Eights',
                    description: 'Walking in slow figure-eight patterns',
                    duration: '5-10 minutes',
                    frequency: 'Daily',
                    benefits: 'Improves coordination, gentle on joints',
                    precautions: 'Keep sessions short, provide rest breaks'
                }
            ],
            good: [
                {
                    id: 'moderate_walks',
                    name: 'Moderate Pace Walks',
                    description: 'Brisk walking on varied terrain',
                    duration: '15-30 minutes',
                    frequency: '1-2 times daily',
                    benefits: 'Cardiovascular health, weight management',
                    precautions: 'Monitor for fatigue, avoid hard surfaces'
                }
            ]
        },
        heart_disease: {
            limited: [
                {
                    id: 'potty_breaks',
                    name: 'Potty Breaks Only',
                    description: 'Brief outdoor trips for elimination only',
                    duration: '2-5 minutes',
                    frequency: 'As needed',
                    benefits: 'Minimal cardiac stress',
                    precautions: 'Watch for coughing or breathing difficulty'
                }
            ],
            moderate: [
                {
                    id: 'supervised_strolls',
                    name: 'Supervised Strolls',
                    description: 'Slow, controlled walking on flat ground',
                    duration: '5-10 minutes',
                    frequency: '2-3 times daily',
                    benefits: 'Maintains mobility without overexertion',
                    precautions: 'Stop if breathing becomes labored'
                }
            ],
            good: [
                {
                    id: 'light_activity',
                    name: 'Light Activity Sessions',
                    description: 'Gentle play or short walks',
                    duration: '10-15 minutes',
                    frequency: '1-2 times daily',
                    benefits: 'Maintains quality of life',
                    precautions: 'Avoid excitement, monitor respiratory rate'
                }
            ]
        },
        general_geriatric: {
            limited: [
                {
                    id: 'indoor_movement',
                    name: 'Indoor Movement',
                    description: 'Encouraging movement around the house',
                    duration: 'Throughout day',
                    frequency: 'Multiple short sessions',
                    benefits: 'Prevents stiffness, maintains circulation',
                    precautions: 'Provide non-slip surfaces'
                }
            ],
            moderate: [
                {
                    id: 'regular_walks',
                    name: 'Regular Short Walks',
                    description: 'Consistent daily walking routine',
                    duration: '10-20 minutes',
                    frequency: '1-2 times daily',
                    benefits: 'Maintains muscle tone, mental health',
                    precautions: 'Adjust based on weather conditions'
                }
            ],
            good: [
                {
                    id: 'active_play',
                    name: 'Low-Impact Play',
                    description: 'Gentle fetch or toy interaction',
                    duration: '15-20 minutes',
                    frequency: 'Daily',
                    benefits: 'Mental stimulation, bond strengthening',
                    precautions: 'Avoid jumping or sudden movements'
                }
            ]
        }
    },

    // Mobility Score Descriptions
    mobilityLevels: {
        1: { label: 'Severely Limited', description: 'Difficulty standing, unable to climb stairs' },
        2: { label: 'Significant Difficulty', description: 'Stiff gait, reluctant to move, struggles with stairs' },
        3: { label: 'Moderate Limitations', description: 'Noticeable stiffness, slow to rise, cautious on stairs' },
        4: { label: 'Mild Stiffness', description: 'Slight stiffness after rest, manages stairs slowly' },
        5: { label: 'Very Mobile', description: 'Moves comfortably, handles stairs well' }
    },

    // Templates
    templates: {
        // Main Exercise View
        mainView: () => `
    <div class="exercise-header">
        <div class="exercise-header-top">
            <h2>Exercise & Mobility Tracking</h2>
            <button class="btn btn-secondary" data-section="dashboard">← Back to Dashboard</button>
        </div>
        ${appState.currentPet ? `
            <div class="current-pet-banner">
                Exercise tracking for: <strong>${appState.currentPet.name}</strong>
                ${appState.currentPet.mobilityScore ? `(Mobility: ${appState.currentPet.mobilityScore}/5)` : ''}
            </div>
        ` : '<p class="warning">Please select a pet first</p>'}
    </div>

            ${appState.currentPet ? exerciseManager.templates.exerciseDashboard() : exerciseManager.templates.noPetView()}
        `,

        // View when no pet is selected
        noPetView: () => `
            <div class="no-pet-selected">
                <div class="empty-state">
                    <h3>No Active Pet Selected</h3>
                    <p>Please select or add a pet to track exercise and mobility.</p>
                    <button class="btn btn-primary" data-section="profiles">
    Manage Pet Profiles
</button>
                </div>
            </div>
        `,

        // Exercise Dashboard
        exerciseDashboard: () => {
            const pet = appState.currentPet;
            const recentActivities = exerciseManager.getRecentActivities(7);
            const mobilityTrend = exerciseManager.calculateMobilityTrend();
            
            return `
                <div class="exercise-grid">
                    <div class="exercise-card mobility-tracker">
                        <div class="card-header">
                            <h3>Mobility Assessment</h3>
                            <button class="btn btn-primary btn-sm" data-action="showMobilityForm">Update Score</button>

                        </div>
                        <div class="mobility-content">
                            ${exerciseManager.templates.mobilityDisplay(pet)}
                        </div>
                    </div>

                    <div class="exercise-card activity-log">
                        <div class="card-header">
                            <h3>Today's Activity</h3>
                            <button class="btn btn-primary btn-sm" data-action="showActivityForm">+ Log Activity</button>

                        </div>
                        <div class="activity-content">
                            ${exerciseManager.templates.todayActivity()}
                        </div>
                    </div>

                    <div class="exercise-card exercise-suggestions">
                        <div class="card-header">
                            <h3>Recommended Exercises</h3>
                        </div>
                        <div class="suggestions-content">
                            ${exerciseManager.templates.exerciseSuggestions(pet)}
                        </div>
                    </div>

                    <div class="exercise-card activity-history">
                        <div class="card-header">
                            <h3>Activity History</h3>
                            <button class="btn btn-secondary btn-sm" data-action="showActivityHistory">View All</button>

                        </div>
                        <div class="history-content">
                            ${exerciseManager.templates.activityHistory(recentActivities)}
                        </div>
                    </div>

                    <div class="exercise-card mobility-trend">
                        <div class="card-header">
                            <h3>Mobility Trend</h3>
                        </div>
                        <div class="trend-content">
                            ${exerciseManager.templates.mobilityTrend(mobilityTrend)}
                        </div>
                    </div>

                    <div class="exercise-card exercise-tips">
                        <div class="card-header">
                            <h3>Geriatric Exercise Tips</h3>
                        </div>
                        <div class="tips-content">
                            ${exerciseManager.templates.exerciseTips()}
                        </div>
                    </div>
                </div>
            `;
        },

        // Mobility Display Template
        mobilityDisplay: (pet) => {
            const mobilityScore = pet.mobilityScore || 'Not set';
            const mobilityLevel = exerciseManager.mobilityLevels[mobilityScore];
            
            return `
                <div class="mobility-score-display">
                    <div class="score-circle ${mobilityScore ? `score-${mobilityScore}` : 'no-score'}">
                        <span class="score-number">${mobilityScore}</span>
                        <span class="score-label">/5</span>
                    </div>
                    <div class="mobility-info">
                        <h4>${mobilityLevel ? mobilityLevel.label : 'Not Assessed'}</h4>
                        <p>${mobilityLevel ? mobilityLevel.description : 'Please complete a mobility assessment'}</p>
                        ${pet.lastMobilityAssessment ? `
                            <small>Last assessed: ${formatDate(pet.lastMobilityAssessment)}</small>
                        ` : ''}
                    </div>
                </div>
                
                <div class="mobility-questions">
                    <h4>Quick Assessment Guide</h4>
                    <ul class="assessment-questions">
                        <li>🐕 Can your pet rise from lying down easily?</li>
                        <li>🏠 Do they navigate stairs confidently?</li>
                        <li>🚶 Is their gait smooth and even?</li>
                        <li>⚡ Do they show enthusiasm for walks?</li>
                    </ul>
                </div>
            `;
        },

        // Today's Activity Template
        // Today's Activity Template updated
todayActivity: () => {
    const todayActivities = exerciseManager.getTodayActivities();
    
    if (todayActivities.length === 0) {
        return `
            <div class="no-activities">
                <p>No activities scheduled for today</p>
                <button class="btn btn-primary btn-sm" data-action="showActivityForm">
                    Schedule Activity
                </button>
            </div>
        `;
    }

    const completedActivities = todayActivities.filter(a => a.completed);
    const pendingActivities = todayActivities.filter(a => !a.completed);
    
    return `
        <div class="today-activities">
            <div class="activity-summary">
                <div class="summary-item">
                    <span class="label">Scheduled:</span>
                    <span class="value">${todayActivities.length}</span>
                </div>
                <div class="summary-item">
                    <span class="label">Completed:</span>
                    <span class="value">${completedActivities.length}</span>
                </div>
            </div>
            
            ${pendingActivities.length > 0 ? `
                <div class="pending-activities">
                    <h4>To Do Today</h4>
                    ${pendingActivities.map(activity => `
                        <div class="activity-item pending">
                            <div class="activity-main">
                                <strong>${activity.type}</strong>
                                <span class="activity-duration">${activity.duration} min</span>
                            </div>
                            <div class="activity-details">
                                ${activity.scheduledTime ? `<span class="activity-time">Scheduled: ${activity.scheduledTime}</span>` : ''}
                                <button class="btn btn-success btn-xs" data-action="completeActivity" data-activity-id="${activity.id}">
                                    Mark Complete
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${completedActivities.length > 0 ? `
                <div class="completed-activities">
                    <h4>Completed Today</h4>
                    ${completedActivities.map(activity => `
                        <div class="activity-item completed">
                            <div class="activity-main">
                                <strong>${activity.type}</strong>
                                <span class="activity-duration">${activity.duration} min</span>
                            </div>
                            <div class="activity-details">
                                <span class="activity-time">Completed: ${new Date(activity.completedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                ${activity.notes ? `<span class="activity-notes">"${activity.notes}"</span>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
},

        // Exercise Suggestions Template
        exerciseSuggestions: (pet) => {
            const suggestions = exerciseManager.generateExerciseSuggestions(pet);
            
            if (suggestions.length === 0) {
                return '<p class="no-suggestions">Complete mobility assessment for personalized suggestions</p>';
            }

            return `
                <div class="suggestions-list">
                    ${suggestions.map(exercise => `
                        <div class="suggestion-item">
                            <div class="suggestion-header">
                                <h4>${exercise.name}</h4>
                                <span class="exercise-duration">${exercise.duration}</span>
                            </div>
                            <p class="exercise-description">${exercise.description}</p>
                            <div class="exercise-benefits">
                                <strong>Benefits:</strong> ${exercise.benefits}
                            </div>
                            <div class="exercise-precautions">
                                <strong>Precautions:</strong> ${exercise.precautions}
                            </div>
                            <button class="btn btn-secondary btn-xs" data-action="logSuggestedExercise" data-exercise-id="${exercise.id}">Log This Exercise</button>
                        </div>
                    `).join('')}
                </div>
            `;
        },

        // Activity History Template
        activityHistory: (activities) => {
            if (activities.length === 0) {
                return '<p class="no-history">No activities recorded yet</p>';
            }

            // Group activities by date
            const activitiesByDate = {};
            activities.forEach(activity => {
                const date = activity.date;
                if (!activitiesByDate[date]) {
                    activitiesByDate[date] = [];
                }
                activitiesByDate[date].push(activity);
            });

            return `
                <div class="activity-history-list">
                    ${Object.entries(activitiesByDate).slice(0, 5).map(([date, dateActivities]) => {
                        const totalDuration = dateActivities.reduce((sum, activity) => sum + activity.duration, 0);
                        return `
                            <div class="history-day">
                                <div class="history-date">${formatDate(date)}</div>
                                <div class="history-summary">
                                    <span>${dateActivities.length} activities</span>
                                    <span>${totalDuration} min total</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        },

        // Full Activity History log Template
fullActivityHistory: () => {
    const allActivities = exerciseManager.getActivities();
    console.log('📊 EXERCISE_MANAGER: Full history - loading', allActivities.length, 'activities');
    
    return `
        <div class="full-history-container">
            <div class="history-header">
                <h2>Complete Activity History</h2>
                <button class="btn btn-secondary" data-action="showMainView" data-manager="exercise">
                    ← Back to Exercise
                </button>
            </div>
            
            <div class="history-controls">
                <div class="history-stats">
                    <span>Total Activities: ${allActivities.length}</span>
                </div>
            </div>
                  <!-- ADD PRINT BUTTON HERE -->
                <button class="btn btn-primary btn-sm" data-action="printActivityHistory">
                    🖨️ Print History
                </button>
            
            <div class="full-history-list">
                ${allActivities.length === 0 ? `
                    <div class="no-activities">
                        <p>No activities recorded yet</p>
                        <button class="btn btn-primary" data-action="showActivityForm">
                            Log Your First Activity
                        </button>
                    </div>
                ` : `
                    ${allActivities.map(activity => `
                        <div class="history-item ${activity.completed ? 'completed' : 'pending'}">
                            <div class="activity-type-badge">
                                ${activity.type.replace('_', ' ').toUpperCase()}
                            </div>
                            <div class="activity-details">
                                <div class="activity-header">
                                    <strong>${activity.type.replace('_', ' ').toUpperCase()}</strong>
                                    <span class="activity-date">${formatDate(activity.date)}</span>
                                </div>
                                <div class="activity-meta">
                                    <span class="duration">${activity.duration} minutes</span>
                                    <span class="intensity">${activity.intensity || 'Not specified'}</span>
                                    ${activity.scheduledTime ? `<span class="scheduled-time">${activity.scheduledTime}</span>` : ''}
                                </div>
                                ${activity.notes ? `
                                    <div class="activity-notes">
                                        <p>${activity.notes}</p>
                                    </div>
                                ` : ''}
                                <div class="activity-status">
                                    ${activity.completed ? 
                                        `✅ Completed at ${new Date(activity.completedAt).toLocaleTimeString()}` : 
                                        '⏳ Pending'
                                    }
                                </div>
                            </div>
                        </div>
                    `).join('')}
                `}
            </div>
        </div>
    `;
},

        // Mobility Trend Template
        mobilityTrend: (trend) => {
            if (!trend || trend.assessments.length === 0) {
                return '<p class="no-trend">No trend data available</p>';
            }

            const latestScore = trend.assessments[0].score;
            const previousScore = trend.assessments.length > 1 ? trend.assessments[1].score : latestScore;
            const trendDirection = latestScore > previousScore ? 'improving' : latestScore < previousScore ? 'declining' : 'stable';

            return `
                <div class="trend-display">
                    <div class="trend-indicator ${trendDirection}">
                        <span class="trend-arrow">${trendDirection === 'improving' ? '↗' : trendDirection === 'declining' ? '↘' : '→'}</span>
                        <span class="trend-text">${trendDirection}</span>
                    </div>
                    <div class="trend-details">
                        <div class="trend-score">
                            <span>Current: ${latestScore}/5</span>
                            ${trend.assessments.length > 1 ? `<span>Previous: ${previousScore}/5</span>` : ''}
                        </div>
                        <div class="trend-period">
                            Over ${trend.assessments.length} assessment${trend.assessments.length > 1 ? 's' : ''}
                        </div>
                    </div>
                </div>
            `;
        },

        // Exercise Tips Template
        exerciseTips: () => {
            return `
                <div class="tips-list">
                    <div class="tip-item">
                        <strong>Consistency Over Intensity</strong>
                        <p>Short, frequent sessions are better than long, infrequent ones</p>
                    </div>
                    <div class="tip-item">
                        <strong>Watch for Signs</strong>
                        <p>Stop if you notice limping, excessive panting, or reluctance</p>
                    </div>
                    <div class="tip-item">
                        <strong>Warm Up/Cool Down</strong>
                        <p>Start and end with gentle walking to prevent injury</p>
                    </div>
                    <div class="tip-item">
                        <strong>Surface Matters</strong>
                        <p>Grass and soft surfaces are easier on joints than concrete</p>
                    </div>
                </div>
            `;
        },

        // Mobility Assessment Form
        mobilityForm: (currentScore = null) => {
            return `
                <div class="mobility-form-container">
                    <div class="form-header">
                        <h2>Mobility Assessment</h2>
                        <button class="btn btn-secondary" data-action="showMainView" data-manager="exercise">
    ← Back to Exercise
</button>
                    </div>

                    <form id="mobility-form" onsubmit="exerciseManager.handleMobilitySubmit(event)">
                        <div class="assessment-guide">
                            <h3>How to Assess Your Pet's Mobility</h3>
                            <div class="score-guide">
                                ${Object.entries(exerciseManager.mobilityLevels).map(([score, level]) => `
                                    <div class="score-option">
                                        <label class="score-label">
                                            <input type="radio" name="mobility-score" value="${score}" 
                                                   ${currentScore == score ? 'checked' : ''}>
                                            <span class="score-number">${score} - ${level.label}</span>
                                            <span class="score-description">${level.description}</span>
                                        </label>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="mobility-notes">Assessment Notes</label>
                            <textarea id="mobility-notes" rows="3" placeholder="Any observations about your pet's movement..."></textarea>
                        </div>

                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">
    Save Assessment
</button>
<button type="button" class="btn btn-secondary" data-action="showMainView" data-manager="exercise">
    Cancel
</button>
                        </div>
                    </form>
                </div>
            `;
        },

        // Activity Log Form
        activityForm: () => {
            return `
                <div class="activity-form-container">
                    <div class="form-header">
                        <h2>Log Activity</h2>
                        <button type="button" class="btn btn-secondary" data-action="showMainView" data-manager="exercise">
    ← Back to Exercise
</button>

                    </div>

                    <form id="activity-form" onsubmit="exerciseManager.handleActivitySubmit(event)">
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="activity-type">Activity Type *</label>
                                <select id="activity-type" required>
                                    <option value="">Select Activity</option>
                                    <option value="walk">Walk</option>
                                    <option value="play">Play Session</option>
                                    <option value="stretching">Stretching</option>
                                    <option value="hydrotherapy">Water Therapy</option>
                                    <option value="physical_therapy">Physical Therapy</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

<div class="form-group">
    <label for="activity-date">Date *</label>
    <input type="date" id="activity-date" value="${utils.getTodayDate()}" required>
</div>

<div class="form-group">
    <label for="activity-scheduled-time">Scheduled Time (Optional)</label>
    <input type="time" id="activity-scheduled-time">
</div>

                            <div class="form-group">
                                <label for="activity-duration">Duration (minutes) *</label>
                                <input type="number" id="activity-duration" min="1" max="120" required>
                            </div>

                            <div class="form-group">
                                <label for="activity-intensity">Intensity Level</label>
                                <select id="activity-intensity">
                                    <option value="gentle">Gentle</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="brisk">Brisk</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="activity-mobility-after">Mobility After Activity (1-5)</label>
                                <select id="activity-mobility-after">
                                    <option value="">Select Score</option>
                                    ${[1,2,3,4,5].map(score => `
                                        <option value="${score}">${score} - ${exerciseManager.mobilityLevels[score].label}</option>
                                    `).join('')}
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="activity-notes">Notes</label>
                            <textarea id="activity-notes" rows="3" placeholder="How did your pet handle the activity? Any observations..."></textarea>
                        </div>

                        <div class="form-actions">
    <button type="submit" class="btn btn-primary">
        Log Activity
    </button>
    <button type="button" class="btn btn-secondary" data-action="showMainView" data-manager="exercise">
    Cancel
</button>

                        </div>
                    </form>
                </div>
            `;
        }
    },

    // Data Management Functions
    getActivities: function() {
        if (!appState.currentPet) return [];
        return utils.loadData(`activities_${appState.currentPet.id}`) || [];
    },

    // Add this RIGHT AFTER getActivities function
        // GETS CALLED AND SAVES DATA AND PERSIST IT ADDED RECENTLY
saveActivities: function(activities) {
    console.log('💾 EXERCISE_MANAGER: Saving activities to storage', activities.length, 'activities');
    if (appState.currentPet) {
        utils.saveData(`activities_${appState.currentPet.id}`, activities);
        console.log('✅ EXERCISE_MANAGER: Activities saved successfully for pet:', appState.currentPet.id);
    } else {
        console.error('❌ EXERCISE_MANAGER: No current pet for saving activities');
    }
},
    // Add this RIGHT AFTER saveActivities function
refreshDashboardIfVisible: function() {
    // Check if dashboard section is currently visible
    if (dashboardElements.dashboardSection && 
        dashboardElements.dashboardSection.style.display !== 'none') {
        console.log('🔄 EXERCISE_MANAGER: Dashboard is visible, refreshing tasks...');
        appState.todayTasks = taskManager.generateTodayTasks();
        renderDashboard();
    }
},

   // Update saveActivity to handle scheduling CREATES THE DATA
saveActivity: function(activityData) {
    console.log('💾 EXERCISE_MANAGER: saveActivity called with data:', activityData);
    
    const activity = {
        id: 'activity_' + Date.now(),
        petId: appState.currentPet.id,
        ...activityData,
        // CHANGE TO: Use provided completed status, default to false
        completed: activityData.completed !== undefined ? activityData.completed : false,
        
        scheduledTime: activityData.scheduledTime || new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        timestamp: new Date().toISOString()
    };

    console.log('📝 EXERCISE_MANAGER: Created activity object:', activity);

    const activities = this.getActivities();
    console.log('📋 EXERCISE_MANAGER: Retrieved', activities.length, 'existing activities');
    
    activities.unshift(activity);
    console.log('➕ EXERCISE_MANAGER: Added new activity, total:', activities.length);
    
    this.saveActivities(activities);
    console.log('✅ EXERCISE_MANAGER: saveActivity completed successfully');
    
    this.refreshDashboardIfVisible(); // ADD THIS LINE - Real-time Dashboard Updates

    alert('Activity logged successfully!');
    this.showMainView();
},

   // Update getTodayActivities to filter by date
getTodayActivities: function() {
    const activities = this.getActivities();
    const today = utils.getTodayDate();
    return activities.filter(activity => activity.date === today)
                     .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
},

    getRecentActivities: function(days = 7) {
        const activities = this.getActivities();
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        
        return activities.filter(activity => new Date(activity.date) >= cutoffDate)
                         .sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    getMobilityAssessments: function() {
        if (!appState.currentPet) return [];
        return utils.loadData(`mobilityAssessments_${appState.currentPet.id}`) || [];
    },

    saveMobilityAssessments: function(assessments) {
        if (appState.currentPet) {
            utils.saveData(`mobilityAssessments_${appState.currentPet.id}`, assessments);
        }
    },
    
    // Exercise Suggestion Logic
    generateExerciseSuggestions: function(pet) {
        if (!pet || !pet.mobilityScore) return [];
        
        const mobilityLevel = pet.mobilityScore <= 2 ? 'limited' : 
                            pet.mobilityScore <= 4 ? 'moderate' : 'good';
        
        let suggestions = [];
        
        // Add condition-specific exercises
        if (pet.conditions) {
            pet.conditions.forEach(condition => {
                const conditionKey = condition.toLowerCase().replace(' ', '_');
                if (this.exerciseDatabase[conditionKey] && this.exerciseDatabase[conditionKey][mobilityLevel]) {
                    suggestions.push(...this.exerciseDatabase[conditionKey][mobilityLevel]);
                }
            });
        }
        
        // Add general geriatric exercises if no condition-specific ones found
        if (suggestions.length === 0 && this.exerciseDatabase.general_geriatric[mobilityLevel]) {
            suggestions.push(...this.exerciseDatabase.general_geriatric[mobilityLevel]);
        }
        
        return suggestions.slice(0, 3); // Return top 3 suggestions
    },

    // Mobility Trend Calculation
    calculateMobilityTrend: function() {
        const assessments = this.getMobilityAssessments()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5); // Last 5 assessments
        
        if (assessments.length === 0) return null;
        
        return {
            assessments: assessments,
            averageScore: assessments.reduce((sum, assessment) => sum + assessment.score, 0) / assessments.length,
            trend: assessments.length > 1 ? assessments[0].score - assessments[1].score : 0
        };
    },

    // Generate scheduled exercises for task system
generateScheduledExercises: function() {
    const exercises = [];
    const today = utils.getTodayDate();
    
    // Get activities scheduled for today
    const activities = this.getActivities().filter(activity => 
        activity.date === today && !activity.completed
    );
    
    activities.forEach(activity => {
        exercises.push({
            id: `exercise_${activity.id}`,
            type: 'exercise',
            description: `${activity.type} - ${activity.duration}min`,
            time: activity.scheduledTime || 'Anytime',
            completed: false,  // ← INITIAL STATE
            activityId: activity.id
        });
    });
    
    return exercises;
},
    
// added recently
// Mark exercise as completed
completeExercise: function(activityId) {
    const activities = this.getActivities();
    const activity = activities.find(a => a.id === activityId);
    
    if (activity) {
        activity.completed = true;
        activity.completedAt = new Date().toISOString();
        this.saveActivities(activities);
        this.refreshDashboardIfVisible(); // ADD THIS LINE
    }
},

// Get activities by date for calendar view
getActivitiesByDate: function(date) {
    const activities = this.getActivities();
    return activities.filter(activity => activity.date === date);
},

// Schedule recurring exercises
scheduleRecurringExercise: function(exerciseData) {
    // Implementation for recurring exercises (daily, weekly, etc.)
    // This would create multiple activity entries for future dates
},
//==============
    // Form Handling Functions
    handleMobilitySubmit: function(event) {
        event.preventDefault();
        
        const score = document.querySelector('input[name="mobility-score"]:checked');
        const notes = document.getElementById('mobility-notes').value;
        
        if (!score) {
            alert('Please select a mobility score');
            return;
        }

        this.saveMobilityAssessment(parseInt(score.value), notes);
    },

    handleActivitySubmit: function(event) {
        console.log('📝 EXERCISE_MANAGER: handleActivitySubmit called - form submission started');
        event.preventDefault();
        
        const formData = this.getActivityFormData();
            console.log('📋 EXERCISE_MANAGER: Form data collected:', formData);
        if (this.validateActivityForm(formData)) {
                    console.log('✅ EXERCISE_MANAGER: Form validation passed, saving activity...');
            this.saveActivity(formData);
            } else {
        console.log('❌ EXERCISE_MANAGER: Form validation failed');
        }
    },
    
// Update to include new fields:
   getActivityFormData: function() {
    return {
        type: document.getElementById('activity-type').value,
        duration: parseInt(document.getElementById('activity-duration').value),
        intensity: document.getElementById('activity-intensity').value,
        mobilityAfter: document.getElementById('activity-mobility-after').value ? 
                      parseInt(document.getElementById('activity-mobility-after').value) : null,
        notes: document.getElementById('activity-notes').value,
        date: document.getElementById('activity-date').value, // NEW
        scheduledTime: document.getElementById('activity-scheduled-time').value || null, // NEW
        timestamp: new Date().toISOString()
    };
},

    validateActivityForm: function(formData) {
        if (!formData.type) {
            alert('Please select activity type');
            return false;
        }
        if (!formData.duration || formData.duration < 1) {
            alert('Please enter valid duration');
            return false;
        }
        return true;
    },

    // Save Functions
    saveMobilityAssessment: function(score, notes) {
        const assessment = {
            id: 'mobility_' + Date.now(),
            score: score,
            notes: notes,
            date: utils.getTodayDate(),
            timestamp: new Date().toISOString()
        };

        // Update pet's current mobility score
        appState.currentPet.mobilityScore = score;
        appState.currentPet.lastMobilityAssessment = new Date().toISOString();
        petProfilesManager.savePets();

        // Save assessment to history
        const assessments = this.getMobilityAssessments();
        assessments.unshift(assessment);
        this.saveMobilityAssessments(assessments);

        alert(`Mobility assessment saved: Score ${score}/5`);
        this.showMainView();
    },

   saveActivity: function(activityData) {
    console.log('saveActivity called - this:', this);
    console.log('saveActivities function exists:', typeof this.saveActivities);
    
    const activity = {
        id: 'activity_' + Date.now(),
        petId: appState.currentPet.id,
        ...activityData,
        completed: false,
        scheduledTime: activityData.scheduledTime || new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        timestamp: new Date().toISOString()
    };

    const activities = this.getActivities();
    activities.unshift(activity);
    this.saveActivities(activities); // This line is failing

    alert('Activity logged successfully!');
    this.showMainView();
},

    // View Management
    //Update showMainView to Force Refresh
    showMainView: function() {
    console.log('🔄 EXERCISE_MANAGER: showMainView called - refreshing display');
    const activities = this.getActivities();
    console.log('📊 EXERCISE_MANAGER: Displaying', activities.length, 'activities in main view');
    this.elements.exerciseContent.innerHTML = this.templates.mainView();
    console.log('✅ EXERCISE_MANAGER: Main view refreshed with latest data');
},

    showMobilityForm: function() {
        this.elements.exerciseContent.innerHTML = this.templates.mobilityForm(appState.currentPet?.mobilityScore);
    },

    showActivityForm: function() {
        this.elements.exerciseContent.innerHTML = this.templates.activityForm();
    },

    //updated to show full history log now
    showActivityHistory: function() {
    console.log('📖 EXERCISE_MANAGER: showActivityHistory called - displaying full history');
    this.elements.exerciseContent.innerHTML = this.templates.fullActivityHistory();
    console.log('✅ EXERCISE_MANAGER: Full activity history displayed');
},

    // Quick Log Functions
    logSuggestedExercise: function(exerciseId) {
    console.log('📝 EXERCISE_MANAGER: logSuggestedExercise called for:', exerciseId);
    
    // Find the exercise in the database
    let exercise = null;
    Object.values(this.exerciseDatabase).forEach(category => {
        Object.values(category).forEach(level => {
            const found = level.find(ex => ex.id === exerciseId);
            if (found) exercise = found;
        });
    });

    if (exercise) {
        console.log('✅ EXERCISE_MANAGER: Found exercise:', exercise.name);
        if (confirm(`Log "${exercise.name}" as completed?`)) {
            console.log('👤 EXERCISE_MANAGER: User confirmed completion');
            
            // EXACT FIX: Mark as completed immediately with completion timestamp
            this.saveActivity({
                type: exercise.name.toLowerCase().replace(/ /g, '_'),
                duration: parseInt(exercise.duration),
                intensity: 'gentle',
                notes: `Completed suggested exercise: ${exercise.name}`,
                completed: true,  // ← THIS IS THE KEY FIX
                completedAt: new Date().toISOString()  // ← ADD COMPLETION TIMESTAMP
            });
            
            console.log('✅ EXERCISE_MANAGER: Suggested exercise logged as COMPLETED');
        } else {
            console.log('❌ EXERCISE_MANAGER: User cancelled exercise logging');
        }
    } else {
        console.error('❌ EXERCISE_MANAGER: Exercise not found for ID:', exerciseId);
    }
},


    // Add this PRINT function to exerciseManager
printActivityHistory: function() {
    console.log('🖨️ EXERCISE_MANAGER: printActivityHistory called');
    
    const printContent = document.querySelector('.full-history-container');
    if (!printContent) {
        console.error('❌ EXERCISE_MANAGER: Could not find history content to print');
        alert('Cannot print - history content not found');
        return;
    }

    const printWindow = window.open('', '_blank');
    const petName = appState.currentPet?.name || 'Your Pet';
    
    printWindow.document.write(`
        <html>
            <head>
                <title>Activity History - ${petName}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .print-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 10px; }
                    .history-item { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 5px; }
                    .completed { background-color: #f8fff8; }
                    .pending { background-color: #fff8f8; }
                    .activity-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
                    .activity-meta { color: #666; font-size: 14px; margin-bottom: 8px; }
                    .activity-notes { font-style: italic; margin-top: 8px; }
                    .print-date { text-align: right; font-size: 12px; color: #999; margin-top: 20px; }
                    @media print {
                        .no-print { display: none; }
                        body { margin: 0; }
                    }
                </style>
            </head>
            <body>
                <div class="print-header">
                    <h1>Activity History Report</h1>
                    <h2>${petName}</h2>
                    <p>Generated on ${new Date().toLocaleDateString()}</p>
                </div>
                ${printContent.querySelector('.full-history-list').innerHTML}
                <div class="print-date">
                    Printed from Pet Health Dashboard on ${new Date().toLocaleString()}
                </div>
            </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
        printWindow.print();
        console.log('✅ EXERCISE_MANAGER: Print dialog opened');
    }, 250);
},
    
    // added
    completeActivity: function(activityId) {
    this.completeExercise(activityId);
    this.showMainView(); // Refresh the view
    },

    // Initialize Exercise Section
    init: function() {
        this.showMainView();
    }
};

// Add to global window object
window.exerciseManager = exerciseManager;

// Initialize function for exercise section
window.initExercise = function() {
    exerciseManager.init();
};


//==========================================================
// Reminders & Appointments Section Functionality
//===============================================================
const remindersManager = {
    // DOM Elements
    elements: {
        remindersSection: document.getElementById('reminders-section'),
        remindersContent: document.getElementById('reminders-content')
    },

    // Reminder Types and Templates
    reminderTypes: {
        vet: {
            label: 'Vet Appointment',
            icon: '🏥',
            color: 'var(--error)',
            fields: ['clinic', 'doctor', 'purpose', 'preparation']
        },
        medication_refill: {
            label: 'Medication Refill',
            icon: '💊',
            color: 'var(--warning)',
            fields: ['pharmacy', 'medication', 'prescriptionNumber']
        },
        grooming: {
            label: 'Grooming',
            icon: '✂️',
            color: 'var(--info)',
            fields: ['groomer', 'service', 'specialInstructions']
        },
        vaccination: {
            label: 'Vaccination Due',
            icon: '💉',
            color: 'var(--accent)',
            fields: ['vaccine', 'clinic', 'notes']
        },
        checkup: {
            label: 'Routine Checkup',
            icon: '👨‍⚕️',
            color: 'var(--primary)',
            fields: ['purpose', 'clinic', 'fastingRequired']
        },
        bloodwork: {
            label: 'Blood Work',
            icon: '🩸',
            color: 'var(--secondary)',
            fields: ['testType', 'fastingRequired', 'clinic']
        },
        dental: {
            label: 'Dental Care',
            icon: '🦷',
            color: 'var(--primary-light)',
            fields: ['procedure', 'clinic', 'anesthesia']
        },
        other: {
            label: 'Other',
            icon: '📌',
            color: 'var(--neutral-dark)',
            fields: ['description']
        }
    },

    // Recurrence Options
    recurrenceOptions: {
        none: 'Does not repeat',
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
        yearly: 'Yearly',
        custom: 'Custom'
    },

    // Priority Levels
    priorityLevels: {
        high: { label: 'High', color: 'var(--error)' },
        medium: { label: 'Medium', color: 'var(--warning)' },
        low: { label: 'Low', color: 'var(--info)' }
    },

    // Templates
    templates: {
        // Main Reminders View
        mainView: () => `
    <div class="reminders-header">
        <div class="reminders-header-top">
            <h2>Reminders & Appointments</h2>
            <button class="btn btn-secondary" data-section="dashboard">← Back to Dashboard</button>
        </div>
        ${appState.currentPet ? `
            <div class="current-pet-banner">
                Managing reminders for: <strong>${appState.currentPet.name}</strong>
            </div>
        ` : '<p class="warning">Please select a pet first</p>'}
    </div>

            ${appState.currentPet ? remindersManager.templates.remindersDashboard() : remindersManager.templates.noPetView()}
        `,

        // View when no pet is selected
        noPetView: () => `
            <div class="no-pet-selected">
                <div class="empty-state">
                    <h3>No Active Pet Selected</h3>
                    <p>Please select or add a pet to manage reminders.</p>
                    <button class="btn btn-primary" data-section="profiles">
    Manage Pet Profiles
</button>
                </div>
            </div>
        `,

        // Reminders Dashboard
        remindersDashboard: () => {
            const upcomingReminders = remindersManager.getUpcomingReminders(7);
            const overdueReminders = remindersManager.getOverdueReminders();
            
            return `
                <div class="reminders-grid">
                    <div class="reminders-card calendar-view">
                        <div class="card-header">
                            <h3>Calendar</h3>
                            <div class="calendar-nav">
    <button class="btn-icon" data-action="previousMonth">←</button>
    <span id="current-month">${remindersManager.getCurrentMonthYear()}</span>
    <button class="btn-icon" data-action="nextMonth">→</button>
</div>
                        </div>
                        <div class="calendar-content">
                            ${remindersManager.templates.calendarView()}
                        </div>
                    </div>

                    <div class="reminders-card upcoming-reminders">
                        <div class="card-header">
                            <h3>Upcoming This Week</h3>
                           <button class="btn btn-primary btn-sm" data-action="showAddReminder">+ Add Reminder</button>
                        </div>
                        <div class="upcoming-content">
                            ${remindersManager.templates.upcomingReminders(upcomingReminders)}
                        </div>
                    </div>

                    <div class="reminders-card reminder-list">
                        <div class="card-header">
                            <h3>All Reminders</h3>
                            <div class="view-toggle">
                                <button class="btn btn-secondary btn-sm" data-action="toggleView" data-view-type="list">List</button>

                                <button class="btn btn-secondary btn-sm" data-action="toggleView" data-view-type="grid">Grid</button>

                            </div>
                        </div>
                        <div class="reminders-content">
                            ${remindersManager.templates.remindersList()}
                        </div>
                    </div>

                    <div class="reminders-card overdue-alerts">
                        <div class="card-header">
                            <h3>Overdue & Alerts</h3>
                        </div>
                        <div class="alerts-content">
                            ${remindersManager.templates.overdueAlerts(overdueReminders)}
                        </div>
                    </div>
                </div>
            `;
        },

        // Calendar View Template
        calendarView: () => {
            const days = remindersManager.getCalendarDays();
            
            return `
                <div class="calendar">
                    <div class="calendar-header">
                        ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => `
                            <div class="calendar-day-header">${day}</div>
                        `).join('')}
                    </div>
                    <div class="calendar-days">
                        ${days.map(day => `
                            <div class="calendar-day ${day.isCurrentMonth ? '' : 'other-month'} ${day.isToday ? 'today' : ''} ${day.hasReminders ? 'has-reminders' : ''}" 
                                 onclick="remindersManager.showDayReminders('${day.date}')">
                                <span class="day-number">${day.date.getDate()}</span>
                                ${day.hasReminders ? '<span class="reminder-dot"></span>' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        // Upcoming Reminders Template
        upcomingReminders: (reminders) => {
            if (reminders.length === 0) {
                return '<p class="no-reminders">No upcoming reminders this week</p>';
            }

            return `
                <div class="upcoming-list">
                    ${reminders.map(reminder => `
                        <div class="upcoming-item ${reminder.priority}">
                            <div class="reminder-icon" style="color: ${remindersManager.reminderTypes[reminder.type].color}">
                                ${remindersManager.reminderTypes[reminder.type].icon}
                            </div>
                            <div class="reminder-details">
                                <div class="reminder-title">${reminder.title}</div>
                                <div class="reminder-date">
                                    ${formatDate(reminder.date)} at ${reminder.time || 'All day'}
                                </div>
                                ${reminder.location ? `<div class="reminder-location">${reminder.location}</div>` : ''}
                            </div>
                            <div class="reminder-actions">
                                <button class="btn-icon" data-action="completeReminder" data-reminder-id="${reminder.id}" title="Mark Complete">
    ✅
</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        },

        // Reminders List Template
        remindersList: () => {
            const reminders = remindersManager.getReminders();
            
            if (reminders.length === 0) {
                return `
                    <div class="empty-state">
                        <p>No reminders set up yet.</p>
<button class="btn btn-primary" data-action="showAddReminder">
    Add Your First Reminder
</button>
                    </div>
                `;
            }

            return `
                <div class="reminders-list">
                    ${reminders.map(reminder => `
                        <div class="reminder-list-item ${reminder.priority} ${reminder.completed ? 'completed' : ''}">
                            <div class="reminder-main">
                                <div class="reminder-type-icon" style="background-color: ${remindersManager.reminderTypes[reminder.type].color}">
                                    ${remindersManager.reminderTypes[reminder.type].icon}
                                </div>
                                <div class="reminder-info">
                                    <div class="reminder-header">
                                        <h4>${reminder.title}</h4>
                                        <span class="reminder-priority">${remindersManager.priorityLevels[reminder.priority].label}</span>
                                    </div>
                                    <div class="reminder-dates">
                                        <span class="reminder-date">${formatDate(reminder.date)}</span>
                                        ${reminder.time ? `<span class="reminder-time">${reminder.time}</span>` : ''}
                                        ${reminder.recurrence !== 'none' ? `<span class="reminder-recurrence">${reminder.recurrence}</span>` : ''}
                                    </div>
                                    ${reminder.description ? `<p class="reminder-description">${reminder.description}</p>` : ''}
                                </div>
                            </div>
                            <div class="reminder-actions">
                                ${!reminder.completed ? `
                                    <button class="btn btn-success btn-xs" data-action="completeReminder" data-reminder-id="${reminder.id}">Complete</button>

                                ` : `
                                    <span class="completed-badge">Completed</span>
                                `}
                                <button class="btn-icon" data-action="editReminder" data-reminder-id="${reminder.id}" title="Edit">✏️</button>

                                <button class="btn-icon delete" data-action="deleteReminder" data-reminder-id="${reminder.id}" title="Delete">🗑️</button>

                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        },

        // Overdue Alerts Template
        overdueAlerts: (reminders) => {
            if (reminders.length === 0) {
                return '<p class="no-alerts">No overdue reminders</p>';
            }

            return `
                <div class="alerts-list">
                    ${reminders.map(reminder => `
                        <div class="alert-item overdue">
                            <div class="alert-icon">⚠️</div>
                            <div class="alert-content">
                                <strong>${reminder.title}</strong>
                                <p>Was due: ${formatDate(reminder.date)}</p>
                                <small>${remindersManager.reminderTypes[reminder.type].label}</small>
                            </div>
                            <button class="btn btn-primary btn-xs" data-action="rescheduleReminder" data-reminder-id="${reminder.id}">Reschedule</button>

                        </div>
                    `).join('')}
                </div>
            `;
        },

        // Add/Edit Reminder Form
        reminderForm: (reminder = null) => {
            const isEdit = !!reminder;
            const today = new Date().toISOString().split('T')[0];
            
            return `
                <div class="reminder-form-container">
                    <div class="form-header">
                        <h2>${isEdit ? 'Edit' : 'Add'} Reminder</h2>
                        <button class="btn btn-secondary" data-action="showMainView" data-manager="reminders">
    ← Back to Reminders
</button>
                    </div>

                    <form id="reminder-form" onsubmit="remindersManager.handleSubmit(event)">
                        <input type="hidden" id="reminder-id" value="${reminder?.id || ''}">

                        <div class="form-grid">
                            <div class="form-group">
                                <label for="reminder-type">Reminder Type *</label>
                                <select id="reminder-type" required onchange="remindersManager.updateFormFields()">
                                    <option value="">Select Type</option>
                                    ${Object.entries(remindersManager.reminderTypes).map(([key, type]) => `
                                        <option value="${key}" ${reminder?.type === key ? 'selected' : ''}>
                                            ${type.icon} ${type.label}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="reminder-title">Title *</label>
                                <input type="text" id="reminder-title" value="${reminder?.title || ''}" required>
                            </div>

                            <div class="form-group">
                                <label for="reminder-date">Date *</label>
                                <input type="date" id="reminder-date" value="${reminder?.date || today}" required>
                            </div>

                            <div class="form-group">
                                <label for="reminder-time">Time</label>
                                <input type="time" id="reminder-time" value="${reminder?.time || ''}">
                            </div>

                            <div class="form-group">
                                <label for="reminder-priority">Priority</label>
                                <select id="reminder-priority">
                                    ${Object.entries(remindersManager.priorityLevels).map(([key, level]) => `
                                        <option value="${key}" ${reminder?.priority === key ? 'selected' : ''}>
                                            ${level.label}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="reminder-recurrence">Recurrence</label>
                                <select id="reminder-recurrence">
                                    ${Object.entries(remindersManager.recurrenceOptions).map(([key, label]) => `
                                        <option value="${key}" ${reminder?.recurrence === key ? 'selected' : ''}>
                                            ${label}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="reminder-description">Description</label>
                            <textarea id="reminder-description" rows="3" placeholder="Additional details...">${reminder?.description || ''}</textarea>
                        </div>

                        <div class="form-group">
                            <label for="reminder-location">Location</label>
                            <input type="text" id="reminder-location" value="${reminder?.location || ''}" 
                                   placeholder="Clinic name, address, etc.">
                        </div>

                        <div id="type-specific-fields">
                            <!-- Dynamic fields based on reminder type will appear here -->
                        </div>

                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="reminder-notifications" ${reminder?.notifications !== false ? 'checked' : ''}>
                                Send reminder notifications
                            </label>
                        </div>

                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">
    ${isEdit ? 'Update' : 'Add'} Reminder
</button>
<button type="button" class="btn btn-secondary" data-action="showMainView" data-manager="reminders">
    Cancel
</button>
                        </div>
                    </form>
                </div>
            `;
        },

   
      // Day Reminders Modal Template - FIXED VERSION
dayRemindersModal: (date, reminders) => {
    return `
        <div class="modal-overlay" data-action="hideDayReminders">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3>Reminders for ${formatDate(date)}</h3>
                    <button class="btn-icon" data-action="hideDayReminders" title="Close">×</button>
                </div>
                <div class="modal-body">
                    ${reminders.length === 0 ? `
                        <p class="no-reminders">No reminders for this day</p>
                    ` : `
                        <div class="day-reminders-list">
                            ${reminders.map(reminder => `
                                <div class="day-reminder-item ${reminder.priority}">
                                    <div class="reminder-type">${remindersManager.reminderTypes[reminder.type].icon} ${remindersManager.reminderTypes[reminder.type].label}</div>
                                    <div class="reminder-title">${reminder.title}</div>
                                    ${reminder.time ? `<div class="reminder-time">${reminder.time}</div>` : ''}
                                    <div class="reminder-actions">
                                        <button class="btn btn-primary btn-xs" data-action="editReminder" data-reminder-id="${reminder.id}">Edit</button>
                                        <button class="btn btn-success btn-xs" data-action="completeReminder" data-reminder-id="${reminder.id}">Complete</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `}
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" data-action="showAddFormWithDate" data-date="${date}">Add Reminder for This Day</button>
                </div>
            </div>
        </div>
    `;
}
    },

    // Calendar Management
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),

    getCurrentMonthYear: function() {
        return new Date(this.currentYear, this.currentMonth).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
    },

    getCalendarDays: function() {
        console.log('📅 REMINDERS: Generating calendar for', this.currentMonth + 1, this.currentYear);
        const days = [];
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startDay = firstDay.getDay();
        const daysInMonth = lastDay.getDate();
        
        // DEBUG: Log today's date comparison
    const today = new Date();
    console.log('📅 REMINDERS: Today is:', today.toDateString());
    console.log('📅 REMINDERS: Calendar month:', this.currentMonth, 'Year:', this.currentYear);
        
        today.setHours(0, 0, 0, 0);

        // Previous month days
        const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
        for (let i = startDay - 1; i >= 0; i--) {
            const date = new Date(this.currentYear, this.currentMonth - 1, prevMonthLastDay - i);
            days.push({
                date: date,
                isCurrentMonth: false,
                isToday: false,
                hasReminders: this.hasRemindersOnDate(date)
            });
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(this.currentYear, this.currentMonth, i);
            days.push({
                date: date,
                isCurrentMonth: true,
                isToday: date.getTime() === today.getTime(),
                hasReminders: this.hasRemindersOnDate(date)
            });
        }

        // Next month days
        const totalCells = 42; // 6 weeks
        const nextMonthDays = totalCells - days.length;
        for (let i = 1; i <= nextMonthDays; i++) {
            const date = new Date(this.currentYear, this.currentMonth + 1, i);
            days.push({
                date: date,
                isCurrentMonth: false,
                isToday: false,
                hasReminders: this.hasRemindersOnDate(date)
            });
        }

        return days;
    },

    previousMonth: function() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.renderRemindersView();
    },

    nextMonth: function() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.renderRemindersView();
    },

    // Add this function for day reminder MODAL
showAddFormWithDate: function(date) {
    console.log('📅 REMINDERS_MANAGER: Showing add form with pre-filled date:', date);
    this.showAddForm();
    
    // Set the date in the form after a short delay to ensure form is rendered
    setTimeout(() => {
        const dateInput = document.getElementById('reminder-date');
        if (dateInput) {
            dateInput.value = date;
            console.log('✅ REMINDERS_MANAGER: Date pre-filled in form:', date);
        }
    }, 100);
},

    // Data Management Functions
    getReminders: function() {
        if (!appState.currentPet) return [];
        return utils.loadData(`reminders_${appState.currentPet.id}`) || [];
    },

    saveReminders: function(reminders) {
        if (appState.currentPet) {
            utils.saveData(`reminders_${appState.currentPet.id}`, reminders);
        }
    },

    getUpcomingReminders: function(days = 7) {
        const reminders = this.getReminders().filter(reminder => !reminder.completed);
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + days);
        
        return reminders.filter(reminder => {
            const reminderDate = new Date(reminder.date);
            return reminderDate >= today && reminderDate <= futureDate;
        }).sort((a, b) => new Date(a.date) - new Date(b.date));
    },

    getOverdueReminders: function() {
        const reminders = this.getReminders().filter(reminder => !reminder.completed);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return reminders.filter(reminder => {
            const reminderDate = new Date(reminder.date);
            reminderDate.setHours(0, 0, 0, 0);
            return reminderDate < today;
        }).sort((a, b) => new Date(a.date) - new Date(b.date));
    },

    hasRemindersOnDate: function(date) {
        const reminders = this.getReminders().filter(reminder => !reminder.completed);
        const dateString = date.toISOString().split('T')[0];
        
        return reminders.some(reminder => reminder.date === dateString);
    },

    getRemindersOnDate: function(dateString) {
        const reminders = this.getReminders().filter(reminder => !reminder.completed);
        return reminders.filter(reminder => reminder.date === dateString);
    },

    // Form Handling Functions
    handleSubmit: function(event) {
        event.preventDefault();
        const formData = this.getFormData();
        
        if (this.validateForm(formData)) {
            const reminderId = document.getElementById('reminder-id').value;
            if (reminderId) {
                this.updateReminder(reminderId, formData);
            } else {
                this.addReminder(formData);
            }
        }
    },

    getFormData: function() {
        return {
            type: document.getElementById('reminder-type').value,
            title: document.getElementById('reminder-title').value.trim(),
            date: document.getElementById('reminder-date').value,
            time: document.getElementById('reminder-time').value || null,
            priority: document.getElementById('reminder-priority').value,
            recurrence: document.getElementById('reminder-recurrence').value,
            description: document.getElementById('reminder-description').value.trim(),
            location: document.getElementById('reminder-location').value.trim(),
            notifications: document.getElementById('reminder-notifications').checked,
            completed: false,
            createdAt: new Date().toISOString()
        };
    },

    validateForm: function(formData) {
        if (!formData.type) {
            alert('Please select reminder type');
            return false;
        }
        if (!formData.title) {
            alert('Please enter a title');
            return false;
        }
        if (!formData.date) {
            alert('Please select a date');
            return false;
        }
        return true;
    },

    updateFormFields: function() {
        const type = document.getElementById('reminder-type').value;
        const fieldsContainer = document.getElementById('type-specific-fields');
        
        if (type && this.reminderTypes[type]) {
            const fields = this.reminderTypes[type].fields;
            fieldsContainer.innerHTML = fields.map(field => `
                <div class="form-group">
                    <label for="reminder-${field}">${field.replace(/_/g, ' ').toUpperCase()}</label>
                    <input type="text" id="reminder-${field}" placeholder="Enter ${field.replace(/_/g, ' ')}">
                </div>
            `).join('');
        } else {
            fieldsContainer.innerHTML = '';
        }
    },

    // CRUD Operations
    addReminder: function(reminderData) {
        const newReminder = {
            id: 'reminder_' + Date.now(),
            petId: appState.currentPet.id,
            ...reminderData
        };

        const reminders = this.getReminders();
        reminders.push(newReminder);
        this.saveReminders(reminders);

        alert('Reminder added successfully!');
        this.showMainView();
    },

    updateReminder: function(reminderId, reminderData) {
        const reminders = this.getReminders();
        const reminderIndex = reminders.findIndex(reminder => reminder.id === reminderId);
        
        if (reminderIndex !== -1) {
            reminders[reminderIndex] = {
                ...reminders[reminderIndex],
                ...reminderData,
                updatedAt: new Date().toISOString()
            };
            
            this.saveReminders(reminders);
            alert('Reminder updated successfully!');
            this.showMainView();
        }
    },

    deleteReminder: function(reminderId) {
        if (confirm('Are you sure you want to delete this reminder?')) {
            const reminders = this.getReminders().filter(reminder => reminder.id !== reminderId);
            this.saveReminders(reminders);
            alert('Reminder deleted successfully');
            this.showMainView();
        }
    },

    completeReminder: function(reminderId) {
        const reminders = this.getReminders();
        const reminder = reminders.find(reminder => reminder.id === reminderId);
        
        if (reminder) {
            reminder.completed = true;
            reminder.completedAt = new Date().toISOString();
            this.saveReminders(reminders);
            alert('Reminder marked as completed!');
            this.showMainView();
        }
    },

    rescheduleReminder: function(reminderId) {
        const newDate = prompt('Enter new date (YYYY-MM-DD):');
        if (newDate) {
            const reminders = this.getReminders();
            const reminder = reminders.find(reminder => reminder.id === reminderId);
            
            if (reminder) {
                reminder.date = newDate;
                reminder.completed = false;
                delete reminder.completedAt;
                this.saveReminders(reminders);
                alert('Reminder rescheduled!');
                this.showMainView();
            }
        }
    },

    // View Management
    showMainView: function() {
        this.elements.remindersContent.innerHTML = this.templates.mainView();
    },

    showAddForm: function() {
        this.elements.remindersContent.innerHTML = this.templates.reminderForm();
    },

    showAddFormWithDate: function(date) {
        this.elements.remindersContent.innerHTML = this.templates.reminderForm();
        document.getElementById('reminder-date').value = date;
        this.hideDayReminders();
    },

    showEditForm: function(reminderId) {
        const reminders = this.getReminders();
        const reminder = reminders.find(reminder => reminder.id === reminderId);
        if (reminder) {
            this.elements.remindersContent.innerHTML = this.templates.reminderForm(reminder);
        }
    },

    showDayReminders: function(dateString) {
        const date = new Date(dateString);
        const reminders = this.getRemindersOnDate(date.toISOString().split('T')[0]);
        
        const modal = document.createElement('div');
        modal.innerHTML = this.templates.dayRemindersModal(date, reminders);
        document.body.appendChild(modal);
    },

    hideDayReminders: function() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    },

    toggleView: function(viewType) {
        // Implementation for switching between list and grid views
        alert(`${viewType} view will be implemented in next version`);
    },

    editReminder: function(reminderId) {
        this.showEditForm(reminderId);
    },

    // Rendering
    renderRemindersView: function() {
        if (this.elements.remindersContent) {
            this.elements.remindersContent.innerHTML = this.templates.mainView();
        }
    },

    // Initialize Reminders Section
    init: function() {
        this.showMainView();
    }
};

// Add to global window object
window.remindersManager = remindersManager;

// Initialize function for reminders section
window.initReminders = function() {
    remindersManager.init();
};





// keep it after Section manager but before Initialization.
// Global functions for HTML event handlers
window.showSection = sectionManager.showSection;
window.showDashboard = sectionManager.showDashboard;
window.toggleTaskCompletion = taskManager.toggleTaskCompletion;
window.formatDate = utils.formatDate;
window.calculateAge = utils.calculateAge;

// Activity logging function (placeholder)
// REPLACE the placeholder function:
window.logActivity = () => {
    console.log('🏃 DASHBOARD: Log activity clicked - redirecting to exercise');
    sectionManager.showSection('exercise');
};

// Initialize Dashboard
const initDashboard = () => {
    setupEventDelegation(); // Add this line setting EVENTLISTENERS FOR ALL BUTTONS ON TOP OF DASHBOARD.JS
    loadAppData();
    renderDashboard();
    
    // Show dashboard section
    if (dashboardElements.dashboardSection) {
        dashboardElements.dashboardSection.style.display = 'block';
    }
};



