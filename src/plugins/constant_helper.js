export default {
    client_details: {
        name: process.env.CLIENT_NAME || "User",
        avatar: process.env.CLIENT_AVATAR || 'https://icon-library.net/images/my-profile-icon-png/my-profile-icon-png-3.jpg',
        cover: process.env.CLIENT_COVER || 'https://www.larutadelsorigens.cat/wallpic/full/73-737840_amazing-nature-wallpaper-desktop-mobile-background-full-hd.jpg',
        website: {
            url: process.env.CLIENT_WEBSITE_URL,
            label: process.env.CLIENT_WEBSITE
        },
        facebook: {
            url: process.env.CLIENT_FACEBOOK_URL,
            label: process.env.CLIENT_FACEBOOK
        }
    },
    home_header: {
        logo: process.env.HOME_LOGO || 'https://i.stack.imgur.com/7JLVA.png',
        label: process.env.HOME_LABEL || 'My Website'
    },
    chatbot: {
        greetings: process.env.CHATBOT_GREETINGS,
        appId: process.env.CHATBOT_APP_ID,
        page_id: process.env.CHATBOT_PAGE_ID,
        theme_color: process.env.CHATBOT_THEME_COLOR
    },
    name_display: process.env.APP_NAME || 'Application Name',
    login_background: process.env.LOGIN_BACKGROUND || 'https://www.larutadelsorigens.cat/wallpic/full/73-737840_amazing-nature-wallpaper-desktop-mobile-background-full-hd.jpg'
}