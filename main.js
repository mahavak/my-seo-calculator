import './style.css';

// Define pricing constants
const PRICING = {
  pageOptimization: 50,  // per page
  keywordResearch: {
    basic: 200,
    standard: 500,
    advanced: 1000
  },
  linkBuilding: 150,     // per link
  technicalAudit: 500,
  contentCreation: 750,
  localSEO: 350,
  competitorAnalysis: 400
};

// Elements
const pageCountSlider = document.getElementById('pageCount');
const pageCountValue = document.getElementById('pageCountValue');
const linkCountSlider = document.getElementById('linkCount');
const linkCountValue = document.getElementById('linkCountValue');
const keywordResearchRadios = document.querySelectorAll('input[name="keywordResearch"]');
const additionalServices = document.querySelectorAll('.checkbox-option input');
const priceBreakdownEl = document.getElementById('priceBreakdown');
const totalPriceEl = document.getElementById('totalPrice');

// Initialize calculator
function initCalculator() {
  // Set up event listeners for all inputs
  pageCountSlider.addEventListener('input', updatePageCount);
  linkCountSlider.addEventListener('input', updateLinkCount);
  
  keywordResearchRadios.forEach(radio => {
    radio.addEventListener('change', calculatePrice);
  });
  
  additionalServices.forEach(checkbox => {
    checkbox.addEventListener('change', calculatePrice);
  });
  
  // Initialize values
  updatePageCount();
  updateLinkCount();
  calculatePrice();
}

// Update page count display
function updatePageCount() {
  pageCountValue.textContent = pageCountSlider.value;
  calculatePrice();
}

// Update link count display
function updateLinkCount() {
  linkCountValue.textContent = linkCountSlider.value;
  calculatePrice();
}

// Calculate total price
function calculatePrice() {
  // Clear previous breakdown
  priceBreakdownEl.innerHTML = '';
  
  let totalPrice = 0;
  const breakdown = [];
  
  // Page optimization
  const pageCount = parseInt(pageCountSlider.value);
  const pageOptimizationPrice = pageCount * PRICING.pageOptimization;
  totalPrice += pageOptimizationPrice;
  
  breakdown.push({
    name: `Page Optimization (${pageCount} pages)`,
    price: pageOptimizationPrice
  });
  
  // Keyword Research
  let selectedKeywordResearch;
  keywordResearchRadios.forEach(radio => {
    if (radio.checked) {
      selectedKeywordResearch = radio.value;
    }
  });
  
  const keywordResearchPrice = PRICING.keywordResearch[selectedKeywordResearch];
  totalPrice += keywordResearchPrice;
  
  breakdown.push({
    name: `Keyword Research (${selectedKeywordResearch})`,
    price: keywordResearchPrice
  });
  
  // Link Building
  const linkCount = parseInt(linkCountSlider.value);
  if (linkCount > 0) {
    const linkBuildingPrice = linkCount * PRICING.linkBuilding;
    totalPrice += linkBuildingPrice;
    
    breakdown.push({
      name: `Link Building (${linkCount} links)`,
      price: linkBuildingPrice
    });
  }
  
  // Additional Services
  additionalServices.forEach(service => {
    if (service.checked) {
      const serviceId = service.id;
      let serviceName = '';
      let servicePrice = 0;
      
      switch(serviceId) {
        case 'technicalAudit':
          serviceName = 'Technical SEO Audit';
          servicePrice = PRICING.technicalAudit;
          break;
        case 'contentCreation':
          serviceName = 'Content Creation Strategy';
          servicePrice = PRICING.contentCreation;
          break;
        case 'localSEO':
          serviceName = 'Local SEO Optimization';
          servicePrice = PRICING.localSEO;
          break;
        case 'competitorAnalysis':
          serviceName = 'Competitor Analysis';
          servicePrice = PRICING.competitorAnalysis;
          break;
      }
      
      totalPrice += servicePrice;
      breakdown.push({
        name: serviceName,
        price: servicePrice
      });
    }
  });
  
  // Update price breakdown
  breakdown.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="item-name">${item.name}</span>
      <span class="item-price">$${item.price}</span>
    `;
    priceBreakdownEl.appendChild(li);
  });
  
  // Update total price
  totalPriceEl.textContent = `$${totalPrice}`;
}

// Initialize the calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', initCalculator);
