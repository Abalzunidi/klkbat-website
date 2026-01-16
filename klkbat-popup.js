// KLKBAT Custom Popup System
const KlkbatPopup = {
    success: function(message, orderId = null) {
        const popup = document.createElement('div');
        popup.className = 'klkbat-popup-overlay';
        popup.innerHTML = `
            <div class="klkbat-popup success">
                <div class="popup-icon">✓</div>
                <h2>Success!</h2>
                <p>${message}</p>
                ${orderId ? `<div class="order-id">Order ID: <strong>${orderId}</strong></div>` : ''}
                <button class="popup-btn" onclick="this.closest('.klkbat-popup-overlay').remove()">OK</button>
            </div>
        `;
        document.body.appendChild(popup);
        setTimeout(() => popup.classList.add('show'), 10);
    },
    
    error: function(message) {
        const popup = document.createElement('div');
        popup.className = 'klkbat-popup-overlay';
        popup.innerHTML = `
            <div class="klkbat-popup error">
                <div class="popup-icon">✕</div>
                <h2>Error</h2>
                <p>${message}</p>
                <button class="popup-btn" onclick="this.closest('.klkbat-popup-overlay').remove()">OK</button>
            </div>
        `;
        document.body.appendChild(popup);
        setTimeout(() => popup.classList.add('show'), 10);
    },
    
    validation: function(errors) {
        const errorList = errors.map(err => `<li>${err}</li>`).join('');
        const popup = document.createElement('div');
        popup.className = 'klkbat-popup-overlay';
        popup.innerHTML = `
            <div class="klkbat-popup warning">
                <div class="popup-icon">⚠</div>
                <h2>Please check your data</h2>
                <ul class="error-list">${errorList}</ul>
                <button class="popup-btn" onclick="this.closest('.klkbat-popup-overlay').remove()">Got it</button>
            </div>
        `;
        document.body.appendChild(popup);
        setTimeout(() => popup.classList.add('show'), 10);
    },
    
    loading: function(message = 'Processing...') {
        const popup = document.createElement('div');
        popup.className = 'klkbat-popup-overlay';
        popup.id = 'klkbat-loading';
        popup.innerHTML = `
            <div class="klkbat-popup loading">
                <div class="spinner"></div>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(popup);
        setTimeout(() => popup.classList.add('show'), 10);
    },
    
    hideLoading: function() {
        const loading = document.getElementById('klkbat-loading');
        if (loading) {
            loading.classList.remove('show');
            setTimeout(() => loading.remove(), 300);
        }
    }
};

// Auto-inject CSS
(function() {
    const style = document.createElement('style');
    style.textContent = `
        .klkbat-popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(10, 10, 15, 0.9);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999999;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .klkbat-popup-overlay.show {
            opacity: 1;
        }
        
        .klkbat-popup {
            background: linear-gradient(135deg, rgba(20, 20, 30, 0.95), rgba(30, 30, 45, 0.95));
            border: 2px solid;
            border-radius: 20px;
            padding: 3rem;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 240, 255, 0.3);
            animation: popupSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes popupSlideUp {
            from {
                transform: translateY(50px) scale(0.9);
                opacity: 0;
            }
            to {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
        }
        
        .klkbat-popup.success {
            border-color: #00f0ff;
        }
        
        .klkbat-popup.error {
            border-color: #ff4757;
        }
        
        .klkbat-popup.warning {
            border-color: #ffa502;
        }
        
        .klkbat-popup .popup-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 1.5rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            font-weight: bold;
        }
        
        .klkbat-popup.success .popup-icon {
            background: linear-gradient(135deg, #00f0ff, #00d4ff);
            color: #0a0a0f;
        }
        
        .klkbat-popup.error .popup-icon {
            background: linear-gradient(135deg, #ff4757, #ff3838);
            color: white;
        }
        
        .klkbat-popup.warning .popup-icon {
            background: linear-gradient(135deg, #ffa502, #ff9000);
            color: #0a0a0f;
        }
        
        .klkbat-popup h2 {
            color: #fff;
            font-size: 1.8rem;
            margin-bottom: 1rem;
            font-weight: 600;
        }
        
        .klkbat-popup p {
            color: rgba(255, 255, 255, 0.8);
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        
        .klkbat-popup .order-id {
            background: rgba(0, 240, 255, 0.1);
            border: 1px solid #00f0ff;
            padding: 1rem;
            border-radius: 10px;
            margin: 1.5rem 0;
            color: #00f0ff;
            font-size: 1.1rem;
        }
        
        .klkbat-popup .order-id strong {
            font-size: 1.3rem;
            display: block;
            margin-top: 0.5rem;
        }
        
        .klkbat-popup .error-list {
            list-style: none;
            padding: 0;
            margin: 1.5rem 0;
            text-align: right;
            direction: rtl;
        }
        
        .klkbat-popup .error-list li {
            background: rgba(255, 71, 87, 0.1);
            border-right: 3px solid #ff4757;
            padding: 0.8rem 1rem;
            margin-bottom: 0.5rem;
            border-radius: 8px;
            color: #ffd7da;
        }
        
        .klkbat-popup .popup-btn {
            background: linear-gradient(135deg, #00f0ff, #8b5cf6);
            color: #0a0a0f;
            border: none;
            padding: 1rem 3rem;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .klkbat-popup .popup-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0, 240, 255, 0.4);
        }
        
        .klkbat-popup.loading {
            border-color: #8b5cf6;
        }
        
        .klkbat-popup .spinner {
            width: 60px;
            height: 60px;
            margin: 0 auto 1.5rem;
            border: 4px solid rgba(139, 92, 246, 0.2);
            border-top: 4px solid #8b5cf6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
})();
