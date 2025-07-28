import 'bootstrap/dist/css/bootstrap.min.css'
import * as bootstrap from 'bootstrap';

import './css/style.css';
import '@fortawesome/fontawesome-free/js/all.min';
import './sass/style.scss';



document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(item => new bootstrap.Tooltip(item))

document.querySelectorAll('.add-to-cart-btn').forEach(item => {
    item.addEventListener("click", () => {
        alert("اضيف المنتح الي عربة الشراء")
    })
})


function handleOptionChange(optionSelector) {
    document.querySelectorAll(`${optionSelector} input[type='radio']`).forEach(item => {
        item.addEventListener("change", () => {
            document.querySelectorAll(optionSelector).forEach(i => i.classList.remove('active'));
            item.closest(optionSelector).classList.add('active');
        });
    });
}
handleOptionChange('.size-option');
handleOptionChange('.color-option');

//حساب سعر اجمالي المنتج
document.querySelectorAll('[data-product-quantity]').forEach(item => {
    item.addEventListener('change', () => {
        const newQuantity = parseInt(item.value, 10);
        const parent = item.closest('[data-product-info]');
        // Use .dataset for a cleaner way to access data-* attributes
        const pricePerUnit = parseFloat(parent.dataset.productPrice);
        const totalPriceForProduct = newQuantity * pricePerUnit;
        parent.querySelector('.total-price-for-product').innerHTML = totalPriceForProduct.toFixed(2) + "$";
        calculateTotalPrice();
    });
});

document.querySelectorAll('[ data-remove-from-card]').forEach(item => {
    item.addEventListener('click' , () => {
        item.closest('[data-product-info]').remove()
         calculateTotalPrice() 

    })

})



function calculateTotalPrice() {
    let totalPriceForAllProducts = 0;
    document.querySelectorAll('[data-product-info]').forEach(product => {
        const pricePerUnit = parseFloat(product.dataset.productPrice);
        const quantity = parseInt(product.querySelector('[data-product-quantity]').value, 10);
        const totalPriceForProduct = pricePerUnit * quantity;
        totalPriceForAllProducts += totalPriceForProduct;
    });
    const totalPriceElement = document.getElementById('total-price-for-all-product');
    if (totalPriceElement) {
        totalPriceElement.innerHTML = totalPriceForAllProducts.toFixed(2) + "$";
    }
}
    

const citiesByCountry = {
      sa:['الرياض ', 'جده'],
    eg:['جده','القاهرة','الاسكندرية'],
    jo:['عمان', 'الزرقاء'],
    sy:['حماه', 'دمشق','حلب',],
}

document.querySelectorAll('select[name="country"]').forEach(item => {
    item.addEventListener('change', () => {
        const country = item.value;

        const cities = citiesByCountry[country];
        const cityDropdown = document.getElementById('paymentcities');
        cityDropdown.innerHTML = ''; // Clear existing options

        // Add the placeholder option
        const placeholder = new Option('اختر المدينة', '', true, true);
        placeholder.disabled = true;
        cityDropdown.add(placeholder);

        // Add the new city options
        cities.forEach(city => cityDropdown.add(new Option(city, city)));
   })
})


//اخفاء اظهار حقول البطاقه الاتمانيه
const creditCardInfo = document.getElementById('credit_card_info');
if (creditCardInfo) { // Check if the element exists on the current page
    document.querySelectorAll('#form-checkout input[name="payment-method"]').forEach(item => {
        item.addEventListener('change', () => {
            // Use a ternary operator for a cleaner conditional
            creditCardInfo.style.display = item.value === 'on_delivery' ? 'none' : 'block';
        });
    });
}
