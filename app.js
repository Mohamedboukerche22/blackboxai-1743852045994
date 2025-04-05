// Team Management System - Core Functionality

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Load any saved data
    loadData();
    
    // Apply user preferences
    applyPreferences();
}

function setupEventListeners() {
    // Navigation active state
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('font-bold', 'text-white');
            link.classList.remove('hover:underline');
        }
    });
    
    // Form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
    
    // Task status toggles
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', toggleTaskStatus);
    });
    
    // Modal triggers
    document.querySelectorAll('[data-modal-target]').forEach(button => {
        button.addEventListener('click', toggleModal);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());
    
    // Save form data
    saveFormData(form.id, formValues);
    
    // Show success message
    showToast('Settings saved successfully!', 'success');
}

function toggleTaskStatus(e) {
    const checkbox = e.target;
    const taskId = checkbox.id;
    const isComplete = checkbox.checked;
    
    // Update task status in storage
    updateTaskStatus(taskId, isComplete);
    
    // Visual feedback
    const taskItem = checkbox.closest('.grid');
    if (isComplete) {
        taskItem.classList.add('bg-green-50');
        taskItem.classList.remove('hover:bg-gray-50');
    } else {
        taskItem.classList.remove('bg-green-50');
        taskItem.classList.add('hover:bg-gray-50');
    }
}

function loadData() {
    // Load user data from localStorage
    const userData = localStorage.getItem('teamManagerUser');
    if (userData) {
        const data = JSON.parse(userData);
        // Apply loaded data to forms
        applyFormData(data);
    }
    
    // Load tasks if on tasks page
    if (window.location.pathname.includes('tasks.html')) {
        loadTasks();
    }
}

function saveFormData(formId, data) {
    // Get existing data
    let savedData = localStorage.getItem('teamManagerUser') || '{}';
    savedData = JSON.parse(savedData);
    
    // Update with new data
    savedData[formId] = data;
    
    // Save back to localStorage
    localStorage.setItem('teamManagerUser', JSON.stringify(savedData));
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Remove after delay
    setTimeout(() => {
        toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize the app when DOM is fully loaded
if (document.readyState === 'complete') {
    initApp();
} else {
    document.addEventListener('DOMContentLoaded', initApp);
}
