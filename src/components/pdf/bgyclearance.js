import { IoTAnalytics } from "aws-sdk";

/**
 *
 * @param {Object} details
 * @returns {Object} document
 */
function fillup(details) {
  console.log("fillup details printer: " + JSON.stringify(details))
  var content = [];
  if (details.purpose.includes("pc")) content = getContentForResidential(details);
  if (details.purpose.includes("bp")) {
    if (content) {
      content.push({
        text: " ",
        pageBreak: "before"
      })
    }
    content.concat(getContentForBusiness(details));
  }

  console.log('get content ###### :', content);
  return {
    content,
    pageSize: 'LEGAL'
  };
}
/**
 * 
 * @param {Object} details 
 */
function getContentForBusiness(details) {
  var content = [
    {
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
            text: "(Municipality)",
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
    /////////////////////////////////////////////////////////// brgy clearance
    {
      layout: "noBorders",
      table: {
        widths: [400],
        heights: [3,],
        body: [
          [{
            text: "BARANGAY CLEARANCE FOR BUSINESS",
            fontSize: 7,
            characterSpacing: 2,
            alignment: 'center',
            // right,down,left,up
            margin: [1, 10, 0, 0]

          },


          ]

        ]
      }
    },
    //////////////////////////////////////////////////////////////  SPACE
    {
      layout: "noBorders",
      table: {
        widths: [400],
        heights: [50],
        body: [
          [{
            text: " ",
            fontSize: 7,
            alignment: 'left',
            // right,down,left,up
            margin: [1, 1, 0, 0]
          },

          ]

        ]
      }
    },
    //////////////////////////////////////////////////////////////  concern
    {
      layout: "noBorders",
      table: {
        widths: [400],
        heights: [7,],
        body: [
          [{
            text: "TO WHOM IT MAY CONCERN",
            fontSize: 7,
            alignment: 'left',
            // right,down,left,up
            margin: [1, 1, 0, 0]
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
            text: " ",
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
    // DETAILS
    {
      layout: "noBorders",
      table: {
        widths: [400],
        heights: [6,],
        body: [
          [{
            text: `This is to certify that ${checkText(details.business_name)} owned and operated by ${checkText(details.business_owner)} with business address located ${checkText(details.business_address)}, after complying with the requirements prescribed by his Office, is hereby issued a BARANGAY CLEARANCE for the purpose of securing a Mayor’s Permit in order to ${checkText(details.business_nature)} in accordance with Barangay  Revenue Ordinance of 2008. However, the Barangay Clearance may be cancelled or revoked anytime if public safety and interest so require.`,
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
            text: " ",
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
        widths: [400],
        heights: [6,],
        body: [
          [{
            text: " This Barangay Clearance is hereby issued upon request of ",
            fontSize: 7,
            alignment: 'justify',
            // right,down,left,up
            margin: [1, -1, 0, 0]
          },
          ]

        ]
      }
    },
    ////////////////////////////////////////////////////////////////  requestor
    // requestor
    {
      layout: "noBorders",
      table: {
        widths: [400],
        heights: [6,],
        body: [
          [{
            text: checkText(details.requestor),
            fontSize: 7,
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
        heights: [20],
        body: [
          [{
            text: " ",

          },


          ]

        ]
      }
    },
    ////////////////////////////////////////////////////////////////  issued
    // date_created
    {
      layout: "noBorders",
      table: {
        widths: [400],
        heights: [6,],
        body: [
          [{
            text: ` Issued this ${formatDate(details.date_created, { day: '2-digit' })} day of ${formatDate(details.date_created, { month: 'long' })},  ${formatDate(details.date_created, { year: 'numeric' })}. `,
            fontSize: 7,
            alignment: 'justify',
            // right,down,left,up
            margin: [1, -1, 0, 0]
          },
          ]

        ]
      }
    },/////////////////////////////////////////////////////////////// Space
    {
      layout: "noBorders",
      table: {
        widths: [300],
        heights: [20],
        body: [
          [{
            text: " ",

          },


          ]

        ]
      }
    },
    ////////////////////////////////////////////////////////////////  brgy chairman
    {
      layout: "noBorders",
      table: {
        widths: [400],
        heights: [6,],
        body: [
          [{
            text: " HON. (BRGY CHAIRMAN) ",
            fontSize: 7,
            alignment: 'left',
            // right,down,left,up
            margin: [250, -1, 0, 0]
          },
          ]

        ]
      }
    },
    ////////////////////////////////////////////////////////////////  punong barangay
    {
      layout: "noBorders",
      table: {
        widths: [400],
        heights: [6,],
        body: [
          [{
            text: " Punong Barangay ",
            fontSize: 7,
            alignment: 'left',
            italics: true,
            // right,down,left,up
            margin: [260, -1, 0, 0]
          },
          ]

        ]
      }
    },

    ///////////////////////////////////-----END-----/////////////////////////////////////
  ]

  return content;

}


function getContentForResidential(details) {
  var content = [
    {
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
            text: "(Municipality)",
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
    /////////////////////////////////////////////////////////// brgy clearance
    {
      layout: "noBorders",
      table: {
        widths: [400],
        heights: [3,],
        body: [
          [{
            text: "BARANGAY CLEARANCE",
            fontSize: 7,
            characterSpacing: 2,
            alignment: 'center',
            // right,down,left,up
            margin: [1, 10, 0, 0]

          },


          ]

        ]
      }
    },
    //////////////////////////////////////////////////////////////  SPACE
    {
      layout: "noBorders",
      table: {
        widths: [400],
        heights: [50],
        body: [
          [{
            text: " ",
            fontSize: 7,
            alignment: 'left',
            // right,down,left,up
            margin: [1, 1, 0, 0]
          },

          ]

        ]
      }
    },
    //////////////////////////////////////////////////////////////  concern
    {
      layout: "noBorders",
      table: {
        widths: [400],
        heights: [7,],
        body: [
          [{
            text: "TO WHOM IT MAY CONCERN",
            fontSize: 7,
            alignment: 'left',
            // right,down,left,up
            margin: [1, 1, 0, 0]
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
            text: " ",
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
    // DETAILS
    {
      layout: "noBorders",
      table: {
        widths: [400],
        heights: [6,],
        body: [
          [{
            text: `This is to certify that ${checkText(details.business_name)} owned and operated by ${checkText(details.business_owner)} with business address located ${checkText(details.business_address)}, after complying with the requirements prescribed by his Office, is hereby issued a BARANGAY CLEARANCE for the purpose of securing a Mayor’s Permit in order to ${checkText(details.business_nature)} in accordance with Barangay  Revenue Ordinance of 2008. However, the Barangay Clearance may be cancelled or revoked anytime if public safety and interest so require.`,
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
            text: " ",
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
        widths: [400],
        heights: [6,],
        body: [
          [{
            text: " This Barangay Clearance is hereby issued upon request of ",
            fontSize: 7,
            alignment: 'justify',
            // right,down,left,up
            margin: [1, -1, 0, 0]
          },
          ]

        ]
      }
    },
    ////////////////////////////////////////////////////////////////  requestor
    // requestor
    {
      layout: "noBorders",
      table: {
        widths: [400],
        heights: [6,],
        body: [
          [{
            text: checkText(details.requestor),
            fontSize: 7,
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
        heights: [20],
        body: [
          [{
            text: " ",

          },


          ]

        ]
      }
    },
    ////////////////////////////////////////////////////////////////  issued
    // date_created
    {
      layout: "noBorders",
      table: {
        widths: [400],
        heights: [6,],
        body: [
          [{
            text: ` Issued this ${formatDate(details.date_created, { day: '2-digit' })} day of ${formatDate(details.date_created, { month: 'long' })},  ${formatDate(details.date_created, { year: 'numeric' })}. `,
            fontSize: 7,
            alignment: 'justify',
            // right,down,left,up
            margin: [1, -1, 0, 0]
          },
          ]

        ]
      }
    },/////////////////////////////////////////////////////////////// Space
    {
      layout: "noBorders",
      table: {
        widths: [300],
        heights: [20],
        body: [
          [{
            text: " ",

          },


          ]

        ]
      }
    },
    ////////////////////////////////////////////////////////////////  brgy chairman
    {
      layout: "noBorders",
      table: {
        widths: [400],
        heights: [6,],
        body: [
          [{
            text: " HON. (BRGY CHAIRMAN) ",
            fontSize: 7,
            alignment: 'left',
            // right,down,left,up
            margin: [250, -1, 0, 0]
          },
          ]

        ]
      }
    },
    ////////////////////////////////////////////////////////////////  punong barangay
    {
      layout: "noBorders",
      table: {
        widths: [400],
        heights: [6,],
        body: [
          [{
            text: " Punong Barangay ",
            fontSize: 7,
            alignment: 'left',
            italics: true,
            // right,down,left,up
            margin: [260, -1, 0, 0]
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