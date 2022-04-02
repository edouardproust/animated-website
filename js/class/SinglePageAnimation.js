
class SinglePageAnimation {

    /**
     * Animations specific to one page
     * @param  {HTMLElement} slide
     * @param  {number} index
     * @param  {array} slides
     */
    constructor (slide, index, slides) {
        // instance props
        this.slide = slide
        this.index = index
        this.slides = slides
        // caclulations
        this.nextSlide = this.slides.length === this.index + 1 ? 'none' : this.slides[this.index + 1]
        this.prevSlide = this.index === 0 ? 'none' : this.slides[this.index - 1]
        // selectors
        this.imgContainer = this.slide.querySelector('.slide__image')
        this.contentContainer = this.slide.querySelector('.slide__content')
        this.img = this.imgContainer.querySelector('img')
        this.imgNumber = this.imgContainer.querySelector('.slide__image--number')
        this.showMoreBtn = this.contentContainer.querySelector('.slide__content--btn-in')
        this.imgOverlay
        this.contentOverlay
        // timelines 
        this.tlRevealStyle2
    }

    //=================| WITH SCROLL TRIGGER |=================

    /**
     * Activate this animation:
     * Reveal slide content - Style 1: Add overlays to image & text a slide them on scroll
     * @returns {SinglePageAnimation} self
     */
    revealStyle1() {
        this.#createOverlays()
        let tl = gsap.timeline( { defaults: { duration: 0.75, ease: "power2.out"} })
            .fromTo(this.imgOverlay, {x: '0%'}, {x: '100%'})
            .fromTo(this.img, {scale: 2}, {scale: 1}, '-=0.75')
            .fromTo(this.contentOverlay, {x: '0%'}, {x: '100%'}, '-=0.5')
        ScrollTrigger.create({
            id: 'revealStyle1',
            trigger: this.slide,
            start: 'top 25%',
            animation: tl
        })
        return this
    }

    /**
     * Activate this animation:
     * Reveal slide content - Style 2: Fade in and translate image, text and number (if exists) on scroll
     * @returns {SinglePageAnimation} self
     */
    revealStyle2() {
        const tl = gsap.timeline( {
            paused: true,
            defaults: { duration: 0.75, ease: "power2.out"},
        })
        tl.fromTo(this.contentContainer, {opacity: 0, x: -200}, {opacity: 1, x: 0})
          .fromTo(this.imgContainer, {opacity: 0, x: 200}, {opacity: 1, x: 0}, '-=0.5')
        if(this.imgNumber) {
            tl.fromTo(this.imgNumber, {opacity: 0, y: -100}, {opacity: 1, y: 0}, '-=0.5')
        }
        ScrollTrigger.create({
            id: 'revealStyle2',
            trigger: this.slide,
            start: 'top center',
            animation: tl
        })
        this.tlRevealStyle2 = tl
        return this
    }

    /**
     * Activate this animation:
     * Make slide fixed and fade it in/out on scroll, in a very cool effect
     * @returns {SinglePageAnimation} self
     */
    fixedFadeOut() {
        if(this.nextSlide !== 'none') {
            let tl = gsap.timeline()
                .fromTo(this.nextSlide, {y: '0%'}, {y: '50%'})
                .fromTo(this.slide, {scale: 1, opacity: 1}, {scale: 0.5, opacity: 0})
                .fromTo(this.nextSlide, {y: '50%'}, {y: '0%'}, '-=0.5')
            ScrollTrigger.create({
                id: 'fixedFadeOut',
                trigger: this.slide,
                start: 'top top',
                scrub: true,
                pin: this.slide,
                pinSpacing: false,
                toggleActions: 'play none reverse none',
                animation: tl
            })
        }
        return this
    }

    /**
     * Activate this animation:
     * * Create arrows to scroll on the top and the bottom of each slide.
     * * Scroll to next or previous slide on arrow click
     * * arrows fade in with a delay on scroll
     * @param {string} pageName 
     * @returns {SinglePageAnimation} self
     */
    scrollToArrows(pageName) {
        if(this.nextSlide !== 'none') {
            let arrowBottom = this.#createArrow('toTop')
            arrowBottom.addEventListener('click', () => {
                gsap.to(window, {duration: 1, scrollTo:{y: '#' + pageName + '-' + (this.index + 1)}});
            })
        }
        if(this.prevSlide !== 'none') {
            let arrowTop = this.#createArrow('toBottom')
            arrowTop.style.top = '0'
            arrowTop.style.transform = 'rotate(180deg)'
            arrowTop.addEventListener('click', () => {
                gsap.to(window, {duration: 1, scrollTo:{y: '#' + pageName + '-' + (this.index - 1)}})
            })
        }
        return this
    }

