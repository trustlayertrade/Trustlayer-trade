/* ============================================
   TrustLayer Trade - Application JavaScript
   AI-Powered Trade Document Fraud Detection
   ============================================ */

// ============================================
// DOM Elements
// ============================================
const elements = {
    // Navigation
    navbar: document.getElementById('navbar'),
    navLinks: document.querySelectorAll('.nav-link'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    
    // Hero
    startAnalysisBtn: document.getElementById('startAnalysisBtn'),
    watchDemoBtn: document.getElementById('watchDemoBtn'),
    
    // Documents
    uploadZone: document.getElementById('uploadZone'),
    fileInput: document.getElementById('fileInput'),
    uploadProgress: document.getElementById('uploadProgress'),
    progressFill: document.getElementById('progressFill'),
    progressPercent: document.getElementById('progressPercent'),
    progressFiles: document.getElementById('progressFiles'),
    documentList: document.getElementById('documentList'),
    demoPrompt: document.getElementById('demoPrompt'),
    runDemoBtn: document.getElementById('runDemoBtn'),
    
    // Analysis
    analysisSection: document.getElementById('analysis'),
    analysisProcessing: document.getElementById('analysisProcessing'),
    analysisResults: document.getElementById('analysisResults'),
    processingStatus: document.getElementById('processingStatus'),
    riskGauge: document.getElementById('riskGauge'),
    gaugeFill: document.getElementById('gaugeFill'),
    gaugeValue: document.getElementById('gaugeValue'),
    riskLevelText: document.getElementById('riskLevelText'),
    
    // Results
    fraudScore: document.getElementById('fraudScore'),
    fraudBar: document.getElementById('fraudBar'),
    fraudFindings: document.getElementById('fraudFindings'),
    consistencyScore: document.getElementById('consistencyScore'),
    consistencyBar: document.getElementById('consistencyBar'),
    consistencyFindings: document.getElementById('consistencyFindings'),
    authenticityScore: document.getElementById('authenticityScore'),
    authenticityBar: document.getElementById('authenticityBar'),
    authenticityFindings: document.getElementById('authenticityFindings'),
    inconsistenciesBody: document.getElementById('inconsistenciesBody'),
    extractedDataContent: document.getElementById('extractedDataContent'),
    dataTabs: document.querySelectorAll('.data-tab'),
    
    // Toast
    toastContainer: document.getElementById('toastContainer'),
    
    // Stats
    docsAnalyzed: document.getElementById('docsAnalyzed'),
    avgScore: document.getElementById('avgScore'),
    activeReviews: document.getElementById('activeReviews'),
    flaggedItems: document.getElementById('flaggedItems'),
};

// ============================================
// Sample Data
// ============================================
const sampleDocuments = [
    {
        id: 1,
        name: 'Commercial_Invoice_TechParts_CASABLANCA.pdf',
        type: 'invoice',
        size: '2.4 MB',
        status: 'verified'
    },
    {
        id: 2,
        name: 'Bill_of_Lading_MSCU_7892341.pdf',
        type: 'bill-of-lading',
        size: '1.8 MB',
        status: 'review'
    },
    {
        id: 3,
        name: 'Packing_List_Electronics_SH2024.pdf',
        type: 'packing-list',
        size: '956 KB',
        status: 'verified'
    }
];

const demoAnalysisResults = {
    overallScore: 68,
    riskLevel: 'medium',
    fraudDetection: {
        score: 72,
        findings: [
            'Digital signatures verified successfully',
            'No visible signs of document tampering detected',
            'Issuer credentials validated against database',
            'Document metadata appears authentic'
        ]
    },
    dataConsistency: {
        score: 58,
        findings: [
            'Invoice total differs from packing list by $2,450',
            'Shipping date mismatch: Invoice shows 3/15, BOL shows 3/18',
            'Container number format inconsistent across documents',
            'Weight declared matches within 2% tolerance'
        ]
    },
    documentAuthenticity: {
        score: 78,
        findings: [
            'All required document elements present',
            'No font anomalies detected',
            'Timestamp verification passed',
            'Issuer digital certificate valid'
        ]
    },
    inconsistencies: [
        {
            severity: 'high',
            field: 'Total Amount',
            doc1: '$47,850.00',
            doc2: '$45,400.00',
            description: 'Invoice total does not match packing list value'
        },
        {
            severity: 'medium',
            field: 'Ship Date',
            doc1: 'March 15, 2024',
            doc2: 'March 18, 2024',
            description: 'Shipping date differs between invoice and BOL'
        },
        {
            severity: 'low',
            field: 'Container No.',
            doc1: 'MSCU 7892341',
            doc2: '7892341',
            description: 'Format inconsistency in container number'
        }
    ],
    extractedData: {
        invoice: {
            'Invoice Number': 'INV-2024-0892',
            'Invoice Date': 'March 12, 2024',
            'Buyer': 'TechParts Morocco SARL',
            'Seller': 'Shanghai Electronics Co., Ltd',
            'Total Amount': '$47,850.00',
            'Currency': 'USD',
            'Payment Terms': 'D/P 30 Days',
            'Incoterms': 'FOB Shanghai'
        },
        'bill-of-lading': {
            'BOL Number': 'BOL-4421',
            'Shipper': 'Shanghai Electronics Co., Ltd',
            'Consignee': 'TechParts Morocco SARL',
            'Vessel': 'MSC AURORA',
            'Voyage': 'VE2024-034',
            'Port of Loading': 'Shanghai, China',
            'Port of Discharge': 'Casablanca, Morocco',
            'Container No.': 'MSCU 7892341',
            'Ship Date': 'March 18, 2024'
        },
        'packing-list': {
            'PL Number': 'PL-7721',
            'Date': 'March 10, 2024',
            'Description': 'Electronic Components',
            'Total Packages': '24 Pallets',
            'Gross Weight': '4,850 kg',
            'Net Weight': '4,720 kg',
            'Total Value': '$45,400.00',
            'HS Code': '8542.31'
        }
    }
};

// ============================================
// Utility Functions
// ============================================
function showToast(type, title, message) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
        warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
        error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">${icons[type]}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;
    
    elements.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('leaving');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        element.textContent = current.toLocaleString();
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    };
    requestAnimationFrame(update);
}

