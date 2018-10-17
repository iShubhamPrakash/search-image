(function () {
    const formBtn = document.querySelector('#submit-btn');
    const searchField = document.querySelector('#search-keyword');
    let searchedText;
    const responseContainer = document.querySelector('#response-container');

    formBtn.addEventListener('click', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedText = searchField.value;

        const unsplashURL = "https://api.unsplash.com/search/photos?page=1&query=" + searchedText;

        fetch(unsplashURL, {
                headers: {
                    Authorization: 'Client-ID d23037952a3b66fb270ca4411258456858ce7aa2d6955d4974cbe5438059a453'
                }
            })
            .then(response => response.json())
            .then(generateImage)
            .catch(err => requestError(err, 'image'));
    });

    function generateImage(data) {
        const images = data.results;
        let htmlContent = "";
        if (data.results.length) {
            htmlContent = '<div class="image-container">' + data.results.map(image =>
                `<figure id="image">
                    <img src="${image.urls.regular}" alt="${searchedText}">
                    <figcaption>${searchedText} by ${image.user.name}</figcaption>
                </figure>`).join('') + `</div>`
        } else {
            htmlContent = `<h1 class="error-no-image">Sorry, No image result for  ${searchedText}</h1>`
        }

        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

})();
