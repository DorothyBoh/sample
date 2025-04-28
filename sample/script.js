// Function to navigate between pages
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });

    // Show the requested page
    document.getElementById(pageId).classList.remove('hidden');

    // Scroll to top
    window.scrollTo(0, 0);
}

// Function to show pet switcher modal
function showPetSwitcher() {
    // In a real app, this would open a modal with pet selection
    // For this demo we'll simulate it with a basic confirm dialog
    if (confirm('Switch to another pet profile? Available pets: Max (Beagle), Luna (Persian Cat)')) {
        alert('Pet switched! This would update all UI elements to show the new pet data.');
    }
}

// Function to print document
function printDocument() {
    showPage('print-document-page');
}

// Function to actually print the content
function printContent() {
    window.print();
}

// Function to view attached documents
function viewAttachedDocuments() {
    // In a real app this would display a list of attached documents
    // For this demo we'll show a simple alert
    alert('Your attached documents:\n- Rabies Certificate.pdf\n- Vet Visit Summary (March 15).pdf');
}

// Function to save vaccine record
function saveVaccineRecord() {
    // In a real app, this would save data to a database
    // For this demo, we'll just show success and navigate away
    showPage('record-success-page');
}

// Function to save profile changes
function saveProfile() {
    // In a real app, this would save data to a database
    // For this demo, we'll just show an alert
    alert('Profile saved successfully!');
}

// Function to add a new pet
function addNewPet() {
    // In a real app, this would save data to a database
    // For this demo, we'll just show an alert
    const petName = document.getElementById('new-pet-name').value || 'New pet';
    alert(`${petName} has been added to your profiles!`);
}

// Pet data storage and management
const pets = [
    {
        id: 1,
        name: 'Kali',
        breed: 'Golden Retriever',
        age: '3 years old',
        gender: 'female',
        birthday: '2022-03-15',
        microchip: '985141000123456',
        image: '/api/placeholder/100/100',
        vaccinations: [
            {
                name: 'Rabies Vaccine',
                date: 'March 15, 2025',
                vet: 'Dr. Smith Veterinary Clinic',
                status: 'completed'
            },
            {
                name: 'DHPP Initial',
                date: 'November 10, 2024',
                vet: 'PetCare Clinic',
                status: 'completed'
            },
            {
                name: 'DHPP Booster',
                date: 'May 10, 2025',
                vet: 'PetCare Clinic',
                status: 'due'
            },
            {
                name: 'Bordetella',
                date: 'June 22, 2025',
                vet: 'PetCare Clinic',
                status: 'upcoming'
            },
            {
                name: 'Lyme Disease',
                date: 'October 3, 2024',
                vet: 'Animal Hospital',
                status: 'completed'
            },
            {
                name: 'Bordetella Initial',
                date: 'June 22, 2024',
                vet: 'Dr. Smith Veterinary Clinic',
                status: 'completed'
            },
            {
                name: 'Canine Influenza',
                date: 'March 17, 2024',
                vet: 'PetCare Clinic',
                status: 'completed'
            },
            {
                name: 'Leptospirosis',
                date: 'August 15, 2025',
                vet: 'Animal Hospital',
                status: 'scheduled'
            },
            {
                name: 'Flea & Tick Prevention',
                date: 'September 5, 2025',
                vet: 'PetCare Clinic',
                status: 'scheduled'
            }
        ]
    }
];

// Current active pet
let currentPet = pets[0];

// Function to update UI with pet data
function updatePetUI() {
    // Update pet name elements
    document.querySelectorAll('.pet-info h2').forEach(element => {
        element.textContent = currentPet.name;
    });
    
    // Update pet images
    document.querySelectorAll('.pet-image img').forEach(element => {
        element.src = currentPet.image;
        element.alt = `${currentPet.name}'s profile image`;
    });
    
    // Update pet details
    document.querySelectorAll('.pet-details').forEach(element => {
        const genderIcon = currentPet.gender === 'female' ? 'fa-venus' : 'fa-mars';
        element.innerHTML = `
            <i class="fas ${genderIcon}"></i> ${currentPet.gender.charAt(0).toUpperCase() + currentPet.gender.slice(1)}
            <i class="fas fa-birthday-cake"></i> ${currentPet.age}
        `;
    });
    
    // In a complete implementation, we would update all vaccination records too
}

