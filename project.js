const projects = [
    {
        name: "EchoScript",
        description: "Simple Interpeter programing language (still in develop :3)",
        language: "C++",
        url: "https://github.com/Gazach/EchoScript",
        isOrg: false
    },
    {
        name: "MoonLight Engine",
        description: "Lua 2D Game engine that written in C++ (still prototype)",
        language: "C++",
        url: "https://github.com/Echo2D/Echo2D",
        isOrg: false,
    },

];

function renderProjects() {
    const container = document.getElementById('github-projects');
    let html = '';

    projects.forEach(project => {
        html += `
            <div class="project-card">
                ${project.isOrg ? `
                <div class="repo-source">
                    <span class="org-badge">${project.orgName}</span>
                </div>
                ` : ''}
                <h3 class="project-title">${project.name}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-meta">
                    <span class="project-lang">${project.language}</span>
                </div>
                <a href="${project.url}" target="_blank" class="project-link">
                    View ${project.isOrg ? 'Org' : 'Personal'} Repository
                </a>
            </div>
        `;
    });

    // Add View All button
    html += `
        <a href="https://github.com/gazach" target="_blank" class="view-all">
            View All Projects →
        </a>
    `;

    container.innerHTML = html;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', renderProjects);
