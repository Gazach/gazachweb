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


        repos.forEach(({ data: repo }) => {
            const projectCard = `
                <div class="project-card">
                    <h3 class="project-title">/${repo.name}</h3>
                    <p class="project-desc">${repo.description || 'No description available'}</p>
                    <div class="project-meta">
                        <span class="project-lang">${repo.language || 'Various'}</span>
                        <div class="project-stats">
                            <span>★ ${repo.stargazers_count}</span>
                            <span>⧐ ${repo.forks_count}</span>
                        </div>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="project-link">
                        View ${repo.owner.login === orgName ? 'Org' : 'Personal'} Repository
                    </a>
                </div>
            `;
            projectsContainer.innerHTML += projectCard;
        });
