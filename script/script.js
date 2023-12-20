// Wait for the document to fully load
document.addEventListener("DOMContentLoaded", function() {

    let options = {
        root: null,  // using the viewport
        rootMargin: '0px',
        threshold: 0.1  // trigger when at least 10% of the target is visible
    };

    let observer = new IntersectionObserver((entries, observer) => {
        let delay = 0;  // Starting delay
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'iconFadeIn 0.5s forwards';
                }, delay);
                delay += 200;  // Add 200ms delay for next icon (can adjust as desired)
                observer.unobserve(entry.target);
            }
        });
    }, options);

    let icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        observer.observe(icon);
    });
});

function slideFromLeft(elementId, finalWidth) {
    const hrElement = document.getElementById(elementId);
    
    if (hrElement) {
        hrElement.style.width = "0";

        setTimeout(() => {
            hrElement.style.transition = "width 1s ease-in-out";
            hrElement.style.width = finalWidth;
        }, 500);
    }
}

function slideFromRight(elementId, finalWidth) {
    const hrElement = document.getElementById(elementId);
    
    if (hrElement) {
        hrElement.style.width = "0";
        hrElement.style.float = "right";

        setTimeout(() => {
            hrElement.style.transition = "width 1s ease-in-out";
            hrElement.style.width = finalWidth;
        }, 500);
    }
}

// Add Intersection Observer
function observeElement(target, callback) {
    let options = {
        root: null, 
        rootMargin: '0px', 
        threshold: 0.1 
    };

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback();
                observer.unobserve(target);
            }
        });
    }, options);

    observer.observe(target);
}

window.addEventListener("load", () => {
    let targetLeft = document.querySelector(".how-it-works");
    let targetRight = document.querySelector(".how-we-teach");

    observeElement(targetLeft, () => {
        slideFromLeft("dynamicHrLeft", "100vh");
    });

    observeElement(targetRight, () => {
        slideFromRight("dynamicHrRight", "85vh");
    });

});

function navigateToTrial() {
    setTimeout(function() {
        window.location.href = '#book-trial';
    }, 150);
}

function fadeInOnScroll() {
    const fadeElements = document.querySelectorAll('.fade-in-element');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.1});

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

window.addEventListener("load", fadeInOnScroll);

document.addEventListener("DOMContentLoaded", function() {
    const link = document.querySelector('a[href="#how-we-teach"]');

    if (link) {
        link.addEventListener("click", function(e) {
            e.preventDefault();

            const target = document.getElementById("how-we-teach");

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const section = document.querySelector('.trusted-by');
    const schoolLogos = document.querySelectorAll('.school-logo-container > div');
    const h2Element = document.querySelector('.trusted-by h2');
    const firstImg = document.querySelector('.trusted-by > img:nth-child(1)');
    const lastImg = document.querySelector('.trusted-by > img:last-child');

    const observer = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
            // Fade in the h2 element
            h2Element.classList.add('fade-in');

            // Rotate the images
            firstImg.style.animation = "rotateIn 1s forwards";
            lastImg.style.animation = "rotateInLast 1s forwards";

            // Add fade-in animation for school logos with a delay
            schoolLogos.forEach((logo, index) => {
                setTimeout(() => {
                    logo.classList.add('fade-in');
                }, (index + 1) * 300); // 500ms delay between each logo
            });

            // Unobserve after applying the animations
            observer.unobserve(section);
        }
    }, {
        threshold: 0.1
    });

    observer.observe(section);
});
