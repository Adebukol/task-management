// Global state variables
let currentPage = 'tasks'; // 'tasks' or 'addTask'
let tasks = []; // Array to store tasks
let error = null; // For displaying general errors
let showReminderSettings = false;
let reminderHour = 12; // Default to 12 PM
let reminderMinute = 30; // Default to 30 minutes

// Function to load tasks from local storage
const loadTasks = () => {
    try {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            // Ensure tasks are sorted by createdAt on load
            tasks.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
        } else {
            tasks = [];
        }
    } catch (e) {
        console.error("Error loading tasks from local storage:", e);
        error = "Failed to load tasks from local storage. Data might be corrupted.";
    }
};

// Function to save tasks to local storage
const saveTasks = () => {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
        console.error("Error saving tasks to local storage:", e);
        error = "Failed to save tasks to local storage. Your changes might not be saved.";
    }
};

// --- Task Management Functions ---
const addTask = (title, description) => {
    const newTask = {
        id: Date.now().toString(), // Simple unique ID for local storage
        title: title,
        description: description,
        createdAt: Date.now(), // Timestamp for sorting
        completed: false
    };
    tasks.push(newTask);
    saveTasks(); // Save after adding
    currentPage = 'tasks'; // Navigate back to the tasks list
    renderApp(); // Re-render the app
};

const toggleTaskCompletion = (taskId, currentStatus) => {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !currentStatus;
        saveTasks(); // Save after updating
        renderApp(); // Re-render the app
    }
};

const deleteTask = (taskId) => {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks(); // Save after deleting
    renderApp(); // Re-render the app
};

// --- Render Functions ---
const renderApp = () => {
    const appDiv = document.getElementById('app');
    if (!appDiv) return;

    let contentHtml = '';

    if (error) {
        // If there's an error, display it prominently
        contentHtml = `<div class="flex items-center justify-center min-h-screen bg-red-100 font-sans text-inter">
                            <p class="text-lg text-red-700">${error}</p>
                        </div>`;
    } else {
        // Main app structure - Added 'mx-auto' to center the max-w-md container
        contentHtml = `
            <div class="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden mx-auto">
                <div class="w-full bg-[#FF4500] h-16 rounded-t-xl"></div>
                <div class="p-6 flex-grow overflow-y-auto -mt-4 z-10">
                    ${currentPage === 'tasks' ? renderTasksPage() : renderAddTaskPage()}
                </div>
            </div>
        `;
        // Render reminder settings modal if active
        if (showReminderSettings) {
            contentHtml += renderReminderSettingsModal();
        }
    }
    appDiv.innerHTML = contentHtml;
    attachEventListeners(); // Re-attach event listeners after rendering
};

