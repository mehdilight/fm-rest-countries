class CountriesService {
    async getByCode(code) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
            if (!response.ok) {
                // handle errors
                return [];
            }

            const data = await response.json();

            return data;
        } catch (error) {
            return [];
        }
    }
}

export default new CountriesService();