    //=================| WITHOUT SCROLL TRIGGER |=================

    /**
     * 
     * @returns {SinglePageAnimation} self
     */
    imageFloat() {
        let anim = () => {
            if(this.tlRevealStyle2.progress() == 1) {
                clearInterval(timerId)
                gsap.timeline({defaults: {duration: 3, ease: "power2.inOut"}})
                    .to(this.imgNumber, 3, {y: -5})
                    .to(this.img, 3, {y: -10}, '-=3')
                    .to(this.img, 3, {y: 10, repeat: -1, yoyo: true, ease: "power2.inOut"})
            }
        }
        let timerId = setInterval(anim, 100)
        return this
    }

    /**
     * Activate this animation:
     * * Colorize slide title from bottom to top when hovering the slide's action button
     * @param {array} colors | Array of colors to be applied to each slide title. Should contains as many colors as slides on the page.
     * @param {bool} colorLastWord | Color title's last word by default? Default: true
     * @returns {SinglePageAnimation} self
     */
    swipeTitleOnBtnHover(colors, colorLastWord = true) {
        if(this.showMoreBtn) { 
            // create HTML structure
            let title = this.contentContainer.querySelector('h2')
            let titleContainer = document.createElement('div')
            let swipe = document.createElement('div')
            titleContainer.appendChild(title)
            titleContainer.appendChild(swipe)
            let restOfContent = this.contentContainer.querySelectorAll('*')
            this.contentContainer.appendChild(titleContainer)
            restOfContent.forEach(content => this.contentContainer.appendChild(content))
            // style
            titleContainer.classList.add('slide__title--container')
            swipe.classList.add('slide__title--swipe')
            swipe.style.pointerEvents = 'none'
            // color last word
            if(colorLastWord) {
                let t = title.innerText
                let posFromEnd = t.length - t.lastIndexOf(' ')
                let lastWord = t.substr(-posFromEnd, posFromEnd)
                let firstWords = t.substr(0, t.lastIndexOf(' '))
                colors.forEach((color, index) => {
                    if(this.index === index) {
                        title.innerHTML = `${firstWords}<span style="color:${color}">${lastWord}</span>`
                    }
                })
            }
            // eventListener
            let swipeH = swipe.offsetHeight
            this.showMoreBtn.addEventListener('mouseenter', () => {
                gsap.to(swipe, 0.3, {height: '100%'})
            })
            this.showMoreBtn.addEventListener('mouseleave', () => {
                gsap.to(swipe, 0.3, {height: swipeH})
            })
            // bg colors
            colors.forEach((color, index) => {
                if(this.index === index) {
                    swipe.style.backgroundColor = color
                }
            })
        }
        return this
    }

    //=========================| UTILS |=========================
    // Create HTML elements used in animtions

    /**
     * (Private) Create HTML structure of slide overlays 
     * @returns {void}
     */
    #createOverlays() {
        let imgOverlay = document.createElement('div')
        imgOverlay.classList.add('slide__image--overlay')
        this.imgContainer.appendChild(imgOverlay)
        this.imgOverlay = imgOverlay

        let contentOverlay = document.createElement('div')
        contentOverlay.classList.add('slide__content--overlay')
        this.contentContainer.appendChild(contentOverlay)
        this.contentOverlay = contentOverlay
    }

    /**
     * (Private) Create an HTML arrow and return it
     * @param {string} direction Direction of arrow: 'toTop' or 'toBottom' | Default: 'toBottom'
     * @returns {HTMLElement} Arrow HTML element
     */
    #createArrow(direction = 'toBottom') {
        // create arrows HTML structure
        let arrow = document.createElement('div')
        arrow.classList.add('scrollto')
        arrow.innerHTML = 
        `<div class="scrollto__arrow">
            <div class="scrollto__arrow--line1"></div>
            <div class="scrollto__arrow--line2"></div>
        </div>`
        this.contentContainer.appendChild(arrow)
        // scroll trigger
        ScrollTrigger.create({
            id: 'scrollToArrows',
            trigger: this.slide,
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play reverse play reverse',
            animation: gsap.fromTo(arrow, {opacity: 0, delay: 1}, {opacity: 1, delay: 1})
        })
        if(direction === 'toBottom') {
            arrow.style.top = '0'
            arrow.style.transform = 'rotate(180deg)'
        }
        return arrow
    }

}