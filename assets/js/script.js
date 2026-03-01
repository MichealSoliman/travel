 
    // script navbar start
        const headerr = document.getElementById("headerr");
        const menuBtn = document.getElementById("menuBtn");
        const mobileMenu = document.getElementById("mobileMenu");
        const closeMenuBtn = document.getElementById("closeMenuBtn");
        const menuOverlay = document.getElementById("menuOverlay");
        const mobileLinks = document.querySelectorAll(".mobile-link");

        // تغيير لون الهيدر عند الاسكرول
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                headerr.classList.add("bg-slate-900", "shadow-lg");
                headerr.classList.remove("bg-transparent");
            } else {
                headerr.classList.remove("bg-slate-900", "shadow-lg");
                headerr.classList.add("bg-transparent");
            }
        });

        // فتح القائمة الجانبية
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.remove("translate-x-full");
            menuOverlay.classList.remove("hidden");
        });

        // إغلاق القائمة الجانبية
        function closeMobileMenu() {
            mobileMenu.classList.add("translate-x-full");
            menuOverlay.classList.add("hidden");
        }

        closeMenuBtn.addEventListener("click", closeMobileMenu);
        menuOverlay.addEventListener("click", closeMobileMenu);

        // إغلاق القائمة عند الضغط على رابط
        mobileLinks.forEach(link => {
            link.addEventListener("click", closeMobileMenu);
        });

        // إغلاق القائمة عند الضغط على زر ESC
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMobileMenu();
            }
        });
  // script navbar end





// script Animations start
        // نظام أنيميشن TourDen المخصص
        class TourDenAnimations {
            constructor(options = {}) {
                // إعدادات مخصصة
                this.options = {
                    animationClass: 'tourden-animate',
                    activeClass: 'tourden-active',
                    threshold: 0.15,
                    rootMargin: '0px',
                    stagger: true,
                    maxStaggerDelay: 600,
                    ...options
                };

                // عناصر المراقبة
                this.observer = null;
                this.animatedElements = [];
                this.hasInitialized = false;

                // تهيئة النظام
                this.init();
            }

            init() {
                if (this.hasInitialized) return;

                // العثور على كل العناصر التي تحتوي على كلاس الأنيميشن
                this.animatedElements = Array.from(
                    document.querySelectorAll(`.${this.options.animationClass}`)
                );

                if (this.animatedElements.length === 0) {
                    console.warn('No TourDen animation elements found');
                    return;
                }

                // إنشاء Intersection Observer
                this.createObserver();

                // بدء المراقبة
                this.startObserving();

                this.hasInitialized = true;
                console.log(`TourDen Animations initialized with ${this.animatedElements.length} elements`);
            }

            createObserver() {
                this.observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry, index) => {
                            if (entry.isIntersecting) {
                                this.animateElement(entry.target, index);
                                this.observer.unobserve(entry.target);
                            }
                        });
                    },
                    {
                        threshold: this.options.threshold,
                        rootMargin: this.options.rootMargin
                    }
                );
            }

            startObserving() {
                this.animatedElements.forEach(element => {
                    this.observer.observe(element);
                });
            }

            animateElement(element, index) {
                if (this.options.stagger) {
                    // تأخير عشوائي للعناصر
                    const staggerDelay = Math.random() * this.options.maxStaggerDelay;

                    setTimeout(() => {
                        element.classList.add(this.options.activeClass);
                    }, staggerDelay);
                } else {
                    // بدون تأخير
                    element.classList.add(this.options.activeClass);
                }
            }

            // طريقة لإعادة تعيين الأنيميشن
            reset() {
                this.animatedElements.forEach(element => {
                    element.classList.remove(this.options.activeClass);
                    this.observer.observe(element);
                });
            }

            // طريقة لإضافة عناصر جديدة
            addElements(selector) {
                const newElements = Array.from(document.querySelectorAll(selector));
                newElements.forEach(element => {
                    if (!this.animatedElements.includes(element)) {
                        this.animatedElements.push(element);
                        this.observer.observe(element);
                    }
                });
            }

            // طريقة لتغيير الإعدادات
            updateOptions(newOptions) {
                this.options = { ...this.options, ...newOptions };

                // إعادة إنشاء الـ Observer بالإعدادات الجديدة
                if (this.observer) {
                    this.observer.disconnect();
                    this.createObserver();
                    this.startObserving();
                }
            }
        }

        // نظام الـ Header المخصص
        class TourDenHeader {
            constructor() {
                this.header = document.querySelector('header');
                this.init();
            }

            init() {
                if (!this.header) return;

                window.addEventListener('scroll', () => {
                    if (window.scrollY > 50) {
                        this.header.classList.add('tourden-scrolled');
                    } else {
                        this.header.classList.remove('tourden-scrolled');
                    }
                });
            }
        }

        // نظام الـ Hover Effects المخصص
        class TourDenHoverEffects {
            constructor() {
                this.hoverElements = document.querySelectorAll('.tourden-hover');
                this.init();
            }

            init() {
                this.hoverElements.forEach(element => {
                    element.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
                    element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
                });
            }

            handleMouseEnter(e) {
                const element = e.currentTarget;
                element.style.transform = 'translateY(-5px)';
                element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            }

            handleMouseLeave(e) {
                const element = e.currentTarget;
                element.style.transform = '';
                element.style.boxShadow = '';
            }
        }

        // تهيئة الأنظمة عند تحميل الصفحة
        document.addEventListener('DOMContentLoaded', () => {
            // تهيئة أنيميشن التمرير
            const tourdenAnimations = new TourDenAnimations({
                stagger: true,
                maxStaggerDelay: 600,
                threshold: 0.1
            });

            // تهيئة تأثيرات الـ Header
            const tourdenHeader = new TourDenHeader();

            // تهيئة تأثيرات الـ Hover
            const tourdenHoverEffects = new TourDenHoverEffects();

            // جعل الكائنات متاحة عالمياً للتحكم بها من الخارج
            window.TourDen = {
                animations: tourdenAnimations,
                header: tourdenHeader,
                hover: tourdenHoverEffects
            };

            console.log('TourDen systems initialized successfully');
        });

        // دالة مساعدة للتحكم اليدوي
        function tourdenAnimateElement(element) {
            if (element && element.classList.contains('tourden-animate')) {
                element.classList.add('tourden-active');
            }
        }

        // دالة لإعادة تعيين كل الأنيميشن
        function tourdenResetAnimations() {
            if (window.TourDen && window.TourDen.animations) {
                window.TourDen.animations.reset();
            }
        }

        // جعل الدوال متاحة عالمياً
        window.tourdenAnimateElement = tourdenAnimateElement;
        window.tourdenResetAnimations = tourdenResetAnimations;
  // script Animations end




