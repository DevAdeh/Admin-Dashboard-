// 1. Fake data - in a real app this would come from a server/API
const stats = [
  { label: "Total Revenue", value: "₦1,240,000", change: "+12.4%", direction: "up" },
  { label: "Orders", value: "328", change: "+5.2%", direction: "up" },
  { label: "New Customers", value: "54", change: "-2.1%", direction: "down" },
  { label: "Avg. Order Value", value: "₦3,780", change: "+3.8%", direction: "up" },
];

const orders = [
  { id: "#ORD-101", customer: "Chinedu Okafor", item: "Jollof Rice & Chicken", amount: "₦3,500", status: "Delivered" },
  { id: "#ORD-102", customer: "Amaka Bello", item: "Versace Eros", amount: "₦25,000", status: "Pending" },
  { id: "#ORD-103", customer: "Tunde Alabi", item: "Grilled Steak Special", amount: "₦6,500", status: "Delivered" },
  { id: "#ORD-104", customer: "Ngozi Eze", item: "Lavender Mist", amount: "₦8,000", status: "Cancelled" },
  { id: "#ORD-105", customer: "Emeka Nwosu", item: "Small Chops Pack", amount: "₦2,500", status: "Pending" },
  { id: "#ORD-106", customer: "Blessing Udo", item: "Dior Poison Girl", amount: "₦30,000", status: "Delivered" },
];

const customers = [
  { name: "Chinedu Okafor", orders: 4 },
  { name: "Amaka Bello", orders: 2 },
  { name: "Tunde Alabi", orders: 7 },
  { name: "Ngozi Eze", orders: 1 },
  { name: "Emeka Nwosu", orders: 3 },
  { name: "Blessing Udo", orders: 5 },
];

// 2. Render stat cards
function renderStats() {
  const statsGrid = document.getElementById('statsGrid');
  statsGrid.innerHTML = stats.map(stat => `
    <div class="stat-card">
      <p class="label">${stat.label}</p>
      <p class="value">${stat.value}</p>
      <p class="change ${stat.direction}">${stat.change} vs last week</p>
    </div>
  `).join('');
}

// 3. Render orders table (with optional search filtering)
function renderOrders(list = orders) {
  const tbody = document.getElementById('ordersBody');
  tbody.innerHTML = list.map(order => `
    <tr>
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.item}</td>
      <td>${order.amount}</td>
      <td><span class="status-badge ${order.status.toLowerCase()}">${order.status}</span></td>
    </tr>
  `).join('');
}

// 4. Live search - filters orders as you type
document.getElementById('orderSearch').addEventListener('input', function (e) {
  const query = e.target.value.toLowerCase();
  const filtered = orders.filter(order =>
    order.customer.toLowerCase().includes(query) ||
    order.item.toLowerCase().includes(query) ||
    order.id.toLowerCase().includes(query)
  );
  renderOrders(filtered);
});

// 5. Render customer cards (with initials as a simple avatar)
function renderCustomers() {
  const grid = document.getElementById('customersGrid');
  grid.innerHTML = customers.map(c => {
    const initials = c.name.split(' ').map(n => n[0]).join('');
    return `
      <div class="customer-card">
        <div class="customer-avatar">${initials}</div>
        <h4>${c.name}</h4>
        <p>${c.orders} orders</p>
      </div>
    `;
  }).join('');
}

// 6. Sidebar navigation - switches between pages
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('pageTitle');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetPage = this.dataset.page;

    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(`${targetPage}Page`).classList.add('active');

    pageTitle.textContent = this.textContent.trim().split(' ').slice(1).join(' ');
  });
});

// 7. Sales chart using Chart.js
function renderChart() {
  const ctx = document.getElementById('salesChart');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Sales (₦)',
        data: [45000, 62000, 38000, 71000, 55000, 89000, 67000],
        borderColor: '#6FE7D8',
        backgroundColor: 'rgba(111, 231, 216, 0.15)',
        fill: true,
        tension: 0.3,
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

// 8. Initialize everything
renderStats();
renderOrders();
renderCustomers();
renderChart();