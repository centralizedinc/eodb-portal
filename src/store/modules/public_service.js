
function initialState() {
    return {
        subscribers: [
            {
                name: {
                    first: 'Godfrey',
                    last: 'Rivera'
                },
                avatar: 'https://randomuser.me/api/portraits/thumb/men/44.jpg',
                id: 1
            }, {
                name: {
                    first: 'Junex',
                    last: 'Basas'
                },
                avatar: 'https://randomuser.me/api/portraits/thumb/men/73.jpg',
                id: 2
            }, {
                name: {
                    first: 'Mark',
                    last: 'Quijom'
                },
                avatar: 'https://randomuser.me/api/portraits/thumb/men/62.jpg',
                id: 3
            }, {
                name: {
                    first: 'Veins',
                    last: 'Belo'
                },
                avatar: 'https://randomuser.me/api/portraits/thumb/men/83.jpg',
                id: 4
            }
        ],
        apps: [
            {
                app: "Default",
                messages: [
                    {
                        date_created: new Date(),
                        message: 'Keep up the good work and more power . God bless . Thank you very much !',
                        likes: 421,
                        id: 1
                    }, {
                        date_created: new Date(),
                        message: 'Maraming salamat po sa pagpapagawa nyo tricycle application. Malaking tulong po ito para sa mga driver at pasahero. Godbless po !',
                        likes: 532,
                        id: 2
                    }, {
                        date_created: new Date(),
                        message: 'Thank po for doing a great job. Godbless you ! ',
                        likes: 831,
                        id: 3
                    }, {
                        date_created: new Date(),
                        message: 'GO GO GO,in everything you do, I am for you. Will continue praying for your well being. 🙏🙏🙏',
                        likes: 719,
                        id: 4
                    }
                ]
            }, {
                app: "Abra",
                messages: [
                    {
                        date_created: new Date(),
                        message: 'Keep up the good work and more power . God bless . Thank you very much Governor Joy Bernos !',
                        likes: 421,
                        id: 1
                    }, {
                        date_created: new Date(),
                        message: 'Maraming salamat po Governor Joy Bernos sa pagpapagawa nyo tricycle application para sa Abra. Malaking tulong po ito para sa mga driver at pasahero. Godbless po Governor Joy Bernos !',
                        likes: 532,
                        id: 2
                    }, {
                        date_created: new Date(),
                        message: 'Thank po Governor Joy Bernos for doing a great job in Abra. Godbless you ! ',
                        likes: 831,
                        id: 3
                    }, {
                        date_created: new Date(),
                        message: 'GO GOVERNOR JOY,in everything you do,I am for you.Will continue praying for your well being.🙏🙏🙏',
                        likes: 719,
                        id: 4
                    }
                ]
            }, {
                app: "Nueva Ecija",
                messages: []
            }, {
                app: "San Antonio - Quezon",
                messages: [
                    {
                        date_created: new Date(),
                        message: 'Keep up the good work and more power . God bless . Thank you very much Mayor Erick Wagan !',
                        likes: 421,
                        id: 1
                    }, {
                        date_created: new Date(),
                        message: 'Maraming salamat po Mayor sa pagpapagawa nyo tricycle application para sa San Antonio, Quezon. Malaking tulong po ito para sa mga driver at pasahero. Godbless po Mayor Erick Wagan  !',
                        likes: 532,
                        id: 2
                    }, {
                        date_created: new Date(),
                        message: 'Thank po Mayor Erick Wagan for doing a great job in San Antonio, Quezon. Godbless you ! ',
                        likes: 831,
                        id: 3
                    }, {
                        date_created: new Date(),
                        message: 'GO MAYOR ERICK WAGAN,in everything you do,I am for you.Will continue praying for your well being.🙏🙏🙏',
                        likes: 719,
                        id: 4
                    }
                ]
            },
            {
                app: "Default",
                messages: [
                    {
                        date_created: new Date(),
                        message: '36 na litsong baboy inihain at pinagsalusaluhan ng mga kawani ng Pamahalaang Panlalawigan ng Nueva Ecija na pinangunahan ni Governor Aurelio Oyie Umali,Vice Governor Anthony Matias Umali, Provincial Administrator Atty. Alejandro Abesamis, Police Provinciàl Director Leon Victor Rosete, Dr. Romulo Parayao at Dr. Jayson de Guzman, Swine Practitioner and Producers President.Ito ay upang patunayan na ligras ang mfa baboy sa lalawigan sa napabalitang sakit na African Swine Fever o ASF.',
                        attachments:["https://scontent.fmnl4-2.fna.fbcdn.net/v/t1.0-9/74634590_3058226960871096_6713842703299248128_n.jpg?_nc_cat=101&_nc_oc=AQkYMhcgYWMOLtwZ9phTHfSCHAd3uNCRJgEw92dMY3BDr5f_PIR9d2ap4IoIwHVW-W0&_nc_ht=scontent.fmnl4-2.fna&oh=451b630587dd95c82b3409965ce7ffa5&oe=5E2B12F3", "https://scontent.fmnl4-1.fna.fbcdn.net/v/t1.0-9/74155708_3058227020871090_212665821057515520_n.jpg?_nc_cat=104&_nc_oc=AQl7j7oprVYvjnAtmH7hRRAhpsubBeHjcceA2c5mJME_WLpybhWhwliA6O9OE0Ev4zA&_nc_ht=scontent.fmnl4-1.fna&oh=06a007ad54870b573567596cd545a99d&oe=5E5A0079", "https://scontent.fmnl4-4.fna.fbcdn.net/v/t1.0-9/73498015_3058227150871077_4071360672821149696_n.jpg?_nc_cat=100&_nc_oc=AQmyuA3uoc5MikwfN1pFK-oss6EkE6Q9ne1Avy6o3rWKAK0E2-g2L4MivoK9hy5kX2w&_nc_ht=scontent.fmnl4-4.fna&oh=0c5d94ef1ede69cc72908533f7bc5df2&oe=5E1FD8C0","https://scontent.fmnl4-4.fna.fbcdn.net/v/t1.0-9/73498015_3058227150871077_4071360672821149696_n.jpg?_nc_cat=100&_nc_oc=AQmyuA3uoc5MikwfN1pFK-oss6EkE6Q9ne1Avy6o3rWKAK0E2-g2L4MivoK9hy5kX2w&_nc_ht=scontent.fmnl4-4.fna&oh=0c5d94ef1ede69cc72908533f7bc5df2&oe=5E1FD8C0"],
                        likes: 532,
                        id: 2
                    },
                    {
                        date_created: new Date(),
                        message: 'good morning po gov.at vice gov.in behalf po ng UGBI guardians.kmi ay lubos na nagpapasalamat sa inyong suporta sa pagdiriwang ng aming 13th founding anniv.maraming maraming salamat po at umasa po.kayl na patuloy ang samahang GUARDIANS na maktulong at maglingkod sa ating mamamayan.God bless po.',
                        likes: 421,
                        id: 1
                    },  {
                        date_created: new Date(),
                        message: 'WE\'RE CONTINUOUS HIRING! 📣 📣 📣 SALES CONSULTANT 👨‍💼 to be assigned in TRUCKS&BUSES - Cabanatuan office. \n\nQUALIFICATIONS\n* w/ sales experience in cars/trucks industry is an advantage\n* preferably male\n* can drive\n* atleast college level\n\nSubmit your resume at renceciriaco@yahoo.com.ph (subject:Sales Consultant) or drop by our office (wear proper attire so that you can take the examination right away) at KM108 Maharlika Highway Brgy.Sumacab Este,Cabanatuan City,Nueva Ecija ',
                        likes: 831,
                        id: 3
                    }, {
                        date_created: new Date(),
                        message: 'We are in need of HELPER to be assigned at the main office/plant  of NCMP. \n\n Kindly send your resume at cmdbncmphr@gmail.com or apply in our main office located Beside Central Terminal, D.S. Garcia, Cabanatuan City, Nueva Ecija.',
                        attachments:["https://scontent.fmnl4-4.fna.fbcdn.net/v/t1.0-9/74794091_1614819418642532_7743335631027175424_n.jpg?_nc_cat=109&_nc_oc=AQnwVklfUoXzVQa9rdVQA34ZgdNNPzmiuchhN8aWWo9-lOEfbgQp1JugodPY2b8Vv5c&_nc_ht=scontent.fmnl4-4.fna&oh=14bf7550ad5aaf4cab1f5b64e33464f9&oe=5E1F9CFA"],
                        likes: 719,
                        id: 4
                    }
                ]
            }]
    }
}

const state = initialState()

const mutations = {
    POST_MESSAGE(state, payload) {
        const index = state.subscribers.findIndex(x => x.id === payload.details.id);
        if (index === -1) state.subscribers.push(payload.details);
        state.apps[payload.app_index].messages.push(payload.post);
    }
}

const actions = {
}

export default {
    state,
    mutations,
    actions
}