function getRiskColor(score) {
    if (score >= 80) return 'var(--risk-low)';
    if (score >= 60) return 'var(--risk-medium)';
    if (score >= 40) return 'var(--risk-high)';
    return 'var(--risk-critical)';
}

function getRiskLevelText(score) {
    if (score >= 80) return { text: 'Low Risk', class: 'low' };
    if (score >= 60) return { text: 'Medium Risk', class: 'medium' };
    if (score >= 40) return { text: 'High Risk', class: 'high' };
    return { text: 'Critical Risk', class: 'critical' };
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
    // Scroll handling
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            elements.navbar.classList.add('scrolled');
        } else {
            elements.navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    elements.mobileMenuBtn?.addEventListener('click', () => {
        elements.navLinks.classList.toggle('active');
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ============================================
// Document Upload
// ============================================
function initDocumentUpload() {
    // Click to upload
    elements.uploadZone?.addEventListener('click', () => {
        elements.fileInput?.click();
    });
    
    // Drag and drop
    elements.uploadZone?.addEventListener('dragover', (e) => {
        e.preventDefault();
        elements.uploadZone.classList.add('dragover');
    });
    
    elements.uploadZone?.addEventListener('dragleave', () => {
        elements.uploadZone.classList.remove('dragover');
    });
    
    elements.uploadZone?.addEventListener('drop', (e) => {
        e.preventDefault();
        elements.uploadZone.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files);
        }
    });
    
    // File input change
    elements.fileInput?.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files);
        }
    });
}

