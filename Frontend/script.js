document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Search Bar Logic ---
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    function runSearch() {
        const text = searchInput.value.trim();
        if (text === "") alert("Please type something to search!");
        else alert("Searching for: " + text);
    }

    if (searchBtn) searchBtn.addEventListener('click', runSearch);
    if (searchInput) searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') runSearch(); });

    const allTags = document.querySelectorAll('.tag');
    allTags.forEach(tagElement => {
        tagElement.addEventListener('click', function() {
            searchInput.value = this.innerText;
            runSearch();
        });
    });

    // --- 2. Hybrid File & Camera Logic ---
    const uploadOptions = document.getElementById('upload-options');
    const cameraUI = document.getElementById('camera-ui');
    const fileInput = document.getElementById('file-input');
    const fileNameDisplay = document.getElementById('file-name');
    const analyzeBtn = document.getElementById('analyze-btn');
    
    // Buttons
    const browseBtn = document.getElementById('browse-btn');
    const openCameraBtn = document.getElementById('camera-btn');
    const cancelCameraBtn = document.getElementById('cancel-camera-btn');
    const captureBtn = document.getElementById('capture-btn');
    const retakeBtn = document.getElementById('retake-btn');

    // Camera Elements
    const videoElement = document.getElementById('camera-stream');
    const canvasElement = document.getElementById('snapshot-canvas');
    let cameraStream = null;

    // --- A. File Browsing ---
    browseBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', function() {
        if (this.files && this.files.length > 0) {
            fileNameDisplay.innerText = "Selected: " + this.files[0].name;
            analyzeBtn.style.display = 'block';
        }
    });

    // --- B. Camera Streaming ---
    function stopCamera() {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
        }
    }

    openCameraBtn.addEventListener('click', async () => {
        try {
            // Request camera
            cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            videoElement.srcObject = cameraStream;
            
            // Switch UI
            uploadOptions.style.display = 'none';
            cameraUI.style.display = 'flex';
            
            // Reset state
            videoElement.style.display = 'block';
            canvasElement.style.display = 'none';
            captureBtn.style.display = 'block';
            retakeBtn.style.display = 'none';
            analyzeBtn.style.display = 'none'; // Hide analyze until photo taken
            
        } catch (err) {
            console.error("Camera Error:", err);
            alert("Could not access the camera. Make sure you are using a local server (like Live Server in VS Code) or HTTPS.");
        }
    });

    cancelCameraBtn.addEventListener('click', () => {
        stopCamera();
        cameraUI.style.display = 'none';
        uploadOptions.style.display = 'block';
        if (fileInput.files.length > 0) analyzeBtn.style.display = 'block'; // Restore analyze button if file was selected previously
    });

    captureBtn.addEventListener('click', () => {
        // Draw video frame to canvas
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        const context = canvasElement.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

        stopCamera(); // Turn off camera light

        // Switch to photo view
        videoElement.style.display = 'none';
        canvasElement.style.display = 'block';
        captureBtn.style.display = 'none';
        retakeBtn.style.display = 'block';
        
        // Show the analyze button
        analyzeBtn.style.display = 'block';
    });

    retakeBtn.addEventListener('click', () => {
        // Just simulate clicking the open camera button again
        openCameraBtn.click();
    });

    // --- C. Analyze Action ---
    analyzeBtn.addEventListener('click', () => {
        const originalHTML = analyzeBtn.innerHTML;
        analyzeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
        
        setTimeout(() => {
            alert("Document ready for AI Analysis!\n\n(Send the file or canvas image to Python backend here)");
            analyzeBtn.innerHTML = originalHTML;
        }, 1500);
    });

});