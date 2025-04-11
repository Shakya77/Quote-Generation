document.addEventListener('DOMContentLoaded', function () {

    try {
        const fetchApi = async () => {
            const url = 'https://dummyjson.com/quotes';
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
        }
    } catch (e) {
        console.log(e);
    }

});

