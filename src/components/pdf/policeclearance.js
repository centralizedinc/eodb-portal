const form = require("./template/policeclearance_template").template;


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




    // const form = require("./template/policeclearance_template").template;
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
                heights: [100],
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
                            margin: [0, 0, 0, 0]
                        }
                    ]
                ]
            }

        },

        ///////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                widths: [100,'*',100],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                            text: "National Police Commission",
                            fontSize: 14,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [0,0, 0, 0]
                        },
                        {
                            text: ""
                        }
                    ],
                    [
                        {
                            text: ""
                        },
                        {
                            text: "Quezon Police Provincial Office",
                            fontSize: 14,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [0, 0, 0, 0]
                        },
                        {
                            text: ""
                        }
                    ],
                    [
                        {
                            text: ""
                        },
                        {
                            text: "San Antonio Police Station",
                            fontSize: 14,
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
        /////////////////////////////////////////////////////////////////////////////////////
        //spacing
        {
            layout: "noBorders",
            table: {
                body: [
                    [
                        {
                            text: " ",
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [0, 0, 0, 0]
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
                widths: [500],
                body: [
                    [
                        {
                            text: formatDate(null, {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit"
                            }),
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, 0, 0, 0]
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
                widths: [502],
                body: [
                    [
                        {
                            text: "_____________",
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [5, -15, 0, 0]
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
                widths: [500],
                body: [
                    [
                        {
                            text: "Date",
                            fontSize: 10,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, -10,18, 0]
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
                widths: [100,'*',100],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                            text: "POLICE CLEARANCE CERTIFICATE",
                            fontSize: 14,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [0, 10, 0, 20]
                        },
                        {
                            text: ""
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
                widths: [75,180, 150],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                            text: "TO WHOM IT MAY CONCERN:",
                            fontSize: 12,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [0, 0, 0, 0]

                        },
                        {
                            text: ` No. ${checkText(details.police_no)}`,
                            fontSize: 14,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'right',
                            // right,down,left,up
                            margin: [0, 0, 0, 0]
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
                widths: [75,"*",100],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                            text: " This is to certify that the person whose personal details below, has passed the records verification which was conducted by this station. The result(s) of which is/are listed below:",
                            fontSize: 8,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [0, 10, 0, 5]
                        }
                    ]
                ]
            }

        },
        ////////////////////////////////////////////////////////////////////////////////////////
        // {
        //     layout: "noBorders",
        //     table: {
        //         heights: [1],
        //         widths: [100,'*',100],
        //         body: [
        //             [
        //                 {
        //                     text: ""
        //                 },
        //                 {
        //                     text: "the records verification which was conducted by this station. The result(s) of which is/are listed below:",
        //                     fontSize: 8,
        //                     bold: true,
        //                     characterSpacing: 0,
        //                     alignment: 'left',
        //                     // right,down,left,up
        //                     margin: [0, 0, 0, 0]
        //                 }
        //             ]
        //         ]
        //     }

        // },
        //////////////////////////////////////////////////////////////////////////////////////////
        // name
        {
            layout: "noBorders",     
            table: {
                widths: [70, '*', 100],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                            // layout: "noBorders", 
                            table: {
                                widths: [110, 231,],
                                body: [
                                    [{
                                        text: "NAME                      :",
                                        fontSize: 12,
                                        alignment: 'left',
                                        // right,down,left,up
                                        margin: [0, 0, 0, 0]
                                    },
                                    {
                                        text: checkText(details.name),
                                        fontSize: 12,
                                        alignment: 'left',
                                        // right,down,left,up
                                        margin: [0, 0, 0, 0]
                                    }
                                    ],
                                    [{
                                        text: "ADDRESS                :",
                                        fontSize: 12,
                                        alignment: 'left',
                                        // right,down,left,up
                                        margin: [0, 0, 0, 0]
                                    },
                                    {
                                        text: checkText(details.address),
                                        fontSize: 12,
                                        alignment: 'left',
                                        // right,down,left,up
                                        margin: [0, 0, 0, 0]
                                    },
                
                
                
                                    ],
                                    [{
                                        text: "DATE OF BIRTH      :",
                                        fontSize: 12,
                                        alignment: 'left',
                                        // right,down,left,up
                                        margin: [0, 0, 0, 0]
                                    },
                                    {
                                        text: formatDate(details.birth_date),
                                        fontSize: 12,
                                        alignment: 'left',
                                        // right,down,left,up
                                        margin: [0, 0, 0, 0]
                                    },
                
                
                
                                    ],
                                    [{
                                        text: "PLACE OF BIRTH   :",
                                        fontSize: 12,
                                        alignment: 'left',
                                        // right,down,left,up
                                        margin: [0, 0, 0, 0]
                                    },
                                    {
                                        text: checkText(details.birth_place),
                                        fontSize: 12,
                                        alignment: 'left',
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
        ////////////////////////////////////////////////////////////////////////////////////////
        // findings
        {

            layout: "noBorders",
            table: {
                widths: [70, 110, '*',40],
                heights: [6,],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                        text: "FINDINGS                 :",
                        fontSize: 12,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: checkText(details.findings),
                        fontSize: 12,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: ""
                    }
                    ],
                    [
                        {
                            text: ""
                        },
                        {
                        text: "PURPOSE                 :",
                        fontSize: 12,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: checkText(details.purpose),
                        fontSize: 12,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: ""
                    }
                    ],
                    [
                        {
                            text: ""
                        },
                        {
                        text: "VALID FOR               :",
                        fontSize: 12,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: "SIX MONTHS (6) FROM THE DATE OF ISSUANCE",
                        fontSize: 12,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: ""
                    }
                    ],
                    [
                        {
                            text: ""
                        },
                        {
                        text: "Res. Cert. No.          :",
                        fontSize: 12,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: checkText(details.ctc_no),
                        fontSize: 12,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: ""
                    }
                    ],
                    [
                        {
                            text: ""
                        },
                        {
                        text: "Date Issued              :",
                        fontSize: 12,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: formatDate(details.date_created, {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit"
                        }),
                        fontSize: 12,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: ""
                    }
                    ],
                    [
                        {
                            text: ""
                        },
                        {
                        text: "Verified by                :",
                        fontSize: 12,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: checkText(details.verified_by),
                        fontSize: 12,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [0, 0, 0, 0]
                    },
                    {
                        text: ""
                    }
                    ],
                    
                ]
            }
        },
        //////////////////////////////////////////////////////////////////////////////// ----------------------Thank You 

        {
            layout: "noBorders",
            table: {
                widths: [100, '*', 100],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                        text: " Thank you for your payment!  ",
                        fontSize: 14,
                        Bold: true,
                        alignment: 'center',
                        characterSpacing: [1],
                        // right,down,left,up
                        margin: [0, 10, 0, 0]
                    },
                    {
                        text: ""
                    }


                    ]

                ]
            }
        },
        ///////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                widths: [100,'*',100],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                        text: " Here's your auto generated  certificate  ",
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

        //////////////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [100, '*', 100],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                        text: " This is only an electronic copy. You can get your official  certificate upon claiming your",
                        fontSize: 10,
                        alignment: 'center',
                        characterSpacing: [0],
                        // right,down,left,up
                        margin: [0, 20, 0, 0]
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
                widths: [100, '*', 100],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                        text: " Police Clearance at the Municipal Hall. ",
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
                widths: [100, '*', 100],
                body: [
                    [
                        {
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