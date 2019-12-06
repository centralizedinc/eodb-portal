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
            widths: [400],
            body: [
                [
                    {
                        text: "REPUBLIC OF THE PHILIPPINES",
                        fontSize: 7,
                        bold: true,
                        characterSpacing: 1,
                        alignment: 'center',
                        // right,down,left,up
                        margin: [1, -2, 0, 0]
                    }
                ]
            ]
        }

    },
    /////////////////////////////////////////////////////////////////////// municipality
    {
        layout: "noBorders",        
        table: {
        widths: [400],
        heights: [6,],
        body: [
          [{
                text:"San Antonio Quezon",
                fontSize: 7,
                characterSpacing: 2,
                alignment: 'center',
                // right,down,left,up
                margin: [1, -4, 0, 0]
              },
              
                                        
          ]
        
        ]
        }
    },
        /////////////////////////////////////////////////////////////////////// municipality
        {
            layout: "noBorders",        
            table: {
            widths: [400],
            heights: [6,],
            body: [
              [{
                    text:"Public Safety Division",
                    fontSize: 5,
                    characterSpacing: 1,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, -5, 0, 0]
                  },
                  
                                            
              ]
            
            ]
            }
        },
            /////////////////////////////////////////////////////////////////////// municipality
    {
        layout: "noBorders",        
        table: {
        widths: [400],
        heights: [7,],
        body: [
          [{
                text:"Fire & Rescue Section",
                fontSize: 5,
                characterSpacing: 2,
                alignment: 'center',
                // right,down,left,up
                margin: [1, -7, 0, 0]
              },
              
                                        
          ]
        
        ]
        }
    },
/////////////////////////////////////////////////////////// brgy clearance
    {
        layout: "noBorders",        
        table: {
        widths: [400],
        heights: [3,],
        body: [
          [{
            text:"FIRE SAFETY INSPECTION CERTIFICATE",
            fontSize: 7,
            characterSpacing: 2,
            alignment: 'center',
            // right,down,left,up
            margin: [1, 5, 0, 0]
          
              },
              
                                        
          ]
        
        ]
        }
    },
/////////////////////////////////////////////////////////////////////// municipality
                {
                    layout: "noBorders",        
                    table: {
                    widths: [400],
                    heights: [7,],
                    body: [
                      [{
                            text:"This certifies that",
                            fontSize: 5,
                            characterSpacing: 2,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, -4, 0, 0]
                          },
                          
                                                    
                      ]
                    
                    ]
                    }
                },

/////////////////////////////////////////////////////////// brgy clearance
    {
        layout: "noBorders",        
        table: {
        widths: [400],
        heights: [3,],
        body: [
          [{
            text:"BERMUDEZ MANPOWER SERVICES CORPORATION",
            fontSize: 7,
            characterSpacing: 2,
            alignment: 'center',
            // right,down,left,up
            margin: [1, 5, 0, 0]
          
              },
              
                                        
          ]
        
        ]
        }
    },
 /////////////////////////////////////////////////////////////////////// municipality
       {
        layout: "noBorders",        
        table: {
        widths: [400],
        heights: [7,],
        body: [
          [{
                text:"__________________________________________________________",
                fontSize: 5,
                characterSpacing: 2,
                alignment: 'center',
                // right,down,left,up
                margin: [1, -4, 0, 0]
              },
              
                                        
          ]
        
        ]
        }
    },
 

    /////////////////////////////////////////////////////////////////////// municipality
    {
        layout: "noBorders",        
        table: {
        widths: [400],
        heights: [7,],
        body: [
          [{
                text:"Located at",
                fontSize: 5,
                characterSpacing: 2,
                alignment: 'center',
                // right,down,left,up
                margin: [1, -3, 0, 0]
              },
              
                                        
          ]
        
        ]
        }
    },

 
    //////////////////////////////////////////////////////////////  SPACE
    {
        layout: "noBorders",        
        table: {
        widths: [300],
        heights: [15],
        body: [
          [{
                text:" ",
                fontSize: 7,
                alignment: 'left',
                // right,down,left,up
                margin: [1, 1, 0, 0]
              },
                                 
          ]
        
        ]
        }
    },
 
