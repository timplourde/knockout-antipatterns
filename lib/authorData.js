
function generateBooks(bookName, numEditions) {
    var books = [];
    for (var i = 1; i <= numEditions; i++) {
        books.push({
            title: bookName + " Edition " + i,
            ISBN: "ISBN" + Math.floor(Math.random() * 10000),
            pages: Math.floor(Math.random() * 100)
        })
    }
    return books;
}

function getAuthorData(numBooksA, numBooksB) {
    return [
        {
            name: "Prolific Genuis",
            books: generateBooks("Quantum Computing", numBooksA)
        },
        {
            name: "Greedy Professor",
            books: generateBooks("Underwater Basketweaving", numBooksB)
        }
    ];
}
