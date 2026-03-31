# TradeSecurix - AI Trade Document Fraud Detection Platform

## Project Overview
- **Project Name**: TradeSecurix
- **Type**: Web Application (Single Page Application)
- **Core Functionality**: AI-powered platform for detecting document fraud and inconsistencies in international trade documents (invoices, bills of lading, packing lists, bank details)
- **Target Users**: Import/export companies, freight forwarders, finance/operations teams, SMEs in cross-border trade

---

## UI/UX Specification

### Layout Structure

**Navigation Bar**
- Fixed top navigation
- Logo (left): "Trade" with shield icon + "Securix"
- Navigation links (center): Dashboard, Documents, Analysis, Reports
- User actions (right): Notification bell, User avatar dropdown

**Hero Section**
- Full-width banner with subtle geometric pattern
- Headline: "AI-Powered Trade Document Security"
- Subheadline: "Detect fraud, validate inconsistencies, and secure your cross-border transactions"
- CTA buttons: "Start Free Analysis" / "Watch Demo"
- Animated background with floating document icons

**Main Content Areas**
1. **Dashboard Section**
   - Quick stats cards (Documents Analyzed, Risk Score Average, Active Reviews, Flagged Items)
   - Recent activity timeline
   - Risk distribution chart

2. **Document Upload Section**
   - Drag-and-drop zone with file type icons
   - Supported formats badge (PDF, PNG, JPG, DOCX)
   - Upload progress indicator
   - Document list with status badges

3. **Analysis Results Section**
   - Risk score gauge (0-100)
   - Document comparison matrix
   - Flagged inconsistencies list
   - Extracted data panel

4. **Features Section**
   - 4-column grid showcasing key features
   - Icon + title + description for each
   - Hover animations

**Footer**
- Company info, quick links, contact, social icons
- Copyright and legal links

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

### Visual Design

**Color Palette**
- Primary: `#0A1628` (Deep navy - trust, security)
- Secondary: `#1E3A5F` (Midnight blue)
- Accent: `#00D4AA` (Teal green - success, trust)
- Warning: `#F59E0B` (Amber)
- Danger: `#EF4444` (Red)
- Background: `#F8FAFC` (Off-white)
- Card Background: `#FFFFFF`
- Text Primary: `#1E293B`
- Text Secondary: `#64748B`
- Border: `#E2E8F0`

**Typography**
- Headings: "DM Sans", sans-serif (700 weight)
- Body: "DM Sans", sans-serif (400, 500 weight)
- Monospace (data): "JetBrains Mono", monospace
- H1: 48px, H2: 36px, H3: 24px, H4: 18px
- Body: 16px, Small: 14px

**Spacing System**
- Base unit: 4px
- Section padding: 80px vertical
- Card padding: 24px
- Component gap: 16px

**Visual Effects**
- Cards: `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- Hover lift: `transform: translateY(-4px)` with shadow increase
- Border radius: 12px (cards), 8px (buttons), 6px (inputs)
- Glassmorphism on floating elements: `backdrop-filter: blur(12px)`

### Components

**Buttons**
- Primary: Teal background (#00D4AA), dark text, hover darken
- Secondary: Navy outline, white text, hover fill
- Ghost: Transparent, teal text

**Cards**
- White background, subtle shadow
- Hover: Lift effect with deeper shadow
- Status indicator dots (green/amber/red)

**Badges**
- Risk levels: Low (green), Medium (amber), High (red), Critical (dark red)
- Document types: Pill-shaped with icons

**Progress Indicators**
- Circular gauge for risk score
- Linear progress bar for upload
- Animated scanning effect for analysis

**Document Cards**
- Thumbnail preview
- File name, type icon
- Status badge (Pending/Processing/Complete/Flagged)
- Action buttons (View, Analyze, Delete)

---

## Functionality Specification

### Core Features

1. **Document Upload**
   - Drag-and-drop or click to upload
   - Support multiple file types: PDF, PNG, JPG, DOCX
   - Batch upload capability
   - Upload progress with percentage
   - File validation (size limit 10MB)

2. **Document Processing Simulation**
   - Animated scanning effect
   - Simulated AI extraction progress
   - Processing stages: Upload → Extract → Compare → Analyze → Report

3. **Risk Scoring**
   - 0-100 score with color coding
   - Breakdown by category (Fraud Detection, Data Consistency, Document Authenticity)
   - Visual gauge with animated fill

4. **Inconsistency Detection**
   - Cross-document comparison
   - Field-by-field matching
   - Highlighted discrepancies
   - Severity classification

5. **Results Dashboard**
   - Summary statistics
   - Flagged items list with details
   - Extracted data display
   - Export report button

### Demo Mode
- Pre-loaded sample documents for demonstration
- Click-to-analyze functionality
- Simulated analysis with realistic delays
- Sample inconsistency results

### User Interactions
- Smooth scroll navigation
- Tab switching for analysis sections
- Accordion for detailed findings
- Modal for document preview
- Toast notifications for actions

---

## Acceptance Criteria

### Visual Checkpoints
- [ ] Navigation is fixed and responsive
- [ ] Hero section displays with animated background
- [ ] All color values match specification
- [ ] Typography hierarchy is clear
- [ ] Cards have proper shadows and hover effects
- [ ] Risk gauge animates on load
- [ ] Mobile layout is functional

### Functional Checkpoints
- [ ] Document upload zone accepts files
- [ ] Upload progress displays correctly
- [ ] Analysis animation plays through stages
- [ ] Risk score displays with appropriate color
- [ ] Inconsistencies are listed with severity
- [ ] Demo mode works with sample documents
- [ ] Navigation scrolls to sections smoothly

### Performance
- [ ] Page loads in under 3 seconds
- [ ] Animations are smooth (60fps)
- [ ] No console errors

---

## File Structure
```
/workspace/
├── index.html          # Main application
├── styles.css          # All styling
├── app.js              # Application logic
└── SPEC.md             # This specification
```
