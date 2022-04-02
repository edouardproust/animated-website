class ConfigAnimations {

    /**
     * Configure animations for the entire website and/or specific pages
     * 
     * How to use:
     * 1. Initiate (one time, by creating a global const): const animsConfig = new ConfigAnimations()
     * 2. Load or reload animations (each time needed): animsConfig.load()
     * 
     How to customize animations:
     * * Activate or desactivate by comment, uncomment or editing lines inside class' 
     *   private methods', like #globalAnimations(), #singlePagesRouter(), etc.
     */
    constructor() {
        // properties - defined in .load()
        this.slides
        this.animations
        this.pageName
        // load dependencies - once
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    }

    // To be customized! (private methods)

    /**
     * Activate / descativate animations to be fired on all pages
     * @returns {void}
     */
    #globalAnimations() {
        new GlobalAnimation()
            .navFixedHideShowOnScroll()
            //.navFixedGrowOnTopOfPage()
            .navSlideDownOnLoad(0.25)
            .toggleMenu(true)
            .cursorCircle()
            .cursorActive({
                tap: ['.slide__content--btn-in', '.menu__container--links a', '.scrollto__arrow'], 
                colored: ['nav .logo', '.menu-hamburger']
            })
            //.pageTransitions()
    }

    /**
     * Set routes for single pages animations (by opposition of site-wide animations)
     */
    #singlePagesRouter() {
        switch(this.pageName) {
            case 'home':
                this.#setSlides(this.pageName)
                this.#homeBeforeEnter()
                break
            case 'top3':
                this.#setSlides(this.pageName)
                this.#top3beforeEnter() 
                break
        }
    }

    /**
     * Activate / descativate animations to be fired on load of homepage only
     * @returns {void}
     */
    #homeBeforeEnter() {
        this.animations.forEach( anim => 
            anim.revealStyle1()
                .fixedFadeOut()
                .swipeTitleOnBtnHover(['lightseagreen', 'tomato', 'CornflowerBlue'], true)
        )
    }

    /**
     * Activate / descativate animations to be fired on page load of 'top3' only
     * @returns {void}
     */
    #top3beforeEnter() {
        this.animations.forEach( anim => 
            anim.revealStyle2()
                .imageFloat()
                .scrollToArrows(this.pageName)
        )
    }

    // Don't modify!

    /**
     * 
     */
    load() {
        this.pageName = document.querySelector('main').getAttribute('data-barba-namespace')
        this.animations = []
        // website-wide animations
        this.#singlePagesRouter()
        this.#globalAnimations()
    }

    #setSlides (pageName) {
        this.slides = document.querySelectorAll('.slide.'+pageName)
        this.slides.forEach ( (slide, index, slides) => {
            this.animations.push( new SinglePageAnimation (slide, index, slides, this.pageName) )
        })
    }


}