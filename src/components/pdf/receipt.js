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
    var content = [{
        layout: "noBorders",
        table: {
            heights: [10],
            widths: [300],
            body: [
                [
                    {
                        text: "BAYAN  NG  SAN  ANTONIO",
                        fontSize: 12,
                        bold: true,  
                        characterSpacing: 1,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [80, -2, 0, 0]
                    }
                ]
            ]
        }

    },
    ///////////////////////////////////////////////////////////////////////
    {
        layout: "noBorders",        
        table: {
        widths: [300],
        heights: [6,],
        body: [
          [{
                text:"LALAWIGAN NG QUEZON",
                fontSize: 12,
                characterSpacing: 2,
                alignment: 'justify',
                // right,down,left,up
                margin: [80, -4, 0, 0]
              },
              
                                        
          ]
        
        ]
        }
    },
///////////////////////////////////////////////////////////
    {
        layout: "noBorders",        
        table: {
        widths: [300],
        heights: [3,],
        body: [
          [{
                text:" ",
          
              },
              
                                        
          ]
        
        ]
        }
    },
 //////////////////////////////////////////////////////////////  Electronic receipt
 {
    //layout: "noBorders",        
    table: {
    widths: [115, 176,],
    heights: [7,],
    body: [
      [{
            text:"ELECTRONIC RECEIPT  NO:",
            fontSize: 9,
            alignment: 'justify',
            // right,down,left,up
            margin: [1, -2, 0, 0]
          },
        {
          text:"5879654852",
          fontSize: 9,
          alignment: 'justify',
          // right,down,left,up
          margin: [1, -2, 0, 0]
          },
    
          
                                    
      ]
    
    ]
    }
},
 
///////////////////////////////////////////////////////////////// Date
{
    //layout: "noBorders",        
    table: {
    widths: [40, 251,],
    heights: [6,],
    body: [
      [{
            text:"DATE:",
            fontSize: 9,
            alignment: 'justify',
            // right,down,left,up
            margin: [1, -2, 0, 0]
          },
        {
          text:"12 - 25 - 2019",
          fontSize: 9,
          alignment: 'justify',
          // right,down,left,up
          margin: [1, -2, 0, 0]
          },
    
          
                                    
      ]
    
    ]
    }
},

////////////////////////////////////////////////////////////////  Payor
{
    //layout: "noBorders",        
    table: {
    widths: [40, 251,],
    heights: [6,],
    body: [
      [{
            text:"PAYOR:",
            fontSize: 9,
            alignment: 'justify',
            // right,down,left,up
            margin: [1, -1, 0, 0]
          },
        {
          text:"JESON ARCEDE",
          fontSize: 9,
          alignment: 'justify',
          // right,down,left,up
          margin: [1, -1, 0, 0]
          },
    
          
                                    
      ]
    
    ]
    }
},

/////////////////////////////////////////////////////////////// Space
{
    layout: "noBorders",        
    table: {
    widths: [300],
    heights: [2,],
    body: [
      [{
            text:" ",
      
          },
          
                                    
      ]
    
    ]
    }
},
///////////////////////////////////////////////////////////////////////////// Nature of Collection
{
    //layout: "noBorders",        
    table: {
    widths: [170, 121,],
    heights: [7,],
    body: [
      [{
            text:"Nature of Collection",
            fontSize: 9,
            alignment: 'justify',
            // right,down,left,up
            margin: [40, -2, 0, 0]
          },
        {
          text:"Amount",
          fontSize: 9,
          alignment: 'justify',
          // right,down,left,up
          margin: [40, -2, 0, 0]
          },
    
          
                                    
      ]
    
    ]
    }
},


///////////////////////////////////////////////////////////////////////////////////// Barangay Clearance

{
    //layout: "noBorders",        
    table: {
    widths: [170, 121,],
    heights: [7,],
    body: [
      [{
            text:"Barangay Clearance",
            fontSize: 9,
            alignment: 'justify',
            // right,down,left,up
            margin: [1, -2, 0, 0]
          },
        {
          text:" 150.00 ",
          fontSize: 9,
          alignment: 'right',
          // right,down,left,up
          margin: [1, -2, 0, 0]
          },
    
          
                                    
      ]
    
    ]
    }
},


///////////////////////////////////////////////////////////////////////////////////// Police Clearance

{
    //layout: "noBorders",        
    table: {
    widths: [170, 121,],
    heights: [7,],
    body: [
      [{
            text:"Police Clearance",
            fontSize: 9,
            alignment: 'justify',
            // right,down,left,up
            margin: [1, -2, 0, 0]
          },
        {
          text:" 175.00 ",
          fontSize: 9,
          alignment: 'right',
          // right,down,left,up
          margin: [1, -2, 0, 0]
          },
    
          
                                    
      ]
    
    ]
    }
},
//////////////////////////////////////////////////////////////////////////////////// Business Permit
{

    //layout: "noBorders",        
    table: {
        widths: [170, 121,],
        heights: [7,],
        body: [
          [{
                text:"Business Permit Fee",
                fontSize: 9,
                alignment: 'justify',
                // right,down,left,up
                margin: [1, -2, 0, 0]
              },
            {
              text:" 2500.00 ",
              fontSize: 9,
              alignment: 'right',
              // right,down,left,up
              margin: [1, -2, 0, 0]
              },
        
              
                                        
          ]
        
        ]
        }
    },

/////////////////////////////////////////////////////////////////////////////////// Fire Safety and Inspection Fee

{

    //layout: "noBorders",        
    table: {
        widths: [170, 121,],
        heights: [7,],
        body: [
          [{
                text:"Fire Safety and Inspection Fee",
                fontSize: 9,
                alignment: 'justify',
                // right,down,left,up
                margin: [1, -2, 0, 0]
              },
            {
              text:" 3500.00 ",
              fontSize: 9,
              alignment: 'right',
              // right,down,left,up
              margin: [1, -2, 0, 0]
              },
        
              
                                        
          ]
        
        ]
        }
    },
////////////////////////////////////////////////////////////////////////////////// Total
{

    //layout: "noBorders",        
    table: {
        widths: [170, 121,],
        heights: [7,],
        //color: [grey],
        body: [
          [{
                text:"Total",
                fontSize: 9,
                alignment: 'justify',
                // right,down,left,up
                margin: [1, -2, 0, 0]
              },
            {
              text:" 6325.00 ",
              fontSize: 9,
              alignment: 'right',
              // right,down,left,up
              margin: [1, -2, 0, 0]
              },
        
              
                                        
          ]
        
        ]
        }
    },

///////////////////////////////////////////////////////////////////////////////// Space 2

{
    layout: "noBorders",        
    table: {
    widths: [300],
    heights: [2,],
    body: [
      [{
            text:" ",
            fontSize: 6,
                               
          },
          
                                    
      ]
    
    ]
    }
},
//////////////////////////////////////////////////////////////////////////////// Thank You 

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
            text:" Here's your auto generated e-Receipt  ",
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
            text:"[ PRINT BUTTON ]  ",
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
            text:" This is only an electronic copy. You can get your official receipt upon claiming the",
            fontSize: 5,
            alignment: 'justify',
            characterSpacing: [0],
            // right,down,left,up
            margin: [60, -2, 0, 0]
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

///////////////////////////////////-----END-----/////////////////////////////////////
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