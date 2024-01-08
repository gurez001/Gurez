import { BLOG_CATEGORY_REQUEST, BLOG_CATEGORY_SUCCESS, BLOG_CATEGORY_FAILED, CATEGORY_CLEAR_ERROR } from "../constants/BlogCategoryConstant";

export const BlogCategoryReducer = (state = { category: [] }, action) => {
    switch (action.type) {
        case BLOG_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case BLOG_CATEGORY_SUCCESS:
            return {
                loading: false,
                category: action.payload,
            }
        case BLOG_CATEGORY_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CATEGORY_CLEAR_ERROR:
            return {
                ...state,
                loading: false,
                error: null,
            }
        default:
            return state
    }

}