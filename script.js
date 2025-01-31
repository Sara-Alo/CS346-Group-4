 const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

//  function startTimer(id, duration) {
//     const timerElement = document.getElementById(`timer-${id}`);
//     if (!timerElement) {
//         console.error(`Timer element not found for id: ${id}`);
//         return;
//     }

//     let time = duration;

//     const interval = setInterval(() => {
//         if (time <= 0) {
//             clearInterval(interval);
//             timerElement.innerText = " Successful purchase";
//             alert(`The auction for product ${id} Successful purchase!`);
//             return;
//         }

//          const hours = Math.floor(time / 3600);
//         const minutes = Math.floor((time % 3600) / 60);
//         const seconds = time % 60;

//         timerElement.innerText = `${hours.toString().padStart(2, '0')}:${minutes
//             .toString()
//             .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//         time--;
//     }, 1000);
// }
function startTimer(id) {
    const timerElement = document.getElementById(`timer-${id}`);
    if (!timerElement) {
        console.error(`Timer element not found for id: ${id}`);
        return;
    }

    let time = 60;  

    const interval = setInterval(() => {
        if (time <= 0) {
            clearInterval(interval);
            timerElement.innerText = "Successful purchase";  
            alert(`The auction for product ${id} is a Successful purchase!`);
            return;
        }

        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        timerElement.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        time--;
    }, 1000);
}

 if (document.querySelector('#cart-items')) {
    document.addEventListener('DOMContentLoaded', () => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartTable = document.getElementById('cart-items');

         cartItems.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><button class="remove-item" data-index="${index}"><i class="far fa-times-circle"></i></button></td>
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td id="highest-bid-${index}">$${item.price}</td>
                <td><button class="bid-btn" data-id="${index}">Bid</button></td>
                <td id="timer-${index}">00:00:00</td>
            `;
            cartTable.appendChild(row);

             startTimer(index, 3600);  
        });

         document.querySelectorAll('.remove-item').forEach((button) => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cartItems.splice(index, 1);  
                localStorage.setItem('cart', JSON.stringify(cartItems));  
                location.reload();  
            });
        });

 
        document.querySelectorAll('.bid-btn').forEach((button) => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                const highestBidCell = document.getElementById(`highest-bid-${productId}`);

                 if (!highestBidCell) {
                    console.error(`Highest bid cell not found for product id: ${productId}`);
                    alert("Error: Could not find the product for bidding.");
                    return;
                }

                 const currentBid = parseFloat(highestBidCell.innerText.replace('$', ''));
                const newBid = parseFloat(prompt("Enter your bid amount:"));

                if (isNaN(newBid)) {
                    alert("Invalid bid. Please enter a valid number.");
                    return;
                }

                if (newBid > currentBid) {
                    highestBidCell.innerText = `$${newBid.toFixed(2)}`;
                    alert("Your bid was successful!");
                } else {
                    alert("Your bid must be higher than the current bid.");
                }
            });
        });
    });
}

 if (document.querySelectorAll('.add-to-cart').length) {
    document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const product = {
                id: button.getAttribute('data-id'),
                name: button.getAttribute('data-name'),
                price: button.getAttribute('data-price'),
                image: button.getAttribute('data-image'),
            };

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));

            alert(`${product.name} has been added to the cart.`);
        });
    });
}







   