function handleFileUpload(files) {
    const validFiles = Array.from(files).filter(file => {
        const maxSize = 10 * 1024 * 1024; // 10MB
        return file.size <= maxSize;
    });
    
    if (validFiles.length === 0) {
        showToast('error', 'Upload Failed', 'No valid files selected. Maximum size is 10MB.');
        return;
    }
    
    elements.uploadProgress.style.display = 'block';
    elements.demoPrompt.style.display = 'none';
    
    let uploaded = 0;
    const total = validFiles.length;
    
    const simulateUpload = () => {
        if (uploaded >= total) {
            setTimeout(() => {
                elements.uploadProgress.style.display = 'none';
                showToast('success', 'Upload Complete', `${total} document(s) uploaded successfully.`);
                runAnalysis();
            }, 500);
            return;
        }
        
        uploaded++;
        const percent = Math.round((uploaded / total) * 100);
        
        elements.progressFill.style.width = `${percent}%`;
        elements.progressPercent.textContent = `${percent}%`;
        elements.progressFiles.textContent = `${uploaded} of ${total} files`;
        
        setTimeout(simulateUpload, 800);
    };
    
    simulateUpload();
}

// ============================================
// Demo Mode
// ============================================
function initDemoMode() {
    elements.runDemoBtn?.addEventListener('click', () => {
        runDemoAnalysis();
    });
}

function runDemoAnalysis() {
    elements.demoPrompt.style.display = 'none';
    elements.analysisSection.style.display = 'block';
    elements.analysisProcessing.style.display = 'block';
    elements.analysisResults.style.display = 'none';
    
    // Scroll to analysis section
    elements.analysisSection.scrollIntoView({ behavior: 'smooth' });
    
    // Run processing animation
    runProcessingAnimation(() => {
        displayAnalysisResults(demoAnalysisResults);
    });
}

// ============================================
// Analysis Processing Animation
// ============================================
function runProcessingAnimation(callback) {
    const stages = document.querySelectorAll('.stage');
    const stageOrder = ['upload', 'extract', 'compare', 'analyze', 'report'];
    const statusMessages = [
        'Uploading documents...',
        'Extracting data using AI...',
        'Cross-referencing document fields...',
        'Analyzing for anomalies...',
        'Generating risk assessment...'
    ];
    
    let currentStage = 0;
    
    const runStage = () => {
        if (currentStage >= stageOrder.length) {
            setTimeout(() => {
                elements.analysisProcessing.style.display = 'none';
                elements.analysisResults.style.display = 'block';
                callback();
            }, 500);
            return;
        }
        
        // Update stage status
        stages.forEach((stage, index) => {
            stage.classList.remove('active', 'completed');
            if (index < currentStage) {
                stage.classList.add('completed');
            } else if (index === currentStage) {
                stage.classList.add('active');
            }
        });
        
        elements.processingStatus.textContent = statusMessages[currentStage];
        
        currentStage++;
        setTimeout(runStage, 1500);
    };
    
    runStage();
}

function displayAnalysisResults(results) {
    // Animate risk gauge
    const circumference = 2 * Math.PI * 85;
    const offset = circumference - (results.overallScore / 100) * circumference;
    
    setTimeout(() => {
        elements.gaugeFill.style.strokeDashoffset = offset;
        elements.gaugeFill.style.stroke = getRiskColor(results.overallScore);
        
        // Animate score number
        let currentScore = 0;
        const scoreInterval = setInterval(() => {
            currentScore += 2;
            if (currentScore >= results.overallScore) {
                currentScore = results.overallScore;
                clearInterval(scoreInterval);
            }
            elements.gaugeValue.textContent = currentScore;
        }, 30);
        
        const riskInfo = getRiskLevelText(results.overallScore);
        elements.riskLevelText.textContent = riskInfo.text;
        elements.riskLevelText.className = `risk-level-value ${riskInfo.class}`;
    }, 100);
    
    // Display category scores
    setTimeout(() => {
        displayCategoryResults('fraud', results.fraudDetection);
        displayCategoryResults('consistency', results.dataConsistency);
        displayCategoryResults('authenticity', results.documentAuthenticity);
    }, 500);
    
    // Display inconsistencies
    setTimeout(() => {
        displayInconsistencies(results.inconsistencies);
    }, 800);
    
    // Display extracted data
    setTimeout(() => {
        displayExtractedData(results.extractedData);
    }, 1000);
    
    // Update stats
    updateStats();
}

