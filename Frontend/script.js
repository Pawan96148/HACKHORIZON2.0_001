document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. MULTILINGUAL DICTIONARY & PERSISTENCE ---
    const translations = {
        en: {
            tagline: "Your Guide. Your Rights. Your Voice.",
            nav_home: "Home", nav_guidance: "Legal Guidance", nav_docs: "Documents", nav_ask: "Ask NagrikNetra",
            login: "Login", signup: "Sign Up",
            hero_title: "Understand. Act. Empower.",
            hero_sub: "NagrikNetra simplifies complex government procedures and legal documents into clear, step-by-step guidance.",
            upload_title: "Upload or Scan", upload_sub: "Provide your document to begin",
            btn_browse: "Browse", btn_camera: "Camera", btn_cancel: "Cancel", btn_capture: "Capture", btn_retake: "Retake", btn_analyze: "Analyze Document",
            feat1_title: "Simple Words", feat1_desc: "Complex legal language explained easily.",
            feat2_title: "Step-by-Step", feat2_desc: "Clear instructions on what to do first.",
            feat3_title: "Visual Workflows", feat3_desc: "Understand procedures with flowcharts.",
            feat4_title: "Your Language", feat4_desc: "Available in multiple Indian languages."
        },
        hi: {
            tagline: "आपका मार्गदर्शक। आपके अधिकार। आपकी आवाज़।",
            nav_home: "होम", nav_guidance: "कानूनी मार्गदर्शन", nav_docs: "दस्तावेज़", nav_ask: "नागरिकनेत्र से पूछें",
            login: "लॉग इन", signup: "साइन अप",
            hero_title: "समझें। कार्य करें। सशक्त बनें।",
            hero_sub: "नागरिकनेत्र जटिल सरकारी प्रक्रियाओं और कानूनी दस्तावेजों को स्पष्ट, चरण-दर-चरण मार्गदर्शन में सरल बनाता है।",
            upload_title: "अपलोड या स्कैन करें", upload_sub: "शुरू करने के लिए अपना दस्तावेज़ प्रदान करें",
            btn_browse: "फ़ाइल चुनें", btn_camera: "कैमरा", btn_cancel: "रद्द करें", btn_capture: "फोटो लें", btn_retake: "फिर से लें", btn_analyze: "दस्तावेज़ का विश्लेषण करें",
            feat1_title: "सरल शब्द", feat1_desc: "जटिल कानूनी भाषा आसानी से समझाई गई।",
            feat2_title: "चरण-दर-चरण", feat2_desc: "पहले क्या करना है, इसके स्पष्ट निर्देश।",
            feat3_title: "दृश्य वर्कफ़्लो", feat3_desc: "फ़्लोचार्ट के साथ प्रक्रियाओं को समझें।",
            feat4_title: "आपकी भाषा", feat4_desc: "कई भारतीय भाषाओं में उपलब्ध।"
        },
        bn: {
            tagline: "আপনার গাইড। আপনার অধিকার। আপনার ভয়েস।",
            nav_home: "হোম", nav_guidance: "আইনি নির্দেশিকা", nav_docs: "নথিপত্র", nav_ask: "নাগরিকনেত্রকে জিজ্ঞাসা করুন",
            login: "লগইন", signup: "নিবন্ধন করুন",
            hero_title: "বুঝুন। কাজ করুন। ক্ষমতায়িত হন।",
            hero_sub: "নাগরিকনেত্র জটিল সরকারি পদ্ধতি এবং আইনি নথিগুলিকে স্পষ্ট, ধাপে ধাপে নির্দেশিকায় সরল করে তোলে।",
            upload_title: "আপলোড বা স্ক্যান করুন", upload_sub: "শুরু করতে আপনার নথি প্রদান করুন",
            btn_browse: "ব্রাউজ করুন", btn_camera: "ক্যামেরা", btn_cancel: "বাতিল করুন", btn_capture: "ছবি তুলুন", btn_retake: "আবার তুলুন", btn_analyze: "নথি বিশ্লেষণ করুন",
            feat1_title: "সহজ শব্দ", feat1_desc: "জটিল আইনি ভাষা সহজে ব্যাখ্যা করা হয়েছে।",
            feat2_title: "ধাপে ধাপে", feat2_desc: "প্রথমে কী করতে হবে তার স্পষ্ট নির্দেশাবলী।",
            feat3_title: "ভিজ্যুয়াল ওয়ার্কফ্লো", feat3_desc: "ফ্লোচার্ট সহ পদ্ধতিগুলি বুঝুন।",
            feat4_title: "আপনার ভাষা", feat4_desc: "একাধিক ভারতীয় ভাষায় উপলব্ধ।"
        },
        te: {
            tagline: "మీ మార్గదర్శి. మీ హక్కులు. మీ గొంతు.",
            nav_home: "హోమ్", nav_guidance: "న్యాయ మార్గదర్శకత్వం", nav_docs: "పత్రాలు", nav_ask: "నాగ్రిక్‌నేత్రను అడగండి",
            login: "లాగిన్", signup: "సైన్ అప్",
            hero_title: "అర్థం చేసుకోండి. వ్యవహరించండి. సాధికారత పొందండి.",
            hero_sub: "నాగ్రిక్‌నేత్ర సంక్లిష్టమైన ప్రభుత్వ విధానాలు మరియు చట్టపరమైన పత్రాలను స్పష్టమైన, దశలవారీ మార్గదర్శకత్వంగా సులభతరం చేస్తుంది.",
            upload_title: "అప్‌లోడ్ లేదా స్కాన్ చేయండి", upload_sub: "ప్రారంభించడానికి మీ పత్రాన్ని అందించండి",
            btn_browse: "బ్రౌజ్ చేయండి", btn_camera: "కెమెరా", btn_cancel: "రద్దు చేయండి", btn_capture: "ఫోటో తీయండి", btn_retake: "మళ్ళీ తీయండి", btn_analyze: "పత్రాన్ని విశ్లేషించండి",
            feat1_title: "సరళమైన పదాలు", feat1_desc: "సంక్లిష్టమైన చట్టపరమైన భాష సులభంగా వివరించబడింది.",
            feat2_title: "దశలవారీగా", feat2_desc: "ముందుగా ఏమి చేయాలో స్పష్టమైన సూచనలు.",
            feat3_title: "విజువల్ వర్క్‌ఫ్లోలు", feat3_desc: "ఫ్లోచార్ట్‌లతో విధానాలను అర్థం చేసుకోండి.",
            feat4_title: "మీ భాష", feat4_desc: "బహుళ భారతీయ భాషలలో అందుబాటులో ఉంది."
        },
        ta: {
            tagline: "உங்கள் வழிகாட்டி. உங்கள் உரிமைகள். உங்கள் குரல்.",
            nav_home: "முகப்பு", nav_guidance: "சட்ட வழிகாட்டுதல்", nav_docs: "ஆவணங்கள்", nav_ask: "நாக்ரிக்நேத்ராவிடம் கேளுங்கள்",
            login: "உள்நுழை", signup: "பதிவு செய்",
            hero_title: "புரிந்துகொள்ளுங்கள். செயல்படுங்கள். அதிகாரம் பெறுங்கள்.",
            hero_sub: "நாக்ரிக்நேத்ரா சிக்கலான அரசாங்க நடைமுறைகள் மற்றும் சட்ட ஆவணங்களை தெளிவான, படிப்படியான வழிகாட்டுதலாக எளிதாக்குகிறது.",
            upload_title: "பதிவேற்று அல்லது ஸ்கேன் செய்", upload_sub: "தொடங்க உங்கள் ஆவணத்தை வழங்கவும்",
            btn_browse: "உலாவுக", btn_camera: "கேமரா", btn_cancel: "ரத்து செய்", btn_capture: "புகைப்படம் எடு", btn_retake: "மீண்டும் எடு", btn_analyze: "ஆவணத்தை பகுப்பாய்வு செய்",
            feat1_title: "எளிய வார்த்தைகள்", feat1_desc: "சிக்கலான சட்ட மொழி எளிதில் விளக்கப்பட்டுள்ளது.",
            feat2_title: "படிப்படியாக", feat2_desc: "முதலில் என்ன செய்ய வேண்டும் என்பதற்கான தெளிவான வழிமுறைகள்.",
            feat3_title: "காட்சி பணிப்பாய்வுகள்", feat3_desc: "பாய்வு வரைபடங்களுடன் நடைமுறைகளைப் புரிந்து கொள்ளுங்கள்.",
            feat4_title: " உங்கள் மொழி", feat4_desc: "பல இந்திய மொழிகளில் கிடைக்கிறது."
        },
        gu: {
            tagline: "તમારો માર્ગદર્શક. તમારા અધિકારો. તમારો અવાજ.",
            nav_home: "હોમ", nav_guidance: "કાનૂની માર્ગદર્શન", nav_docs: "દસ્તાવેજો", nav_ask: "નાગરિકનેત્રને પૂછો",
            login: "લૉગિન", signup: "સાઇન અપ",
            hero_title: "સમજો. કાર્ય કરો. સશક્ત બનો.",
            hero_sub: "નાગરિકનેત્ર જટિલ સરકારી પ્રક્રિયાઓ અને કાનૂની દસ્તાવેજોને સ્પષ્ટ, પગલા-દર-પગલા માર્ગદર્શનમાં સરળ બનાવે છે.",
            upload_title: "અપલોડ કરો અથવા સ્કેન કરો", upload_sub: "શરૂ કરવા માટે તમારો દસ્તાવેજ પ્રદાન કરો",
            btn_browse: "બ્રાઉઝ કરો", btn_camera: "કૅમેરો", btn_cancel: "રદ કરો", btn_capture: "ફોટો લો", btn_retake: "ફરીથી લો", btn_analyze: "દસ્તાવેજનું વિશ્લેષણ કરો",
            feat1_title: "સરળ શબ્દો", feat1_desc: "જટિલ કાનૂની ભાષા સરળતાથી સમજાવવામાં આવી છે.",
            feat2_title: "પગલાં-દર-પગલાં", feat2_desc: "પ્રથમ શું કરવું તેની સ્પષ્ટ સૂચનાઓ.",
            feat3_title: "વિઝ્યુઅલ વર્કફ્લો", feat3_desc: "ફ્લોચાર્ટ સાથે પ્રક્રિયાઓ સમજો.",
            feat4_title: "તમારી ભાષા", feat4_desc: "બહુવિધ ભારતીય ભાષાઓમાં ઉપલબ્ધ."
        }
    };

    const languageSelector = document.getElementById('language-selector');

    function applyLanguage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });
    }

    if (languageSelector) {
        // Load saved language on startup
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage) {
            languageSelector.value = savedLanguage;
            applyLanguage(savedLanguage);
        }

        // Save language when changed
        languageSelector.addEventListener('change', (event) => {
            const selectedLang = event.target.value;
            localStorage.setItem('preferredLanguage', selectedLang);
            applyLanguage(selectedLang);
        });
    }

    // --- 2. Action Logic for Clickable Tags ---
    const allTags = document.querySelectorAll('.tag');
    allTags.forEach(tagElement => {
        tagElement.addEventListener('click', function() {
            // Only trigger alert if it is a BUTTON. Anchor links (like RTI) will naturally redirect.
            if (this.tagName === 'BUTTON') {
                alert("Opening procedure for: " + this.innerText);
            }
        });
    });

    // --- 3. Hybrid File & Camera Logic ---
    const uploadOptions = document.getElementById('upload-options'), cameraUI = document.getElementById('camera-ui');
    const fileInput = document.getElementById('file-input'), fileNameDisplay = document.getElementById('file-name'), analyzeBtn = document.getElementById('analyze-btn');
    const browseBtn = document.getElementById('browse-btn'), openCameraBtn = document.getElementById('camera-btn');
    const cancelCameraBtn = document.getElementById('cancel-camera-btn'), captureBtn = document.getElementById('capture-btn'), retakeBtn = document.getElementById('retake-btn');
    const videoElement = document.getElementById('camera-stream'), canvasElement = document.getElementById('snapshot-canvas');
    let cameraStream = null;

    browseBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            fileNameDisplay.innerText = "Selected: " + this.files[0].name;
            analyzeBtn.style.display = 'block';
        }
    });

    function stopCamera() { if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; } }

    openCameraBtn.addEventListener('click', async () => {
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            videoElement.srcObject = cameraStream;
            uploadOptions.style.display = 'none'; cameraUI.style.display = 'flex';
            videoElement.style.display = 'block'; canvasElement.style.display = 'none';
            captureBtn.style.display = 'block'; retakeBtn.style.display = 'none'; analyzeBtn.style.display = 'none';
        } catch (err) { alert("Camera blocked. Please use Localhost/HTTPS to test camera."); }
    });

    cancelCameraBtn.addEventListener('click', () => {
        stopCamera(); cameraUI.style.display = 'none'; uploadOptions.style.display = 'block';
        if (fileInput.files.length > 0) analyzeBtn.style.display = 'block';
    });

    captureBtn.addEventListener('click', () => {
        canvasElement.width = videoElement.videoWidth; canvasElement.height = videoElement.videoHeight;
        canvasElement.getContext('2d').drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        stopCamera();
        videoElement.style.display = 'none'; canvasElement.style.display = 'block';
        captureBtn.style.display = 'none'; retakeBtn.style.display = 'block'; analyzeBtn.style.display = 'block';
    });

    retakeBtn.addEventListener('click', () => openCameraBtn.click());

    analyzeBtn.addEventListener('click', () => {
        const originalHTML = analyzeBtn.innerHTML;
        analyzeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
        setTimeout(() => { alert("Document sent to AI!"); analyzeBtn.innerHTML = originalHTML; }, 1500);
    });

    // --- 4. Authentication & User Menu Logic ---
    
    // Check if user is logged in
    function checkAuthStatus() {
        const user = JSON.parse(localStorage.getItem('nagrikNetraUser') || 'null');
        const authButtons = document.getElementById('auth-buttons');
        const userMenu = document.getElementById('user-menu');
        const userName = document.getElementById('user-name');
        
        if (user && user.email) {
            // User is logged in
            if (authButtons) authButtons.style.display = 'none';
            if (userMenu) userMenu.style.display = 'block';
            if (userName) userName.textContent = user.name || user.email.split('@')[0];
        } else {
            // User not logged in
            if (authButtons) authButtons.style.display = 'flex';
            if (userMenu) userMenu.style.display = 'none';
        }
    }

    // Toggle user menu dropdown
    function toggleUserMenu() {
        const dropdownMenu = document.getElementById('dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.classList.toggle('show');
        }
    }

    // Logout function
    window.logout = function(event) {
        event.preventDefault();
        localStorage.removeItem('nagrikNetraUser');
        alert('You have been logged out successfully!');
        checkAuthStatus();
        window.location.href = 'index.html';
    }

    // Profile menu functions
    window.viewProfile = function(event) {
        event.preventDefault();
        alert('Profile page coming soon!');
        toggleUserMenu();
    }

    window.viewSavedDocs = function(event) {
        event.preventDefault();
        alert('Saved documents page coming soon!');
        toggleUserMenu();
    }

    window.viewHistory = function(event) {
        event.preventDefault();
        alert('History page coming soon!');
        toggleUserMenu();
    }

    // Add event listener for user profile button
    const userProfileBtn = document.getElementById('user-profile-btn');
    if (userProfileBtn) {
        userProfileBtn.addEventListener('click', toggleUserMenu);
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const userMenu = document.getElementById('user-menu');
        const dropdownMenu = document.getElementById('dropdown-menu');
        const userProfileBtn = document.getElementById('user-profile-btn');
        
        if (userMenu && !userMenu.contains(event.target)) {
            if (dropdownMenu && dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        }
    });

    // Check auth status on page load
    checkAuthStatus();

    // Handle auth.html form parameter
    if (window.location.pathname.includes('auth.html')) {
        const params = new URLSearchParams(window.location.search);
        if (params.get('form') === 'signup') {
            setTimeout(() => {
                const signupFormBtn = document.querySelectorAll('.toggle-btn')[1];
                if (signupFormBtn) signupFormBtn.click();
            }, 100);
        }
    }
});