const renderTasksPage = () => {
    const totalTasks = tasks.length;
    const totalOpenTasks = tasks.filter(task => !task.completed).length;
    const totalClosedTasks = tasks.filter(task => task.completed).length;
    const completionRate = totalTasks === 0 ? 0 : Math.round((totalClosedTasks / totalTasks) * 100);

    return `
        <div class="flex justify-between items-center mb-6 pt-2">
            <h1 class="text-2xl font-bold text-gray-800 flex-grow">Tasks</h1>
            <div class="flex items-center space-x-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-7 h-7 text-gray-600 cursor-pointer hover:text-gray-800"
                    id="settings-icon"
                >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1.51-1V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l-.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                <button
                    id="add-task-btn"
                    class="p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition-colors"
                    aria-label="Add new task"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="mt-4">
            ${tasks.length > 0 ? `
                <div class="grid grid-cols-[auto_2fr_2fr_1fr_auto] gap-2 items-center text-sm font-semibold text-gray-600 mb-2 px-4 py-1 border-b border-gray-200">
                    <span class="w-5 flex justify-center"></span> <!-- Checkbox Column (auto) -->
                    <span class="ml-2">Task Name</span> <!-- Task Name Column (2fr) -->
                    <span class="text-left">Description</span> <!-- Description Column (2fr) - Changed to text-left for alignment with task details -->
                    <span class="text-center">Time</span> <!-- Time Column (1fr) -->
                    <span class="w-5 flex justify-center"></span> <!-- Delete Icon Column Placeholder (auto) -->
                </div>
                <ul class="space-y-4">
                    ${tasks.map(task => `
                        <li class="grid grid-cols-[auto_2fr_2fr_1fr_auto] gap-2 items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div class="flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    class="form-checkbox h-5 w-5 rounded-full focus:ring-orange-400 cursor-pointer"
                                    data-task-id="${task.id}"
                                    ${task.completed ? 'checked' : ''}
                                    style="accent-color: #FF4500;"
                                />
                            </div>
                            <div class="ml-2 text-base font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}">
                                ${task.title}
                            </div>
                            <div class="text-sm text-gray-600 ${task.completed ? 'line-through text-gray-400' : ''} text-left">
                                ${task.description}
                            </div>
                            <div class="text-center text-sm text-gray-500 ${task.completed ? 'line-through' : ''}">
                                ${task.createdAt ? new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                            </div>
                            <div class="flex items-center justify-center">
                                <button
                                    class="delete-task-btn p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 transition-colors"
                                    data-task-id="${task.id}"
                                    aria-label="Delete task ${task.title}"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            ` : `
                <p class="text-center text-gray-500 text-lg mt-8">No tasks yet. Add one!</p>
            `}
            
            <div class="mt-8 pt-4 border-t border-gray-200">
                <h2 class="text-xl font-semibold text-gray-700 mb-4">Stats</h2>
                <ul class="space-y-2 text-gray-700">
                    <li class="flex justify-between items-center text-sm">
                        <span>Total Tasks Open</span>
                        <span class="font-medium">${totalOpenTasks}</span>
                    </li>
                    <li class="flex justify-between items-center text-sm">
                        <span>Total Tasks Closed</span>
                        <span class="font-medium">${totalClosedTasks}</span>
                    </li>
                    <li class="flex justify-between items-center text-sm">
                        <span>Completion Rate</span>
                        <span class="font-medium">${completionRate}%</span>
                    </li>
                </ul>
            </div>
        </div>
    `;
};

const renderAddTaskPage = () => {
    return `
        <div class="flex items-center mb-6 pt-2">
            <button
                id="back-to-tasks-btn"
                class="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                aria-label="Go back to tasks"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </button>
            <h1 class="text-2xl font-bold text-gray-800 ml-4">Add New Task</h1>
        </div>
        <form id="add-task-form" class="space-y-6 p-4">
            <div>
                <label for="title" class="block text-sm font-medium text-gray-700">
                    Task Title
                </label>
                <input
                    type="text"
                    id="task-title"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    required
                />
            </div>
            <div>
                <label for="description" class="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <input
                    type="text"
                    id="task-description"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                />
            </div>
            <div class="flex justify-end space-x-3">
                <button
                    type="button"
                    id="cancel-add-task-btn"
                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                    Add Task
                </button>
            </div>
        </form>
    `;
};

const renderReminderSettingsModal = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

    return `
        <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
                <h2 class="text-xl font-bold mb-4 text-gray-800">Set Daily Reminder Time</h2>
                <div class="flex items-center space-x-4 mb-6">
                    <label for="reminder-hour" class="block text-sm font-medium text-gray-700">
                        Hour:
                    </label>
                    <select
                        id="reminder-hour-select"
                        class="mt-1 block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    >
                        ${hours.map(hour => `<option value="${hour}" ${hour === reminderHour ? 'selected' : ''}>${hour < 10 ? `0${hour}` : hour}</option>`).join('')}
                    </select>

                    <label for="reminder-minute" class="block text-sm font-medium text-gray-700">
                        Minute:
                    </label>
                    <select
                        id="reminder-minute-select"
                        class="mt-1 block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    >
                        ${minutes.map(minute => `<option value="${minute}" ${minute === reminderMinute ? 'selected' : ''}>${minute < 10 ? `0${minute}` : minute}</option>`).join('')}
                    </select>
                </div>
                <div class="flex justify-end">
                    <button
                        id="close-reminder-modal-btn"
                        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
};

// --- Event Listeners ---
const attachEventListeners = () => {
    // Detach previous listeners to prevent duplicates
    document.removeEventListener('click', handleGlobalClick);
    document.removeEventListener('submit', handleGlobalSubmit);
    document.removeEventListener('change', handleGlobalChange);

    // Re-attach global click listener
    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('submit', handleGlobalSubmit);
    document.addEventListener('change', handleGlobalChange);
};

const handleGlobalClick = (event) => {
    // Use closest() to reliably find the button, even if an inner element (like SVG) is clicked
    const clickedAddTaskBtn = event.target.closest('#add-task-btn');
    const clickedBackToTasksBtn = event.target.closest('#back-to-tasks-btn');
    const clickedSettingsIcon = event.target.closest('#settings-icon');
    const clickedCloseReminderModalBtn = event.target.closest('#close-reminder-modal-btn');
    const clickedDeleteTaskBtn = event.target.closest('.delete-task-btn');
    const clickedCancelAddTaskBtn = event.target.closest('#cancel-add-task-btn');

    if (clickedAddTaskBtn) {
        currentPage = 'addTask';
        renderApp();
    } else if (clickedBackToTasksBtn) {
        currentPage = 'tasks';
        renderApp();
    } else if (clickedSettingsIcon) {
        showReminderSettings = true;
        renderApp();
    } else if (clickedCloseReminderModalBtn) {
        showReminderSettings = false;
        renderApp();
    } else if (clickedDeleteTaskBtn) {
        const taskId = clickedDeleteTaskBtn.dataset.taskId;
        deleteTask(taskId);
    } else if (clickedCancelAddTaskBtn) {
        currentPage = 'tasks';
        renderApp();
    }
};

const handleGlobalSubmit = (event) => {
    if (event.target.id === 'add-task-form') {
        event.preventDefault();
        const titleInput = document.getElementById('task-title');
        const descriptionInput = document.getElementById('task-description');
        if (titleInput && titleInput.value.trim()) {
            addTask(titleInput.value.trim(), descriptionInput ? descriptionInput.value.trim() : '');
        }
    }
};

const handleGlobalChange = (event) => {
    if (event.target.type === 'checkbox' && event.target.classList.contains('form-checkbox')) {
        const taskId = event.target.dataset.taskId;
        const isChecked = event.target.checked;
        toggleTaskCompletion(taskId, !isChecked); // Pass !isChecked because toggle will flip it
    } else if (event.target.id === 'reminder-hour-select') {
        reminderHour = parseInt(event.target.value);
    } else if (event.target.id === 'reminder-minute-select') {
        reminderMinute = parseInt(event.target.value);
    }
};

// Initial load and render when the script loads
loadTasks(); // Load tasks from local storage
renderApp(); // Initial render
