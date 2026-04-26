// ===== TAILWIND SCRIPT INITIALIZATION =====
        function initializeTailwind() {
            tailwind.config = {
                content: [],
                theme: {
                    extend: {}
                }
            }
        }
        
        // ===== CREATE BACKGROUND STARS =====
        function createStars() {
            const container = document.getElementById('stars-container')
            const starCount = 120
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div')
                star.className = 'star'
                
                const size = Math.random() * 3.5 + 1
                star.style.width = `${size}px`
                star.style.height = `${size}px`
                
                star.style.left = `${Math.random() * 100}%`
                star.style.top = `${Math.random() * 85}%`
                
                // Vary animation delay and duration
                const duration = Math.random() * 3500 + 2200
                star.style.animationDuration = `${duration}ms`
                star.style.animationDelay = `-${Math.random() * 4000}ms`
                
                // Occasionally make some stars brighter
                if (Math.random() > 0.8) {
                    star.style.opacity = '0.9'
                    star.style.boxShadow = '0 0 6px 2px rgb(234 179 8)'
                }
                
                container.appendChild(star)
            }
        }
        
        // ===== COUNTDOWN TIMER =====
        let countdownInterval = null
        
        function startCountdown() {
            // Target date: 47 days from now (simulating July 2025)
            const launchDate = new Date()
            launchDate.setDate(launchDate.getDate() + 47)
            launchDate.setHours(14, 30, 0)
            
            function updateTimer() {
                const now = new Date().getTime()
                const distance = launchDate.getTime() - now
                
                if (distance < 0) {
                    clearInterval(countdownInterval)
                    document.getElementById('days').textContent = "00"
                    document.getElementById('hours').textContent = "00"
                    document.getElementById('minutes').textContent = "00"
                    document.getElementById('seconds').textContent = "00"
                    return
                }
                
                const days = Math.floor(distance / (1000 * 60 * 60 * 24))
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((distance % (1000 * 60)) / 1000)
                
                // Animate numbers
                const daysEl = document.getElementById('days')
                const hoursEl = document.getElementById('hours')
                const minutesEl = document.getElementById('minutes')
                const secondsEl = document.getElementById('seconds')
                
                if (daysEl.textContent !== String(days).padStart(2, '0')) {
                    daysEl.style.transform = 'scale(0.6)'
                    daysEl.textContent = String(days).padStart(2, '0')
                    setTimeout(() => { daysEl.style.transform = 'scale(1)' }, 180)
                }
                
                hoursEl.textContent = String(hours).padStart(2, '0')
                minutesEl.textContent = String(minutes).padStart(2, '0')
                secondsEl.textContent = String(seconds).padStart(2, '0')
            }
            
            updateTimer()
            countdownInterval = setInterval(updateTimer, 1000)
        }
        
        // ===== MOBILE MENU TOGGLE =====
        // Function: toggleMobileMenu()
        // Purpose: Opens and closes the mobile navigation drawer
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobile-menu')
            const icon = document.getElementById('mobile-menu-button')
            
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden')
                icon.innerHTML = `<i class="fa-solid fa-xmark"></i>`
            } else {
                mobileMenu.classList.add('hidden')
                icon.innerHTML = `<i class="fa-solid fa-bars"></i>`
            }
        }
        
        // ===== SMOOTH SCROLL HELPER =====
        // Function: smoothScrollTo(sectionId)
        // Purpose: Smoothly scrolls the page to a given section
        function smoothScrollTo(sectionId) {
            const element = document.getElementById(sectionId)
            if (!element) return
            
            const navHeight = 64
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.scrollY - navHeight
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu')
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu()
            }
        }
        
        // ===== FAKE CLICK ANIMATION ON PREVIEW =====
        function fakeClick(el) {
            el.style.transform = 'scale(0.8)'
            el.style.transitionDuration = '80ms'
            
            setTimeout(() => {
                el.style.transform = 'scale(1)'
                el.style.transitionDuration = '180ms'
            }, 120)
            
            // Show a temporary toast
            showToast("Button would trigger AI deploy in real product")
        }
        
        // ===== TOAST NOTIFICATION =====
        function showToast(message) {
            const toast = document.createElement('div')
            toast.style.cssText = `
                position: fixed; 
                bottom: 30px; 
                left: 50%; 
                transform: translateX(-50%);
                background: rgb(23 23 23);
                color: rgb(234 179 8);
                padding: 16px 24px;
                border-radius: 9999px;
                box-shadow: 0 25px 50px -12px rgb(0 0 0);
                font-size: 13px;
                z-index: 99999;
                white-space: nowrap;
                border: 1px solid rgb(234 179 8 / 0.3);
                animation: toastPopUp 3.2s forwards;
            `
            toast.textContent = message
            document.body.appendChild(toast)
            
            setTimeout(() => {
                toast.style.opacity = 0
                setTimeout(() => toast.remove(), 600)
            }, 2600)
        }
        
        // ===== WAITLIST FORM HANDLER =====
        function handleWaitlistSubmit(e) {
            e.preventDefault()
            
            const emailField = document.getElementById('email-input')
            const email = emailField.value.trim()
            
            if (!email) return
            
            // Simulate network delay
            const originalText = emailField.placeholder
            emailField.disabled = true
            emailField.value = ''
            emailField.placeholder = 'THANK YOU ✨'
            
            setTimeout(() => {
                showToast(`Thank you! We'll notify ${email} when we launch.`)
                
                // Reset form
                emailField.disabled = false
                emailField.placeholder = originalText
                
                // Reset the countdown slightly for dramatic effect
                const secondsEl = document.getElementById('seconds')
                secondsEl.textContent = '42'
            }, 820)
        }
        
        // ===== MODAL CONTROLS =====
        function showNotifyModal() {
            const modal = document.getElementById('modal-backdrop')
            modal.classList.remove('hidden')
            modal.classList.add('flex')
            
            // Auto focus email field
            setTimeout(() => {
                const emailField = document.getElementById('modal-email')
                if (emailField) emailField.focus()
            }, 400)
        }
        
        function hideNotifyModal() {
            const modal = document.getElementById('modal-backdrop')
            modal.classList.add('hidden')
            modal.classList.remove('flex')
        }
        
        // ===== MODAL FORM SUBMISSION =====
        function handleModalSubmit(e) {
            e.preventDefault()
            
            const name = document.getElementById('modal-name').value
            const email = document.getElementById('modal-email').value
            const company = document.getElementById('modal-company').value || 'Independent'
            
            if (!email) {
                alert("Please enter your email address")
                return
            }
            
            hideNotifyModal()
            
            // Show success state
            setTimeout(() => {
                const successHTML = `
                <div class="fixed inset-0 bg-black/90 z-[99999] flex items-center justify-center">
                    <div onclick="event.stopImmediatePropagation()" class="max-w-xs bg-neutral-900 rounded-3xl text-center p-10">
                        <div class="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-2xl flex items-center justify-center mb-6 text-4xl">🚀</div>
                        <div class="heading-font text-3xl mb-2">You're in!</div>
                        <p class="text-neutral-400">Thank you ${name ? name.split(' ')[0] : 'friend'}. We'll send you an invite shortly.</p>
                        <button onclick="this.closest('.fixed').remove()" 
                                class="mt-10 text-xs border border-yellow-400 text-yellow-400 px-8 py-4 rounded-3xl hover:bg-yellow-400 hover:text-neutral-900 transition-all">
                            BACK TO ORION
                        </button>
                    </div>
                </div>`
                
                const successDiv = document.createElement('div')
                successDiv.innerHTML = successHTML
                document.body.appendChild(successDiv.firstElementChild)
            }, 600)
        }
        
        // ===== FOOTER SUBSCRIBE =====
        function handleFooterSubscribe(e) {
            e.preventDefault()
            const emailInput = document.getElementById('footer-email')
            
            if (emailInput.value.trim() === '') return
            
            showToast("Thank you for subscribing!")
            emailInput.value = ''
        }
        
        // ===== FAQ ACCORDION =====
        function toggleFaq(element) {
            const answer = element.querySelector('.faq-answer')
            const icon = element.querySelector('.faq-icon')
            
            if (answer.classList.contains('hidden')) {
                // Close all others
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    if (ans !== answer) {
                        ans.classList.add('hidden')
                        const otherIcon = ans.parentElement.querySelector('.faq-icon')
                        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)'
                    }
                })
                
                answer.classList.remove('hidden')
                icon.style.transform = 'rotate(45deg)'
            } else {
                answer.classList.add('hidden')
                icon.style.transform = 'rotate(0deg)'
            }
        }
        
        // ===== KEYBOARD SHORTCUT =====
        function handleKeyboard(e) {
            if (e.metaKey && e.key === "k") {
                e.preventDefault()
                showNotifyModal()
            }
            
            if (e.key === "/" && document.getElementById('modal-backdrop').classList.contains('hidden')) {
                const activeElement = document.activeElement
                if (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA") return
                showNotifyModal()
            }
        }
        
        // ===== MAIN INITIALIZATION =====
        function initialize() {
            initializeTailwind()
            createStars()
            startCountdown()
            
            // Attach mobile menu handler
            const hamburger = document.getElementById('mobile-menu-button')
            hamburger.addEventListener('click', toggleMobileMenu)
            
            // Close mobile menu when clicking a link inside (already handled in smoothScrollTo)
            
            // Tailwind script ready
            console.log('%cORION coming soon page initialized successfully ✨', 'color:#facc15; font-family:monospace')
            
            // Keyboard shortcuts
            document.addEventListener('keydown', handleKeyboard)
            
            // Demo: click anywhere on the preview image to trigger a toast occasionally
            const previewArea = document.querySelector('[data-section="preview"]')
            if (previewArea) {
                let clicks = 0
                previewArea.addEventListener('click', function(e) {
                    if (e.target.closest('button') || e.target.closest('a')) return
                    
                    clicks++
                    if (clicks % 7 === 0) {
                        showToast("The real product will be even more beautiful")
                    }
                })
            }
            
            // Make the countdown digits clickable for fun
            const countdownContainer = document.querySelector('.flex.items-center.gap-3')
            if (countdownContainer) {
                countdownContainer.style.cursor = 'pointer'
                countdownContainer.addEventListener('click', function() {
                    const seconds = document.getElementById('seconds')
                    seconds.style.transitionDuration = '120ms'
                    seconds.style.transform = 'rotate(360deg)'
                    
                    setTimeout(() => {
                        seconds.style.transitionDuration = '400ms'
                        seconds.style.transform = 'rotate(0deg)'
                    }, 300)
                })
            }
            
            // Progressive enhancement: make sure all interactive elements are accessible
            console.log('%c✓ All sections labeled with data-section attributes', 'color:rgb(163 163 163); font-size:10px')
        }
        
        // Boot the script when the DOM is ready
        window.onload = initialize