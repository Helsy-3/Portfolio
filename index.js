function setProgress(id, percent) {
                let circle = document.querySelector(`#${id}`).parentNode.parentNode.querySelector('circle');
                let radius = circle.r.baseVal.value;
                let circumference = radius * 2 * Math.PI;
                circle.style.strokeDasharray = `${circumference} ${circumference}`;
                circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
}

document.addEventListener('DOMContentLoaded', (event) => {
                setProgress('number-html', 70);
                setProgress('number-css', 85);
                setProgress('number-js', 70);
                setProgress('number-php', 75);
                setProgress('number-react', 70);
                setProgress('number-mysql', 80);
                setProgress('number-postgresql', 75);
                setProgress('number-vscode', 85);
                setProgress('number-git', 80);
                setProgress('number-github', 80);
});


//juste pour tester

document.getElementById('contact-form').addEventListener('submit', function (event) {
                event.preventDefault();

                // Validation des champs requis
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;

                if (!name || !email) {
                                document.getElementById('response').innerText = 'Veuillez remplir tous les champs requis.';
                                return;
                }

                var formData = new FormData(this);
                var data = {};
                formData.forEach((value, key) => {
                                data[key] = value;
                });

                // Affichage du message de chargement
                document.getElementById('response').innerText = 'Envoi du message...';

                //récuperer
                fetch('https://script.google.com/macros/s/AKfycbz1VIRYOTafrqdV4gOcmJhWaVQk98gylGcLfqJUF7NGx66w-_TRX7S0AW1cCWCfRSRjew/exec', {
                                method: 'POST',
                                headers: {
                                                'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(data),
                })
                                .then(response => response.json())
                                .then(data => {
                                                document.getElementById('response').innerText = 'Message envoyé avec succès!';
                                                document.getElementById('contact-form').reset();
                                })
                                .catch((error) => {
                                                document.getElementById('response').innerText = 'Erreur lors de l\'envoi du message.';
                                                console.error('Error:', error);
                                });
});