///////////////////////////////////////////////////////////////// name of business
{
    layout: "noBorders",        
    table: {
    widths: [400],
    heights: [6,],
    body: [
      [{
            text:"Batangas-Quezon Road, Barangay Poblacion, San Antonio, 40988 Philippines has been inspected on March 18, 2019 and has Fully complied with the Fire Safety Requirements with regards R.A 9514 Fire Code of the Philippines. The owner/lessee shall periodically maintain the fire protection facilities. A certified true copy of this certificate shall be displayed conspicuously within the building and shall not be removed without authority from the undersigned",
            fontSize: 7,
            alignment: 'justify',
            // right,down,left,up
            margin: [1, -2, 0, 0]
          },                                    
      ]
    
    ]
    }
},
 //////////////////////////////////////////////////////////////  SPACE
 {
    layout: "noBorders",        
    table: {
    widths: [300],
    heights: [30],
    body: [
      [{
            text:" ",
            fontSize: 7,
            alignment: 'left',
            // right,down,left,up
            margin: [1, 1, 0, 0]
          },
                             
      ]
    
    ]
    }
},
//////////////////////////////////////////////////////////////// request
{
    layout: "noBorders",        
    table: {
    widths: [200,200],
    heights: [6,],
    body: [
      [{
            text:"------------------------------",
            fontSize: 7,
            alignment: 'justify',
            // right,down,left,up
            margin: [30, -1, 0, 0]
          },    
          {
            text:"------------------------------",
            fontSize: 7,
            alignment: 'justify',
            // right,down,left,up
            margin: [100, -1, 0, 0]
          },         
      ]
    
    ]
    }
},
//////////////////////////////////////////////////////////////// request
{
    layout: "noBorders",        
    table: {
    widths: [200,200],
    heights: [6,],
    body: [
      [{
            text:" Fire Marshal ",
            fontSize: 7,
            alignment: 'justify',
            // right,down,left,up
            margin: [40, -7, 0, 0]
          },    
          {
            text:" PSD Manager ",
            fontSize: 7,
            alignment: 'justify',
            // right,down,left,up
            margin: [110, -7, 0, 0]
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
    heights: [20],
    body: [
      [{
            text:" ",
      
          },
          
                                    
      ]
    
    ]
    }
},
////////////////////////////////////////////////////////////////  issued
{
    layout: "noBorders",        
    table: {
    widths: [35,200],
    heights: [6],
    body: [
      [{
            text:"Certificate No:",
            fontSize: 5,
            alignment: 'justify',
            italics: true,
            // right,down,left,up
            margin: [1, -1, 0, 0]
          },    {
            text:"2019-0595",
            fontSize: 5,
            alignment: 'justify',
            // right,down,left,up
            margin: [1, -1, 0, 0]
          },           
      ]
    
    ]
    }
},
////////////////////////////////////////////////////////////////  issued
{
    layout: "noBorders",        
    table: {
    widths: [100],
    body: [
      [{
            text:"______________________________",
            fontSize: 2,
            alignment: 'left',
            // right,down,left,up
            margin: [43, -7, 0, 0]
      }
                
      ]
    
    ]
    }
},
////////////////////////////////////////////////////////////////  issued
{
    layout: "noBorders",        
    table: {
    widths: [35,200],
    heights: [6,],
    body: [
      [{
            text:"Date Issued:",
            fontSize: 5,
            alignment: 'justify',
            italics: true,
            // right,down,left,up
            margin: [1, -5, 0, 0]
          },   
          {
            text:"March 21, 2019",
            fontSize: 5,
            alignment: 'justify',
            // right,down,left,up
            margin: [1, -5, 0, 0]
          },            
      ]
    
    ]
    }
},
////////////////////////////////////////////////////////////////  issued
{
    layout: "noBorders",        
    table: {
    widths: [100],
    body: [
      [{
            text:"________________________________________",
            fontSize: 2,
            alignment: 'left',
            // right,down,left,up
            margin: [43, -11, 0, 0]
      }
                
      ]
    
    ]
    }
},
////////////////////////////////////////////////////////////////  issued
{
    layout: "noBorders",        
    table: {
    widths: [35,200],
    heights: [6,],
    body: [
      [{
            text:"Valid Until:",
            fontSize: 5,
            italics: true,
            alignment: 'justify',
            // right,down,left,up
            margin: [1, -8, 0, 0]
          },  
         {
            text:"March 21, 2020",
            fontSize: 5,
            alignment: 'justify',
            // right,down,left,up
            margin: [1, -8, 0, 0]
          },         
      ]
    
    ]
    }
},
////////////////////////////////////////////////////////////////  issued
{
    layout: "noBorders",        
    table: {
    widths: [100],
    body: [
      [{
            text:"________________________________________",
            fontSize: 2,
            alignment: 'left',
            // right,down,left,up
            margin: [43, -14, 0, 0]
      }
                
      ]
    
    ]
    }
},
/////////////////////////////////////////////////////////////// Space
{
    layout: "noBorders",        
    table: {
    widths: [300],
    heights: [20],
    body: [
      [{
            text:" ",
      
          },
          
                                    
      ]
    
    ]
    }
},

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