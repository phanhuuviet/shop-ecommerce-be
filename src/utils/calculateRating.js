const calculateRating = ({ oldRating, reviewCount, rating }) => {
    return (oldRating * reviewCount + rating) / (reviewCount + 1);
};

module.exports = calculateRating;
