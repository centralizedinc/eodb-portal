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
}

/**
 * 
 * @param {Object} details 
 */
function getContent(details){
    var content = [
        {
            layout: "noBorders",
            table: {
                heights: [80],
                widths: [500],
                body:[
                    [
                        {
                            text: ""
                        }
                    ]
                ]
            }
        },
        // {
        //   layout: "noBorders",
        //   table: {
        //     heights: [10],
        //     widths: [400],
        //     body: [
        //       [
        //         {
        //           text: "REPUBLIC OF THE PHILIPPINES",
        //           fontSize: 14,
        //           bold: true,
        //           characterSpacing: 1,
        //           alignment: 'center',
        //           // right,down,left,up
        //           margin: [1, -2, 0, 0]
        //         }
        //       ]
        //     ]
        //   }
    
        // },
        /////////////////////////////////////////////////////////////////////// municipality
        // {
        //   layout: "noBorders",
        //   table: {
        //     widths: [400],
        //     heights: [6,],
        //     body: [
        //       [{
        //         text: "(Municipality)",
        //         fontSize: 7,
        //         characterSpacing: 2,
        //         alignment: 'center',
        //         // right,down,left,up
        //         margin: [1, -4, 0, 0]
        //       },
    
    
        //       ]
    
        //     ]
        //   }
        // },
        /////////////////////////////////////////////////////////// brgy clearance
        {
          layout: "noBorders",
          table: {
            widths: [100,'*',100],
            heights: [3,],
            body: [
              [
                  {
                    text: ""
                  },
                  {
                text: "BARANGAY CLEARANCE FOR BUSINESS",
                fontSize: 14,
                characterSpacing: 2,
                alignment: 'center',
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
                fontSize: 12,
                alignment: 'left',
                // right,down,left,up
                margin: [20, 1, 0, 0]
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
            widths: ['*',20],
            heights: [6,],
            body: [
              [{
                text: ` This is to certify that ${checkText(details.business_name)} owned and operated by ${checkText(details.business_owner)} with business address located ${checkText(details.business_address)}, after complying with the requirements prescribed by his Office, is hereby issued a BARANGAY BUSINESS CLEARANCE for the purpose of securing the necessary Business Permit and License from the office of the Mayor.`,
                fontSize: 10,
                alignment: 'justify',
                // right,down,left,up
                margin: [20, 0, 0, 0]
              },
              {
                  text: ""
              }
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
                fontSize: 10,
                alignment: 'justify',
                // right,down,left,up
                margin: [20, 0, 0, 0]
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
                fontSize: 12,
                alignment: 'justify',
                // right,down,left,up
                margin: [20, 0, 0, 0]
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
                fontSize: 10,
                alignment: 'justify',
                // right,down,left,up
                margin: [20, 0, 0, 0]
              },
              ]
    
            ]
          }
        },/////////////////////////////////////////////////////////////// Space
        {
          layout: "noBorders",
          table: {
            widths: [300],
            heights: [50],
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
            widths: [300,'*'],
            heights: [6,],
            body: [
              [
                {
                    text: ""
                }, 
                {
                text: " HON. (BRGY CHAIRMAN) ",
                fontSize: 12,
                alignment: 'left',
                // right,down,left,up
                margin: [0, 0, 0, 0]
              },
              ]
    
            ]
          }
        },
        ////////////////////////////////////////////////////////////////  punong barangay
        {
          layout: "noBorders",
          table: {
            widths: [300,'*'],
            heights: [6,],
            body: [
              [
                  {
                      text: ""
                  },
                  {
                text: " Punong Barangay ",
                fontSize: 12,
                alignment: 'center',
                italics: true,
                // right,down,left,up
                margin: [0, -1, 0, 0]
              },
              ]
    
            ]
          }
        },
    
        ///////////////////////////////////-----END-----/////////////////////////////////////
      ]
    
      return content;
}

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