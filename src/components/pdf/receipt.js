
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
        //layout: "noBorders",
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
                        margin: [60, -2, 0, 0]
                    }
                ]
            ]
        }

    },
    ///////////////////////////////////////////////////////////////////////
    {
        //layout: "noBorders",        
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
                margin: [60, -4, 0, 0]
              },
              
                                        
          ]
        
        ]
        }
    },
///////////////////////////////////////////////////////////
    {
        //layout: "noBorders",        
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
 //////////////////////////////////////////////////////////////
 {
    //layout: "noBorders",        
    table: {
    widths: [120, 171,],
    heights: [7,],
    body: [
      [{
            text:"ELECTRONIC RECEIPT  NO:",
            fontSize: 9,
            alignment: 'justify',
            // right,down,left,up
            margin: [1, -3, 0, 0]
          },
        {
          text:"5879654852",
          fontSize: 9,
          alignment: 'justify',
          // right,down,left,up
          margin: [1, -3, 0, 0]
          },
    
          
                                    
      ]
    
    ]
    }
},
 
/////////////////////////////////////////////////////////////////
{
    //layout: "noBorders",        
    table: {
    widths: [40, 261,],
    heights: [7,],
    body: [
      [{
            text:"DATE:",
            fontSize: 9,
            alignment: 'justify',
            // right,down,left,up
            margin: [1, -3, 0, 0]
          },
        {
          text:"12 - 25 - 2019",
          fontSize: 9,
          alignment: 'justify',
          // right,down,left,up
          margin: [1, -3, 0, 0]
          },
    
          
                                    
      ]
    
    ]
    }
},

////////////////////////////////////////////////////////////////
{
    //layout: "noBorders",        
    table: {
    widths: [40, 261,],
    heights: [7,],
    body: [
      [{
            text:"PAYOR:",
            fontSize: 9,
            alignment: 'justify',
            // right,down,left,up
            margin: [1, -3, 0, 0]
          },
        {
          text:"JESON ARCEDE",
          fontSize: 9,
          alignment: 'justify',
          // right,down,left,up
          margin: [1, -3, 0, 0]
          },
    
          
                                    
      ]
    
    ]
    }
}

///////////////////////////////////////////////////////////////
]

    return content;
    

    
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