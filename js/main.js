const btnDarkMode = document.querySelector(".dark-mode-btn");

// 1. Проверка темной темы на уровне системных настроек
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ) {
    btnDarkMode.classList.add("dark-mode-btn--active");
	document.body.classList.add("dark");
}

// 2. Проверка темной темы в localStorage
if (localStorage.getItem('darkMode') === 'dark') {
    btnDarkMode.classList.add("dark-mode-btn--active");
    document.body.classList.add("dark");
} else if (localStorage.getItem("darkMode") === "light") {
    btnDarkMode.classList.remove("dark-mode-btn--active");
    document.body.classList.remove("dark");
}

// Если меняются системные настройки, меняем тему
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
        const newColorScheme = event.matches ? "dark" : "light";

        if (newColorScheme === "dark") {
			btnDarkMode.classList.add("dark-mode-btn--active");
			document.body.classList.add("dark");
			localStorage.setItem("darkMode", "dark");
		} else {
			btnDarkMode.classList.remove("dark-mode-btn--active");
			document.body.classList.remove("dark");
			localStorage.setItem("darkMode", "light");
		}
    });

// Включение ночного режима по кнопке
btnDarkMode.onclick = function () {
    btnDarkMode.classList.toggle("dark-mode-btn--active");
    const isDark = document.body.classList.toggle("dark");

    if (isDark) {
        localStorage.setItem("darkMode", "dark");
    } else {
        localStorage.setItem("darkMode", "light");
    }
};

const menuSwitcherButton = document.querySelector('.menu-switcher');
const navigation = document.querySelector('.header__navigation');
menuSwitcherButton.addEventListener('click', (e) => {
    navigation.classList.toggle('header__navigation_opened');
    menuSwitcherButton.classList.toggle('menu-switcher_opened');
});

navigation.querySelectorAll('.navigation__link').forEach(link => {
    link.addEventListener('click', e => {
        navigation.classList.toggle('header__navigation_opened');
        menuSwitcherButton.classList.toggle('menu-switcher_opened');
    })
})


class Accordion {
    constructor(el) {
      // Store the <details> element
      this.el = el;
      // Store the <summary> element
      this.summary = el.querySelector("summary");
      // Store the <div class="content"> element
      this.content = el.querySelector(".skill__text");
  
      // Store the animation object (so we can cancel it if needed)
      this.animation = null;
      // Store if the element is closing
      this.isClosing = false;
      // Store if the element is expanding
      this.isExpanding = false;
      // Detect user clicks on the summary element
      this.summary.addEventListener("click", (e) => this.onClick(e));
    }
  
    async onClick(e) {
      // Stop default behaviour from the browser
      e.preventDefault();
      // Add an overflow on the <details> to avoid content overflowing
      this.el.style.overflow = "hidden";
      // Check if the element is being closed or is already closed
      if (this.isClosing || !this.el.open) {
        this.open();
        // Check if the element is being openned or is already open
      } else if (this.isExpanding || this.el.open) {
        await this.shrink();
      }
    }
  
    async shrink() {
      // Set the element as "being closed"
      this.isClosing = true;
  
      // Store the current height of the element
      const startHeight = `${this.el.offsetHeight}px`;
      // Calculate the height of the summary
      const endHeight = `${this.summary.offsetHeight}px`;
  
      // If there is already an animation running
      if (this.animation) {
        // Cancel the current animation
        this.animation.cancel();
      }
  
      // Start a WAAPI animation
      this.animation = await this.el.animate(
        {
          // Set the keyframes from the startHeight to endHeight
          height: [startHeight, endHeight],
        },
        {
          duration: 200,
          easing: "ease-out",
        }
      );
  
      // When the animation is complete, call onAnimationFinish()
      this.animation.onfinish = () => this.onAnimationFinish(false);
      // If the animation is cancelled, isClosing variable is set to false
      this.animation.oncancel = () => (this.isClosing = false);
    }
  
    open() {
      // Apply a fixed height on the element
      this.el.style.height = `${this.el.offsetHeight}px`;
      // Force the [open] attribute on the details element
      this.el.open = true;
      // Wait for the next frame to call the expand function
      window.requestAnimationFrame(() => this.expand());
    }
  
    async expand() {
      // Set the element as "being expanding"
      this.isExpanding = true;
      // Get the current fixed height of the element
      const startHeight = `${this.el.offsetHeight}px`;
      // Calculate the open height of the element (summary height + content height)
      const endHeight = `${
        this.summary.offsetHeight + this.content.offsetHeight
      }px`;
  
      // If there is already an animation running
      if (this.animation) {
        // Cancel the current animation
        this.animation.cancel();
      }
  
      // Start a WAAPI animation
      this.animation = await this.el.animate(
        {
          // Set the keyframes from the startHeight to endHeight
          height: [startHeight, endHeight],
        },
        {
          duration: 200,
          easing: "ease-out",
        }
      );
      // When the animation is complete, call onAnimationFinish()
      this.animation.onfinish = () => this.onAnimationFinish(true);
      // If the animation is cancelled, isExpanding variable is set to false
      this.animation.oncancel = () => (this.isExpanding = false);
    }
  
    onAnimationFinish(open) {
      // Set the open attribute based on the parameter
      this.el.open = open;
      // Clear the stored animation
      this.animation = null;
      // Reset isClosing & isExpanding
      this.isClosing = false;
      this.isExpanding = false;
      // Remove the overflow hidden and the fixed height
      this.el.style.height = this.el.style.overflow = "";
    }
  }
  
  document.querySelectorAll("details").forEach((el) => {
    new Accordion(el);
  });
  