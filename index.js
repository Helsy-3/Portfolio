document.addEventListener('DOMContentLoaded', () => {
                // === Clic sur images projets/veilles ===
                const projectImages = document.querySelectorAll('.projet img, .veille img');

                const pdfPaths = {
                                'hathor.png': 'assets/AP1.pdf',
                                'M2L.png': 'https://github.com/EnzoSCH1/AP3',
                                'GLPI.png': 'assets/GLPI.pdf',
                                'stage.png': 'assets/Rapport de stage.pdf',
                                'veille-1.png': 'assets/RAYNEO X2.pdf',
                                'todolist.png': 'https://helsy-3.github.io/To-Do-list',
                                'météo.png': 'https://helsy-3.github.io/Weather',
                                'deepseeck.png': 'assets/Deepseck.pdf'
                };

                projectImages.forEach((image) => {
                                const src = image.getAttribute('src').split('/').pop();
                                const pdfPath = pdfPaths[src];
                                if (pdfPath) {
                                                image.style.cursor = 'pointer';
                                                image.addEventListener('click', () => window.open(pdfPath, '_blank'));
                                }
                });

                // === Bouton téléchargement E4 ===
                const downloadButton = document.getElementById("download-button");
                if (downloadButton) {
                                downloadButton.addEventListener("click", () => {
                                                window.open("assets/Tableau de synthèse.pdf", "_blank");
                                });
                }

                // === Formulaire de contact ===
                const form = document.getElementById('contact-form');
                const responseElement = document.getElementById('response');

                if (form) {
                                form.addEventListener('submit', function (event) {
                                                event.preventDefault();

                                                const formData = new FormData(this);
                                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                                const submitButton = form.querySelector('input[type="submit"]');

                                                if (!emailRegex.test(formData.get('email'))) {
                                                                responseElement.textContent = 'Email invalide.';
                                                                responseElement.style.color = 'red';
                                                                return;
                                                }

                                                submitButton.disabled = true;
                                                submitButton.value = 'Envoi...';
                                                responseElement.textContent = 'Envoi en cours...';
                                                responseElement.style.color = 'blue';

                                                fetch('https://script.google.com/macros/s/AKfycbz1VIRYOTafrqdV4gOcmJhWaVQk98gylGcLfqJUF7NGx66w-_TRX7S0AW1cCWCfRSRjew/exec', {
                                                                method: 'POST',
                                                                body: formData
                                                })
                                                                .then(res => res.json())
                                                                .then(() => {
                                                                                responseElement.textContent = 'Message envoyé avec succès !';
                                                                                responseElement.style.color = 'green';
                                                                                form.reset();
                                                                })
                                                                .catch(() => {
                                                                                responseElement.textContent = 'Erreur. Veuillez réessayer.';
                                                                                responseElement.style.color = 'red';
                                                                })
                                                                .finally(() => {
                                                                                submitButton.disabled = false;
                                                                                submitButton.value = 'Envoyer';
                                                                });
                                });
                }
});
