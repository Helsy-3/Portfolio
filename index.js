function setProgress(id, percent) {
                let circle = document.querySelector(`#${id}`).parentNode.parentNode.querySelector('circle');
                let radius = circle.r.baseVal.value;
                let circumference = radius * 2 * Math.PI;
                circle.style.strokeDasharray = `${circumference} ${circumference}`;
                circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
}

document.addEventListener('DOMContentLoaded', (event) => {
                setProgress('number-html', 90);
                setProgress('number-css', 85);
                setProgress('number-js', 80);
                setProgress('number-php', 75);
                setProgress('number-react', 70);
                setProgress('number-mysql', 80);
                setProgress('number-postgresql', 75);
                setProgress('number-vscode', 95);
                setProgress('number-git', 85);
                setProgress('number-github', 80);
});
