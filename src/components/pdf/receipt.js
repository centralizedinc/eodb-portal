
/**
 *
 * @param {Object} details
 * @returns {Object} document
 */
function fillup(details) {
    console.log("fillup details printer: " + JSON.stringify(details))
    var content = getContent(details);
    console.log('get content ###### :', content);
    return {
        content: content,
        pageSize: 'LEGAL'
    };
}
/**
 * 
 * @param {Object} details 
 */
function getContent(details) {
    var content = [{
        layout: "noBorders",
        table: {
            widths: [22],
            body: [
                [
                    {
                        text: "test",
                        fontSize: 15,
                        bold: true,
                        characterSpacing: 3,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, 0, 0, 0]
                    }
                ]
            ]
        }
    }]
    return content;
}

/**
 * @returns {String}
 * @param {Number} amount 
 */
function formatAmount(amount) {
    if (!amount || isNaN(amount)) return "0.00";
    var parts = parseFloat(amount).toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}


/**
 * @returns {String}
 * @param {Date} date
 * @param {Object|String} type
 */
function formatDate(date, type) {
    var dt = new Date();
    if (date) {
        dt = new Date(date)
    }
    if (!type) {
        type = {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }
    } else if (type === 'time') {
        type = {
            hour12: true,
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        }
    }
    return dt.toLocaleString("en-US", type);
}

export default {
    fillup
};