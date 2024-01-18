
function cardmagic() {

   const jpg = document.getElementById('card-img');
   if (jpg.style.scale == "1") {
      jpg.style.scale = "1.7";
      jpg.style.transform = "translateY(-10%)translateX(-3%)";
      jpg.style.rotate = "15deg";
   } else {
      jpg.style.transform = "translateY(0%)translateX(0%)";
      jpg.style.scale = "1";
      jpg.style.rotate = "0deg";
   }
}

document.addEventListener('DOMContentLoaded', function () {
   const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {

         entry.target.classList.toggle('show', entry.isIntersecting);


      });
   });

   document.querySelectorAll('[love]').forEach((el) => observer.observe(el));

});


document.addEventListener('DOMContentLoaded', function () {
   fetch('projects/projects.json')
      .then(response => response.json())
      .then(projects => {
         const projectsContainer = document.getElementById('projectsContainer');

         projects.forEach(project => {
            const projectDiv = createProjectDiv(project);
            projectsContainer.appendChild(projectDiv);
         });
      })
      .catch(error => console.error('Error fetching projects:', error));

   function createProjectDiv(project) {
      const projectDiv = document.createElement('div');
      projectDiv.classList.add('project-container');
      projectDiv.addEventListener('click', () => window.location.href = project.link);

      // const projectIcon = document.createElement('img');
      // projectIcon.classList.add('project-icon');
      // projectIcon.src = `https://www.google.com/s2/favicons?domain=${project.link}`;
      // projectDiv.appendChild(projectIcon);

      const projectDetails = document.createElement('div');
      projectDetails.classList.add('project-details');

      const projectName = document.createElement('div');
      projectName.classList.add('project-name');
      projectName.textContent = project.name;
      projectDetails.appendChild(projectName);

      const projectDescription = document.createElement('div');
      projectDescription.classList.add('project-description');
      projectDescription.textContent = project.description;
      projectDetails.appendChild(projectDescription);


      const projectLinks = document.createElement('div');
      projectLinks.classList.add('project-links');

      const previewLink = createLinkButton('Preview', project.link);

      projectLinks.appendChild(previewLink);

      projectDetails.appendChild(projectLinks);

      projectDiv.appendChild(projectDetails);

      return projectDiv;
   }

   function createLinkButton(text, link) {
      const linkButton = document.createElement('a');
      linkButton.classList.add('link-button');
      linkButton.textContent = text;
      linkButton.innerHTML = `${text} <i class="fa-solid fa-arrow-up-right-from-square"></i> `;
      linkButton.href = link;
      linkButton.target = '_blank'; // Open link in a new tab
      return linkButton;
   }
});