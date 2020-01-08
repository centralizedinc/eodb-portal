 //const form = require("./template/communitytaxcert_template").template;


/**
 *
 * @param {LicenseModel} details
 * @returns {Object} document
 */
function fillup(details) {
    console.log("fillup details printer: " + JSON.stringify(details))
    var content = getContent(details);
    console.log('get content ###### :', content);
    return {
        background: function (page) {
            return [{
                image: "form", 
                width: 400

            }]
        },
        content: content,
        images: {
            form: form
        },
        pageSize: 'LEGAL'
    };

}
/**
 * 
 * @param {Object} details 
 */
function getContent(details) {
    var content = [

        {
            layout: "noBorders",
            table: {
                heights: [70],
                widths: [300],
                body: [
                    [
                        {
                            text: " ",
                            fontSize: 6,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [1, -4, 0, 0]
                        }
                    ]
                ]
            }

        },
        //////////////////////////////////////////////////////////////////////////////

        {
            //layout: "noBorders",
            table: {
                heights: [8],
                widths: [300],
                body: [
                    [
                        {
                            text: " ",
                            fontSize: 6,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [1, -13, 0, 0]
                        }
                    ]
                ]
            }

        },
        ////////////////////////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                heights: [15],
                widths: [300],
                body: [
                    [
                        {
                            text: "Cedula",
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 1,
                            alignment: 'justify',
                            // right,down,left,up
                            margin: [94, -30, 0, 0]
                        }
                    ]
                ]
            }

    
        },
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////////////////////////// ----------------------Thank You 

        {
            layout: "noBorders",
            table: {
                widths: [300],
                heights: [10,],
                body: [
                    [{
                        text: "   ",
                        fontSize: 9,
                        Bold: true,
                        alignment: 'justify',
                        characterSpacing: [1],
                        // right,down,left,up
                        margin: [80, -2, 0, 0]
                    },


                    ]

                ]
            }
        },
        ///////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                widths: [300],
                heights: [10,],
                body: [
                    [{
                        text: "   ",
                        fontSize: 6,
                        alignment: 'justify',
                        characterSpacing: [0],
                        // right,down,left,up
                        margin: [100, -2, 0, 0]
                    },


                    ]

                ]
            }
        },

        ///////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [300],
                heights: [2,],
                body: [
                    [{
                        text: " Erick M Wagan ",
                        fontSize: 10,
                        alignment: 'left',
                        characterSpacing: [0],
                        // right,down,left,up
                        margin: [115, 0, 0, 0]
                    },


                    ]

                ]
            }
        },

        /////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [300],
                heights: [2,],
                body: [
                    [{
                        text: " Minicipal Mayor ",
                        fontSize: 10,
                        alignment: 'left',
                        characterSpacing: [0],
                        // right,down,left,up
                        margin: [114, -5, 0, 0]
                    },


                    ]

                ]
            }
        },


        /////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [300],
                heights: [1,],
                body: [
                    [{
                        text: " ",
                        fontSize: 2,


                    },


                    ]

                ]
            }
        },
        ///////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                widths: [300],
                heights: [2,],
                body: [
                    [{
                        text: " DISPLAY IN PUBLIC VIEW",
                        fontSize: 12,
                        alignment: 'justify',
                        characterSpacing: [0],
                        // right,down,left,up
                        margin: [80, 5, 0, 0]
                    },


                    ]

                ]
            }
        },
        /////////////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [300],
                heights: [1,],
                body: [
                    [{
                        text: " ",
                        fontSize: 2,


                    },


                    ]

                ]
            }
        },
        //////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                widths: [300],
                heights: [30,],
                body: [
                    [{
                        text: " ",
                        fontSize: 2,


                    },


                    ]

                ]
            }
        },

        /////////////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [300],
                heights: [2,],
                body: [
                    [{
                        text: " This electronic permit (ePermit) is computer generated and does not require signature",
                        fontSize: 5,
                        alignment: 'justify',
                        characterSpacing: [0],
                        // right,down,left,up
                        margin: [45, -2, 0, 0]
                    },


                    ]

                ]
            }
        },
        //////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                widths: [300],
                heights: [2,],
                body: [
                    [{
                        text: " Verify authenticity of this document at: ",
                        fontSize: 5,
                        alignment: 'justify',
                        characterSpacing: [0],
                        // right,down,left,up
                        margin: [100, -2, 0, 0]
                    },


                    ]

                ]
            }
        },
        /////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                widths: [300],
                heights: [2,],
                body: [
                    [{
                        text: " Thank you for your business ",
                        fontSize: 5,
                        alignment: 'justify',
                        characterSpacing: [0],
                        // right,down,left,up
                        margin: [115, -2, 0, 0]
                    },


                    ]

                ]
            }
        },

        /////////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////////////////////End

    ]

    return content.concat(other_content);

}

/////////////////////////////////////////////////////////////////////////////////




/**
 * @returns {String}
 * @param {String} text 
 */
function checkText(text) {
    if (!text) return " ";
    return text.toUpperCase();
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
            month: "short",
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