$(document).ready(function () {
    loadReviews();

    window.submitReview = function () {
        var username = $('#username').val();
        var review = $('#review').val();

        if (username && review) {
            var newReview = {
                username: username,
                review: review,
                date: new Date().toLocaleDateString(),
            };

            saveReview(newReview);
            $('#username').val('');
            $('#review').val('');

            loadReviews();
        } else {
            alert('Please enter both username and review.');
        }
    };

    function saveReview(review) {
        var reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    function loadReviews() {
        var username = $('#username').val();
        var reviews = JSON.parse(localStorage.getItem('reviews')) || [];

        var reviewsList = $('#reviews-list');
        reviewsList.empty();

        if (reviews.length > 0) {
            for (var i = 0; i < reviews.length; i++) {
                var reviewHtml = `
                    <div class="review">
                        <strong>${reviews[i].username}</strong> (${reviews[i].date}):
                        <p>${reviews[i].review}</p>
                    </div>
                `;
                reviewsList.append(reviewHtml);
            }
        } else {
            reviewsList.append('<p>No reviews yet.</p>');
        }
    }
});
