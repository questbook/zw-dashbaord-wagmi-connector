import axios from "axios";

export const postFetcher = async (args: any[]) => {
    const [input, requestData] = args;
    console.log("init", input, requestData)
    if (!requestData) return []
    const { data } = await axios.post(input, requestData);
    if (data.error || data.errors) {
        return null
    }
    return data
};
