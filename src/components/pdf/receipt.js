
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
        heights: [10],
        widths: [100,"*",100],
        body: [
          [
            {
              text: ""
            },
            {
              text: "BAYAN  NG  SAN  ANTONIO",
              fontSize: 12,
              bold: true,
              characterSpacing: 1,
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
            text: "LALAWIGAN NG QUEZON",
            fontSize: 12,
            characterSpacing: 2,
            alignment: 'center',
            // right,down,left,up
            margin: [0, 0, 0, 0]
          },
          {
            text: ""
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
            text: " ",

          },


          ]

        ]
      }
    },
    //////////////////////////////////////////////////////////////  Electronic receipt
    {
      layout: "noBorders",        
      table: {
        widths: [100,115, 176,],
        heights: [7,],
        body: [
          [
            {
              text: ""
            },
            {
            text: "ELECTRONIC RECEIPT  NO:",
            fontSize: 10,
            alignment: 'justify',
            // right,down,left,up
            margin: [0, 0, 0, 0]
          },
          {
            text: checkText(details.transaction_no),
            fontSize: 9,
            alignment: 'justify',
            // right,down,left,up
            margin: [0, 0, 0, 0]
          },



          ]

        ]
      }
    },

    ///////////////////////////////////////////////////////////////// Date
    {
      layout: "noBorders", 
      table:{
        widths: [95, '*'],
        body: [
          [
            {
              text: ""
            },
            {
              table: {
                widths: [40, 251,],
                heights: [6,],
                body: [
                  [
                    {
                    text: "DATE:",
                    fontSize: 10,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]
                  },
                  {
                    text: formatDate(details.date),
                    fontSize: 10,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]
                  },
        
        
        
                  ],
                  [{
                    text: "PAYOR:",
                    fontSize: 10,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]
                  },
                  {
                    text: checkText(details.payor),
                    fontSize: 10,
                    alignment: 'justify',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]
                  },
        
        
        
                  ]
        
                ]
              }
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
        heights: [2,],
        body: [
          [{
            text: " ",

          },


          ]

        ]
      }
    },
    ///////////////////////////////////////////////////////////////////////////// Nature of Collection
    {
      layout: "noBorders",        
      table: {
        widths: [95, '*'],
        body: [
          [
            {
              text: ""
            },
            {
              table: {
                widths: [170, 121],
                body: [
                  [
                    {
                    text: "Nature of Collection",
                    fontSize: 10,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]
                  },
                  {
                    text: "Amount",
                    fontSize: 10,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]
                  },             
                  ]
        
                ]
              }
            }
          ]
        ]
      }
      
    }]


  ///////////////////////////////////////////////////////////////////////////////////// Barangay Clearance

  details.payment_breakdown.forEach(bd => {
    content.push({
      layout: "noBorders",      
      table:{
        widths: [95, '*'],
        body: [
          [
            {
              text: ""
            },
            {
              table: {
                widths: [170, 121,],
                heights: [7,],
                body: [
                  [{
                    text: checkText(bd.description),
                    fontSize: 10,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]
                  },
                  {
                    text: formatAmount(bd.amount),
                    fontSize: 10,
                    alignment: 'right',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]
                  }]
        
                ]
              }
            }
          ]
        ]
      }  
      
    })
  })
  var total_amount = details.payment_breakdown.map(v => v.amount).reduce((t, c) => parseFloat(t) + parseFloat(c))
  var other_content = [
    ////////////////////////////////////////////////////////////////////////////////// Total
    {

      layout: "noBorders",   
      table: {
        widths:[95,'*'],
        body: [
          [
            {
              text: ""
            },
            {
              table: {
                widths: [170, 121,],
                heights: [7,],
                //color: [grey],
                body: [
                  [{
                    text: "Total",
                    fontSize: 10,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]
                  },
                  {
                    text: formatAmount(total_amount),
                    fontSize: 10,
                    alignment: 'right',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]
                  },
        
        
        
                  ]
        
                ]
              }
            }
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
            text: " ",
            fontSize: 6,

          },


          ]

        ]
      }
    },
    //////////////////////////////////////////////////////////////////////////////// Thank You 

    {
      layout: "noBorders",
     table:{
       widths: [100,'*',100],
       body: [
         [
           {
             text: ""
           },
           {
            layout: "noBorders",
            table: {
              widths: [300],
              body: [
                [{
                  text: " Thank you for your payment!  ",
                  fontSize: 12,
                  Bold: true,
                  alignment: 'center',
                  characterSpacing: [1],
                  // right,down,left,up
                  // margin: [80, -2, 0, 0]
                  margin: [0,0,0,0]
                }
                ],
                [{
                  text: " Here's your auto generated e-Receipt  ",
                  fontSize: 10,
                  alignment: 'center',
                  characterSpacing: [0],
                  // right,down,left,up
                  // margin: [100, -2, 0, 0]
                  margin: [0,0,0,0]
                }
                ],
                [{
                  text: " "
                }],
                [{
                  text: "[ PRINT BUTTON ]  ",
                  fontSize: 10,
                  alignment: 'center',
                  characterSpacing: [0],
                  // right,down,left,up
                  // margin: [120, -2, 0, 0]
                  margin: [0,0,0,0]
                }],
                [{
                  text: " "
                }],
                [{
                  text: " This is only an electronic copy. You can get your official receipt upon claiming the",
                  fontSize: 8,
                  alignment: 'center',
                  characterSpacing: [0],
                  // right,down,left,up
                  // margin: [60, -2, 0, 0]
                  margin: [0,0,0,0]
                }],
                [{
                  text: " business license plate at the Municipal Hall. ",
                  fontSize: 8,
                  alignment: 'center',
                  characterSpacing: [0],
                  // right,down,left,up
                  // margin: [100, -2, 0, 0]
                  margin: [0,0,0,0]
                }],
                [{
                  text: " Thank you for your business ",
                  fontSize: 8,
                  alignment: 'center',
                  characterSpacing: [0],
                  // right,down,left,up
                  // margin: [115, -2, 0, 0]
                  margin: [0,0,0,0]
                }]      
              ]
            }
           },
           {
             text: ''
           }
         ]
       ]
     }
      
    },
    /////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////-----END-----/////////////////////////////////////
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