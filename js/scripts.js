(function ($) {
    "use strict";
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#sideNav",
    });
    // letter animation
    
    const chars = ['.','$', '%', '#', '@', '&', '(', ')', '[', ']', '<', '>', '=', '+','-', '*', '*', '*', '*', '*', '*', '*', '/', '~', '^', '!', '?', '|','\\',' '];
    const charsTotal = chars.length;
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    class Entry {
        constructor(el) {
            this.DOM = { el: el };
            this.DOM.title = { word: this.DOM.el };
            charming(this.DOM.title.word);
            this.DOM.title.letters = Array.from(this.DOM.title.word.querySelectorAll('span[class^="char"]'));
            this.DOM.title.letters.forEach(letter => letter.dataset.initial = letter.innerHTML);
            this.lettersTotal = this.DOM.title.letters.length;
            observer.observe(this.DOM.el);
        }
        enter(direction = 'down') {
            this.DOM.title.word.style.opacity = 1;

            this.timeouts = [];
            this.complete = false;
            let cnt = 0;
            this.DOM.title.letters.forEach((letter, pos) => {
                const timeout = setTimeout(() => {
                    letter.innerHTML = chars[getRandomInt(0, charsTotal - 1)];
                    setTimeout(() => {
                        letter.innerHTML = letter.dataset.initial;
                        ++cnt;
                        if (cnt === this.lettersTotal) {
                            this.complete = true;
                        }
                    }, 200);
                }, pos * 80);
                this.timeouts.push(timeout);
            });
        }
        exit(direction = 'down') {
            this.DOM.title.word.style.opacity = 1;
            if (this.complete) return;
            for (let i = 0, len = this.timeouts.length; i <= len - 1; ++i) {
                clearTimeout(this.timeouts[i]);
            }
        }
    }

    let observer;
    let current = -1;
    let allentries = [];
    const sections = Array.from(document.querySelectorAll('.text_animate'));


    if ('IntersectionObserver' in window) {
        document.body.classList.add('ioapi');

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0.5) {
                    const newcurrent = sections.indexOf(entry.target);
                    if (newcurrent === current) return;
                    const direction = newcurrent > current;
                    if (current >= 0) {
                        allentries[current].exit(direction ? 'down' : 'up');
                    }
                    allentries[newcurrent].enter(direction ? 'down' : 'up');
                    current = newcurrent;
                }
            });
        }, { threshold: 0.7 });
        sections.forEach(section => allentries.push(new Entry(section)));
    }
})(jQuery);