function displayCategoryResults(category, data) {
    const scoreEl = document.getElementById(`${category}Score`);
    const barEl = document.getElementById(`${category}Bar`);
    const findingsEl = document.getElementById(`${category}Findings`);
    
    if (scoreEl) scoreEl.textContent = data.score;
    if (barEl) {
        barEl.style.setProperty('--width', `${data.score}%`);
        barEl.style.background = getRiskColor(data.score);
    }
    
    if (findingsEl) {
        findingsEl.innerHTML = data.findings
            .map(finding => `<li>${finding}</li>`)
            .join('');
    }
}

function displayInconsistencies(inconsistencies) {
    if (!elements.inconsistenciesBody) return;
    
    const severityClasses = {
        high: 'badge-danger',
        medium: 'badge-warning',
        low: 'badge-success'
    };
    
    elements.inconsistenciesBody.innerHTML = inconsistencies
        .map(item => `
            <tr>
                <td><span class="badge ${severityClasses[item.severity]}">${item.severity.toUpperCase()}</span></td>
                <td><strong>${item.field}</strong></td>
                <td class="font-mono">${item.doc1}</td>
                <td class="font-mono">${item.doc2}</td>
                <td>${item.description}</td>
            </tr>
        `)
        .join('');
}

function displayExtractedData(data) {
    if (!elements.extractedDataContent) return;
    
    const renderDataTab = (key, dataObj) => {
        const fields = Object.entries(dataObj)
            .map(([label, value]) => `
                <div class="data-field">
                    <label>${label}</label>
                    <span>${value}</span>
                </div>
            `)
            .join('');
        
        return `<div class="data-grid">${fields}</div>`;
    };
    
    // Store data for tab switching
    window.extractedDataCache = data;
    
    // Render initial tab
    elements.extractedDataContent.innerHTML = renderDataTab('invoice', data.invoice);
    
    // Tab switching
    elements.dataTabs?.forEach(tab => {
        tab.addEventListener('click', () => {
            elements.dataTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabName = tab.dataset.tab;
            const tabData = window.extractedDataCache[tabName];
            elements.extractedDataContent.innerHTML = renderDataTab(tabName, tabData);
        });
    });
}

function updateStats() {
    const currentDocs = parseInt(elements.docsAnalyzed.textContent.replace(/,/g, ''));
    const currentScore = parseInt(elements.avgScore.textContent);
    const currentReviews = parseInt(elements.activeReviews.textContent);
    const currentFlagged = parseInt(elements.flaggedItems.textContent);
    
    animateValue(elements.docsAnalyzed, currentDocs, currentDocs + 3, 1000);
    animateValue(elements.avgScore, currentScore, demoAnalysisResults.overallScore, 1000);
    animateValue(elements.activeReviews, currentReviews, currentReviews + 1, 1000);
    animateValue(elements.flaggedItems, currentFlagged, currentFlagged + 3, 1000);
}

function runAnalysis() {
    elements.analysisSection.style.display = 'block';
    elements.analysisProcessing.style.display = 'block';
    elements.analysisResults.style.display = 'none';
    
    elements.analysisSection.scrollIntoView({ behavior: 'smooth' });
    
    runProcessingAnimation(() => {
        displayAnalysisResults(demoAnalysisResults);
    });
}

// ============================================
// Hero Actions
// ============================================
function initHeroActions() {
    elements.startAnalysisBtn?.addEventListener('click', () => {
        elements.uploadZone?.scrollIntoView({ behavior: 'smooth' });
    });
    
    elements.watchDemoBtn?.addEventListener('click', () => {
        runDemoAnalysis();
    });
}

// ============================================
// Pricing Toggle
// ============================================
function initPricingToggle() {
    const toggle = document.getElementById('pricingToggle');
    if (!toggle) return;
    
    toggle.addEventListener('change', () => {
        const prices = document.querySelectorAll('.pricing-amount .price');
        const periods = document.querySelectorAll('.pricing-amount .period');
        
        prices.forEach(price => {
            const monthly = price.getAttribute('data-monthly');
            const annual = price.getAttribute('data-annual');
            price.textContent = toggle.checked ? annual : monthly;
        });
        
        periods.forEach((period, index) => {
            if (index === 0) {
                period.textContent = toggle.checked ? '/year' : '/month';
            }
        });
    });
}

