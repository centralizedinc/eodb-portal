
// const form = require("./template/businesspermit_template").template;

// /**
//  *
//  * @param {LicenseModel} details
//  * @returns {Object} document
//  */
// function fillup(details) {
//     console.log("fillup details printer: " + JSON.stringify(details))
//     var content = getContent(details);
//     console.log('get content ###### :', content);
//     return {
//         background: function (page) {
//             return [{
//                 image: "form", 
//                 width: 400

//             }]
//         },
//         content: content,
//         images: {
//             form: form
//         },
//         pageSize: 'LEGAL'
//     };

// }

///////////////////////////////////////////////////////////////////////////////

//const form = require("./template/businesspermit_template").template;

const form = require("./template/communitytaxcert_template").template;
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

//////////////////////////////////////////////////////////////////////////////

/**
 * 
 * @param {Object} details 
 */
function getContent(details) {
    var content = [

        {
            layout: "noBorders",
            table: {
                heights: [30],
                widths: [300],
                body: [
                    [
                        {
                            text: "BIR FORM 0016 (DECEMBER, 2014) ",
                            fontSize: 7,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [98, 152, 0, 0]
                        }
                    ]
                ]
            }

        },



        ////////////////////////////////////////////////////////////////////////////// ----- Table 1

        {
            layout: "noBorders",
            table: {
                heights: [6],
                widths: [90,'*',50],
                body: [
                    [
                        {
                            text: ""
                        },

                        {
            table: {
                heights: [8],
                widths: [170,40,90],
                
                body: [
                    [
                        
        {
            
                        
                            text: "COMMUNITY TAX CERTIFICATE ",
                            fontSize: 7,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [8, 0, 0, 0]
   
        },
        {
            
                        
                            text: "INDIVIDUAL ",
                            fontSize: 6,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [1, 0, 0, 0]
   
        },
        {
            
                            text: "CCI2017 06218601 ",
                            fontSize: 6,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [1, 0, 0, 0]
                        }
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
/////////////////////////////////////////////////////////////////////////////////////////////// ----- Table 2
    
    {
        layout: "noBorders",


        table: {
            heights: [6],
            widths: [90,'*',50],
            body: [
                [
                    {
                        text: ""
                    },

                    {


            table: {
            heights: [6],
            widths: [40,121,40,90],
            
            body: [
                [
                    
    {
        
                    
                        text: " 2020 ",
                        fontSize: 5,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'center',
                        // right,down,left,up
                        margin: [0, 0, 0, 0]

    },
    {
        
                    
                        text: "SAN ANTONIO QUEZON ",
                        fontSize: 5,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [0, 0, 0, 0]

    },
    {
        
                    
        text: "01 09 2020 ",
        fontSize: 5,
        bold: true,
        characterSpacing: 0,
        alignment: 'center',
        // right,down,left,up
        margin: [1, 0, 0, 0]

},
    {
        
                        text: "TAXPAYER'S COPY ",
                        fontSize: 5,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'center',
                        // right,down,left,up
                        margin: [1, 0, 0, 0]
                    }
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

    /////////////////////////////////////////////////////////////////////////////////---------Table 2.B

    {
        layout: "noBorders",

        

        table: {
            heights: [5],
            widths: [140,121,40,90],
            
            body: [
                [
                    
    {
        
                    
                        text: "YEAR ",
                        fontSize: 4,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'center',
                        // right,down,left,up
                        margin: [105, 0, 0, 0]

    },
    {
        
                    
                        text: "PLACE OF ISSUE ",
                        fontSize: 4,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'center',
                        // right,down,left,up
                        margin: [2, 0, 0, 0]

    },
    {
        
                    
        text: "DATE ISSUE ",
        fontSize: 4,
        bold: true,
        characterSpacing: 0,
        alignment: 'center',
        // right,down,left,up
        margin: [9, 0, 0, 0]

},
    {
        
                        text: " ",
                        fontSize: 5,
                        bold: true,
                        characterSpacing: 0,
                        alignment: 'left',
                        // right,down,left,up
                        margin: [1, 0, 0, 0]
                    }
                ]
            ]
        }

    },
///////////////////////////////////////////////////////////////////////////////////////////////////// -----------------Table 3

{
        layout: "noBorders",

        

        table: {
        heights: [6],
        widths: [90,'*',50],
        body: [
            [
                {
                    text: ""
                },

                {

        table: {
        heights: [6],
        widths: [219,90,],
        
        body: [
            [
                
{
    text: " Godfrey Rivera Jr ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'left',
    // right,down,left,up
    margin: [8, 0, 0, 0]

},
{
        
    text: "111 111 111 1111",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'left',
    // right,down,left,up
    margin: [1, 0, 0, 0]
}
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

/////////////////////////////////////////////////////////////////////////////////////////////////////------Table 3.B

{
    layout: "noBorders",

    
    table: {
        heights: [6],
        widths: [219,90,],
        
        body: [
            [
                
{
    text: " NAME(SURNAME)                              (FIRST)                                     (MIDDLE)",
    fontSize: 4,
    bold: true,
    characterSpacing: 0,
    alignment: 'left',
    // right,down,left,up
    margin: [8, 0, 0, 0]

},
{
        
    text: "TIN NUMBER",
    fontSize: 4,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
}
]
]
}

},


/////////////////////////////////////////////////////////////////////////////////////////////////////------Table 4

{
    //layout: "noBorders",
    table: {
        heights: [6],
        widths: [219,40,41],
        
        body: [
            [
                
{
    text: " Blk 17 Lot 10 Jones Village San Antonio Quezon ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'left',
    // right,down,left,up
    margin: [8, 0, 0, 0]

},
{
    ///////////------Male    
    text: " X ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
},

{
    ///////////-------Female    
    text: "  ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
}

]
]
}

},

////////////////////////////////////////////////////////////////////////////////////////////////////------Table 4.B
{
    layout: "noBorders",
    table: {
        heights: [5],
        widths: [219,40,41],
        
        body: [
            [
                
{
    text: " ADDRESS ",
    fontSize: 4,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [8, 0, 0, 0]

},
{
        
    text: "SEX:         MALE",
    fontSize: 4,
    bold: true,
    characterSpacing: 0,
    alignment: 'left',
    // right,down,left,up
    margin: [4, 0, 0, 0]
},

{
        
    text: "FEMALE",
    fontSize: 4,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [4, 0, 0, 0]
}

]
]
}

},
////////////////////////////////////////////////////////////////////////////////////////////////////----------Table 5

{
    //layout: "noBorders",
    table: {
        heights: [5],
        widths: [60,70,72,40,40],
        
        body: [
            [
                
{
    text: " FILIPINO ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'left',
    // right,down,left,up
    margin: [8, 0, 0, 0]

},
{
    
    text: " 111111111 ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
},

{
      
    text: " SAN ANTONIO QUEZON ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
},

{
    
    text: " 5,7  ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
},

{
    
    text: " 70 KGS  ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
}

]
]
}

},


///////////////////////////////////////////////////////////////////////////////////////////////////------------Table 5.B
{
    layout: "noBorders",
    table: {
        heights: [5],
        widths: [60,70,70,40,40],
        
        body: [
            [
                
{
    text: " CITIZENSHIP ",
    fontSize: 4,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [8, 0, 0, 0]

},
{
    
    text: " ICR NO (IF AN ALIEN) ",
    fontSize: 4,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
},

{
      
    text: "PLACE OF BIRTH",
    fontSize: 4,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
},

{
    
    text: "        HEIGHT  ",
    fontSize: 4,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
},

{
    
    text: "       WEIGHT  ",
    fontSize: 4,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
}

]
]
}

},

//////////////////////////////////////////////////////////////////////////////////////////---Civil Status

{
    //layout: "noBorders",
    table: {
        heights: [5],
        widths: [36,4,35,4,35,4,35,4,89],
        
        body: [
            [
                
{
    ///////-----single
    text: "  ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [8, 0, 0, 0]

},
{
    
    text: " 1 ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
},

{
    /////////------married  
    text: " X ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
},

{
    
    text: " 2 ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
},

{
    ////////------widow
    text: "  ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
},

{
    
    text: " 3 ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
},

{
     ///////////----divorce 
    text: "  ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
},

{
    
    text: " 4  ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
},

{
    
    text: " SEPTEMBER 04 1985 ",
    fontSize: 5,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
}

]
]
}

},


////////////////////////////////////////////////////////////////////////////////////////////////----------Civil Status.B
{
    layout: "noBorders",
    table: {
        heights: [5],
        widths: [51,51,51,51,78],
        
        body: [
            [
                
{
    text: "CIVIL STATUS: SINGLE ",
    fontSize: 4,
    bold: true,
    characterSpacing: 0,
    alignment: 'left',
    // right,down,left,up
    margin: [0, 0, 0, 0]

},
{
    
    text: " MARRIED ",
    fontSize: 4,
    bold: true,
    characterSpacing: 0,
    alignment: 'left',
    // right,down,left,up
    margin: [1, 0, 0, 0]
},

{
      
    text: " WIDOW/ WIDOWER/ LEGALLY SEPARATED ",
    fontSize: 3,
    bold: true,
    characterSpacing: 0,
    alignment: 'left',
    // right,down,left,up
    margin: [0, 0, 0, 0]
},

{
    
    text: " DIVORCED  ",
    fontSize: 4,
    bold: true,
    characterSpacing: 0,
    alignment: 'left',
    // right,down,left,up
    margin: [0, 0, 0, 0]
},

{
    
    text: " DATE OF BIRTH  ",
    fontSize: 4,
    bold: true,
    characterSpacing: 0,
    alignment: 'center',
    // right,down,left,up
    margin: [1, 0, 0, 0]
}

]
]
}

},
/////////////////////////////////////////////////////////////////////////////////////////////////

{
    layout: "noBorders",
    table: {
        heights: [2],
        widths: [318],
        
        body: [
            [
                
{
    
                
                    text: " ",
                    fontSize: 1,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [8, 0, 0, 0]

}
]
]
}

},
///////////////////////////////////////////////////////////////////////////////////////////////////
{
    layout: "noBorders",
    table: {
        heights: [5],
        widths: [318],
        
        body: [
            [
                
{
    
                
                    text: "PROFESSION / OCCUPATION / BUSINESS ",
                    fontSize: 4,
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


/////////////////////////////////////////////////////////////////////////////////////////////////-------------Profession

{
    //layout: "noBorders",
    table: {
        heights: [6],
        widths: [160,70,70],
        
        body: [
            [
                
{
    
                
                    text: "IT OFFICER ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]

},
{
    
                
                    text: "TAXABLE AMOUNT",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]

},
{
    
                    text: "COMMUNITY TAX DUE ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]
                }
            ]
        ]
    }

},

/////////////////////////////////////////////////////////////////////////////////////////////////---------Basic Community TAx
{
    //layout: "noBorders",
    table: {
        heights: [6],
        widths: [160,70,70],
        
        body: [
            [
                
{
    
                
                    text: "A. BASIC COMMINITY TAX (P5.00) VOLUNTARY or EXEMPTED (P1.00) ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]

},
{
    
                
                    text: " ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]

},
{
    
                    text: " P 5.00 ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]
                }
            ]
        ]
    }

},


//////////////////////////////////////////////////////////////////////////////////////////////////-------addtional community tax

{
    //layout: "noBorders",
    table: {
        heights: [6],
        widths: [160,70,70],
        
        body: [
            [
                
{
    
                
                    text: "B. ADDITIONAL COMMINITY TAX (tax not to exceed P5,000.00)", 
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]

},
{
    
                
                    text: " ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]

},
{
    
                    text: "  ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]
                }
            ]
        ]
    }

},


////////////////////////////////////////////////////////////////////////////////////////////////--------gross receipts

{
    //layout: "noBorders",
    table: {
        heights: [6],
        widths: [160,70,70],
        
        body: [
            [
                
{
    
                
                    text: "1. GROSS RECEIPTS OR ERNINGS DERIVED FOR BUSINESS DURING THE PRECEDING YEAR (P1.00 for every P1000.00)  ", 
                    fontSize: 4,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]

},
{
    
                
                    text: "P ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]

},
{
    
                    text: "  ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]
                }
            ]
        ]
    }

},

/////////////////////////////////////////////////////////////////////////////////////////////----------salaries or gross

{
    //layout: "noBorders",
    table: {
        heights: [6],
        widths: [160,70,70],
        
        body: [
            [
                
{
    
                
                    text: "2. SALARIES OR GROSS RECEIPT OR EARNINGS DERIVED FROM EXERCISE OF PROFESSION OR PURSUIT OF ANY OCCUPATION (P1.00 for every P1000.00)  ", 
                    fontSize: 4,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]

},
{
    
                
                    text: " ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]

},
{
    
                    text: "P45.00  ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]
                }
            ]
        ]
    }

},

///////////////////////////////////////////////////////////////////////////////////////////////------INCOME FROM REAL PROPERTY

{
    //layout: "noBorders",
    table: {
        heights: [6],
        widths: [160,70,70],
        
        body: [
            [
                
{
    
                
                    text: "3. INCOME FROM REAL PROPERTY (P1.00 for every P1000.00)  ", 
                    fontSize: 4,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]

},
{
    
                
                    text: " ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]

},
{
    
                    text: "  ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]
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
        widths: [318],
        
        body: [
            [
                
{
    
                
                    text: "TAXPAYER'S SIGNATURE",
                    fontSize: 4,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [0, 3, 0, 0]

}
]
]
}

},

////////////////////////////////////////////////////////////////////////////////////////////------Signature / total 

{
    //layout: "noBorders",
    table: {
        heights: [5],
        widths: [160,70,70],
        
        body: [
            [
                
{
    
                
                    text: "  ", 
                    fontSize: 4,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]

},
{
    
                
                    text: "TOTAL ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]

},
{
    
                    text: " P50 ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]
                }
            ]
        ]
    }

},
//////////////////////////////////////////////////////////////////////////////////////////////

{
    layout: "noBorders",
    table: {
        heights: [5],
        widths: [318],
        
        body: [
            [
                
{
    
                
                    text: "MINICIPAL / CITY TREASURER",
                    fontSize: 4,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [0, 3, 0, 0]

}
]
]
}

},


/////////////////////////////////////////////////////////////////////////////////////////////

{
    //layout: "noBorders",
    table: {
        heights: [5],
        widths: [160,70,70],
        
        body: [
            [
                
{
    
                
                    text: "  ", 
                    fontSize: 4,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]

},
{
    
                
                    text: "INTEREST",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]

},
{
    
                    text: " P50 ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]
                }
            ]
        ]
    }

},
/////////////////////////////////////////////////////////////////////////////////////////////

{
    layout: "noBorders",
    table: {
        heights: [5],
        widths: [318],
        
        body: [
            [
                
{
    
                
                    text: "TOTAL AMOUNT PAID IN WORDS",
                    fontSize: 4,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'left',
                    // right,down,left,up
                    margin: [0, 3, 0, 0]

}
]
]
}

},


/////////////////////////////////////////////////////////////////////////////////////////////

{
    //layout: "noBorders",
    table: {
        heights: [5],
        widths: [160,70,70],
        
        body: [
            [
                
{
    
                
                    text: "  ", 
                    fontSize: 4,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [0, 0, 0, 0]

},
{
    
                
                    text: "TOTAL AMOUNT PAID",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]

},
{
    
                    text: " P50 ",
                    fontSize: 5,
                    bold: true,
                    characterSpacing: 0,
                    alignment: 'center',
                    // right,down,left,up
                    margin: [1, 0, 0, 0]
                }
            ]
        ]
    }

},

////////////////////////////////////////////////////////////////////////////////////////////

    
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