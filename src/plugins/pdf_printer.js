import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// PRINTERS
import BGYCLEARANCE from "../components/pdf/bgyclearance";
import BUSINESSPERMIT from "../components/pdf/businesspermit";
import FIREANDSAFETY from "../components/pdf/fireandsafety";
import POLICECLEARANCE from "../components/pdf/policeclearance";
import RECEIPT from "../components/pdf/receipt";
import BUSINESSPERMIT_SAN_ANTONIO from "../components/pdf/BusinessPermit_San_Antonio";
import CEDULA_SAN_ANTONIO from "../components/pdf/CommunityTaxCert_San_Antonio";
import BRGY_BUSINESS_CLEARANCE from "../components/pdf/brgy_business_clearance";

const printers = {
    BGYCLEARANCE, FIREANDSAFETY, BUSINESSPERMIT, POLICECLEARANCE, RECEIPT, BUSINESSPERMIT_SAN_ANTONIO, CEDULA_SAN_ANTONIO, BRGY_BUSINESS_CLEARANCE
}

export default {
    install(Vue) {

        /**
         * @description open file in new window
         * @param {*} details 
         * @param {*} type 
         * @returns {Promise}
         */
        Vue.prototype.$print = (details, type) => {
            return new Promise((resolve, reject) => {
                var printer = printers[type.toUpperCase()]
                var document = printer.fillup(details);
                pdfMake.createPdf(document).open((err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                });
            })
        }

        /**
         * @description direct file download
         * @param {*} details 
         * @param {*} type 
         * @returns {Promise}
         */
        Vue.prototype.$download = (details, type, filename) => {
            return new Promise((resolve, reject) => {
                var printer = printers[type.toUpperCase()]
                var document = printer.fillup(details);
                pdfMake.createPdf(document).download(filename, (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                });
            })

        }

        /**
         * @description direct file download
         * @param {*} details 
         * @param {*} type 
         * @returns {Promise}
         */
        Vue.prototype.$upload = (details, type) => {
            return new Promise((resolve, reject) => {
                var printer = printers[type.toUpperCase()]
                var document = printer.fillup(details);
                pdfMake.createPdf(document).getBlob(blob => {
                    resolve(blob)
                });
            })

        }
    }
}