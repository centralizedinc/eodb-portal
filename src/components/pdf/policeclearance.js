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
                width: 370

            }]
        },
        content: content,
        images: {
            form: form
        },
        pageSize: 'LEGAL'
    };




    // const form = require("./template/policeclearance_template").template;


    // import { IoTAnalytics } from "aws-sdk";

    // /**
    //  *
    //  * @param {Object} details
    //  * @returns {Object} document
    //  */
    // function fillup(details) {
    //     console.log("fillup details printer: " + JSON.stringify(details))
    //     var content = getContent(details);
    //     console.log('get content ###### :', content);
    //     return {
    //         content: content,
    //         pageSize: 'LEGAL'
    //     };
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
                            fontSize: 5,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -20, 0, 0]
                        }
                    ]
                ]
            }

        },

        ///////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                heights: [1],
                widths: [300],
                body: [
                    [
                        {
                            text: "National Police Commission",
                            fontSize: 8,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [95, -20, 0, 0]
                        }
                    ]
                ]
            }

        },
        ////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                heights: [1],
                widths: [300],
                body: [
                    [
                        {
                            text: "Quezon Police Provincial Office",
                            fontSize: 8,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [92, -16, 0, 0]
                        }
                    ]
                ]
            }

        },
        ////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                heights: [1],
                widths: [300],
                body: [
                    [
                        {
                            text: "San Antonio Police Station",
                            fontSize: 8,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [100, -12, 0, 0]
                        }
                    ]
                ]
            }

        },
        /////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                heights: [1],
                widths: [300],
                body: [
                    [
                        {
                            text: " ",
                            fontSize: 5,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -20, 0, 0]
                        }
                    ]
                ]
            }

        },

        //////////////////////////////////////////////////////////////////////////////////
        // DATE
        {
            layout: "noBorders",
            table: {
                heights: [1],
                widths: [300],
                body: [
                    [
                        {
                            text: formatDate(null, {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit"
                            }),
                            fontSize: 5,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -20, 2, 0]
                        }
                    ]
                ]
            }

        },
        ///////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                heights: [1],
                widths: [300],
                body: [
                    [
                        {
                            text: "_____________",
                            fontSize: 5,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -24, 0, 0]
                        }
                    ]
                ]
            }

        },
        ////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                heights: [1],
                widths: [300],
                body: [
                    [
                        {
                            text: "Date",
                            fontSize: 5,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -24, 9, 0]
                        }
                    ]
                ]
            }

        },
        /////////////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                heights: [1],
                widths: [300],
                body: [
                    [
                        {
                            text: "POLICE CLEARANCE CERTIFICATE",
                            fontSize: 9,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -16, 9, 0]
                        }
                    ]
                ]
            }

        },
        ///////////////////////////////////////////////////////////////////////////////////////
        // police_no
        {
            layout: "noBorders",
            table: {
                heights: [4],
                widths: [213, 79,],
                body: [
                    [
                        {
                            text: "TO WHOM IT MAY CONCERN:",
                            fontSize: 7,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [1, -8, 0, 0]

                        },
                        {
                            text: ` No. ${checkText(details.police_no)}`,
                            fontSize: 6,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [1, -10, 0, 0]
                        },

                    ]
                ]
            }
        },

        //////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                heights: [1],
                widths: [300],
                body: [
                    [
                        {
                            text: "This is to certify that the person whose personal details below, has passed",
                            fontSize: 5,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [8, -6, 0, 0]
                        }
                    ]
                ]
            }

        },
        ////////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                heights: [1],
                widths: [300],
                body: [
                    [
                        {
                            text: "the records verification which was conducted by this station. The result(s) of which is/are listed below:",
                            fontSize: 5,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [1, -6, 0, 0]
                        }
                    ]
                ]
            }

        },
        //////////////////////////////////////////////////////////////////////////////////////////
        // name
        {
            //layout: "noBorders",        
            table: {
                widths: [60, 231,],
                heights: [6,],
                body: [
                    [{
                        text: "NAME                      :",
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },
                    {
                        text: checkText(details.name),
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },



                    ]

                ]
            }
        },
        ////////////////////////////////////////////////////////////////////////////////////////
        // address
        {
            //layout: "noBorders",        
            table: {
                widths: [60, 231,],
                heights: [6,],
                body: [
                    [{
                        text: "ADDRESS                :",
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },
                    {
                        text: checkText(details.address),
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },



                    ]

                ]
            }
        },
        ////////////////////////////////////////////////////////////////////////////////
        // birth_date
        {
            //layout: "noBorders",        
            table: {
                widths: [60, 231,],
                heights: [6,],
                body: [
                    [{
                        text: "DATE OF BIRTH     :",
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },
                    {
                        text: formatDate(details.birth_date),
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },



                    ]

                ]
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////
        // birth_place
        {
            //layout: "noBorders",        
            table: {
                widths: [60, 231,],
                heights: [6,],
                body: [
                    [{
                        text: "PLACE OF BIRTH  :",
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },
                    {
                        text: checkText(details.birth_place),
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },



                    ]

                ]
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////
        // findings
        {

            layout: "noBorders",
            table: {
                widths: [60, 231,],
                heights: [6,],
                body: [
                    [{
                        text: "FINDINGS                  :",
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },
                    {
                        text: checkText(details.findings),
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },



                    ]

                ]
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////
        // purpose
        {

            layout: "noBorders",
            table: {
                widths: [60, 231,],
                heights: [6,],
                body: [
                    [{
                        text: "PURPOSE                  :",
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },
                    {
                        text: checkText(details.purpose),
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },



                    ]

                ]
            }
        },

        ///////////////////////////////////////////////////////////////////////////////////////
        // validity
        {
            layout: "noBorders",
            table: {
                widths: [60, 231,],
                heights: [6,],
                body: [
                    [{
                        text: "VALID FOR                :",
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },
                    {
                        text: checkText(details.validity),
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },



                    ]

                ]
            }
        },
        ///////////////////////////////////////////////////////////////////////////////////////
        // ctc_no
        {
            layout: "noBorders",
            table: {
                widths: [60, 231,],
                heights: [6,],
                body: [
                    [{
                        text: "Res. Cert. No.           :",
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },
                    {
                        text: checkText(details.ctc_no),
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },



                    ]

                ]
            }
        },
        ///////////////////////////////////////////////////////////////////////////////////////
        // date_created
        {

            layout: "noBorders",
            table: {
                widths: [60, 231,],
                heights: [6,],
                body: [
                    [{
                        text: "Date Issued              :",
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },
                    {
                        text: formatDate(details.date_created, {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit"
                        }),
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },



                    ]

                ]
            }
        },
        ////////////////////////////////////////////////////////////////////////////////////////
        // verified_by_first
        {

            layout: "noBorders",
            table: {
                widths: [60, 231,],
                heights: [6,],
                body: [
                    [{
                        text: "Verified by                :",
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },
                    {
                        text: checkText(details.verified_by_first),
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },



                    ]

                ]
            }
        },
        ///////////////////////////////////////////////////////////////////////////////////////
        // verified_by_second
        {

            layout: "noBorders",
            table: {
                widths: [60, 231,],
                heights: [6,],
                body: [
                    [{
                        text: "Verified by                :",
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },
                    {
                        text: checkText(details.verified_by_second),
                        fontSize: 6,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -1, 0, 0]
                    },



                    ]

                ]
            }
        },
        //////////////////////////////////////////////////////////////////////////////// ----------------------Thank You 

        {
            layout: "noBorders",
            table: {
                widths: [300],
                heights: [2,],
                body: [
                    [{
                        text: " Thank you for your payment!  ",
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
                heights: [2,],
                body: [
                    [{
                        text: " Here's your auto generated  certificate  ",
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
        // {
        //     layout: "noBorders",
        //     table: {
        //         widths: [300],
        //         heights: [2,],
        //         body: [
        //             [{
        //                 text: "[  PRINT BUTTON   ] ",
        //                 fontSize: 6,
        //                 alignment: 'justify',
        //                 characterSpacing: [0],
        //                 // right,down,left,up
        //                 margin: [120, -2, 0, 0]
        //             },


        //             ]

        //         ]
        //     }
        // },
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
                heights: [2,],
                body: [
                    [{
                        text: " This is only an electronic copy. You can get your official  certificate upon claiming your",
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
                        text: " Police Clearance at the Municipal Hall. ",
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

        //////////////////////////////////////-----END-----/////////////////////////////////////
    ]

    return content;

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