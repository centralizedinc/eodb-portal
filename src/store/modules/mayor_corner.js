
function initialState() {
    return {
        posts: [{
            date: new Date("10/08/2019"),
            message: 'PGA strictly implements the “No to Plastic" policy. Security guards of PGA will not allow styrofoam and single-use plastics inside the provincial capitol.',
            attachments: [
                "https://scontent.fmnl4-3.fna.fbcdn.net/v/t1.0-9/72051066_742891486137352_1389861634712797184_n.jpg?_nc_cat=109&_nc_eui2=AeHbIcSmE0D9VRqmr38llZ-pVd0ohp1eS-w_MEogYwFzlyG2tuMWzeKpXSMJx-fDxX7zw1jT8fSZQr0R2ip-95FyLuzvfymNyvgOWxNTNtXBXw&_nc_oc=AQkoXwa1iHgMv5x_wdK16zUggBPYB-oD3kPatpeDJzVzGzxugLjGA4V4mU9IrmS3P4w&_nc_ht=scontent.fmnl4-3.fna&oh=23cc7405ffb6a4b86e758695e596e00e&oe=5E2E3215",
                "https://scontent.fmnl4-3.fna.fbcdn.net/v/t1.0-9/72287269_742891529470681_2157555569647419392_n.jpg?_nc_cat=109&_nc_eui2=AeHkfhqiiPLynPJ6QQzc7yvf8qaFsvHgjadCd_KsRp2hhc68d4ZQpxFLxUNuc84frDRO5me4USzGPAZrzWlM5A6SemekEC4pVzfQC5wGk__1PA&_nc_oc=AQlgqk5zMov76n9P3QirA4LChk6qLHmhJpLacyhNFcbqQLIgHKLKakfizuhKrCV59IM&_nc_ht=scontent.fmnl4-3.fna&oh=cf4c07917591c6cfe198047e38620ba0&oe=5E1DEF23"
            ],
            likes: 231
        }, {
            date: new Date(),
            message: `Abra's senior citizens danced youthfully during the second part of the Elderly Filipino Week celebration of the PGA. Gov. Joy Bernos announced the “Yakap ni Gov. Joy kay Lolo at Lola” program extending the benefits of the Senior Citizens Act of 2010.`,
            attachments: [
                "https://scontent.fmnl4-2.fna.fbcdn.net/v/t1.0-9/71491956_742891842803983_730362474334781440_n.jpg?_nc_cat=105&_nc_eui2=AeGQ6xF7nEYKJJYa0FQHaMn4x-0aJQdmtV8iwzwDk6EZA2q51xPGLjiUwErBIMreppi8XXAnZEWItbv_rbzG_y-epLHzPRCt-3eFvyHr4K0TEg&_nc_oc=AQmGwIl-d_nvuTKFMq3zqSrZm6qPUGJsm3QcgPEM-WTA4SaSBuEBNGBc5_ywgmtkfIg&_nc_ht=scontent.fmnl4-2.fna&oh=00f4b9ac1a5b67c3142f97f39f7ae75b&oe=5E20B29F",
                "https://scontent.fmnl4-3.fna.fbcdn.net/v/t1.0-9/71771185_742891876137313_7780480071571079168_n.jpg?_nc_cat=110&_nc_eui2=AeG5N21LAWW7NXpd0Fiu8W4tkycv_WFI-DuZn9-MUhBGzMMA4OxLy9yjpWV94rhaEvclugSF7O1eFq01St8hRT-GobPrrX6umaMGtyKiOzPVJw&_nc_oc=AQm6OLpxqOaQ7mT0ug43JbFU6ZfW7AqtMVUKaJHIuv3VXBBEUK6dNTBGRpC-7JKLxLQ&_nc_ht=scontent.fmnl4-3.fna&oh=9a94f33a77234f7b9484da73c6b275da&oe=5E3A7A00",
                "https://scontent.fmnl4-4.fna.fbcdn.net/v/t1.0-9/71567233_742891866137314_3820417420321882112_n.jpg?_nc_cat=100&_nc_eui2=AeHB13qV2bLXl1Qa0vccY4Az2jbSIw7zi_4ZsMAdtBtCsxlOPfqsz_NwGXb07XVMFalDLylNbvYCNrUfPmHeH-WRBKERrCLj9JIIjofTUYP8sg&_nc_oc=AQkleY0IG7hIlWGiA6NwQD29hvyaU4GHeVPloN9Cqp731dtn41x0pzvqZMZYRLhowUA&_nc_ht=scontent.fmnl4-4.fna&oh=5c0e44fab2a7ce23f9534505c9f7a67f&oe=5E38BA21"
            ],
            likes: 536
        }, {
            date: new Date("10/02/2019"),
            message: `Another attraction at Cassamata Park. Governor Joy Valera- Bernos formally openned the 117 Lights called “Victoria Lights”.`,
            attachments: [
                "https://scontent.fmnl4-5.fna.fbcdn.net/v/t1.0-9/71959944_2577620289151825_1629389358060535808_n.jpg?_nc_cat=111&_nc_eui2=AeGgwpdgWuQXEpiDZq7EsMdDGlZpI30EBEJC3fDY2dYUxYCD--gPE-InqhuVZgHmRMbOu07fmK9oO56BFrT8XqVccVlPcZaLcvBDB5iqqXKB4g&_nc_oc=AQmhZrjn1MJe9wbSeaP5IRlIGcZlUmBQEvS95NEIeZH_O_zFf6e0no3OTUQXyUji2GA&_nc_ht=scontent.fmnl4-5.fna&oh=0c9351efc89bfccfc12e719e9093e787&oe=5E2C56D2"
            ],
            likes: 231
        }]
    }
}

