import { IoTAnalytics } from "aws-sdk";

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
    var content = [
        
        {
        layout: "noBorders",
        table: {
            heights: [10],
            widths: [300],
            body: [
                [
                    {
                        text: "REPUBLIKA NG PILIPINAS",
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
                        text: "BAYAN NG SAN ANTONIO  LALAWIGAN NG QUEZON",
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
            heights: [8],
            widths: [300],
            body: [
                [
                    {
                        text: "BUISNESS PERMIT",
                        fontSize: 9,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -20, 0, 0]
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
                    text: "Kris Legendary Computer Cafe",
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
                    text: "BERMUDEZ, RICHARD C",
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
    heights: [2,],
    body: [
      [{
            text:" Thank you for your payment!  ",
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
            text:" Here's your auto generated business certificate  ",
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
            text:"[  PRINT BUTTON   ] ",
            fontSize: 6,
            alignment: 'justify',
            characterSpacing: [0],
            // right,down,left,up
            margin: [120, -2, 0, 0]
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
    heights: [2,],
    body: [
      [{
            text:" This is only an electronic certificate. You can get your official business permit upon claiming the",
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
            text:" business license plate at the Municipal Hall. ",
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