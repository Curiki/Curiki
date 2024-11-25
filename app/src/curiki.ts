import 'beercss';
import 'material-dynamic-colors';
import '../static/css/Curiki-style.css';
import '../static/css/Curiki-theme.css';
import '@mdi/font/css/materialdesignicons.min.css';

document.addEventListener('DOMContentLoaded', function () {
    function setTheme(theme: string) {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
        localStorage.setItem("theme", theme);

        const themeIcon = document.getElementById("theme-icon") as HTMLElement;
        themeIcon.innerText = theme === "light" ? "dark_mode" : "light_mode";

        const icons = document.querySelectorAll('.icon') as NodeListOf<HTMLElement>;

        const blueBanners = document.querySelectorAll('.blue-banner') as NodeListOf<HTMLElement>;
        const pinkBanners = document.querySelectorAll('.pink-banner') as NodeListOf<HTMLElement>;
        const greenBanners = document.querySelectorAll('.green-banner') as NodeListOf<HTMLElement>;
        const orangeBanners = document.querySelectorAll('.orange-banner') as NodeListOf<HTMLElement>;

        const blueBackgrounds = document.querySelectorAll('.blue-background') as NodeListOf<HTMLElement>;
        const pinkBackgrounds = document.querySelectorAll('.pink-background') as NodeListOf<HTMLElement>;
        const greenBackgrounds = document.querySelectorAll('.green-background') as NodeListOf<HTMLElement>;
        const orangeBackgrounds = document.querySelectorAll('.orange-background') as NodeListOf<HTMLElement>;

        if (theme === 'light') {
            icons.forEach(icon => {
                icon.style.filter = 'invert(1)';
            });
            blueBanners.forEach(banner => {
                banner.style.backgroundColor = '#006493';
            });
            blueBackgrounds.forEach(background => {
                background.style.backgroundColor = '#f9f9fc';
                background.style.border = '1px solid #006493';
            });

            pinkBanners.forEach(banner => {
                banner.style.backgroundColor = '#9a25ae';
            });
            pinkBackgrounds.forEach(background => {
                background.style.backgroundColor = '#fff7fa';
                background.style.border = '1px solid #9a25ae';
            });

            greenBanners.forEach(banner => {
                banner.style.backgroundColor = '#006e1c';
            });
            greenBackgrounds.forEach(background => {
                background.style.backgroundColor = '#f9faf4';
                background.style.border = '1px solid #78dc77';
            });

            orangeBanners.forEach(banner => {
                banner.style.backgroundColor = '#b02f00';
            });
            orangeBackgrounds.forEach(background => {
                background.style.backgroundColor = '#fff8f6';
                background.style.border = '1px solid #ffb5a0';
            });
        } else {
            icons.forEach(icon => {
                icon.style.filter = 'invert(0)';
            });
            blueBanners.forEach(banner => {
                banner.style.backgroundColor = '#8dcdff';
            });
            blueBackgrounds.forEach(background => {
                background.style.backgroundColor = '#111416';
                background.style.border = '1px solid #006493';
            });

            pinkBanners.forEach(banner => {
                banner.style.backgroundColor = '#f9abff';
            });
            pinkBackgrounds.forEach(background => {
                background.style.backgroundColor = '#161215';
                background.style.border = '1px solid #9a25ae';
            });

            greenBanners.forEach(banner => {
                banner.style.backgroundColor = '#78dc77';
            });
            greenBackgrounds.forEach(background => {
                background.style.backgroundColor = '#121411';
                background.style.border = '1px solid #78dc77';
            });

            orangeBanners.forEach(banner => {
                banner.style.backgroundColor = '#ffb5a0';
            });
            orangeBackgrounds.forEach(background => {
                background.style.backgroundColor = '#181210';
                background.style.border = '1px solid #ffb5a0';
            });
        }
    }

    const themeToggle = document.getElementById("theme-toggle") as HTMLInputElement;
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.body.classList.contains("dark") ?
            "dark" :
            "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    });

    themeToggle.checked = localStorage.getItem("theme") === "dark";

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
});