const state = initialState();

const mutations = {

}

const actions = {
}

export default {
    state,
    mutations,
    actions
}

// function initialState() {
//     return {
//         posts: [
//             {
//                 date: new Date(10 / 08 / 2019),
//                 message: 'PGA strictly implements the “No to Plastic" policy. Security guards of PGA will not allow styrofoam and single-use plastics inside the provincial capitol.',
//                 attachments: [
//                     "https://scontent.fmnl4-3.fna.fbcdn.net/v/t1.0-9/72051066_742891486137352_1389861634712797184_n.jpg?_nc_cat=109&_nc_eui2=AeHbIcSmE0D9VRqmr38llZ-pVd0ohp1eS-w_MEogYwFzlyG2tuMWzeKpXSMJx-fDxX7zw1jT8fSZQr0R2ip-95FyLuzvfymNyvgOWxNTNtXBXw&_nc_oc=AQkoXwa1iHgMv5x_wdK16zUggBPYB-oD3kPatpeDJzVzGzxugLjGA4V4mU9IrmS3P4w&_nc_ht=scontent.fmnl4-3.fna&oh=23cc7405ffb6a4b86e758695e596e00e&oe=5E2E3215",
//                     "https://scontent.fmnl4-3.fna.fbcdn.net/v/t1.0-9/72287269_742891529470681_2157555569647419392_n.jpg?_nc_cat=109&_nc_eui2=AeHkfhqiiPLynPJ6QQzc7yvf8qaFsvHgjadCd_KsRp2hhc68d4ZQpxFLxUNuc84frDRO5me4USzGPAZrzWlM5A6SemekEC4pVzfQC5wGk__1PA&_nc_oc=AQlgqk5zMov76n9P3QirA4LChk6qLHmhJpLacyhNFcbqQLIgHKLKakfizuhKrCV59IM&_nc_ht=scontent.fmnl4-3.fna&oh=cf4c07917591c6cfe198047e38620ba0&oe=5E1DEF23"
//                 ],
//                 likes: 231
//             }, {
//                 date: new Date(),
//                 message: `Abra's senior citizens danced youthfully during the second part of the Elderly Filipino Week celebration of the PGA. Gov. Joy Bernos announced the “Yakap ni Gov. Joy kay Lolo at Lola” program extending the benefits of the Senior Citizens Act of 2010.`,
//                 attachments: [
//                     "https://scontent.fmnl4-2.fna.fbcdn.net/v/t1.0-9/71491956_742891842803983_730362474334781440_n.jpg?_nc_cat=105&_nc_eui2=AeGQ6xF7nEYKJJYa0FQHaMn4x-0aJQdmtV8iwzwDk6EZA2q51xPGLjiUwErBIMreppi8XXAnZEWItbv_rbzG_y-epLHzPRCt-3eFvyHr4K0TEg&_nc_oc=AQmGwIl-d_nvuTKFMq3zqSrZm6qPUGJsm3QcgPEM-WTA4SaSBuEBNGBc5_ywgmtkfIg&_nc_ht=scontent.fmnl4-2.fna&oh=00f4b9ac1a5b67c3142f97f39f7ae75b&oe=5E20B29F",
//                     "https://scontent.fmnl4-3.fna.fbcdn.net/v/t1.0-9/71771185_742891876137313_7780480071571079168_n.jpg?_nc_cat=110&_nc_eui2=AeG5N21LAWW7NXpd0Fiu8W4tkycv_WFI-DuZn9-MUhBGzMMA4OxLy9yjpWV94rhaEvclugSF7O1eFq01St8hRT-GobPrrX6umaMGtyKiOzPVJw&_nc_oc=AQm6OLpxqOaQ7mT0ug43JbFU6ZfW7AqtMVUKaJHIuv3VXBBEUK6dNTBGRpC-7JKLxLQ&_nc_ht=scontent.fmnl4-3.fna&oh=9a94f33a77234f7b9484da73c6b275da&oe=5E3A7A00",
//                     "https://scontent.fmnl4-4.fna.fbcdn.net/v/t1.0-9/71567233_742891866137314_3820417420321882112_n.jpg?_nc_cat=100&_nc_eui2=AeHB13qV2bLXl1Qa0vccY4Az2jbSIw7zi_4ZsMAdtBtCsxlOPfqsz_NwGXb07XVMFalDLylNbvYCNrUfPmHeH-WRBKERrCLj9JIIjofTUYP8sg&_nc_oc=AQkleY0IG7hIlWGiA6NwQD29hvyaU4GHeVPloN9Cqp731dtn41x0pzvqZMZYRLhowUA&_nc_ht=scontent.fmnl4-4.fna&oh=5c0e44fab2a7ce23f9534505c9f7a67f&oe=5E38BA21",
//                     "https://scontent.fmnl4-3.fna.fbcdn.net/v/t1.0-9/71826455_742891969470637_7308707085523353600_n.jpg?_nc_cat=110&_nc_eui2=AeHGbHjjQcbbykoAChjhHPvSfNFuXBpeCrFnyN42edpCPoAqijIY8GTAx4MrsubIfZyNT4uXLer-JZo9a8p2bzumWfGG9gR-EF_8rq2xdi0HPw&_nc_oc=AQn4Yyo2XcnUsrlMf0kmf_IxMWWvpGmhuYlMEH1G0JpD_cb5FXNIIB1ggYSDckioAi4&_nc_ht=scontent.fmnl4-3.fna&oh=7deaf19ba7872d9552495255c4edb021&oe=5E215DF7"
//                 ],
//                 likes: 536
//             }, {
//                 date: new Date(10 / 02 / 2019),
//                 message: `Another attraction at Cassamata Park. Governor Joy Valera- Bernos formally openned the 117 Lights called “Victoria Lights”.`,
//                 attachments: [
//                     "https://scontent.fmnl4-5.fna.fbcdn.net/v/t1.0-9/71959944_2577620289151825_1629389358060535808_n.jpg?_nc_cat=111&_nc_eui2=AeGgwpdgWuQXEpiDZq7EsMdDGlZpI30EBEJC3fDY2dYUxYCD--gPE-InqhuVZgHmRMbOu07fmK9oO56BFrT8XqVccVlPcZaLcvBDB5iqqXKB4g&_nc_oc=AQmhZrjn1MJe9wbSeaP5IRlIGcZlUmBQEvS95NEIeZH_O_zFf6e0no3OTUQXyUji2GA&_nc_ht=scontent.fmnl4-5.fna&oh=0c9351efc89bfccfc12e719e9093e787&oe=5E2C56D2"
//                 ],
//                 likes: 231
//             }
//         ]
//     }
// }

// const state = initialState();

// const mutations = {
//     POST_MAYOR_CORNER(state, data) {
//         data.date = new Date();
//         state.posts.push(data);
//     }
// }

// var actions = {

// }

// export default {
//     state,
//     mutations,
//     actions
// }