/**
 * action    在这里 完成数据的获取 和 处理 ，并向store发送各个组合的Action
 */

export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function loginLoading (loading) {
    return {
        type: LOGIN_LOADING,
        payload: loading
    }
}

export function loginSuccess (data) {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

export function loginFailure (error) {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}
let data = {
    'user_name': 'ren',
    'password': 'Aa123123',
    'login_type': 1,
    'menu_type': 1
};
export function login () {
    return function (dispatch) {
        dispatch(loginLoading(true));
        setTimeout(() => {
            dispatch(loginLoading(false));
            dispatch(loginSuccess('我成功了'))
        }, 1000)
        // window.fetch('http://192.168.10.208:8001/fbs/lio/pblin.do', {
        //   method: 'POST',
        //   credentials: 'include',
        //   mode: 'no-cors',
        //   body: JSON.stringify(data)
        // })
        // .than((res) => {
        //   dispatch(loginLoading(false))
        //   dispatch(loginSuccess(res))
        // })
        // .catch((error) => {
        //   dispatch(loginLoading(false))
        //   dispatch(loginFailure(error))
        // })
    }
}
