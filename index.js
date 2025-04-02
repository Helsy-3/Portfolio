document.addEventListener('DOMContentLoaded', () => {
                // === 1. Progression des cercles ===
                const setProgress = (element, percent) => {
                                const circle = element.querySelector('circle');
                                const radius = circle.r.baseVal.value;
                                const circumference = radius * 2 * Math.PI;

                                circle.style.strokeDasharray = `${circumference} ${circumference}`;
                                circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
                };

                const skills = document.querySelectorAll('.skill');
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

                skills.forEach(skill => {
                                const percentElement = skill.querySelector('.inner div');
                                if (percentElement) {
                                                const percent = skillData[percentElement.id];
                                                if (percent !== undefined) {
                                                                setProgress(skill, percent);
                                                }
                                }
                });

                // === 2. Clic sur images projets/veille ===
                const projectImages = document.querySelectorAll('.projet img, .veille img');

                const pdfPaths = {
                                'hathor.png': 'assets/AP1.pdf',
                                'M2L.png': 'https://github.com/EnzoSCH1/AP3',
                                'GLPI.png': 'assets/GLPI.pdf',
                                'stage.png': 'assets/Rapport de stage.pdf',
                                'veille-1.png': 'assets/RAYNEO X2 (1).pdf',
                                'to-do list.png': 'https://github.com/Helsy-3/To-Do-list',
                                'image.png': 'https://github.com/Helsy-3/Weather'
                };

                projectImages.forEach((image, index) => {
                                const src = decodeURIComponent(image.getAttribute('src')).split('/').pop();
                                const pdfPath = pdfPaths[src];

                                if (index !== 3 && index !== 4 && pdfPath) {
                                                image.style.cursor = 'pointer';
                                                image.addEventListener('click', () => {
                                                                window.open(pdfPath, '_blank');
                                                });
                                } else if (index !== 3 && index !== 4) {
                                                console.warn(`No PDF found for image: ${src}`);
                                                image.addEventListener('click', () => {
                                                                alert(`Aucun PDF trouvé pour cette image : ${src}`);
                                                });
                                }
                });

                // === 3. Bouton de téléchargement du tableau de synthèse ===
                const downloadButton = document.getElementById("download-button");
                if (downloadButton) {
                                downloadButton.addEventListener("click", function () {
                                                window.open("assets/Tableau de synthèse.pdf", "_blank");
                                });
                } else {
                                console.log("Élément 'download-button' non trouvé.");
                }

                // === 4. Formulaire de contact ===
                const form = document.getElementById('contact-form');
                const responseElement = document.getElementById('response');

                if (form) {
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
                }
});
