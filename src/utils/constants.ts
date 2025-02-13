type CountryCodeType = "pe" | "co" ;
type PhoneCodeType = "+51" | "+57" | "";

export const COUNTRY : CountryCodeType = import.meta.env.VITE_COUNTRY

export const PHONE_CODE = () : PhoneCodeType => {
    switch (COUNTRY) {
        case "co": return "+57";
        case "pe": return "+51";
        default: return "";
    }
}