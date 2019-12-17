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
        layout: "noBorders",
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
                        margin: [1, -13 , 0, 0]
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
                        text: "BUSINESS PERMIT OFFICE",
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
    //////////////////////////////////////////////////////////////////////////////////////////////
    {
        layout: "noBorders",
        table: {
            heights: [8],
            widths: [300],
            body: [
                [
                    {
                        text: "BUSINESS PERMIT   ",
                        fontSize: 12,
                        bold: true,
                        characterSpacing: 1,
                        alignment: 'justify',
                        // right,down,left,up
                        margin: [116, -20, 0, 0]
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
            widths: [300],
            body: [
                [
                    {
                        text: "REPUBLIC OF GAMERS COMPUTER CAFE",
                        fontSize: 8,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'justify',
                        // right,down,left,up
                        margin: [118, 0, 0, 0]
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
            widths: [170, 121],
            body: [
                [
                    {
                        text: "LICENSE NUMBER:",
                        fontSize: 6,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'right',
                        // right,down,left,up
                        margin: [99, 0, 1, 0]
                    },
                    {
                        text: "1546238984",
                        fontSize: 5,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [0, 0, 0, 0]
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
            widths: [170, 121],
            body: [
                [
                    {
                        text: "ADDRESS:",
                        fontSize: 6,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'right',
                        // right,down,left,up
                        margin: [85, -6, 24, 0]
                    },
                    {
                        text: "B17 L10 CAMELLA HOMES SAN ANTONIO QUEZON",
                        fontSize: 5,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -5, 0, 0]
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
            widths: [170,121],
            body: [
                [
                    {
                        text: "BUSINESS OWNER:",
                        fontSize: 6,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'right',
                        // right,down,left,up
                        margin: [85, -12, 0, 0]
                    },
                    {
                        text: "RICHARD BERMUDEZ ",
                        fontSize: 5,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -11, 0, 0]
                    }
                ]
            ]
        }

    },



    /////////////////////////////////////////////////////////////////////////////////////////////----Table 1
    {
        //layout: "noBorders",
        table: {
            heights: [6],
            widths: [40,80,44, 50,50],
            body: [
                [
                    {
                        text: "1546238984 ",
                        fontSize: 5,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'justify',
                        // right,down,left,up
                        margin: [1, 0, 0, 0]
                   
                    },
                    {
                        text: "SINGLE PROPRIETORSHIP",
                        fontSize: 5,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [5, 0, 0, 0]
                    },
                    {
                        text: "12-30-2019",
                        fontSize: 5,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [9, 0, 0, 0]
                    },
                    {
                        text: "50 sq.m",
                        fontSize: 5,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [10, 0, 0, 0]
                    },
                    {
                        text: "01-01-2019 ",
                        fontSize: 5,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [10, 0, 0, 0]
                    }
                ]
            ]
        }

    },

    ////////////////////////////////////////////////////////////////////////////////////////
    {
        layout: "noBorders",
        table: {
            heights: [6],
            widths: [50,70,44, 50,50],
            body: [
                [
                    {
                        text: "ACCOUNT NUMBER ",
                        fontSize: 4,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'justify',
                        // right,down,left,up
                        margin: [6, -2, 0, 0]
                   
                    },
                    {
                        text: "OWNERSHIP TYPE",
                        fontSize: 4,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [15, -2, 0, 0]
                    },
                    {
                        text: "VALID UNTIL",
                        fontSize: 4,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [17, -2, 0, 0]
                    },
                    {
                        text: "AREA (sq.m)",
                        fontSize: 4,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [20, -2  , 0, 0]
                    },
                    {
                        text: "DATE ISSUED ",
                        fontSize: 4,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [18, -2, 0, 0]
                    }
                ]
            ]
        }

    },
////////////////////////////////////////////////////////////////////////////////////////////////////----Table 2
{
    //layout: "noBorders",
    table: {
        heights: [6],
        widths: [300],
        body: [
            [
                {
                    text: "REPUBLIC OF GAMERS COMPUTER CAFE",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [1, 1, 0, 0]
                }
            ]
        ]
    }

},
///////////////////////////////////////////////////////////////////////////////////////////////////////
{
    layout: "noBorders",
    table: {
        heights: [6],
        widths: [300],
        body: [
            [
                {
                    text: "BUSINESS NAME",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, -2, 0, 0]
                }
            ]
        ]
    }

},
/////////////////////////////////////////////////////////////////////////////////////////////////////----Table3

{
    //layout: "noBorders",
    table: {
        heights: [6],
        widths: [300],
        body: [
            [
                {
                    text: " B17 L10 CAMELLA HOMES SAN ANTONIO QUEZON",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [1, 1, 0, 0]
                }
            ]
        ]
    }

},
///////////////////////////////////////////////////////////////////////////////////////////////////////
{
    layout: "noBorders",
    table: {
        heights: [6],
        widths: [300],
        body: [
            [
                {
                    text: "LOCATION OF BUSINESS ESTABLISHMENT",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, -2, 0, 0]
                }
            ]
        ]
    }

},
///////////////////////////////////////////////////////////////////////////////////////////////////////---------Table4
{
    //layout: "noBorders",
    table: {
        heights: [6],
        widths: [124,50,50, 50,],
        body: [
            [
                {
                    text: "BERMUDEZ, RICHARD ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [1, 1, 0, 0]
               
                },
                {
                    text: "RENEWAL",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 1, 0, 0]
                },
                {
                    text: "QUARTERLY",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 1, 0, 0]
                },
                {
                    text: " 15264582-A",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 1 , 0, 0]
                },
               
            ]
        ]
    }

},

/////////////////////////////////////////////////////////////////////////////////////////////////////
{
    layout: "noBorders",
    table: {
        heights: [6],
        widths: [124,50,50, 50,],
        body: [
            [
                {
                    text: "TAX PAYER (OWNER)",
                    fontSize: 4,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [50, -2, 0, 0]
               
                },
                {
                    text: "STATUS",
                    fontSize: 4,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [24, -2, 0, 0]
                },
                {
                    text: "MODE OF PAYMENT",
                    fontSize: 4,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [12, -2, 0, 0]
                },
                {
                    text: " O.R NUMBER",
                    fontSize: 4,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [20, -2  , 0, 0]
                },
               
            ]
        ]
    }

},

////////////////////////////////////////////////////////////////////////////////////////////////////------Table5---- Fee's
{
    //layout: "noBorders",
    table: {
        heights: [5],
        widths: [124,80,79,],
        body: [
            [
                {
                    text: "TAX DESCRIPTION",
                    fontSize: 6,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [40, 1, 0, 0]
               
                },
                {
                    text: "TAX BASE",
                    fontSize: 6,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [28, 1, 0, 0]
                },
                {
                    text: "AMOUNT DUE",
                    fontSize: 6,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [20, 1, 0, 0]
                },
                
               
            ]
        ]
    }

},
///////////////////////////////////////////////////////////////////////////////////////////////
{
    //layout: "noBorders",
    table: {
        heights: [4],
        widths: [124,80,79,],
        body: [
            [
                {
                    text: "COMPUTER SHOP",
                    fontSize: 6,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [1, -1, 0, 0]
               
                },
                {
                    text: "360,000.00",
                    fontSize: 6,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'right',
                    // right,down,left,up
                    margin: [1, -1, 0, 0]
                },
                {
                    text: "1,617.00",
                    fontSize: 6,
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
//////////////////////////////////////////////////////////////////////////////////////////////////
{
    //layout: "noBorders",
    table: {
        heights: [4],
        widths: [124,80,79,],
        body: [
            [
                {
                    text: "Mayor's Permit Fee",
                    fontSize: 6,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [1, -1, 0, 0]
               
                },
                {
                    text: "",
                    fontSize: 6,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'right',
                    // right,down,left,up
                    margin: [28, -1, 0, 0]
                },
                {
                    text: "700.00",
                    fontSize: 6,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'right',
                    // right,down,left,up
                    margin: [20, -1, 0, 0]
                },
                
               
            ]
        ]
    }
},
////////////////////////////////////////////////////////////////////////////////////////////////////
{
    //layout: "noBorders",
    table: {
        heights: [4],
        widths: [124,80,79,],
        body: [
            [
                {
                    text: "Other Fees",
                    fontSize: 6,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [1, -1, 0, 0]
               
                },
                {
                    text: "",
                    fontSize: 6,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'right',
                    // right,down,left,up
                    margin: [28, -1, 0, 0]
                },
                {
                    text: "2000.00",
                    fontSize: 6,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'right',
                    // right,down,left,up
                    margin: [20, -1, 0, 0]
                },
                
               
            ]
        ]
    }
},


/////////////////////////////////////////////////////////////////////////////////////////////////////
{
    //layout: "noBorders",
    table: {
        heights: [4],
        widths: [213,79,],
        body: [
            [
                {
                    text: "TOTAL",
                    fontSize: 7,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'right',
                    // right,down,left,up
                    margin: [1, -1, 0, 0]
               
                },
                {
                    text: "4317.00",
                    fontSize: 6,
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
////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////// ----------------------Thank You 

{
    layout: "noBorders",        
    table: {
    widths: [300],
    heights: [10,],
    body: [
      [{
            text:"   ",
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
            text:"   ",
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
            text:" Erick M Wagan ",
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
            text:" Minicipal Mayor ",
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
            text:" ",
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
            text:" DISPLAY IN PUBLIC VIEW",
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
            text:" ",
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
            text:" ",
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
            text:" This electronic permit (ePermit) is computer generated and does not require signature",
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
            text:" Verify authenticity of this document at: ",
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
            text:" Thank you for your business ",
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

return content;

}

/////////////////////////////////////////////////////////////////////////////////







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