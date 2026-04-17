// Navigation Logic
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active from all
            navItems.forEach(nav => nav.classList.remove('active'));
            views.forEach(view => view.classList.remove('active'));
            
            // Add active to clicked and corresponding view
            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Initialize Chart
    initChart();
    
    // Populate Data
    populateInventory();
    populateVIPs();
});

// Helper for inline navigation (e.g. from alert card)
window.switchTab = function(targetId) {
    const navItem = document.querySelector(`.nav-item[data-target="${targetId}"]`);
    if(navItem) navItem.click();
}


// Chart.js Setup
function initChart() {
    const ctx = document.getElementById('trafficChart').getContext('2d');
    
    // Gradient for line
    const gradient = ctx.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM'],
            datasets: [{
                label: 'Foot Traffic',
                data: [45, 80, 125, 210, 190, 160, 240, 310],
                borderColor: '#6366f1',
                backgroundColor: gradient,
                borderWidth: 2,
                pointBackgroundColor: '#ec4899',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#ec4899',
                fill: true,
                tension: 0.4
            },
            {
                label: 'Conversions',
                data: [12, 25, 40, 65, 55, 45, 85, 110],
                borderColor: '#10b981',
                borderWidth: 2,
                borderDash: [5, 5],
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#64748b', font: { family: 'Inter' } }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(0,0,0,0.05)', drawBorder: false },
                    ticks: { color: '#64748b' }
                },
                y: {
                    grid: { color: 'rgba(0,0,0,0.05)', drawBorder: false },
                    ticks: { color: '#64748b' }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
        }
    });
}

// Mock Data Population
function populateInventory() {
    const tbody = document.getElementById('inventory-table-body');
    const data = [
        { name: "Sony WH-1000XM5", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&h=100&fit=crop", stock: 4, vel: 2.5, action: "Auto-order 15 units", risk: true },
        { name: "Logitech MX Master 3", img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=100&h=100&fit=crop", stock: 12, vel: 5.1, action: "Monitor", risk: false },
        { name: "Mechanical Keyboard Pro", img: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=100&h=100&fit=crop", stock: 2, vel: 1.2, action: "Targeted Markdown", risk: true },
        { name: "USB-C Hub Multiport", img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=100&h=100&fit=crop", stock: 45, vel: 8.0, action: "None", risk: false },
         { name: "Ergonomic Office Chair", img: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=100&h=100&fit=crop", stock: 0, vel: 0.8, action: "Out of Stock - Alert Supplier", risk: true }
    ];

    data.forEach(item => {
        const daysLeft = item.stock > 0 ? (item.stock / item.vel).toFixed(1) + ' days' : '0 days';
        const riskBadge = item.risk ? '<span class="badge-risk">High Risk</span>' : '<span class="badge-safe">Low Risk</span>';
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox"></td>
            <td>
                <div class="item-cell">
                    <img src="${item.img}" class="item-img" alt="${item.name}">
                    <div>
                        <strong>${item.name}</strong><br>
                        ${riskBadge}
                    </div>
                </div>
            </td>
            <td>${item.stock} units</td>
            <td>${item.vel} units/day</td>
            <td>${daysLeft}</td>
            <td><button class="action-btn text-only text-primary">${item.action}</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function populateVIPs() {
    const grid = document.getElementById('vip-grid');
    const vips = [
        {
            name: "Alex Johnson",
            tier: "Titanium Member",
            img: "https://i.pravatar.cc/150?img=11",
            ltv: "$4,250",
            recent: "MacBook Pro 14 (3 mos ago)",
            rec: { name: "AppleCare+ Extension", img: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=50&h=50&fit=crop" }
        },
        {
            name: "Maria Garcia",
            tier: "Gold Member",
            img: "https://i.pravatar.cc/150?img=5",
            ltv: "$1,890",
            recent: "Sony A7IV Camera (1 mo ago)",
            rec: { name: "50mm f/1.8 Lens", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=50&h=50&fit=crop" }
        },
        {
            name: "David Chen",
            tier: "Platinum Member",
            img: "https://i.pravatar.cc/150?img=52",
            ltv: "$8,400",
            recent: "Smart Home Kit (2 wks ago)",
            rec: { name: "Smart Thermostat", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=50&h=50&fit=crop" }
        }
    ];

    vips.forEach(vip => {
        const div = document.createElement('div');
        div.className = 'vip-card glass panel';
        div.innerHTML = `
            <div class="vip-header">
                <img src="${vip.img}" alt="${vip.name}">
                <div class="vip-info">
                    <h3>${vip.name}</h3>
                    <span class="tag-gold">${vip.tier}</span>
                </div>
            </div>
            <div class="vip-details">
                <p><strong>Lifetime Val:</strong> ${vip.ltv}</p>
                <p><strong>Last Purchase:</strong> ${vip.recent}</p>
            </div>
            <div class="recommendations">
                <h4>AI Recommended Upsell</h4>
                <div class="rec-item">
                    <img src="${vip.rec.img}" alt="Rec">
                    <span>${vip.rec.name}</span>
                </div>
            </div>
            <button class="action-btn w-100" style="width: 100%; margin-top: 10px;">Alert Floor Staff</button>
        `;
        grid.appendChild(div);
    });
}
