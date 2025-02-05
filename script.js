// fireship beyond good fr
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

const hiddenElements = document.querySelectorAll('.hero-hidden, .section-hidden'); 
hiddenElements.forEach((el) => observer.observe(el));

async function fetchGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/divpreeet/repos?sort=updated&per_page=6');
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        const projects = await response.json();
        
        const projectsGrid = document.querySelector('.projects-grid');
        projectsGrid.innerHTML = '';
        
        if (projects.length === 0) {
            projectsGrid.innerHTML = '<p>No public repositories found.</p>';
            return;
        }
        
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card section-hidden';
            projectCard.innerHTML = `
                <h3>${project.name}</h3>
                <a href="${project.html_url}" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            `;
            projectsGrid.appendChild(projectCard);
            observer.observe(projectCard);
        });
    } catch (error) {
        const projectsGrid = document.querySelector('.projects-grid');
        projectsGrid.innerHTML = `<p style="color: #ff6b6b;">Error loading projects: ${error.message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubProjects();
});