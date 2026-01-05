export const isValidJWT = (jwt: string) => {
	return jwt == null || jwt == "" || jwt == "undefined";
};
