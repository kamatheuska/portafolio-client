export default {
    all: [
        {
            code: 5001,
            type: 'position',
            errMessage: 'Unable to retrieve your location',
            status: false
        },
        {
            code: 5002,
            type: 'geolocation',
            errMessage: 'Geolocation is not supported by your browser',
            status: false
        },
        {
            code: 5003,
            type: 'clientError',
            errMessage: 'There was a problem retrieving the weather...',
            status: false
        },
        {
            code: 4001,
            type: 'clientError',
            errMessage: 'Unknown error from browser',
            status: false
        }
    ],
    current: null
}
