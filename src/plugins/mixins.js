import constant_helper from './constant_helper';
import moment from 'moment';

export default {

    install(Vue) {
        Vue.mixin({
            data() {
                return {
                    constant_helper,
                    fixed_address: true,
                    fixed_postal: true
                }
            },
            methods: {
                deepCopy(obj) {
                    return JSON.parse(JSON.stringify(obj));
                },
                getPlatformIcon(platform) {
                    console.log('platform::::', platform)
                    if (platform === 'facebook' || platform === 'google') {
                        return platform
                    } else {
                        return 'mail';
                    }
                },
                formatDate(date, type, allow_blank_date) {
                    var dt = new Date();
                    if (date) {
                        dt = new Date(date)
                    } else if (allow_blank_date && !date) {
                        return "";
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
                },
                getDocketStatus(status) {
                    return ['In-progress', 'Done', 'Rejected'][status]
                },
                getDocketMode(mode) {
                    return ['NEW', 'RENEWAL'][mode]
                },
                getBase64(img, callback) {
                    const reader = new FileReader();
                    reader.addEventListener('load', () => callback(reader.result));
                    reader.readAsDataURL(img);
                },
                getPermitType(type) {
                    if (type === "business") return "Business Permit";
                    else if (type === "cedula") return "Community Tax Certificate";
                    else if (type === "barangay") return "Barangay Clearance";
                    else if (type === "police") return "Police Clearance";
                    return "";
                },
                getPermitCode(code) {
                    const permit_types = this.$store.state.permits.permit_types;
                    return permit_types.find(v => v._id.toString() === code.toString()) || {}
                },
                getBusinessType(type) {
                    if (type === "SP") return "Single Proprietorship";
                    else if (type === "P") return "Partnership";
                    else if (type === "CE") return "Cooperative";
                    else if (type === "CN") return "Corporation";
                },
                getPaymentMode(mode) {
                    if (mode === "A") return "Annual";
                    else if (mode === "SA") return "Semi Annual";
                    else if (mode === "Q") return "Quarterly";
                    else return "";
                },
                disableDateInBirthdate(current, mustAbove18) {
                    if (mustAbove18) {
                        var dateAbove18 = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());
                        return current && current > moment(dateAbove18).endOf('day');
                    } else return current && current > moment().endOf('day');
                }
            },
        })
    }
}