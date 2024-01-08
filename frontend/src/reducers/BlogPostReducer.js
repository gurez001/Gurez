import { ALL_BLOG_REQUEST, ALL_BLOG_SUCCESS, ALL_BLOG_FAILED, ALL_BLOG_CLEAR_ERROR } from "../constants/BlogPostConstants";
import { SINGLE_BLOGPAGE_REQUEST, SINGLE_BLOGPAGE_SUCCESS, SINGLE_BLOGPAGE_FAILED, SINGLE_BLOGPAGE_CLEAR_ERROR } from "../constants/BlogPostConstants";


export const BlogPostReducer = (state = { blog: [] }, action) => {
    switch (action.type) {
        case ALL_BLOG_REQUEST:
            return {
                ...state, 
                loading: true
            }
        case ALL_BLOG_SUCCESS: 
        return {
                loading: false,
                blog: action.payload,
            }
        case ALL_BLOG_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ALL_BLOG_CLEAR_ERROR:
            return {
                ...state,
                loading: false,
                error: null,
            };
        default:
            return state
    }
}

export const SingleBlogPageReducer = (state = { singleblog: [] }, action) => {
    console.log(state)
    switch (action.type) {

        case SINGLE_BLOGPAGE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SINGLE_BLOGPAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                singleblog: action.payload
            }
        case SINGLE_BLOGPAGE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SINGLE_BLOGPAGE_CLEAR_ERROR:
            return {
                ...state,
                loading: false,
                error: null
            }
        default: return state
    }

}