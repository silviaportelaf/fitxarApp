
export function fetch_POST_json(url, body) {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }).then(response => response.json())
}

export function fetch_POST(url, body) {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
}

export function fetch_POST_auth(url, body, auth) {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + auth },
        body: JSON.stringify(body)
    })
}
export function fetch_GET_auth(url, auth) {
    return fetch(url, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + auth },
    })
}

export const errors = {
    error_string: 'Something bad happened',
    ok_string: 'Success',
    incorrect_user_string: 'Incorrect username or password',
    incorrect_token_string: 'Not valid token',
    invalid_token_type_user_string: 'user token not allowed',
    invalid_token_type_box_string: 'box token not allowed',
    username_exists_string: 'username already exists',
    email_in_use_string: 'email is already registered',
    not_valid_mode_string: 'is not a valid mode',
    admin_required_string: 'admin priviledge required',
    boxname_in_use_string: 'boxname already registered by user',
    serial_number_in_use_string: 'serial number is in use'
}