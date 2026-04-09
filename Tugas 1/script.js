let currentQuote = "";

async function getNewQuote() {
    const btn = document.getElementById('newBtn');
    btn.textContent = 'Loading...';
    btn.disabled = true;

    try {
        // Ambil dari dummyjson.com (public)
        const res = await fetch('https://dummyjson.com/quotes/random');
        const data = await res.json();

        currentQuote = `"${data.quote}" - ${data.author}`;

        document.getElementById('quoteText').textContent = `"${data.quote}"`;
        document.getElementById('authorText').textContent = `- ${data.author}`;
    } catch (error) {
        document.getElementById('quoteText').textContent = "Maaf, gagal mengambil quote. Coba lagi!";
    }

    btn.textContent = '🎲 Quote Baru';
    btn.disabled = false;
}

function copyQuote() {
    if (!currentQuote) return alert("Belum ada quote untuk dicopy!");

    navigator.clipboard.writeText(currentQuote).then(() => {
        const originalText = document.getElementById('copyBtn').textContent;
        document.getElementById('copyBtn').textContent = '✅ Copied!';
        setTimeout(() => {
            document.getElementById('copyBtn').textContent = originalText;
        }, 2000);
    });
}

// Load quote pertama kali
window.onload = getNewQuote;