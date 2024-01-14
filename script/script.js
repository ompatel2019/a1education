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
            slideFromLeft("dynamicHrLeft", "50%");
        });

        observeElement(targetRight, () => {
            slideFromRight("dynamicHrRight", "50%");
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

    //Testimonial Data
const testimonials = [
    {
        name: "Sansita Verma",
        rank: "Rank 1 with a trial mark of 97/100 - Cumberland High School",
        img: "132352648716276482833764.svg",
        testimonial: "I was not the best at answering short answer questions and structuring essays but my tutor’s method of pedantic marking allowed me to be more perspective of my responses and write better under time pressure. He is also a responsive person and tries to get back to me as soon as he can. Highly recommend considering A1 Education because they are brilliant !!!!"
    },
    {
        name: "Jet Loiselle",
        rank: "Rank 1 - Hawkesbury High School",
        img: "132352648716276482833764.svg",
        testimonial: "I thoroughly enjoy Karan's teaching style, going through syllabus topics and testing my knowledge afterwards through past paper questions. I find his teaching style to be engaging and as an outcome, my HSC economics knowledge has drastically improved."
    },
    {
        name: "Srujana Yerramsetty",
        rank: "Band 6 - Penrith High School",
        img: "132352648716276482833764.svg",
        testimonial: "My tutor Karan can clearly and concisely explain complex ideas, and he genuinely cares about his pupils’ academic progress and goes to incredible lengths to ensure it. In addition, he is very responsive and makes an effort to help as quickly as possible. "
    }, 
    {
       name: "Anthony Su",
       rank: "Over 40% improvement from Year 11 to Year 12",
       img: "132352648716276482833764.svg",
       testimonial: "A1 education’s tutoring services are the most valued tutoring sessions I have ever signed up for. My Economics tutor has provided me with quality tutoring sessions and services such as fast and detailed responses to my questions both in and out of sessions. Karan provides numerous band 6 exemplar essays and resources which helped me maximise my results. "
    },
    {
        name: "Jay Patel",
        rank: "Over 30% improvement in HSC - Cherrybrook High School",
        img: "132352648716276482833764.svg",
        testimonial: "Through A1 education, from the very first lesson, Karan has been very organised with his material and lesson structure. He has the ability to explain complex topics in an understandable manner which has helped boost my confidence in Economics. "
    },
];
  
  //Current Slide
  let i = 0;
  //Total Slides
  let j = testimonials.length;
  
  let testimonialContainer = document.getElementById("testimonial-container");
  let nextBtn = document.getElementById("next");
  let prevBtn = document.getElementById("prev");
  
  nextBtn.addEventListener("click", () => {
    i = (j + i + 1) % j;
    displayTestimonial();
  });
  prevBtn.addEventListener("click", () => {
    i = (j + i - 1) % j;
    displayTestimonial();
  });
  
  let displayTestimonial = () => {
    testimonialContainer.innerHTML = `
      <p>${testimonials[i].testimonial}</p>
      <img src=images/${testimonials[i].img}>
      <h3>${testimonials[i].name}</h3>
      <h6>${testimonials[i].rank}</h6>
    `;
  };
  window.onload = displayTestimonial;


  function addRedirectToButton(buttonClass, url) {
    var button = document.querySelector(buttonClass);
    if (button) {
        button.addEventListener('click', function() {
            window.open(url, '_blank');
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    addRedirectToButton('.pricing-button', 'https://forms.gle/7nriZV2wFZpeRwa6A');
    addRedirectToButton('.button-link', 'https://forms.gle/7nriZV2wFZpeRwa6A');
});