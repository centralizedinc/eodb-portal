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
                heights: [1],
                widths: [300],
                body: [
                    [
                        {
                            text: "Republic of the Philippines",
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
    /////////////////////////////////////////////////////////////////////////////////////
    {
        layout: "noBorders",
        table: {
            heights: [1],
            widths: [300],
            body: [
                [
                    {
                        text: "San Antonio, Province of Quezon",
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

    {
        layout: "noBorders",
        table: {
            heights: [1],
            widths: [300],
            body: [
                [
                    {
                        text: "12/12/2019",
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
    {
        layout: "noBorders",
        table: {
            heights: [4],
            widths: [213,79,],
            body: [
                [
                    {
                        text: "TO WHOM IT MAY CONCERN:",
                        fontSize: 7,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, -10, 0, 0]
                   
                    },
                    {
                        text: " No. B 851852",
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
{

    //layout: "noBorders",        
    table: {
        widths: [60, 231,],
        heights: [6,],
        body: [
          [{
                text:"NAME                      :",
                fontSize: 6,
                alignment: 'left',
                // right,down,left,up
                margin: [1, -1, 0, 0]
              },
            {
              text:" Antonio Basas ",
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

{

    //layout: "noBorders",        
    table: {
        widths: [60, 231,],
        heights: [6,],
        body: [
          [{
                text:"ADDRESS                :",
                fontSize: 6,
                alignment: 'left',
                // right,down,left,up
                margin: [1, -1, 0, 0]
              },
            {
              text:" San Antonio Quezon ",
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
    {

        //layout: "noBorders",        
        table: {
            widths: [60, 231,],
            heights: [6,],
            body: [
              [{
                    text:"DATE OF BIRTH     :",
                    fontSize: 6,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [1, -1, 0, 0]
                  },
                {
                  text:" April 28 1984 ",
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
 {

    //layout: "noBorders",        
    table: {
        widths: [60, 231,],
        heights: [6,],
        body: [
          [{
                text:"PLACE OF BIRTH  :",
                fontSize: 6,
                alignment: 'left',
                // right,down,left,up
                margin: [1, -1, 0, 0]
              },
            {
              text:" Marawi ",
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
{

    layout: "noBorders",        
    table: {
        widths: [60, 231,],
        heights: [6,],
        body: [
          [{
                text:"FINDINGS                  :",
                fontSize: 6,
                alignment: 'left',
                // right,down,left,up
                margin: [1, -1, 0, 0]
              },
            {
              text:"NO DEROGATORY RECORD / INFORMATION  ",
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
 {

    layout: "noBorders",        
    table: {
        widths: [60, 231,],
        heights: [6,],
        body: [
          [{
                text:"PURPOSE                  :",
                fontSize: 6,
                alignment: 'left',
                // right,down,left,up
                margin: [1, -1, 0, 0]
              },
            {
              text:"INTERNATIONAL PASSPORT ",
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
 {

    layout: "noBorders",        
    table: {
        widths: [60, 231,],
        heights: [6,],
        body: [
          [{
                text:"VALID FOR                :",
                fontSize: 6,
                alignment: 'left',
                // right,down,left,up
                margin: [1, -1, 0, 0]
              },
            {
              text:"Six Months (6) from the Date of Issuance ",
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
 {

    layout: "noBorders",        
    table: {
        widths: [60, 231,],
        heights: [6,],
        body: [
          [{
                text:"Res. Cert. No.           :",
                fontSize: 6,
                alignment: 'left',
                // right,down,left,up
                margin: [1, -1, 0, 0]
              },
            {
              text:"2178545655 ",
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
 {

    layout: "noBorders",        
    table: {
        widths: [60, 231,],
        heights: [6,],
        body: [
          [{
                text:"Date Issued              :",
                fontSize: 6,
                alignment: 'left',
                // right,down,left,up
                margin: [1, -1, 0, 0]
              },
            {
              text:"12/12/2019 ",
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
{

    layout: "noBorders",        
    table: {
        widths: [60, 231,],
        heights: [6,],
        body: [
          [{
                text:"Verified by                :",
                fontSize: 6,
                alignment: 'left',
                // right,down,left,up
                margin: [1, -1, 0, 0]
              },
            {
              text:"Senior Police Officer Cesar Advincula ",
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
{

    layout: "noBorders",        
    table: {
        widths: [60, 231,],
        heights: [6,],
        body: [
          [{
                text:"Verified by                :",
                fontSize: 6,
                alignment: 'left',
                // right,down,left,up
                margin: [1, -1, 0, 0]
              },
            {
              text:"Police Senior Inspector Godfrey Rivera ",
              fontSize: 6,
              alignment: 'left',
              // right,down,left,up
              margin: [1, -1, 0, 0]
              },
        
              
                                        
          ]
        
        ]
        }
    },                                          

//////////////////////////////////////-----END-----/////////////////////////////////////
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