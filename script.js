class PasswordGenerator {
  constructor() {
    this.uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.lowercase = 'abcdefghijklmnopqrstuvwxyz';
    this.numbers = '0123456789';
    this.symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    this.initializeElements();
    this.addEventListeners();
  }

  initializeElements() {
    this.passwordEl = document.getElementById('password');
    this.lengthEl = document.getElementById('length');
    this.uppercaseEl = document.getElementById('uppercase');
    this.lowercaseEl = document.getElementById('lowercase');
    this.numbersEl = document.getElementById('numbers');
    this.symbolsEl = document.getElementById('symbols');
    this.generateBtn = document.getElementById('generate-btn');
    this.copyBtn = document.getElementById('copy-btn');
    this.phoneEl = document.getElementById('phone');
    this.whatsappBtn = document.getElementById('whatsapp-btn');
  }

  addEventListeners() {
    this.generateBtn.addEventListener('click', () => this.generatePassword());
    this.copyBtn.addEventListener('click', () => this.copyPassword());
    this.whatsappBtn.addEventListener('click', () => this.sendToWhatsApp());
  }

  getCharacters() {
    let chars = '';
    if (this.uppercaseEl.checked) chars += this.uppercase;
    if (this.lowercaseEl.checked) chars += this.lowercase;
    if (this.numbersEl.checked) chars += this.numbers;
    if (this.symbolsEl.checked) chars += this.symbols;
    return chars;
  }

  generatePassword() {
    const length = this.lengthEl.value;
    const chars = this.getCharacters();

    if (!chars) {
      alert('Por favor, selecione pelo menos uma opção de caracteres');
      return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }

    this.passwordEl.value = password;
  }

  async copyPassword() {
    if (!this.passwordEl.value) return;

    try {
      await navigator.clipboard.writeText(this.passwordEl.value);
      this.showTooltip('Senha copiada!');
    } catch (err) {
      this.showTooltip('Falha ao copiar senha');
    }
  }

  showTooltip(message) {
    const tooltip = document.createElement('div');
    tooltip.textContent = message;
    tooltip.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      z-index: 1000;
    `;

    document.body.appendChild(tooltip);
    setTimeout(() => tooltip.remove(), 2000);
  }

  sendToWhatsApp() {
    const password = this.passwordEl.value;
    const phone = this.phoneEl.value;

    if (!password) {
      alert('Por favor, gere uma senha primeiro');
      return;
    }

    if (!phone) {
      alert('Por favor, insira um número de telefone');
      return;
    }

    const text = encodeURIComponent(`Sua senha gerada é: ${password}`);
    const whatsappUrl = `https://www.forblink.com/index.php?phone=${phone}&text=${text}`;
    window.open(whatsappUrl, '_blank');
  }
}

// Inicializar o gerador de senha
const passwordGenerator = new PasswordGenerator();