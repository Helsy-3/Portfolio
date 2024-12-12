document.addEventListener('DOMContentLoaded', () => {
                // Fonction pour définir la progression du cercle
                const setProgress = (element, percent) => {
                                const circle = element.querySelector('circle');
                                const radius = circle.r.baseVal.value;
                                const circumference = radius * 2 * Math.PI;

                                circle.style.strokeDasharray = `${circumference} ${circumference}`;
                                circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
                };

                // Sélectionner tous les skills
                const skills = document.querySelectorAll('.skill');

                // Données de compétences
                const skillData = {
                                'number-html': 70,
                                'number-css': 85,
                                'number-js': 75,
                                'number-php': 75,
                                'number-nodejs': 75,
                                'number-mysql': 80,
                                'number-vscode': 85,
                                'number-github': 80
                };

                // Parcourir les compétences et appliquer les progressions
                skills.forEach(skill => {
                                const percentElement = skill.querySelector('.inner div');
                                if (percentElement) {
                                                const percent = skillData[percentElement.id];
                                                if (percent !== undefined) {
                                                                setProgress(skill, percent);
                                                }
                                }
                });
});
document.addEventListener('DOMContentLoaded', () => {
                // Pour les images des projets
                const projectImages = document.querySelectorAll('.projet img, .veille img');

                const pdfPaths = {
                                'Hathor.png': '/assets/AP1.pdf',
                                'M2L.png': '/assets/AP2.pdf',
                                'GLPI.png': '/assets/GLPI.pdf',
                                'veille-1.png': '/assets/RAYNEO X2.pdf',
                };

                projectImages.forEach(image => {
                                image.style.cursor = 'pointer';

                                image.addEventListener('click', () => {
                                                const filename = image.getAttribute('src').split('/').pop();
                                                const pdfPath = pdfPaths[filename];

                                                if (pdfPath) {
                                                                window.open(pdfPath, '_blank');
                                                } else {
                                                                console.warn(`No PDF found for image: ${filename}`);
                                                }
                                });
                });

                // Pour le bouton de téléchargement
                const downloadButton = document.getElementById("download-button");
                console.log(downloadButton); // Vérifiez que l'élément est bien trouvé
                if (downloadButton) {
                                downloadButton.addEventListener("click", function () {
                                                window.open("/assets/Tableau de synthèse.pdf", "_blank");
                                });
                } else {
                                console.log("Élément non trouvé.");
                }
});







document.addEventListener('DOMContentLoaded', () => {
                const form = document.getElementById('contact-form');
                const responseElement = document.getElementById('response');

                form.addEventListener('submit', function (event) {
                                event.preventDefault();

                                const formData = new FormData(this);
                                const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
                                const emptyFields = requiredFields.filter(field => !formData.get(field).trim());

                                if (emptyFields.length > 0) {
                                                responseElement.textContent = 'Veuillez remplir tous les champs.';
                                                responseElement.style.color = 'red';
                                                return;
                                }

                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if (!emailRegex.test(formData.get('email'))) {
                                                responseElement.textContent = 'Veuillez entrer une adresse email valide.';
                                                responseElement.style.color = 'red';
                                                return;
                                }

                                const submitButton = form.querySelector('input[type="submit"]');
                                submitButton.disabled = true;
                                submitButton.value = 'Envoi en cours...';

                                responseElement.textContent = 'Envoi du message...';
                                responseElement.style.color = 'blue';

                                const scriptURL = 'https://script.google.com/macros/s/AKfycbz1VIRYOTafrqdV4gOcmJhWaVQk98gylGcLfqJUF7NGx66w-_TRX7S0AW1cCWCfRSRjew/exec';

                                fetch(scriptURL, {
                                                method: 'POST',
                                                body: formData
                                })
                                                .then(response => response.json())
                                                .then(result => {
                                                                responseElement.textContent = 'Message envoyé avec succès !';
                                                                responseElement.style.color = 'green';
                                                                form.reset();
                                                })
                                                .catch(error => {
                                                                console.error('Erreur:', error);
                                                                responseElement.textContent = 'Une erreur est survenue. Veuillez réessayer.';
                                                                responseElement.style.color = 'red';
                                                })
                                                .finally(() => {
                                                                submitButton.disabled = false;
                                                                submitButton.value = 'Send Message';
                                                });
                });
});