// ============================================
// Initialize Application
// ============================================
function init() {
    initNavigation();
    initDocumentUpload();
    initDemoMode();
    initHeroActions();
    initPricingToggle();
    
    // Add custom font loading
    document.fonts.ready.then(() => {
        console.log('TrustLayer Trade - Fonts loaded');
    });
    
    // Initial stats animation
    setTimeout(() => {
        if (elements.docsAnalyzed) {
            const baseDocs = 1247;
            animateValue(elements.docsAnalyzed, 0, baseDocs, 1500);
        }
    }, 500);
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// Global Functions (for inline handlers)
// ============================================
window.showToast = showToast;

// ============================================
// Company Verification Interactions
// ============================================
(function() {
    const searchCompanyBtn = document.getElementById('searchCompanyBtn');
    const companySearchInput = document.getElementById('companySearchInput');
    const companyResults = document.getElementById('companyResults');
    
    if (searchCompanyBtn && companySearchInput) {
        searchCompanyBtn.addEventListener('click', handleCompanySearch);
        
        companySearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleCompanySearch();
            }
        });
    }
    
    function handleCompanySearch() {
        const searchTerm = companySearchInput.value.trim();
        
        if (!searchTerm) {
            showToast('error', 'Search Required', 'Please enter a company name, registration number, or Tax ID');
            companySearchInput.focus();
            return;
        }
        
        // Show loading state
        searchCompanyBtn.disabled = true;
        searchCompanyBtn.innerHTML = `
            <svg class="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>
            </svg>
            Searching...
        `;
        
        // Simulate API search delay
        setTimeout(() => {
            searchCompanyBtn.disabled = false;
            searchCompanyBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                Verify Company
            `;
            
            showToast('success', 'Search Complete', `Found 3 companies matching "${searchTerm}"`);
            
            // Scroll to results with smooth animation
            if (companyResults) {
                companyResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Add highlight animation to cards
                const companyCards = companyResults.querySelectorAll('.company-card');
                companyCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }, 1500);
    }
    
    // Add click handlers for verification buttons
    document.querySelectorAll('.company-card-footer .btn-primary').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const companyName = e.target.closest('.company-card').querySelector('h3').textContent;
            showToast('success', 'Verification Request Sent', `Verification request sent for ${companyName}`);
        });
    });
    
    document.querySelectorAll('.company-card-footer .btn-secondary').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const companyName = e.target.closest('.company-card').querySelector('h3').textContent;
            showToast('info', 'Loading Profile', `Viewing profile for ${companyName}...`);
        });
    });
    
    // Country select change handler
    const countrySelect = document.getElementById('countrySelect');
    if (countrySelect) {
        countrySelect.addEventListener('change', (e) => {
            const country = e.target.value;
            if (country) {
                const countryNames = {
                    'MA': 'Morocco',
                    'FR': 'France',
                    'DE': 'Germany',
                    'US': 'United States',
                    'CN': 'China',
                    'GB': 'United Kingdom',
                    'ES': 'Spain',
                    'IT': 'Italy',
                    'NL': 'Netherlands',
                    'BE': 'Belgium',
                    'AE': 'UAE',
                    'TR': 'Turkey'
                };
                showToast('info', 'Country Filter', `Showing companies from ${countryNames[country] || country}`);
            }
        });
    }
    
    // Search tag click handlers
    document.querySelectorAll('.search-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const searchType = tag.textContent.trim();
            const placeholderMap = {
                'VAT/Tax ID': 'Enter VAT number (e.g., DE123456789)',
                'Registration Number': 'Enter registration number (e.g., HRB 123456)',
                'Company Name': 'Enter company name...',
                'Website Domain': 'Enter domain (e.g., example.com)'
            };
            
            if (companySearchInput) {
                companySearchInput.placeholder = placeholderMap[searchType] || 'Search companies...';
                companySearchInput.focus();
            }
            
            // Visual feedback
            document.querySelectorAll('.search-tag').forEach(t => t.style.background = 'rgba(0, 212, 170, 0.1)');
            tag.style.background = 'rgba(0, 212, 170, 0.3)';
        });
    });
    
    // Add spin animation for loading state
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .spin {
            animation: spin 1s linear infinite;
            width: 18px;
            height: 18px;
        }
    `;
    document.head.appendChild(spinStyle);
})();