const form = require("./template/businesspermit_template").template;


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
                width: 600
            }]
        },
        content: content,
        images: {
            form: form
        },
        pageSize: 'A4'
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
                // widths: [300],
                body: [
                    [{
                        text: " ",
                        fontSize: 6,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [0, -4, 0, 0]
                    }]
                ]
            }

        },
        //////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                heights: [8],
                // widths: [300],
                body: [
                    [{
                        text: " ",
                        fontSize: 6,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [0, -13, 0, 0]
                    }]
                ]
            }

        },
        ////////////////////////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                heights: [15],
                widths: [150, '*', 145],
                body: [
                    [{
                            text: '',
                        },
                        {
                            text: "BUSINESS PERMIT OFFICE",
                            // text: '',
                            fontSize: 14,
                            bold: true,
                            characterSpacing: 1,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [0, 50, 0, 0]
                        },
                        {
                            text: '',
                        }
                    ]
                ]
            }

        },
        //////////////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                heights: [8],
                widths: [140, '*', 135],
                body: [
                    [{
                            text: ""
                        },
                        {
                            text: "BUSINESS PERMIT   ",
                            fontSize: 14,
                            bold: true,
                            characterSpacing: 1,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [0, 10, 0, 0]
                            // margin: [116, 0, 0, 0]
                        },
                        {
                            text: ""
                        }
                    ]
                ]
            }

        },

        //////////////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                heights: [8],
                widths: [150, '*', 145],
                body: [
                    [{
                            text: ""
                        },
                        {
                            text: checkText(details.business_name),
                            fontSize: 12,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: ""
                        }
                    ]
                ]
            }

        },
        /////////////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                heights: [8],
                // widths: [170, 121],
                widths: [170, '*', '*', 135],
                body: [
                    [{
                            text: ""
                        },
                        {
                            text: "LICENSE NUMBER:",
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: checkText(details.business_no),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: ""
                        }
                    ]
                ]
            }

        },
        //////////////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                heights: [8],
                // widths: [170, 121],
                widths: [170, '*', '*', 135],
                body: [
                    [{
                            text: ""
                        },
                        {
                            text: "ADDRESS:",
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            // margin: [85, -6, 24, 0]
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: checkText(details.business_address),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            // margin: [1, -5, 0, 0]
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: ""
                        }
                    ]
                ]
            }

        },
        //////////////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                heights: [8],
                // widths: [170, 121],
                widths: [170, '*', '*', 135],
                body: [
                    [{
                            text: ""
                        },
                        {
                            text: "BUSINESS OWNER:",
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            // margin: [85, -12, 0, 0]
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: checkText(details.business_owner),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            // margin: [1, -11, 0, 0]
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: ""
                        }
                    ]
                ]
            }

        },



        /////////////////////////////////////////////////////////////////////////////////////////////----Table 1
        {
            layout: "noBorders",
            table: {
                heights: [6],
                widths: [30, '*', 50],
                body: [
                    [{
                            text: ""
                        },
                        {
                            table: {
                                heights: [6],
                                widths: [72, 150, 60, 70, 60],
                                body: [
                                    [{
                                            text: checkText(details.plate_no),
                                            fontSize: 10,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            // margin: [1, 0, 0, 0]
                                            margin: [0, 0, 0, 0]

                                        },
                                        {
                                            text: checkText(details.ownership_type),
                                            fontSize: 10,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            // margin: [5, 0, 0, 0]
                                            margin: [0, 0, 0, 0]
                                        },
                                        {
                                            text: formatDate(details.valid_until),
                                            fontSize: 10,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            // margin: [9, 0, 0, 0]
                                            margin: [0, 0, 0, 0]
                                        },
                                        {
                                            text: checkText(details.area),
                                            fontSize: 10,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            // margin: [10, 0, 0, 0]
                                            margin: [0, 0, 0, 0]
                                        },
                                        {
                                            text: formatDate(details.date_issued),
                                            fontSize: 10,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            // margin: [10, 0, 0, 0]
                                            margin: [0, 0, 0, 0]
                                        }
                                    ]
                                ]
                            }
                        },
                        {
                            text: ""
                        }
                    ]
                ]
            }

        },

        ////////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                // heights: [6],
                widths: [35, '*', 50],
                body: [
                    [{
                            text: ""
                        },
                        {
                            layout: "noBorders",
                            table: {
                                // heights: [6],
                                // widths: [50, 70, 44, 50, 50],
                                widths: [72, 150, 60, 70, 60],
                                body: [
                                    [{
                                            text: "ACCOUNT NUMBER ",
                                            fontSize: 8,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            // margin: [6, -2, 0, 0]
                                            margin: [0, 0, 0, 0]

                                        },
                                        {
                                            text: "OWNERSHIP TYPE",
                                            fontSize: 8,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            // margin: [15, -2, 0, 0]
                                            margin: [0, 0, 0, 0]
                                        },
                                        {
                                            text: "VALID UNTIL",
                                            fontSize: 8,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            // margin: [17, -2, 0, 0]
                                            margin: [0, 0, 0, 0]
                                        },
                                        {
                                            text: "AREA (sq.m)",
                                            fontSize: 8,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            // margin: [20, -2, 0, 0]
                                            margin: [0, 0, 0, 0]
                                        },
                                        {
                                            text: "DATE ISSUED ",
                                            fontSize: 8,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            // margin: [18, -2, 0, 0]
                                            margin: [0, 0, 0, 0]
                                        }
                                    ]
                                ]
                            }
                        },
                        {
                            text: ""
                        }
                    ]
                ]
            }

        },
        ////////////////////////////////////////////////////////////////////////////////////////////////////----Table 2

        ///////////////////////////////////////////////////////////////////////////////////////////////////////---------Table4
        {
            layout: "noBorders",
            table: {
                widths: [30, '*', 50],
                body: [
                    [{
                            text: ""
                        },
                        {
                            table: {
                                heights: [6],
                                widths: [227, 50, 55, 90],
                                body: [
                                    [{
                                            text: checkText(details.business_owner),
                                            fontSize: 10,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            // margin: [1, 1, 0, 0]
                                            margin: [0, 0, 0, 0]
                                        },
                                        {
                                            text: checkText(details.application_type),
                                            fontSize: 10,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            // margin: [1, 1, 0, 0]
                                            margin: [0, 0, 0, 0]
                                        },
                                        {
                                            text: checkText(details.mode_of_payment),
                                            fontSize: 10,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            // margin: [1, 1, 0, 0]
                                            margin: [0, 0, 0, 0]
                                        },
                                        {
                                            text: checkText(details.transaction_no),
                                            fontSize: 10,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            // margin: [1, 1, 0, 0]
                                            margin: [0, 0, 0, 0]
                                        },

                                    ]
                                ]
                            }
                        },
                        {
                            text: ""
                        }
                    ]
                ]
            }

        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                widths: [30, '*', 50],
                body: [
                    [{
                            text: ""
                        },
                        {
                            layout: "noBorders",
                            table: {
                                heights: [6],
                                widths: [227, 50, 55, 90],
                                body: [
                                    [{
                                            text: "TAX PAYER (OWNER)",
                                            fontSize: 10,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [0, 0, 0, 0]

                                        },
                                        {
                                            text: "STATUS",
                                            fontSize: 10,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [0, 0, 0, 0]
                                        },
                                        {
                                            text: "MODE OF PAYMENT",
                                            fontSize: 10,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [0, 0, 0, 0]
                                        },
                                        {
                                            text: " O.R NUMBER",
                                            fontSize: 10,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [0, 0, 0, 0]
                                        },

                                    ]
                                ]
                            }
                        },
                        {
                            text: ""
                        }
                    ]
                ]
            }

        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////------Table5---- Fee's
        {
            layout: "noBorders",
            table: {
                widths: [95, "*", 90],
                body: [
                    [{
                            text: ""
                        },
                        {
                            table: {
                                heights: [5],
                                widths: [213, 79],
                                body: [
                                    [{
                                            text: "TAX DESCRIPTION",
                                            fontSize: 10,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            // margin: [40, 1, 0, 0]
                                            margin: [0, 0, 0, 0]

                                        },
                                        {
                                            text: "AMOUNT DUE",
                                            fontSize: 10,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            // margin: [20, 1, 0, 0]
                                            margin: [0, 0, 0, 0]
                                        },


                                    ]
                                ]
                            }
                        },
                        {
                            text: ""
                        }
                    ]
                ]
            }

        }
    ];
    ///////////////////////////////////////////////////////////////////////////////////////////////

    // Map transactions
    details.transactions.forEach(trans => {
        content.push({
            layout: "noBorders",
            table: {
                widths: [95, '*', 90],
                body: [
                    [{
                            text: ""
                        },
                        {
                            table: {
                                heights: [4],
                                widths: [213, 79],
                                body: [
                                    [{
                                            text: checkText(trans.description),
                                            fontSize: 10,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'justify',
                                            // right,down,left,up
                                            margin: [1, -1, 0, 0]

                                        },
                                        {
                                            text: formatAmount(trans.amount),
                                            fontSize: 10,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'right',
                                            // right,down,left,up
                                            margin: [1, -1, 0, 0]
                                        },


                                    ]
                                ]
                            }
                        },
                        {
                            text: ""
                        }
                    ]
                ]
            }

        })
    })

    var total_amount = details.transactions.map(v => v.amount).reduce((t, c) => parseFloat(t) + parseFloat(c))

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    const other_content = [{
            layout: "noBorders",
            table: {
                widths: [95, '*', 90],
                body: [
                    [{
                            text: "",
                        },
                        {
                            table: {
                                heights: [4],
                                widths: [213, 79],
                                body: [
                                    [{
                                            text: "TOTAL",
                                            fontSize: 12,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'right',
                                            // right,down,left,up
                                            margin: [1, -1, 0, 0]

                                        },
                                        {
                                            text: formatAmount(total_amount),
                                            fontSize: 12,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'right',
                                            // right,down,left,up
                                            margin: [1, -1, 0, 0]
                                        },

                                    ]
                                ]
                            }
                        },
                        {
                            text: ""
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
                // widths: [300],
                heights: [20, ],
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
                widths: [150, '*', 150],
                heights: [2],
                body: [
                    [{
                            text: ""
                        },
                        {
                            text: " Erick M Wagan ",
                            fontSize: 14,
                            alignment: 'center',
                            characterSpacing: [0],
                            // right,down,left,up
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: ""
                        }

                    ]

                ]
            }
        },

        /////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [150, '*', 150],
                heights: [2],
                body: [
                    [{
                            text: ""
                        },
                        {
                            text: " Minicipal Mayor ",
                            fontSize: 14,
                            alignment: 'center',
                            characterSpacing: [0],
                            // right,down,left,up
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: ""
                        }

                    ]

                ]
            }
        },


        /////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [300],
                heights: [2],
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
                widths: [150, '*', 150],
                heights: [2, ],
                body: [
                    [{
                            text: ""
                        },
                        {
                            text: " DISPLAY IN PUBLIC VIEW",
                            fontSize: 12,
                            alignment: 'center',
                            characterSpacing: [0],
                            // right,down,left,up
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: ""
                        }

                    ]

                ]
            }
        },
        /////////////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [150, '*', 150],
                heights: [2, ],
                body: [
                    [{
                            text: ""
                        },
                        {
                            text: " This electronic permit (ePermit) is computer generated and does not require signature",
                            fontSize: 10,
                            alignment: 'center',
                            characterSpacing: [0],
                            // right,down,left,up
                            margin: [0, 30, 0, 0]
                        },
                        {
                            text: ""
                        }
                    ]

                ]
            }
        },
        //////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                widths: [150, '*', 150],
                heights: [2, ],
                body: [
                    [{
                            text: ""
                        },
                        {
                            text: " Verify authenticity of this document at: ",
                            fontSize: 10,
                            alignment: 'center',
                            characterSpacing: [0],
                            // right,down,left,up
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: ""
                        }

                    ]

                ]
            }
        },
        /////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                widths: [150, '*', 150],
                heights: [2],
                body: [
                    [{
                            text: ""
                        },
                        {
                            text: " Thank you for your business ",
                            fontSize: 10,
                            alignment: 'center',
                            characterSpacing: [0],
                            // right,down,left,up
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: ""
                        }

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