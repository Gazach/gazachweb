function calculateAge() {
    const birthDate = new Date(2007, 11, 13); // Months are 0-indexed (11 = December)
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Check if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// Update age immediately and set interval to update every hour
function updateAge() {
    document.getElementById('age').textContent = calculateAge();
    document.getElementById('ages').textContent = calculateAge();
}

// Initial update
updateAge();

// Update every hour (3600000 milliseconds) to ensure accuracy
setInterval(updateAge, 3600000);


document.getElementById('current-year').textContent = new Date().getFullYear();
