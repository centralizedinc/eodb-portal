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
                widths: [90, '*', 50],
                body: [
                    [
                        {
                            text: ""
                        },

                        {
                            table: {
                                heights: [7],
                                widths: [170, 40, 90],

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


                                            text: checkText(details.issued_to),
                                            fontSize: 6,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [1, 0, 0, 0]

                                        },
                                        {

                                            text: checkText(details.cedula_no),
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
                heights: [5],
                widths: [90, '*', 50],
                body: [
                    [
                        {
                            text: ""
                        },

                        {


                            table: {
                                heights: [5],
                                widths: [40, 121, 40, 90],

                                body: [
                                    [

                                        {


                                            text: formatDate(details.date_created, { year: "numeric" }),
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
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [0, 0, 0, 0]

                                        },
                                        {


                                            text: formatDate(details.date_created),
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
                heights: [3],
                widths: [140, 121, 40, 90],

                body: [
                    [

                        {


                            text: "YEAR ",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [105, -3, 0, 0]

                        },
                        {


                            text: "PLACE OF ISSUE ",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [2, -3, 0, 0]

                        },
                        {


                            text: "DATE ISSUE ",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [9, -3, 0, 0]

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
                widths: [90, '*', 50],
                body: [
                    [
                        {
                            text: ""
                        },

                        {

                            table: {
                                heights: [6],
                                widths: [219, 90,],

                                body: [
                                    [

                                        {
                                            text: checkText(details.name),
                                            fontSize: 5,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [8, 0, 0, 0]

                                        },
                                        {

                                            text: checkText(details.tin),
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

        /////////////////////////////////////////////////////////////////////////////////////////////////////------Table 3.B

        {
            layout: "noBorders",


            table: {
                heights: [6],
                widths: [317, 90,],

                body: [
                    [

                        {
                            text: " NAME(SURNAME)                              (FIRST)                                     (MIDDLE)",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [140, -3, 0, 0]

                        },
                        {

                            text: "TIN NUMBER",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [8, -3, 0, 0]
                        }
                    ]
                ]
            }

        },


        /////////////////////////////////////////////////////////////////////////////////////////////////////------Table 4

        {
            layout: "noBorders",

            table: {
                heights: [6],
                widths: [90, '*', 50],
                body: [
                    [
                        {
                            text: ""
                        },

                        {



                            table: {
                                heights: [6],
                                widths: [219, 40, 41],

                                body: [
                                    [

                                        {
                                            text: checkText(details.address),
                                            fontSize: 5,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'left',
                                            // right,down,left,up
                                            margin: [8, 0, 0, 0]

                                        },
                                        {
                                            ///////////------Male    
                                            text: checkText(details.gender) === "MALE" ? " X " : " ",
                                            fontSize: 5,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [1, 0, 0, 0]
                                        },

                                        {
                                            ///////////-------Female    
                                            text: checkText(details.gender) === "FEMALE" ? " X " : " ",
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

        ////////////////////////////////////////////////////////////////////////////////////////////////////------Table 4.B
        {
            layout: "noBorders",
            table: {
                heights: [5],
                widths: [318, 40, 41],

                body: [
                    [

                        {
                            text: " ADDRESS ",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [200, -3, 0, 0]

                        },
                        {

                            text: "SEX:       MALE",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [4, -3, 0, 0]
                        },

                        {

                            text: "FEMALE",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [4, -3, 0, 0]
                        }

                    ]
                ]
            }

        },
        ////////////////////////////////////////////////////////////////////////////////////////////////////----------Table 5

        {
            layout: "noBorders",

            table: {
                heights: [6],
                widths: [90, '*', 50],
                body: [
                    [
                        {
                            text: ""
                        },

                        {

                            table: {
                                heights: [5],
                                widths: [60, 70, 72, 40, 40],

                                body: [
                                    [

                                        {
                                            text: checkText(details.citizenship),
                                            fontSize: 5,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [8, 0, 0, 0]

                                        },
                                        {

                                            text: checkText(details.icr_no),
                                            fontSize: 5,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [1, 0, 0, 0]
                                        },

                                        {

                                            text: checkText(details.birthplace),
                                            fontSize: 5,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [1, 0, 0, 0]
                                        },

                                        {

                                            text: checkText(details.height),
                                            fontSize: 5,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [1, 0, 0, 0]
                                        },

                                        {

                                            text: checkText(details.weight),
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



        ///////////////////////////////////////////////////////////////////////////////////////////////////------------Table 5.B
        {
            layout: "noBorders",
            table: {
                heights: [5],
                widths: [158, 70, 72, 40, 40],

                body: [
                    [

                        {
                            text: " CITIZENSHIP ",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [125, -3, 0, 0]

                        },
                        {

                            text: " ICR NO (IF AN ALIEN) ",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [8, -3, 0, 0]
                        },

                        {

                            text: "PLACE OF BIRTH",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [5, -3, 0, 0]
                        },

                        {

                            text: "        HEIGHT  ",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [10, -3, 0, 0]
                        },

                        {

                            text: "       WEIGHT  ",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [8, -3, 0, 0]
                        }

                    ]
                ]
            }

        },

        //////////////////////////////////////////////////////////////////////////////////////////---Civil Status

        {
            layout: "noBorders",

            table: {
                heights: [5],
                widths: [90, '*', 50],
                body: [
                    [
                        {
                            text: ""
                        },

                        {


                            table: {
                                heights: [5],
                                widths: [36, 4, 35, 4, 35, 4, 35, 4, 89],

                                body: [
                                    [

                                        {
                                            ///////-----single
                                            text: checkText(details.civil_status) === "SINGLE" ? " X " : "  ",
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
                                            text: checkText(details.civil_status) === "MARRIED" ? " X " : "  ",
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
                                            text: checkText(details.civil_status) === "WIDOWED" ? " X " : "  ",
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
                                            ///////////----SEPARATED 
                                            text: checkText(details.civil_status) === "SEPARATED" ? " X " : "  ",
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

                                            text: checkText(details.birthdate),
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





        ////////////////////////////////////////////////////////////////////////////////////////////////----------Civil Status.B
        {
            layout: "noBorders",
            table: {
                heights: [5],
                widths: [148, 48, 48, 48, 88],

                body: [
                    [

                        {
                            text: "CIVIL STATUS: SINGLE ",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [99, -3, 0, 0]

                        },
                        {

                            text: " MARRIED ",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [14, -3, 0, 0]
                        },

                        {

                            text: " WIDOW/ WIDOWER",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [0, -3, 0, 0]
                        },

                        {

                            text: " SEPARATED  ",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [15, -3, 0, 0]
                        },

                        {

                            text: " DATE OF BIRTH  ",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'center',
                            // right,down,left,up
                            margin: [14, -3, 0, 0]
                        }

                    ]
                ]
            }

        },
        /////////////////////////////////////////////////////////////////////////////////////////////////

        // {
        //     layout: "noBorders",
        //     table: {
        //         heights: [2],
        //         widths: [318],

        //         body: [
        //             [

        // {


        //                     text: " ",
        //                     fontSize: 1,
        //                     bold: true,
        //                     characterSpacing: 0,
        //                     alignment: 'center',
        //                     // right,down,left,up
        //                     margin: [8, 0, 0, 0]

        // }
        // ]
        // ]
        // }

        // },
        ///////////////////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",

            table: {
                heights: [5],
                widths: [416],

                body: [
                    [


                        {


                            text: "PROFESSION / OCCUPATION / BUSINESS ",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [100, 5, 0, 0]

                        }
                    ],

                ]
            }

        },


        /////////////////////////////////////////////////////////////////////////////////////////////////-------------MAIN--------

        {
            layout: "noBorders",

            table: {
                heights: [6],
                widths: [90, '*', 50],
                body: [
                    [
                        {
                            text: ""
                        },

                        {

                            table: {
                                heights: [6],
                                widths: [160, 70, 70],

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
                                    ],
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

                                            text: formatAmount(details.basic_community),
                                            fontSize: 5,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [1, 0, 0, 0]
                                        }
                                    ],
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
                                    ],
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


                                            text: formatAmount(details.taxable_business_income),
                                            fontSize: 5,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [1, 0, 0, 0]

                                        },
                                        {

                                            text: formatAmount(details.community_business_income),
                                            fontSize: 5,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [1, 0, 0, 0]
                                        }
                                    ],
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


                                            text: formatAmount(details.taxable_profession_income),
                                            fontSize: 5,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [1, 0, 0, 0]

                                        },
                                        {

                                            text: formatAmount(details.community_profession_income),
                                            fontSize: 5,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [1, 0, 0, 0]
                                        }
                                    ],
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


                                            text: formatAmount(details.taxable_property_income),
                                            fontSize: 5,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [1, 0, 0, 0]

                                        },
                                        {

                                            text: formatAmount(details.community_property_income),
                                            fontSize: 5,
                                            bold: true,
                                            characterSpacing: 0,
                                            alignment: 'center',
                                            // right,down,left,up
                                            margin: [1, 0, 0, 0]
                                        }
                                    ],
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

        /////////////////////////////////////////////////////////////////////////////////////////////////---------Basic Community TAx
        // {
        //     //layout: "noBorders",
        //     table: {
        //         heights: [6],
        //         widths: [160,70,70],

        //         body: [

        //         ]
        //     }

        // },


        //////////////////////////////////////////////////////////////////////////////////////////////////-------addtional community tax

        // {
        //     //layout: "noBorders",
        //     table: {
        //         heights: [6],
        //         widths: [160,70,70],

        //         body: [

        //         ]
        //     }

        // },


        ////////////////////////////////////////////////////////////////////////////////////////////////--------gross receipts

        // {
        //     //layout: "noBorders",
        //     table: {
        //         heights: [6],
        //         widths: [160,70,70],

        //         body: [

        //         ]
        //     }

        // },

        /////////////////////////////////////////////////////////////////////////////////////////////----------salaries or gross

        // {
        //     //layout: "noBorders",
        //     table: {
        //         heights: [6],
        //         widths: [160,70,70],

        //         body: [

        //         ]
        //     }

        // },

        ///////////////////////////////////////////////////////////////////////////////////////////////------INCOME FROM REAL PROPERTY

        // {
        //     //layout: "noBorders",
        //     table: {
        //         heights: [6],
        //         widths: [160,70,70],

        //         body: [

        //         ]
        //     }

        // },
        /////////////////////////////////////////////////////////////////////////////////////////////


        {
            layout: "noBorders",
            table: {
                heights: [6],
                widths: [416],

                body: [
                    [

                        {


                            text: "TAXPAYER'S SIGNATURE",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [100, 0, 0, 0]

                        }
                    ]
                ]
            }

        },

        ////////////////////////////////////////////////////////////////////////////////////////////------Signature / total 

        {
            layout: "noBorders",

            table: {
                heights: [6],
                widths: [90, '*', 50],
                body: [
                    [
                        {
                            text: ""
                        },

                        {

                            table: {
                                heights: [5],
                                widths: [160, 70, 70],

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

                                            text: formatAmount(details.total),
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
        //////////////////////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                heights: [5],
                widths: [416],

                body: [
                    [

                        {


                            text: "MINICIPAL / CITY TREASURER",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [100, 0, 0, 0]

                        }
                    ]
                ]
            }

        },


        /////////////////////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",

            table: {
                heights: [6],
                widths: [90, '*', 50],
                body: [
                    [
                        {
                            text: ""
                        },

                        {


                            table: {
                                heights: [5],
                                widths: [160, 70, 70],

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

                                            text: formatAmount(details.interest),
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


        /////////////////////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                heights: [5],
                widths: [416],

                body: [
                    [

                        {


                            text: "TOTAL AMOUNT PAID IN WORDS",
                            fontSize: 4,
                            bold: true,
                            characterSpacing: 0,
                            alignment: 'left',
                            // right,down,left,up
                            margin: [100, 0, 0, 0]

                        }
                    ]
                ]
            }

        },


        /////////////////////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",

            table: {
                heights: [6],
                widths: [90, '*', 50],
                body: [
                    [
                        {
                            text: ""
                        },

                        {

                            table: {
                                heights: [5],
                                widths: [160, 70, 70],

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

                                            text: formatAmount(details.total_amount_paid),
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



        ////////////////////////////////////////////////////////////////////////////////////////////----------Thank You

        {
            layout: "noBorders",
            table: {
                // widths: [300],
                heights: [20,],
                body: [
                    [{
                        text: "   ",
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
                widths: [150, '*', 150],
                heights: [2],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                            text: " Erick M Wagan ",
                            fontSize: 8,
                            alignment: 'center',
                            characterSpacing: [0],
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

        /////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [150, '*', 150],
                heights: [2],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                            text: " Minicipal Mayor ",
                            fontSize: 8,
                            alignment: 'center',
                            characterSpacing: [0],
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


        /////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [300],
                heights: [2],
                body: [
                    [{
                        text: " ",
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
                widths: [150, '*', 150],
                heights: [2,],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                            text: " DISPLAY IN PUBLIC VIEW",
                            fontSize: 6,
                            alignment: 'center',
                            characterSpacing: [0],
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
        /////////////////////////////////////////////////////////////////////////////////////

        {
            layout: "noBorders",
            table: {
                widths: [150, '*', 150],
                heights: [2,],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                            text: " This electronic permit (ePermit) is computer generated and does not require signature",
                            fontSize: 6,
                            alignment: 'center',
                            characterSpacing: [0],
                            // right,down,left,up
                            margin: [0, 15, 0, 0]
                        },
                        {
                            text: ""
                        }
                    ]

                ]
            }
        },
        //////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                widths: [150, '*', 150],
                heights: [2,],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                            text: " Verify authenticity of this document at: ",
                            fontSize: 6,
                            alignment: 'center',
                            characterSpacing: [0],
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
        /////////////////////////////////////////////////////////////////////////////////////
        {
            layout: "noBorders",
            table: {
                widths: [150, '*', 150],
                heights: [2],
                body: [
                    [
                        {
                            text: ""
                        },
                        {
                            text: " Thank you for your business ",
                            fontSize: 6,
                            alignment: 'center',
                            characterSpacing: [0],
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





        ///////////////////////////////////////////////////////////////////////////////////////////-------End

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
    if (!amount || isNaN(amount)) return "₱ 0.00";
    var parts = parseFloat(amount).toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `₱ ${parts.join(".")}`;
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