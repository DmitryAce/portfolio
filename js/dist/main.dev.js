"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var btnDarkMode = document.querySelector(".dark-mode-btn"); // 1. Проверка темной темы на уровне системных настроек
// Проверяем, если у пользователя предпочтительная цветовая схема - dark,
// то активируем темный режим на кнопке и для всего body.

if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  btnDarkMode.classList.add("dark-mode-btn--active");
  document.body.classList.add("dark");
} // 2. Проверка темной темы в localStorage
// Проверяем предпочтительную цветовую схему в локальном хранилище.


if (localStorage.getItem('darkMode') === 'dark') {
  btnDarkMode.classList.add("dark-mode-btn--active");
  document.body.classList.add("dark");
} else if (localStorage.getItem("darkMode") === "light") {
  btnDarkMode.classList.remove("dark-mode-btn--active");
  document.body.classList.remove("dark");
} // Если меняются системные настройки, меняем тему
// Слушаем изменения в системной цветовой схеме.


window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (event) {
  var newColorScheme = event.matches ? "dark" : "light"; // Обновляем тему в зависимости от системных настроек.

  if (newColorScheme === "dark") {
    btnDarkMode.classList.add("dark-mode-btn--active");
    document.body.classList.add("dark");
    localStorage.setItem("darkMode", "dark");
  } else {
    btnDarkMode.classList.remove("dark-mode-btn--active");
    document.body.classList.remove("dark");
    localStorage.setItem("darkMode", "light");
  }
}); // Включение/выключение ночного режима по клику на кнопку

btnDarkMode.onclick = function () {
  btnDarkMode.classList.toggle("dark-mode-btn--active");
  var isDark = document.body.classList.toggle("dark"); // Сохраняем выбранный режим в локальном хранилище.

  if (isDark) {
    localStorage.setItem("darkMode", "dark");
  } else {
    localStorage.setItem("darkMode", "light");
  }
}; // Открытие/закрытие меню при клике на кнопку "menuSwitcherButton"


var menuSwitcherButton = document.querySelector('.menu-switcher');
var navigation = document.querySelector('.header__navigation');
menuSwitcherButton.addEventListener('click', function (e) {
  navigation.classList.toggle('header__navigation_opened');
  menuSwitcherButton.classList.toggle('menu-switcher_opened');
}); // Закрытие меню при клике на любую из ссылок в меню

navigation.querySelectorAll('.navigation__link').forEach(function (link) {
  link.addEventListener('click', function (e) {
    navigation.classList.toggle('header__navigation_opened');
    menuSwitcherButton.classList.toggle('menu-switcher_opened');
  });
});

var Accordion =
/*#__PURE__*/
function () {
  function Accordion(el) {
    var _this = this;

    _classCallCheck(this, Accordion);

    // Хранение элемента <details>
    this.el = el; // Хранение элемента <summary>

    this.summary = el.querySelector("summary"); // Хранение элемента <div class="content">

    this.content = el.querySelector(".skill__text"); // Хранение объекта анимации (чтобы при необходимости отменить его)

    this.animation = null; // Хранение информации о том, закрывается ли элемент

    this.isClosing = false; // Хранение информации о том, раскрывается ли элемент

    this.isExpanding = false; // Определение кликов пользователя на элементе summary

    this.summary.addEventListener("click", function (e) {
      return _this.onClick(e);
    });
  }

  _createClass(Accordion, [{
    key: "onClick",
    value: function onClick(e) {
      return regeneratorRuntime.async(function onClick$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Остановка стандартного поведения браузера
              e.preventDefault(); // Добавление overflow на элемент <details> для предотвращения выхода контента за границы

              this.el.style.overflow = "hidden"; // Проверка, закрывается ли элемент или он уже закрыт

              if (!(this.isClosing || !this.el.open)) {
                _context.next = 6;
                break;
              }

              this.open(); // Проверка, раскрывается ли элемент или он уже открыт

              _context.next = 9;
              break;

            case 6:
              if (!(this.isExpanding || this.el.open)) {
                _context.next = 9;
                break;
              }

              _context.next = 9;
              return regeneratorRuntime.awrap(this.shrink());

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "shrink",
    value: function shrink() {
      var _this2 = this;

      var startHeight, endHeight;
      return regeneratorRuntime.async(function shrink$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // Установка элемента как "закрывающегося"
              this.isClosing = true; // Хранение текущей высоты элемента

              startHeight = "".concat(this.el.offsetHeight, "px"); // Вычисление высоты summary

              endHeight = "".concat(this.summary.offsetHeight, "px"); // Если уже идёт анимация

              if (this.animation) {
                // Отмена текущей анимации
                this.animation.cancel();
              } // Запуск WAAPI анимации


              _context2.next = 6;
              return regeneratorRuntime.awrap(this.el.animate({
                // Установка keyframes от startHeight до endHeight
                height: [startHeight, endHeight]
              }, {
                duration: 200,
                easing: "ease-out"
              }));

            case 6:
              this.animation = _context2.sent;

              // По завершению анимации, вызов onAnimationFinish()
              this.animation.onfinish = function () {
                return _this2.onAnimationFinish(false);
              }; // Если анимация отменена, переменная isClosing устанавливается в false


              this.animation.oncancel = function () {
                return _this2.isClosing = false;
              };

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "open",
    value: function open() {
      var _this3 = this;

      // Применение фиксированной высоты к элементу
      this.el.style.height = "".concat(this.el.offsetHeight, "px"); // Принудительное установление атрибута [open] на элементе details

      this.el.open = true; // Ожидание следующего кадра для вызова функции expand()

      window.requestAnimationFrame(function () {
        return _this3.expand();
      });
    }
  }, {
    key: "expand",
    value: function expand() {
      var _this4 = this;

      var startHeight, endHeight;
      return regeneratorRuntime.async(function expand$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // Установка элемента как "раскрывающегося"
              this.isExpanding = true; // Получение текущей фиксированной высоты элемента

              startHeight = "".concat(this.el.offsetHeight, "px"); // Вычисление открытой высоты элемента (высота summary + высота content)

              endHeight = "".concat(this.summary.offsetHeight + this.content.offsetHeight, "px"); // Если уже идёт анимация

              if (this.animation) {
                // Отмена текущей анимации
                this.animation.cancel();
              } // Запуск WAAPI анимации


              _context3.next = 6;
              return regeneratorRuntime.awrap(this.el.animate({
                // Установка keyframes от startHeight до endHeight
                height: [startHeight, endHeight]
              }, {
                duration: 200,
                easing: "ease-out"
              }));

            case 6:
              this.animation = _context3.sent;

              // По завершению анимации, вызов onAnimationFinish()
              this.animation.onfinish = function () {
                return _this4.onAnimationFinish(true);
              }; // Если анимация отменена, переменная isExpanding устанавливается в false


              this.animation.oncancel = function () {
                return _this4.isExpanding = false;
              };

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "onAnimationFinish",
    value: function onAnimationFinish(open) {
      // Установка атрибута open на основе параметра
      this.el.open = open; // Очистка хранящейся анимации

      this.animation = null; // Сброс isClosing и isExpanding

      this.isClosing = false;
      this.isExpanding = false; // Удаление overflow hidden и фиксированной высоты

      this.el.style.height = this.el.style.overflow = "";
    }
  }]);

  return Accordion;
}();

document.querySelectorAll("details").forEach(function (el) {
  new Accordion(el);
});