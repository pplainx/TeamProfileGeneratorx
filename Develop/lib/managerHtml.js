
// using the function to fill the object values to html structure

function generateHtml(data) {
    return `<div class="outer">
    <div class="box">
        <div class="heading">
            <h4>${data.name}</h4>
            <h4><i class="fas fa-mug-hot"></i> Manager</h4>
        </div>
        <div class="details">
            <div class="item">
                <p>ID: <span>${data.id}</span></p>
                <p>Email: <span class="link">${data.email}</span></p>
                <p class="last-item">Office number: <span>${data.officeNumber}</span></p>
            </div>
        </div>
    </div>
</div>`
}

//exports the class

module.exports = {generateHtml: generateHtml};