// Event listeners for file uploads and form submissions
document.addEventListener('DOMContentLoaded', function() {
    // Pet image upload event listener
    const petImageUpload = document.getElementById('pet-image-upload');
    if (petImageUpload) {
        petImageUpload.addEventListener('change', function(event) {
            if (event.target.files && event.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Find closest pet image and update it
                    const imageElement = event.target.closest('.pet-image-upload').querySelector('img');
                    if (imageElement) {
                        imageElement.src = e.target.result;
                        // In a real app, we would also update the currentPet object
                    }
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        });
    }

    // New pet image upload event listener
    const newPetImageUpload = document.getElementById('new-pet-image-upload');
    if (newPetImageUpload) {
        newPetImageUpload.addEventListener('change', function(event) {
            if (event.target.files && event.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Create an image if it doesn't exist or update existing one
                    const uploadContainer = event.target.closest('.pet-image-upload');
                    const emptyImage = uploadContainer.querySelector('.empty-image');
                    
                    if (emptyImage) {
                        // Remove empty image and create a real img
                        emptyImage.remove();
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        uploadContainer.prepend(img);
                    } else {
                        // Update existing image
                        const imageElement = uploadContainer.querySelector('img');
                        if (imageElement) {
                            imageElement.src = e.target.result;
                        }
                    }
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        });
    }

    // Attach document event listener
    const attachDocument = document.getElementById('attach-document');
    if (attachDocument) {
        attachDocument.addEventListener('change', function(event) {
            if (event.target.files && event.target.files[0]) {
                const fileName = event.target.files[0].name;
                alert(`File "${fileName}" attached successfully!`);
            }
        });
    }

    // Form submission handling
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(event) {
            // Prevent actual form submission in this demo
            event.preventDefault();
            
            // Different handling based on form purpose
            if (this.closest('#login-page')) {
                showPage('homepage');
            } else if (this.closest('#signup-page')) {
                showPage('add-new-pet-page');
            }
        });
    });

    // Add reminder checkbox
    const addReminderCheckbox = document.getElementById('add-reminder');
    if (addReminderCheckbox) {
        addReminderCheckbox.addEventListener('change', function() {
            if (this.checked) {
                // In a real app, this would show a reminder date picker
                alert('Reminder will be set for this vaccination');
            }
        });
    }

    // Remember me checkbox
    const rememberMeCheckbox = document.getElementById('remember-me');
    if (rememberMeCheckbox) {
        rememberMeCheckbox.addEventListener('change', function() {
            // In a real app, this would store the setting in localStorage
            console.log('Remember me setting changed:', this.checked);
        });
    }

    // Prefill edit profile form with current pet data
    const editProfilePage = document.getElementById('edit-profile-page');
    if (editProfilePage) {
        editProfilePage.addEventListener('pageshow', function() {
            document.getElementById('pet-name').value = currentPet.name;
            document.getElementById('pet-breed').value = currentPet.breed;
            document.getElementById('pet-age').value = currentPet.age;
            document.getElementById('pet-birthday').value = currentPet.birthday;
            document.getElementById('pet-gender').value = currentPet.gender;
            document.getElementById('microchip').value = currentPet.microchip || '';
        });
    }

    // Show startup page by default when the app loads
    showPage('startup-page');
});

// Handle back button functionality
window.addEventListener('popstate', function() {
    // In a real app, we would maintain a history stack
    // For this demo we'll just go to homepage
    showPage('homepage');
});

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}