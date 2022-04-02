class GlobalAnimation {
    
    /**
     * Run animations on all the pages of the website
     */
    constructor() {
        // selectors
        this.body = document.querySelector('body')
        this.nav = document.querySelector('nav')
        this.navInner = [document.querySelector('.nav-bg'), document.querySelector('.nav-content')]
        this.logo = this.nav.querySelector('.logo')
        this.burger = this.nav.querySelector('.menu-hamburger')
        this.menu = document.querySelector('.menu-container')
        this.cursor
    }

    //=================| WITH SCROLL TRIGGER |=================

    /**
     * Activate this animation:
     * * Make the navbar fixed on top of page. 
     * * When scrolling down, the navbar disapears.
     * * When scrolling up, the navbar appears back.
     */
    navFixedHideShowOnScroll() 
    {
        this.nav.style.position = "fixed"
        const navAnim = gsap.from(this.navInner, {
            yPercent: -100,
            paused: true,
            duration: 0.2
        }).progress(1);
        ScrollTrigger.create({
            start: "top top",
            end: 99999,
            onUpdate: (self) => {
                self.direction === -1 ? navAnim.play() : navAnim.reverse()
            }
        })
        return this
    }

    /**
     * Activate this animation:
     * * Make the navbar fixed on top of page.
     * * When scrolling down, the logo and burger menu scale gets smaller
     * * When scrolling to the top of the page, those items gets bigger
     */
    navFixedGrowOnTopOfPage() {
        this.nav.style.position = "fixed"
        const anim = gsap
            .fromTo([this.logo, this.burger], 0.3, { scale: 1.5 }, { scale: 1 })
            .pause()
        ScrollTrigger.create({
            trigger: this.nav,
            start: 'bottom top',
            end: 99999,
            onEnter: () => anim.play(),
            onLeaveBack: () => anim.reverse()
        });
        return this
    }

    //=================| WITHOUT SCROLL TRIGGER |=================

    /**
     * Page transitions made with BARBA.JS
     * To be finished (work in progress!)
     * Options not available right now in COnfigAnimation.js 
     * or it will crash the website!
     */
    pageTransitions() {
        barba.init({
            views: [
                {
                    namespace: 'home',
                    beforeEnter() {
                        console.log('home - beforeEnter', ScrollTrigger.getById('revealStyle1'))
                    },
                    beforeLeave() {
                        console.log('home - beforeLeave', ScrollTrigger.getById('revealStyle1'))
                        // ['revealStyle2'].forEach(id => {
                        //     ScrollTrigger.getById(id).kill(true)
                        // })
                        //gsap.killTweensOf('.slide')
                    }
                },{
                    namespace: 'top3',
                    beforeEnter() {
                        console.log('top3 - beforeEnter', ScrollTrigger.getById('revealStyle1'))
                    },
                    beforeLeave() {
                        console.log('top3 - beforeLeave', ScrollTrigger.getById('revealStyle1'))
                        // ['revealStyle2'].forEach(id => {
                        //     ScrollTrigger.getById(id).kill(true)
                        // })
                        //gsap.killTweensOf('.slide')
                    }
                }
            ],
            transitions: [
                {
                    name: 'opacity-transition',
                    leave(data) {
                        return gsap.to(data.current.container, {
                            opacity: 0
                        });
                    },
                    enter(data) {
                        return gsap.from(data.next.container, {
                            opacity: 0
                        });
                    }
                }
            ]
        })
        return this
    }

    /**
     * Activate this animation:
     * * Make the navBar slide down on page load
     * @param {number} timeout Delay before animation starts (in seconds, without the unit)
     */
    navSlideDownOnLoad(timeout = 0) {
        gsap.set(this.navInner, { y: '-100px' })
        document.addEventListener('DOMContentLoaded', () => {
            gsap.to(this.navInner, { y: 0, delay: 0.5 })
        })
        return this
    }

    /**
     * Activate this animation:
     * * Open a fullpage menu when navbar's burger icon is clicked.
     * * Appears and disappears in a nice circlePath effect
     * @param {bool} closeAnimationOnLinkClick Run menu's close animation before redirecting to link target? | Default: false
     */
    toggleMenu(closeAnimationOnLinkClick = false) {
        let lines = this.burger.querySelectorAll('div')
        let openMenu = () => {
            //this.menu.style.top = window.pageYOffset + 'px'
            gsap.to(this.menu, { clipPath: 'circle(200% at 100% 0%)' })
            gsap.to(lines[0], { rotation: 45, y: 5, background: 'white' })
            gsap.to(lines[1], { rotation: -45, y: -4, background: 'white' })
            gsap.to(this.logo, { color: 'white' })
            this.menu.classList.add('active')
            this.cursor.style.borderColor = 'white'
            this.cursor.style.filter = 'grayscale(100%)'
            // scrollBar
            this.body.style.overflowY = 'hidden'
        } 
        let closeMenu = () => {
            let tlClose = gsap.timeline()
                .to(this.menu, { clipPath: 'circle(0% at 100% 0%)' })
                .to(lines[0], { rotation: 0, y: 0, background: 'black' }, '-=100%')
                .to(lines[1], { rotation: 0, y: 0, background: 'black' }, '-=100%')
                .to(this.logo, { color: 'black' }, '-=100%')
            this.menu.classList.remove('active')
            this.cursor.style.borderColor = 'black'
            this.cursor.style.filter = 'grayscale(0%)'
            // scrollBar
            this.body.style.overflowY = 'overlay'
            return tlClose
        }
        this.burger.addEventListener('click', (e) => {
            if (!this.menu.classList.contains('active')) {
                openMenu()
            } else {
                closeMenu()
            }
        })
        // Run 'closeMenu' animation before redirecting when clicking a link
        if(closeAnimationOnLinkClick) {
            let links = this.menu.querySelectorAll('.menu__container--links a')
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault()
                    closeMenu().then(() => {
                        if(e.target.target === '_blank') {
                            window.open(e.target.href, e.target.target)
                        } else {
                            window.location.href = e.target.href
                        }
                    })
                })
            })
        }
        return this
    }

    /**
     * Activate this animation:
     * * Replace cursor style by a circle
     * @param {number} circleSize  Diameter in px
     * @param { number} circleThickness Thickness of line in px
     */
    cursorCircle(circleDiameter = 40, circleThickness = 2) {
        // cursor style
        const cursor = document.querySelector('.cursor-custom')
        this.cursor = cursor
        // position
        cursor.style.position = 'fixed'
        cursor.style.display = 'none'
        cursor.style.pointerEvents = 'none'
        // look
        cursor.style.border = 'solid ' + circleThickness + 'px black'
        cursor.style.borderRadius = '50%'
        cursor.style.width = circleDiameter + 'px'
        cursor.style.height = circleDiameter + 'px'
        // transition
        cursor.style.transition = 'background-color 0.3s, transform 0.3s, cursor 0.3s'
        // event on move
        window.addEventListener('mousemove', e => {
            // make circle follow the cursor
            cursor.style.display = 'flex'
            cursor.style.top = (e.clientY - circleDiameter / 2) + 'px'
            cursor.style.left = (e.clientX - circleDiameter / 2) + 'px'
            // Hide if is cursor is outside the viewport
            let viewportWidth = window.innerWidth
            let viewportHeight = window.innerHeight
            if (e.clientX < 20 || e.clientX > (viewportWidth - 20) || e.clientY < 10 || e.clientY > (viewportHeight - 20)) {
                cursor.style.display = 'none'
                this.body.style.cursor = 'default'
            } else {
                cursor.style.display = 'flex'
                this.body.style.cursor = 'none'
            }
        })
        return this
    }

    /**
     * Activate this animation:
     * * Make the the circle cursor grow while hoveriing specific HTMLElements on the page
     * * 2 animations available for now: 
     * ** cursorActive.tap ** show a 'tap' message and grow white and medium / 
     * ** cursorActive.colored** get coloured and grow big
     * * (Needs 'cursorCircle' animation previously, so loads it if not already) 
     */
    cursorActive(selectors = { tap: [], colored: [] }, color = 'lightBlue') {
        if (this.cursor === undefined) {
            this.cursorCircle()
        }
        selectors.tap.forEach(selector => {
            let nodeList = document.querySelectorAll(selector)
            nodeList.forEach(element => {
                element.addEventListener('mouseenter', (e) => {
                    this.cursor.style.backgroundColor = "white"
                    this.cursor.style.transform = "scale(2)"
                    this.cursor.style.borderWidth = '1px'
                    let text = document.createElement('div')
                    text.innerText = "tap"
                    text.style.fontSize = '0.5rem'
                    text.style.margin = 'auto'
                    this.cursor.appendChild(text)
                    // hide cursor
                    element.style.cursor = 'none'
                    if (element.querySelector('a') !== null) {
                        element.querySelector('a').style.cursor = 'none'
                    }
                })
                element.addEventListener('mouseleave', (e) => {
                    this.cursor.style.borderWidth = '2px'
                    this.cursor.style.removeProperty('background-color')
                    this.cursor.style.removeProperty('transform')
                    this.cursor.querySelector('div').remove()
                })
            })
        })
        selectors.colored.forEach(selector => {
            let nodeList = document.querySelectorAll(selector)
            nodeList.forEach(element => {
                element.addEventListener('mouseenter', (e) => {
                    this.cursor.style.transform = 'scale(2.5)'
                    this.cursor.style.borderWidth = '0.3px'
                    this.cursor.style.backgroundColor = color
                    // hide cursor
                    element.style.cursor = 'none'
                    if (element.querySelector('a') !== null) {
                        element.querySelector('a').style.cursor = 'none'
                    }
                })
                element.addEventListener('mouseleave', (e) => {
                    this.cursor.style.borderWidth = '2px'
                    this.cursor.style.removeProperty('transform')
                    this.cursor.style.removeProperty('background-color')
                })
            })
        })
        return this
    }

}