import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
    stages: [
        { duration: '30s', target: 100 },
        { duration: '60s', target: 300 },
        { duration: '60s', target: 600 },
        { duration: '30s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<300'],
        http_req_failed: ['rate<0.01'],
    },
};
export default function () {
    http.get('http://127.0.0.1:53555/api/v1/movies');
    sleep(1);
}