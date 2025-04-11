let quotes = [];

document.addEventListener('DOMContentLoaded', function () {
    const quoteList = document.getElementById('quoteList');
    const spinner = document.getElementById('spinner');

    fetch('https://dummyjson.com/quotes')
        .then(res => res.json())
        .then(function (data) {
            quotes = data.quotes;
            showAllQuotes();
            setTimeout(() => {
                spinner.style.display = 'none';
                quoteList.style.display = 'block';
            }, 2000);
        })
        .catch(function (error) {
            console.error('Error fetching or displaying quotes:', error);
            spinner.style.display = 'none';
            quoteList.style.display = 'block';
            quoteList.innerHTML = `<p class="error">Failed to load quotes. Please try again later.</p>`;
        });

    function addCopyFunctionality() {
        document.querySelectorAll('.copyBtn').forEach(function (copyBtn, index) {
            copyBtn.addEventListener('click', function () {
                const quoteText = document.querySelectorAll('.quote-text')[index].textContent.split(' - ')[0].replace(/"/g, '').trim();
                navigator.clipboard.writeText(quoteText)
                    .then(function () {
                        copyBtn.textContent = "Copied!";
                        setTimeout(function () {
                            copyBtn.textContent = "Copy Quote";
                        }, 1500);
                    })
                    .catch(function (err) {
                        console.error('Copy failed:', err);
                    });
            });
        });
    }

    function showAllQuotes() {
        let quotesHTML = '';
        quotes.forEach(function (q) {
            quotesHTML += `
    <div class="quote" style="margin-bottom: 20px;">
      <span class="quote-text">"${q.quote}" - ${q.author}</span>
      <button class="copyBtn">Copy Quote</button>
    </div>
  `;
        });
        quoteList.innerHTML = quotesHTML;
        addCopyFunctionality();
    }

    document.getElementById('randomQuoteLink').addEventListener('click', function (e) {
        e.preventDefault();
        if (quotes.length === 0) return;
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        quoteList.innerHTML = `
            <div class="quote">
                <span class="quote-text">"${randomQuote.quote}" - ${randomQuote.author}</span>
                <button class="copyBtn">Copy Quote</button>
            </div>
            `;
        addCopyFunctionality();
    });

    document.getElementById('showAllBtn').addEventListener('click', function () {
        if (quotes.length === 0) return;
        showAllQuotes();
    });
});