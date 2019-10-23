export default {
    client_details: {
        title: process.env.VUE_APP_CLIENT_TITLE,
        name: process.env.VUE_APP_CLIENT_NAME || "User",
        avatar: process.env.VUE_APP_CLIENT_AVATAR || 'https://icon-library.net/images/my-profile-icon-png/my-profile-icon-png-3.jpg',
        cover: process.env.VUE_APP_CLIENT_COVER || 'https://www.larutadelsorigens.cat/wallpic/full/73-737840_amazing-nature-wallpaper-desktop-mobile-background-full-hd.jpg',
        website: {
            url: process.env.VUE_APP_CLIENT_WEBSITE_URL,
            label: process.env.VUE_APP_CLIENT_WEBSITE
        },
        facebook: {
            url: process.env.VUE_APP_CLIENT_FACEBOOK_URL,
            label: process.env.VUE_APP_CLIENT_FACEBOOK
        },
        transaction_label: process.env.VUE_APP_TRANSACTION_LABEL || ''
    },
    home_header: {
        logo: process.env.VUE_APP_HOME_LOGO || 'https://i.stack.imgur.com/7JLVA.png',
        label: process.env.VUE_APP_HOME_LABEL || 'My Website'
    },
    chatbot: {
        greetings: process.env.VUE_APP_CHATBOT_GREETINGS,
        appId: process.env.VUE_APP_CHATBOT_APP_ID,
        page_id: process.env.VUE_APP_CHATBOT_PAGE_ID,
        theme_color: process.env.VUE_APP_CHATBOT_THEME_COLOR
    },
    theme: {
        default: process.env.VUE_APP_GRADIENT_FROM && process.env.VUE_APP_GRADIENT_TO ?
            `background: linear-gradient(to right, ${process.env.VUE_APP_GRADIENT_FROM}, ${process.env.VUE_APP_GRADIENT_TO});` : '',        
        background: process.env.VUE_APP_BACKGROUND,
        button: process.env.VUE_APP_BUTTON_COLOR ? `background: ${process.env.VUE_APP_BUTTON_COLOR}; color:#FFFFFF` : ''
    },
    app_index: process.env.VUE_APP_APP_INDEX || 0,
    name_display: process.env.VUE_APP_APP_NAME || 'Application Name',
    login_background: process.env.VUE_APP_LOGIN_BACKGROUND
}