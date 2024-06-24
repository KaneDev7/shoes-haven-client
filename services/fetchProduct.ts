import instance from "@/lib/axios";

export const fetchProducts = async (url: string) => {
    try {
        const response = await instance.get(url);
        return response.data.data

    } catch (err) {
        console.log(err)
    }
};