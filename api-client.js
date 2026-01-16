// KLKBAT API Client
const KLKBAT_API = {
    // Base URL - will be empty for same domain
    baseURL: '',
    
    // Get all orders
    async getOrders() {
        const response = await fetch(`${this.baseURL}/api/orders`);
        return await response.json();
    },
    
    // Create new order
    async createOrder(orderData) {
        const response = await fetch(`${this.baseURL}/api/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        return await response.json();
    },
    
    // Update order
    async updateOrder(id, data) {
        const response = await fetch(`${this.baseURL}/api/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await response.json();
    },
    
    // Delete order
    async deleteOrder(id) {
        const response = await fetch(`${this.baseURL}/api/orders/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    },
    
    // Get settings
    async getSettings() {
        const response = await fetch(`${this.baseURL}/api/settings`);
        return await response.json();
    },
    
    // Update settings
    async updateSettings(settings) {
        const response = await fetch(`${this.baseURL}/api/settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
        });
        return await response.json();
    }
};
