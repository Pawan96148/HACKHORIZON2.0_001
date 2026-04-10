document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LANGUAGE PERSISTENCE & DICTIONARY ---
    const translations = {
        en: {
            tagline: "Your Guide. Your Rights. Your Voice.",
            nav_home: "Home", nav_guidance: "Legal Guidance", nav_docs: "Documents", nav_ask: "Ask NagrikNetra",
            login: "Login", signup: "Sign Up", hero_title: "Understand. Act. Empower.",
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
            login: "लॉग इन", signup: "साइन अप", hero_title: "समझें। कार्य करें। सशक्त बनें।",
            hero_sub: "नागरिकनेत्र जटिल सरकारी प्रक्रियाओं और कानूनी दस्तावेजों को स्पष्ट, चरण-दर-चरण मार्गदर्शन में सरल बनाता है।",
            upload_title: "अपलोड या स्कैन करें", upload_sub: "शुरू करने के लिए अपना दस्तावेज़ प्रदान करें",
            btn_browse: "फ़ाइल चुनें", btn_camera: "कैमरा", btn_cancel: "रद्द करें", btn_capture: "फोटो लें", btn_retake: "फिर से लें", btn_analyze: "दस्तावेज़ का विश्लेषण करें",
            feat1_title: "सरल शब्द", feat1_desc: "जटिल कानूनी भाषा आसानी से समझाई गई।",
            feat2_title: "चरण-दर-चरण", feat2_desc: "पहले क्या करना है, इसके स्पष्ट निर्देश।",
            feat3_title: "दृश्य वर्कफ़्लो", feat3_desc: "फ़्लोचार्ट के साथ प्रक्रियाओं को समझें।",
            feat4_title: "आपकी भाषा", feat4_desc: "कई भारतीय भाषाओं में उपलब्ध।"
        }
    };

    const languageSelector = document.getElementById('language-selector');

    function applyLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });
    }

    if (languageSelector) {
        const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
        languageSelector.value = savedLanguage;
        applyLanguage(savedLanguage);

        languageSelector.addEventListener('change', (event) => {
            const selectedLang = event.target.value;
            localStorage.setItem('preferredLanguage', selectedLang);
            applyLanguage(selectedLang);
        });
    }

    // --- 2. Action Logic for Clickable Tags (index.html) ---
    const allTags = document.querySelectorAll('.tag');
    allTags.forEach(tagElement => {
        tagElement.addEventListener('click', function() {
            if (this.tagName === 'BUTTON') alert("Opening procedure for: " + this.innerText);
        });
    });

    // --- 3. Hybrid File & Camera Logic (index.html) ---
    const uploadOptions = document.getElementById('upload-options'), cameraUI = document.getElementById('camera-ui');
    const fileInput = document.getElementById('file-input'), fileNameDisplay = document.getElementById('file-name'), analyzeBtn = document.getElementById('analyze-btn');
    const browseBtn = document.getElementById('browse-btn'), openCameraBtn = document.getElementById('camera-btn');
    const cancelCameraBtn = document.getElementById('cancel-camera-btn'), captureBtn = document.getElementById('capture-btn'), retakeBtn = document.getElementById('retake-btn');
    const videoElement = document.getElementById('camera-stream'), canvasElement = document.getElementById('snapshot-canvas');
    let cameraStream = null;

    if(browseBtn) browseBtn.addEventListener('click', () => fileInput.click());
    if(fileInput) fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            fileNameDisplay.innerText = "Selected: " + this.files[0].name;
            analyzeBtn.style.display = 'block';
        }
    });

    function stopCamera() { if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; } }

    if(openCameraBtn) openCameraBtn.addEventListener('click', async () => {
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            videoElement.srcObject = cameraStream;
            uploadOptions.style.display = 'none'; cameraUI.style.display = 'flex';
            videoElement.style.display = 'block'; canvasElement.style.display = 'none';
            captureBtn.style.display = 'block'; retakeBtn.style.display = 'none'; analyzeBtn.style.display = 'none';
        } catch (err) { alert("Camera blocked. Please use Localhost/HTTPS to test camera."); }
    });

    if(cancelCameraBtn) cancelCameraBtn.addEventListener('click', () => {
        stopCamera(); cameraUI.style.display = 'none'; uploadOptions.style.display = 'block';
        if (fileInput.files.length > 0) analyzeBtn.style.display = 'block';
    });

    if(captureBtn) captureBtn.addEventListener('click', () => {
        canvasElement.width = videoElement.videoWidth; canvasElement.height = videoElement.videoHeight;
        canvasElement.getContext('2d').drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        stopCamera();
        videoElement.style.display = 'none'; canvasElement.style.display = 'block';
        captureBtn.style.display = 'none'; retakeBtn.style.display = 'block'; analyzeBtn.style.display = 'block';
    });

    if(retakeBtn) retakeBtn.addEventListener('click', () => openCameraBtn.click());

    if(analyzeBtn) analyzeBtn.addEventListener('click', () => {
        const originalHTML = analyzeBtn.innerHTML;
        analyzeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
        setTimeout(() => { alert("Document sent to AI!"); analyzeBtn.innerHTML = originalHTML; }, 1500);
    });

    // --- 4. RTI WIZARD LOGIC (rti.html) ---
    function goToStep(stepNumber) {
        document.querySelectorAll('.wizard-step').forEach(step => step.style.display = 'none');
        document.querySelectorAll('.progress-step').forEach(ind => ind.classList.remove('active'));
        
        const targetStep = document.getElementById(`step-${stepNumber}`);
        if (targetStep) targetStep.style.display = 'block';
        
        const targetIndicator = document.getElementById(`indicator-${stepNumber}`);
        if (targetIndicator) targetIndicator.classList.add('active');
    }

    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', (e) => goToStep(e.target.closest('button').getAttribute('data-next')));
    });

    document.querySelectorAll('.prev-btn').forEach(btn => {
        btn.addEventListener('click', (e) => goToStep(e.target.closest('button').getAttribute('data-prev')));
    });

    const generateBtn = document.getElementById('generate-rti-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            generateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Formatting Legal Draft...';
            
            setTimeout(() => {
                // Gather input values, fallback to generic if empty
                const dept = document.getElementById('rti-dept').value || '[Department Name]';
                const subject = document.getElementById('rti-subject').value || '[Subject]';
                const q1 = document.getElementById('rti-q1').value || '[Question 1]';
                const q2 = document.getElementById('rti-q2').value; 
                const name = document.getElementById('rti-name').value || '[Applicant Name]';
                // Replace newline characters with <br> for HTML rendering
                const addressText = document.getElementById('rti-address').value || '[Applicant Address]';
                const address = addressText.replace(/\n/g, '<br>');
                const date = new Date().toLocaleDateString();

                let q2HTML = q2 ? `<li>${q2}</li>` : ""; 
                
                // Construct the HTML Draft
                const draftHTML = `
                    <div style="padding: 20px; color: #000; font-family: 'Times New Roman', serif; line-height: 1.5;">
                        <p style="text-align: right; margin-bottom: 20px;"><strong>Date:</strong> ${date}</p>
                        <p style="margin-bottom: 20px;">
                            <strong>To,</strong><br>
                            The Public Information Officer (PIO)<br>
                            ${dept}
                        </p>
                        <p style="margin-bottom: 20px;"><strong>Subject:</strong> Information sought under Right to Information Act, 2005</p>
                        <p style="margin-bottom: 20px;"><strong>Reference:</strong> ${subject}</p>
                        <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
                        <p style="margin-bottom: 10px;">Dear Sir/Madam,</p>
                        <p style="margin-bottom: 15px;">Please provide the following information under the RTI Act, 2005:</p>
                        <ol style="margin-left: 30px; margin-bottom: 20px;">
                            <li style="margin-bottom: 10px;">${q1}</li>
                            ${q2HTML}
                        </ol>
                        <p style="margin-bottom: 30px;">I have attached the requisite RTI application fee of Rs. 10/- via postal order.</p>
                        <p style="margin-bottom: 10px;"><strong>Applicant Details:</strong></p>
                        <p style="margin-bottom: 40px;">${name}<br>${address}</p>
                        <p><strong>Signature:</strong> ___________________</p>
                    </div>
                `;

                // Inject Draft
                document.getElementById('draft-output').innerHTML = draftHTML;

                // Show Success Screen
                document.getElementById('step-3').style.display = 'none';
                document.getElementById('step-success').style.display = 'block';
                document.querySelector('.wizard-progress').style.display = 'none';
            }, 1000);
        });
    }

    // --- 5. PRINT AND DOWNLOAD LOGIC (rti.html) ---
    const printBtn = document.getElementById('print-btn');
    if(printBtn) {
        printBtn.addEventListener('click', () => {
            window.print(); 
        });
    }

    const downloadBtn = document.getElementById('download-pdf-btn');
    if(downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating PDF...';
            
            const element = document.getElementById('pdf-wrapper');
            
            const opt = {
              margin:       [0.5, 0.5, 0.5, 0.5], // top, left, bottom, right
              filename:     'RTI_Application.pdf',
              image:        { type: 'jpeg', quality: 0.98 },
              html2canvas:  { scale: 2, useCORS: true },
              jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            
            // Promise based execution to reset button text
            html2pdf().set(opt).from(element).save().then(() => {
                downloadBtn.innerHTML = originalText;
            }).catch(err => {
                console.error('PDF Generation Failed', err);
                downloadBtn.innerHTML = originalText;
                alert("Failed to generate PDF. Check console for details.");
            });
        });
    }
});