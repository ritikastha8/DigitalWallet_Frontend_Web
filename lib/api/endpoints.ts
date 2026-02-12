// List of api routes
// Single source of truth for api endpoints 
 
export const API ={
    AUTH:{
        LOGIN:'/api/user/auth/login',
        REGISTER:'/api/user/auth/register',
        WHOAMI: '/api/user/auth/whoami',
        UPDATEPROFILE: '/api/user/auth/upload-profile',
        REQUEST_PASSWORD_RESET: '/api/user/auth/request-password-reset',
        RESET_PASSWORD: (token: string) => `/api/user/auth/reset-password/${token}`,
        SET_PIN: '/api/user/auth/set-pin',
    },
    TERMSCONDITION: {
        GET_ALL: '/api/termsconditions/',
        GET_ONE: (id: string) => `/api/termsconditions/${id}`,
    },

    USER: {
        NOTIFICATION: {
        GET_ALL: '/api/user/notifications/',
        GET_ONE: (id: string) => `/api/user/notifications/${id}`,
    },
    TERMSCONDITION: {
        GET_ALL: '/api/user/termsconditions/',
        GET_ONE: (id: string) => `/api/user/termsconditions/${id}`,
    },
    
    LANDINGPAGE: {
        GET_ALL: '/api/user/landingpages/',
        GET_ONE: (id: string) => `/api/user/landingpages/${id}`,
    }
    },
    
    LANDINGPAGE: {
        GET_ALL: '/api/user/landingpages/',
        GET_ONE: (id: string) => `/api/user/landingpages/${id}`,
    },


    ADMIN:{
        USER:{
            CREATE: '/api/admin/users/',
            GET_ALL: '/api/admin/users/',
            GET_ONE: (userId: string) => `/api/admin/users/${userId}`,
            UPDATE: (userId: string) => `/api/admin/users/${userId}`,
            DELETE: (userId: string) => `/api/admin/users/${userId}`,
        },
        NOTIFICATION:{
            CREATE: '/api/admin/notifications/',
            GET_ALL: '/api/admin/notifications/',
            GET_ONE: (notificationId: string) => `/api/admin/notifications/${notificationId}`,
            UPDATE: (notificationId: string) => `/api/admin/notifications/${notificationId}`,
            DELETE: (notificationId: string) => `/api/admin/notifications/${notificationId}`,
        },
        TERMSCONDITION:{
            CREATE: '/api/admin/termsconditions/',
            GET_ALL: '/api/admin/termsconditions/',
            GET_ONE: (termsConditionId: string) => `/api/admin/termsconditions/${termsConditionId}`,
            UPDATE: (termsConditionId: string) => `/api/admin/termsconditions/${termsConditionId}`,
            DELETE: (termsConditionId: string) => `/api/admin/termsconditions/${termsConditionId}`,
        },
        LANDINGPAGE:{
            CREATE: '/api/admin/landingpages/',
            GET_ALL: '/api/admin/landingpages/',
            GET_ONE: (landingpagesId: string) => `/api/admin/landingpages/${landingpagesId}`,
            UPDATE: (landingpagesId: string) => `/api/admin/landingpages/${landingpagesId}`,
            DELETE: (landingpagesId: string) => `/api/admin/landingpages/${landingpagesId}`,
        }
 
    }
}