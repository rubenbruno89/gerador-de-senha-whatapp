const passwordLengthInput = document.getElementById('password-length');
const includeUppercaseCheckbox = document.getElementById('include-uppercase');
const includeLowercaseCheckbox = document.getElementById('include-lowercase');
const includeNumbersCheckbox = document.getElementById('include-numbers');
const includeSymbolsCheckbox = document.getElementById('include-symbols');
const generateButton = document.getElementById('generate-button');
const generatedPasswordInput = document.getElementById('generated-password');
const copyButton = document.getElementById('copy-button');
const whatsappNumberInput = document.getElementById('whatsapp-number');
const whatsappLink = document.getElementById('whatsapp-link');

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

function generatePassword() {
    const length = parseInt(passwordLengthInput.value);
    let validChars = '';
    let password = '';

    if (includeUppercaseCheckbox.checked) {
        validChars += uppercaseChars;
    }
    if (includeLowercaseCheckbox.checked) {
        validChars += lowercaseChars;
    }
    if (includeNumbersCheckbox.checked) {
        validChars += numberChars;
    }
    if (includeSymbolsCheckbox.checked) {
        validChars += symbolChars;
    }

    if (validChars.length === 0) {
        alert('Selecione pelo menos um tipo de caractere!');
        return '';
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * validChars.length);
        password += validChars[randomIndex];
    }

    return password;
}

function updateWhatsappLink(password, phoneNumber) {
    if (password && phoneNumber && phoneNumber.length > 0) {
        // Add the desired prefix to the message
        const message = `Sua senha gerada foi: ${password}`;
        const encodedMessage = encodeURIComponent(message);

        // Basic validation for number format (starts with 55 and is numeric)
        if (/^55\d+$/.test(phoneNumber)) {
             // Use the encoded message in the URL
             whatsappLink.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
             whatsappLink.removeAttribute('disabled');
             whatsappLink.style.pointerEvents = 'auto'; // Re-enable clicks
             whatsappLink.style.opacity = '1'; // Re-enable visual style
        } else {
             whatsappLink.href = '#'; // Invalid number, make link non-functional
             whatsappLink.setAttribute('disabled', true);
             whatsappLink.style.pointerEvents = 'none'; // Disable clicks
             whatsappLink.style.opacity = '0.6'; // Dim visual style
             console.warn("Número de WhatsApp inválido. Deve começar com 55 seguido apenas por números.");
        }
    } else {
        whatsappLink.href = '#'; // No password or number, make link non-functional
        whatsappLink.setAttribute('disabled', true);
        whatsappLink.style.pointerEvents = 'none'; // Disable clicks
        whatsappLink.style.opacity = '0.6'; // Dim visual style
    }
}

// Event Listeners
generateButton.addEventListener('click', () => {
    const password = generatePassword();
    generatedPasswordInput.value = password;
    // Also update WhatsApp link immediately after generating
    const phoneNumber = whatsappNumberInput.value.trim();
    updateWhatsappLink(password, phoneNumber);
});

copyButton.addEventListener('click', () => {
    generatedPasswordInput.select();
    generatedPasswordInput.setSelectionRange(0, 99999); // For mobile devices
    try {
        navigator.clipboard.writeText(generatedPasswordInput.value);
        // Optional: Show a success message
        console.log('Password copied to clipboard');
    } catch (err) {
        console.error('Failed to copy password: ', err);
        // Fallback for older browsers
        document.execCommand('copy');
    }
});

// Update WhatsApp link whenever password or number changes
generatedPasswordInput.addEventListener('input', () => {
     const phoneNumber = whatsappNumberInput.value.trim();
     updateWhatsappLink(generatedPasswordInput.value, phoneNumber);
});

whatsappNumberInput.addEventListener('input', () => {
     const password = generatedPasswordInput.value;
     updateWhatsappLink(password, whatsappNumberInput.value.trim());
});

// Initialize WhatsApp link state on load
updateWhatsappLink(generatedPasswordInput.value, whatsappNumberInput.value.trim());

// Ensure at least one character type is selected
const checkboxes = [
    includeUppercaseCheckbox,
    includeLowercaseCheckbox,
    includeNumbersCheckbox,
    includeSymbolsCheckbox
];

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (!checkboxes.some(cb => cb.checked)) {
            // If no checkbox is checked, check the current one back
            checkbox.checked = true;
            alert('Pelo menos um tipo de caractere deve ser selecionado.');
        }
         const password = generatedPasswordInput.value;
         const phoneNumber = whatsappNumberInput.value.trim();
         updateWhatsappLink(password, phoneNumber);
    });
});

// Initial generation on load? Maybe not, wait for user click.
// But let's ensure link is disabled initially if no password/number.
document.addEventListener('DOMContentLoaded', () => {
    const password = generatedPasswordInput.value;
    const phoneNumber = whatsappNumberInput.value.trim();
    updateWhatsappLink(password, phoneNumber);
});