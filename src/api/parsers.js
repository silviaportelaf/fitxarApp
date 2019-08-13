export const parseRegistration = (firstName, lastName, iscompany, email, password) => {
    return {

        message: 'users',
        modelObject: [{
            className: 'Users',
            properties: [{
                property: [{
                    name: 'username',
                    value: email
                },
                {
                    name: 'first_name',
                    value: firstName
                },
                {
                    name: 'last_name',
                    value: lastName
                },
                {
                    name: 'iscompany',
                    value: iscompany
                },
                {
                    name: 'email',
                    value: email
                },
                {
                    name: 'password',
                    value: password
                },
                {
                    name: 'notification_token',
                    value: '{cS5THKfSdpM:APA91GtCGNsDfEszDZ0ExQPt5n6ld8pllPBVvTOIxfZZsHMUWD-P94W_MVcB4by6UZYP_UjpTLgI56Dbeprfuwosz0FjpL6zRnyB_mgU3WprAklMnBKDG78B0BKFVbYxj0zM5WtZ}'
                }
                ]
            }]
        }
        ],
    }
}
export function parseUpdateTokenBox(serial_number) {
    return {
        message: "boxes",
        modelObject: [
            {
                className: "boxes",
                properties: {
                    property: [
                        {
                            name: "serial_number",
                            value: serial_number
                        }
                    ]
                }
            }
        ]
    }
}

export function parseUnlinkBox(serial_number) {
    return {
        message: "boxes",
        modelObject: [
            {
                className: "boxes",
                properties: {
                    property: [
                        {
                            name: "serial_number",
                            value: serial_number
                        }
                    ]
                }
            }
        ]
    }
}

export function parseInsertBox(serial_number, box_name) {
    return {
        message: "boxes",
        modelObject: [
            {
                className: "boxes",
                properties: {
                    property: [
                        {
                            "name": "serial_number",
                            "value": serial_number
                        },
                        {
                            "name": "model",
                            "value": "BoxSafe1"
                        },
                        {
                            "name": "box_name",
                            "value": box_name
                        },
                        {
                            "name": "mailing",
                            "value": "{}"
                        }
                    ]
                }
            }
        ]
    }
}
export function parseAddMailing(serial_number,email) {
    return {
        message: "boxes",
        modelObject: [
            {
                className: "boxes",
                properties: {
                    property: [
                        {
                            "name": "serial_number",
                            "value": serial_number
                        },
                        {
                            "name": "mailing",
                            "value": email
                        }
                    ]
                }
            }
        ]
      
    }
}
export const parseLogListResponse = (response) => {
    response.modelObject.properties.property.map((log) => {
    })
}
// export function unParseLogListResponse(response) {
//     var logs = [];
//     var values = JSON.parse(response._bodyText);
//     //jsonVariable[ 'id'] = 'name' + i;
//     values.modelObject.forEach(element => {
//         var jsonObject = {};
//         element.properties.property.forEach(subElement => {
//             jsonObject[subElement.name] = subElement.value;
//         })
//         logs.push(jsonObject)
//     });
//     return logs
// }

export function unParseLogListResponse(response) {
    return JSON.parse(response._bodyText).values;
}

export function unParseLogHistoryListResponse(response) {
    //return parseStringToJSON(JSON.parse(response._bodyText).values);
    return JSON.parse(response._bodyText).values;
}

// export function unParseBoxListResponse(response) {
//     var boxes = [];
//     var values = JSON.parse(response._bodyText);
//     values.modelObject.forEach(element => {
//         var jsonObject = {};
//         element.properties.property.forEach(subElement => {
//             try {
//                 jsonObject[subElement.name] = JSON.parse(subElement.value);
//             } catch{
//                 jsonObject[subElement.name] = subElement.value;
//             }
//         })
//         boxes.push(jsonObject)
//     });
//     return boxes;
// }

function parseStringToJSON(node) {
    var result;
    try {
        result = JSON.parse(node);
    } catch (error) {
        result = node;
    }
    Object.keys(result).forEach((k) => {
        if (result[k] === "") {
            result[k] = null;
        } else if (result[k]==="[]") {
            result[k] =[];
        } else if (!isNaN(result[k])) {
            result[k] = parseInt(result[k], 0);
        } else if (Date.parse(result[k])) {
            result[k] = new Date(Date.parse(result[k]));
        } else if (result[k] === "true" || result[k] === "false") {
            result[k] = (result[k] === "true");
        } else if (typeof result[k] === 'object') {
            result[k] = parseStringToJSON(result[k]);
        }
    });
    return result;
}

export function unParseBoxListResponse(response) {
    //return JSON.parse(response._bodyText).values;
    return JSON.parse(response._bodyText).values
}