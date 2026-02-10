// List of api routes
// Single source of truth for api endpoints 
 
export const API ={
    AUTH:{
        LOGIN:'/api/auth/login',
        REGISTER:'/api/auth/register',
        WHOAMI: '/api/auth/whoami',
        UPDATEPROFILE: '/api/auth/upload-profile',
        REQUEST_PASSWORD_RESET: '/api/auth/request-password-reset',
        RESET_PASSWORD: (token: string) => `/api/auth/reset-password/${token}`,
    },

    USER: {
        NOTIFICATION: {
        GET_ALL: '/api/notifications/',
        GET_ONE: (id: string) => `/api/notifications/${id}`,
    },
    TERMSCONDITION: {
        GET_ALL: '/api/termsconditions/',
        GET_ONE: (id: string) => `/api/termsconditions/${id}`,
    },
    
    LANDINGPAGE: {
        GET_ALL: '/api/landingpages/',
        GET_ONE: (id: string) => `/api/landingpages/${id}`,
    }
    },
    LANDINGPAGE: {
        GET_ALL: '/api/landingpages/',
        GET_ONE: (id: string) => `/api/landingpages/${id}`,
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