document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("taxForm");
    const modal = document.getElementById("modal");
    const closeButton = document.querySelector(".close");
    const taxResult = document.getElementById("taxResult");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateForm()) {
            calculateTax();
            showModal();
        }
    });

    closeButton.addEventListener("click", function() {
        closeModal();
    });

    const numberFields = document.querySelectorAll('input[type="text"]');
    numberFields.forEach(function(field) {
        field.addEventListener("input", function() {
            validateNumberField(field);
        });
    });

    
    const infoIcons = document.querySelectorAll('.info-icon');
    infoIcons.forEach(function(icon) {
        icon.addEventListener('mouseover', function() {
            const infoText = icon.nextElementSibling;
            infoText.style.display = 'block';
        });
        icon.addEventListener('mouseout', function() {
            const infoText = icon.nextElementSibling;
            infoText.style.display = 'none';
        });
    });

    function validateForm() {
        const income = parseFloat(document.getElementById("income").value.trim());
        const extraIncome = parseFloat(document.getElementById("extraIncome").value.trim() || 0);
        const deductions = parseFloat(document.getElementById("deductions").value.trim() || 0);
        const age = document.getElementById("age").value;

        if (isNaN(income)) {
            displayErrorIcon("incomeError");
            return false;
        } else {
            hideErrorIcon("incomeError");
        }

        if (isNaN(extraIncome)) {
            displayErrorIcon("extraIncomeError");
            return false;
        } else {
            hideErrorIcon("extraIncomeError");
        }

        if (isNaN(deductions)) {
            displayErrorIcon("deductionsError");
            return false;
        } else {
            hideErrorIcon("deductionsError");
        }

        if (!age) {
            displayErrorIcon("ageError");
            return false;
        } else {
            hideErrorIcon("ageError");
        }

        return true;
    }

    function validateNumberField(field) {
        const value = field.value.trim();
        const errorIcon = field.nextElementSibling;
        
        if (!value || isNaN(value)) {
            errorIcon.style.display = "inline";
        } else {
            errorIcon.style.display = "none";
        }
    }

    function displayErrorIcon(iconId) {
        const errorIcon = document.getElementById(iconId);
        errorIcon.style.display = "inline";
    }

    function hideErrorIcon(iconId) {
        const errorIcon = document.getElementById(iconId);
        errorIcon.style.display = "none";
    }

    function calculateTax() {
        const income = parseFloat(document.getElementById("income").value.trim());
        const extraIncome = parseFloat(document.getElementById("extraIncome").value.trim() || 0);
        const deductions = parseFloat(document.getElementById("deductions").value.trim() || 0);
        const age = document.getElementById("age").value;

        let taxRate = 0;
        if (age === "<40") {
            taxRate = 0.3;
        } else if (age === ">=40 & <60") {
            taxRate = 0.4;
        } else if (age === ">=60") {
            taxRate = 0.1;
        }

        const taxableIncome = income + extraIncome - deductions - 800000;
        const taxAmount = Math.max(taxableIncome * taxRate, 0);

        taxResult.textContent = `Tax to be paid: ${taxAmount.toFixed(2)} INR`;
    }

    function showModal() {
        modal.style.display = "block";
    }

    function closeModal() {
        modal.style.display = "none";
    }
});