"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
function formatDate(date) {
    const options = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };
    const formattedDate = new Intl.DateTimeFormat('en-IN', options).format(date);
    return formattedDate.toString();
}
exports.formatDate = formatDate;
//# sourceMappingURL=utils.js.map