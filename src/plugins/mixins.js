import constant_helper from './constant_helper';

export default {

    install(Vue) {
        Vue.mixin({
            data() {
                return {
                    constant_helper
                }
            },
            methods: {
                deepCopy(obj) {
                    return JSON.parse(JSON.stringify(obj));
                },
                formatDate(date, type) {
                    var dt = new Date();
                    if (date) {
                        dt = new Date(date)
                    }
                    if (!type) {
                        type = {
                            year: "numeric",
                            month: "long",
                            day: "2-digit"
                        }
                    } else if (type === 'time') {
                        type = {
                            hour12: true,
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    }
                    return dt.toLocaleString("en-US", type);
                },
                formatCurrency(amount) {
                    const formatter = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'PHP',
                        currencyDisplay: 'code',
                        minimumFractionDigits: 2
                    })
                    return formatter.format(amount)
                }
            },
        })
    }
}